import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdminGate } from "@/components/admin/AdminGate";

const UserAdmin = dynamic(() => import("@/components/admin/UserAdmin").then((m) => m.UserAdmin));

export const metadata: Metadata = {
  title: "Admin · Company details",
  robots: { index: false, follow: false },
};

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Company details"
        description="See who has access to AI Workbench and manage their role."
      />
      <AdminGate>
        <UserAdmin />
      </AdminGate>
    </div>
  );
}
