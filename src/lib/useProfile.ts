"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  role: "",
  team: "",
  website: "",
  avatarDataUrl: undefined,
};

// Supabase-backed profile for the signed-in user (public.profiles),
// replacing the old localStorage-only mock. `role` here is the job title
// (public.profiles.job_title) — distinct from public.profiles.role, which
// is the admin/user access flag and is never writable from this hook.
export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) {
      setProfile(EMPTY_PROFILE);
      setHydrated(true);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, job_title, team, website")
      .eq("id", user.id)
      .single();

    setProfile({
      name: data?.full_name ?? "",
      role: data?.job_title ?? "",
      team: data?.team ?? "",
      website: data?.website ?? "",
      avatarDataUrl: data?.avatar_url ?? undefined,
    });
    setHydrated(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateProfile(patch: Partial<UserProfile>) {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes.user;
    if (!user) return;

    const next = { ...profile, ...patch };
    setProfile(next);

    await supabase
      .from("profiles")
      .update({
        full_name: next.name,
        job_title: next.role,
        team: next.team,
        website: next.website,
        avatar_url: next.avatarDataUrl ?? null,
      })
      .eq("id", user.id);
  }

  return { profile, hydrated, updateProfile };
}
