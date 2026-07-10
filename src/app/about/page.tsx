import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Workbench helps professionals learn AI, pick the right AI tools, use ready-made prompts, and track progress with assessments and certificates.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="About"
        title="Practical AI skills for the modern workplace"
        description="AI Workbench is built for people who need AI to work in their actual job, not just in theory."
      />
      <Card className="space-y-4 text-sm leading-relaxed text-text-muted">
        <p>
          AI Workbench helps professionals learn core AI concepts, choose the right tool for a task, use ready-made
          prompts, and track their growth with scored assessments and certificates.
        </p>
        <p>
          Rather than a generic overview of generative AI, the platform focuses on applied skills: understanding how
          the tools your team already uses actually work, picking the right one for a given task, and proving that
          understanding with short, scored assessments.
        </p>
        <p>
          Everything you do here — assessments completed, certificates earned, prompts saved — builds into a
          personal profile you can point to as evidence of hands-on AI experience.
        </p>
      </Card>
    </div>
  );
}
