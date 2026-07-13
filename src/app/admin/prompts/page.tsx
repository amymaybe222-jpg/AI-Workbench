import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PromptAdmin } from "@/components/admin/PromptAdmin";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata: Metadata = {
  title: "Admin · Prompts",
  robots: { index: false, follow: false },
};

export default function AdminPromptsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Manage prompts"
        description="Create, edit, and delete Prompt Library entries."
      />
      <AdminGate>
        <PromptAdmin />
      </AdminGate>
    </div>
  );
}
