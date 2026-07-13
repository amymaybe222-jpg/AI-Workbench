"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "./storageKeys";

// Mock session state — this app has no real backend, so "logged in" is a
// local flag only, consistent with every other piece of state in the app
// (quiz results, saved prompts, profile) being localStorage-backed.
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn, hydrated] = useLocalStorage(STORAGE_KEYS.isLoggedIn, false);

  return {
    isLoggedIn,
    hydrated,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
}

// Placeholder until real auth exists. There's no session or role concept yet
// (see the comment above), so this intentionally always returns false —
// admin pages stay restricted for everyone until this is wired up to a real
// admin-role check (e.g. a Supabase Auth session with `users.role === "admin"`).
export function useIsAdmin() {
  const { hydrated } = useAuth();
  return { isAdmin: false, hydrated };
}
