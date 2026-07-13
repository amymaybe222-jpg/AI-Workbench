"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

type Role = "user" | "admin";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  created_at: string;
};

export function UserAdmin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadProfiles() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setProfiles(data as Profile[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  async function handleRoleChange(id: string, role: Role) {
    setUpdatingId(id);
    setError(null);
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    setUpdatingId(null);

    if (error) {
      setError(error.message);
      return;
    }
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, role } : p)));
  }

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">{error}</p>
      )}

      <p className="text-sm text-text-muted">{loading ? "Loading…" : `${profiles.length} people`}</p>

      <Card className="mt-4 overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium text-right">Role</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-text">{p.full_name || "—"}</td>
                <td className="px-4 py-3 text-text-muted">{p.email}</td>
                <td className="px-4 py-3 text-text-muted">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={p.role}
                    disabled={updatingId === p.id}
                    onChange={(e) => handleRoleChange(p.id, e.target.value as Role)}
                    className="focus-ring rounded-lg border border-border bg-surface px-2 py-1.5 text-sm text-text disabled:opacity-50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {!loading && profiles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-text-muted">
                  No one has signed in yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
