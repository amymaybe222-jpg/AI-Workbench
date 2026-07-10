import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PromptLibrary } from "@/components/prompts/PromptLibrary";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Categorized, ready-to-use AI prompts for engineering, support, sales, leadership, HR, data, and marketing teams.",
};

export default function PromptsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Prompt Library"
        title="Real workplace prompts, ready to copy and adapt"
        description="Ready-to-use prompts organized by team and function."
      />
      <PromptLibrary />
    </div>
  );
}
