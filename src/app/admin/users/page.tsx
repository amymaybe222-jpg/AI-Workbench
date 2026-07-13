import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { UserAdmin } from "@/components/admin/UserAdmin";
import { AdminGate } from "@/components/admin/AdminGate";

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
