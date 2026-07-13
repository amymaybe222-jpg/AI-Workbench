import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdminGate } from "@/components/admin/AdminGate";

const PromptAdmin = dynamic(() => import("@/components/admin/PromptAdmin").then((m) => m.PromptAdmin));

export const metadata: Metadata = {
  title: "Prompt Admin",
  description:
    "Manage the AI Workbench prompt library as an admin — add, edit, and remove the ready-to-use prompts made available to every professional on the platform.",
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
