"use client";

import { useAuthContext } from "@/components/providers/AuthProvider";

// Supabase-backed profile for the signed-in user (public.profiles), shared
// via AuthProvider so every consumer reads the same fetched row instead of
// each doing its own request. `role` here is the job title
// (public.profiles.job_title) — distinct from public.profiles.role, which
// is the admin/user access flag and is never writable from this hook.
export function useProfile() {
  const { profile, profileHydrated, updateProfile } = useAuthContext();
  return { profile, hydrated: profileHydrated, updateProfile };
}
