import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { TeamPhoto } from "@/components/team/TeamPhoto";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the small, close-knit team building AI Workbench — the platform helping professionals learn AI, choose the right tools, and track progress at work.",
  openGraph: {
    title: "Meet the Team — AI Workbench",
    description:
      "Meet the small, close-knit team building AI Workbench — the platform helping professionals learn AI, choose the right tools, and track progress at work.",
    type: "website",
    siteName: "AI Workbench",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="Company"
        title="Meet the team"
        description="The people building AI Workbench."
      />
      <TeamPhoto />
      <Card className="mt-6 space-y-4 text-sm leading-relaxed text-text-muted">
        <p>
          We're a small, close-knit team that's been building AI Workbench together for three years. In that time
          we've shipped, rewritten, and rethought a lot — and we've learned just as much as the people using it
          about what it actually takes to get comfortable with AI at work.
        </p>
        <p>We're glad you joined us.</p>
      </Card>
    </div>
  );
}
