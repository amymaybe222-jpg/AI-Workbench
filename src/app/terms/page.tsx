import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using AI Workbench.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated 2026." />
      <Card className="space-y-4 text-sm leading-relaxed text-text-muted">
        <p>
          AI Workbench is provided for learning and internal training purposes. Content — including quiz questions,
          prompts, and tool comparisons — is offered as general guidance and should not be treated as professional,
          legal, or compliance advice.
        </p>
        <p>
          Certificates issued after passing an assessment reflect completion of that assessment within this
          platform; they are not an accredited or third-party-verified qualification.
        </p>
        <p>
          You're responsible for what you post in the Community section. Don't share confidential, proprietary, or
          personal data you don't have the right to share.
        </p>
      </Card>
    </div>
  );
}
