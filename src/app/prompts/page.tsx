import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PromptLibrary } from "@/components/prompts/PromptLibrary";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Categorized, ready-to-use AI prompts for engineering, support, sales, leadership, HR, data, and marketing.",
};

export default function PromptsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Prompt Library"
        title="Real workplace prompts, ready to copy and adapt"
        description="Organized by function so you can find a strong starting point fast — from engineering pull requests to leadership comms."
      />
      <PromptLibrary />
    </div>
  );
}
