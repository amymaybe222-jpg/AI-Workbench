"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  role: "",
  team: "",
  website: "",
  avatarDataUrl: undefined,
};

interface ProfileRow {
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  team: string | null;
  website: string | null;
  role: string | null;
}

function mapProfileRow(row: ProfileRow | null | undefined): UserProfile {
  if (!row) return EMPTY_PROFILE;
  return {
    name: row.full_name ?? "",
    role: row.job_title ?? "",
    team: row.team ?? "",
    website: row.website ?? "",
    avatarDataUrl: row.avatar_url ?? undefined,
  };
}

interface AuthContextValue {
  isLoggedIn: boolean;
  hydrated: boolean;
  isAdmin: boolean;
  profile: UserProfile;
  profileHydrated: boolean;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Session + profile + admin flag are fetched once here and shared via
// context, so Header/Footer/ProfileView/etc. read one auth state instead of
// each independently calling supabase.auth.getUser()/getSession() and
// querying `profiles`. Deliberately client-only (no server-seeded initial
// data) so the root layout stays static and doesn't force every route in the
// app to render dynamically just to know the current user.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [profileHydrated, setProfileHydrated] = useState(false);

  const refetchProfile = useCallback(async (id: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, job_title, team, website, role")
      .eq("id", id)
      .single();
    setIsAdmin(data?.role === "admin");
    setProfile(mapProfileRow(data));
    setProfileHydrated(true);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const id = data.session?.user?.id ?? null;
      setUserId(id);
      setHydrated(true);
      if (id) {
        refetchProfile(id);
      } else {
        setProfileHydrated(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const newUserId = newSession?.user?.id ?? null;
      setUserId(newUserId);
      setHydrated(true);
      if (newUserId) {
        refetchProfile(newUserId);
      } else {
        setIsAdmin(false);
        setProfile(EMPTY_PROFILE);
        setProfileHydrated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [refetchProfile]);

  async function updateProfile(patch: Partial<UserProfile>) {
    if (!userId) return;
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
      .eq("id", userId);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userId,
        hydrated,
        isAdmin,
        profile,
        profileHydrated,
        logout: async () => {
          await supabase.auth.signOut();
        },
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return ctx;
}
