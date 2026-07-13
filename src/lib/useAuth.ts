"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setHydrated(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setHydrated(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    isLoggedIn: !!session,
    hydrated,
    logout: () => supabase.auth.signOut(),
  };
}

export function useIsAdmin() {
  const { isLoggedIn, hydrated: authHydrated } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleHydrated, setRoleHydrated] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;

    if (!isLoggedIn) {
      setIsAdmin(false);
      setRoleHydrated(true);
      return;
    }

    let cancelled = false;
    setRoleHydrated(false);

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        if (!cancelled) {
          setIsAdmin(false);
          setRoleHydrated(true);
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (!cancelled) {
        setIsAdmin(profile?.role === "admin");
        setRoleHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [authHydrated, isLoggedIn]);

  return { isAdmin, hydrated: authHydrated && roleHydrated };
}
