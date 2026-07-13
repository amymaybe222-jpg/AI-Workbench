"use client";

import { useIsAdmin } from "@/lib/useAuth";
import { FooterColumn } from "./Footer";

const adminLinks = [
  { href: "/admin/prompts", label: "Manage prompts" },
  { href: "/admin/users", label: "Manage users" },
];

export function AdminFooterColumn() {
  const { isAdmin } = useIsAdmin();
  if (!isAdmin) return null;
  return <FooterColumn title="Admin" links={adminLinks} />;
}
