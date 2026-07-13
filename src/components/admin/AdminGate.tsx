"use client";

import { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useIsAdmin } from "@/lib/useAuth";

export function AdminGate({ children }: { children: ReactNode }) {
  const { isAdmin, hydrated } = useIsAdmin();

  if (!hydrated) return null;

  if (!isAdmin) {
    return (
      <Card className="flex flex-col items-center gap-3 py-14 text-center">
        <ShieldAlert className="h-8 w-8 text-text-muted" aria-hidden="true" />
        <p className="text-sm font-medium text-text">Restricted page</p>
        <p className="max-w-sm text-sm text-text-muted">
          This page is only available to admins.
        </p>
      </Card>
    );
  }

  return <>{children}</>;
}
