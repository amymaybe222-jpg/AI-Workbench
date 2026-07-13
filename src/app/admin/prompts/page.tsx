import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdminGate } from "@/components/admin/AdminGate";

const PromptAdmin = dynamic(() => import("@/components/admin/PromptAdmin").then((m) => m.PromptAdmin));

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
