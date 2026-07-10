import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToolPicker } from "@/components/tools/ToolPicker";
import { ToolCatalog } from "@/components/tools/ToolCatalog";

export const metadata: Metadata = {
  title: "Tool Picker",
  description:
    "Describe a task and get a ranked shortlist of the best AI tool for it — Claude, ChatGPT, Copilot, Perplexity, and more.",
};

export default function ToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Tool Picker"
        title="Not sure which AI tool to use? Ask in plain language."
        description="Describe your task and get a reasoned shortlist of the right AI tool."
      />
      <ToolPicker />
      <div className="mt-16">
        <h2 className="mb-1 text-lg font-semibold text-text">Full tool catalog</h2>
        <p className="mb-6 text-sm text-text-muted">Browse every tool covered on this platform.</p>
        <ToolCatalog />
      </div>
    </div>
  );
}
