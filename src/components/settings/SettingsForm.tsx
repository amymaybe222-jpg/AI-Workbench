"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogOut, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/useAuth";
import { useProfile } from "@/lib/useProfile";
import { UserProfile } from "@/types";

export function SettingsForm() {
  const router = useRouter();
  const { isLoggedIn, hydrated: authHydrated, logout } = useAuth();
  const { profile, hydrated: profileHydrated, updateProfile } = useProfile();

  const [draft, setDraft] = useState<UserProfile>(profile);
  const [draftSeeded, setDraftSeeded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Redirect logged-out visitors once auth state has hydrated from localStorage
  // (before that, isLoggedIn is just the initial `false` default, not a real answer).
  useEffect(() => {
    if (authHydrated && !isLoggedIn) {
      router.replace("/login?redirect=/settings");
    }
  }, [authHydrated, isLoggedIn, router]);

  // Seed the editable draft from the persisted profile once it has hydrated.
  useEffect(() => {
    if (profileHydrated && !draftSeeded) {
      setDraft(profile);
      setDraftSeeded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileHydrated, draftSeeded]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name: draft.name, website: draft.website });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  if (!authHydrated || !isLoggedIn) {
    return <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />;
  }

  return (
    <Card className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="settings-name" className="text-xs font-medium text-text-muted">
            Display name
          </label>
          <input
            id="settings-name"
            type="text"
            required
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-base text-text focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="settings-website" className="text-xs font-medium text-text-muted">
            Website
          </label>
          <input
            id="settings-website"
            type="url"
            value={draft.website ?? ""}
            onChange={(e) => setDraft({ ...draft, website: e.target.value })}
            placeholder="https://your-site.com"
            className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-5">
          <Button type="submit">
            <Save className="h-4 w-4" aria-hidden="true" />
            Save
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-secondary" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Saved!
            </span>
          )}
          <Button type="button" variant="ghost" className="ml-auto" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </form>
    </Card>
  );
}
