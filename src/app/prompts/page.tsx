import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PromptLibrary } from "@/components/prompts/PromptLibrary";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Browse a categorized library of ready-to-use AI prompts for engineering, support, sales, leadership, HR, data, and marketing teams to copy and adapt today.",
  openGraph: {
    title: "Prompt Library — AI Workbench",
    description:
      "Browse a categorized library of ready-to-use AI prompts for engineering, support, sales, leadership, HR, data, and marketing teams to copy and adapt today.",
    type: "website",
    siteName: "AI Workbench",
  },
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
