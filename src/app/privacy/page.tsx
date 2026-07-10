import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AI Workbench handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated 2026." />
      <Card className="space-y-4 text-sm leading-relaxed text-text-muted">
        <p>
          AI Workbench stores your profile, saved prompts, assessment results, and community activity locally in
          your browser (via <code className="font-mono text-xs">localStorage</code>). This data is not transmitted
          to a server or shared with third parties — it stays on your device and is cleared if you clear your
          browser storage.
        </p>
        <p>
          Sign-in on this platform does not collect or verify a real password; it exists to demonstrate the
          authenticated parts of the product. Do not enter real credentials you use elsewhere.
        </p>
        <p>
          If AI Workbench is deployed with real accounts and server-side storage in the future, this policy will be
          updated to reflect exactly what is collected, how long it is retained, and how to request deletion.
        </p>
      </Card>
    </div>
  );
}
