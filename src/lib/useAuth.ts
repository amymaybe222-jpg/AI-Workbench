"use client";

import { useAuthContext } from "@/components/providers/AuthProvider";

export function useAuth() {
  const { isLoggedIn, hydrated, logout } = useAuthContext();
  return { isLoggedIn, hydrated, logout };
}

export function useIsAdmin() {
  const { isAdmin, hydrated } = useAuthContext();
  return { isAdmin, hydrated };
}
