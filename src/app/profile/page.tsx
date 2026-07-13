import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileView } from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View your AI Workbench profile — a running record of assessments completed, certificates earned, prompts saved, and every community post you have shared.",
  openGraph: {
    title: "Profile — AI Workbench",
    description:
      "View your AI Workbench profile — a running record of assessments completed, certificates earned, prompts saved, and every community post you have shared.",
    type: "website",
    siteName: "AI Workbench",
  },
};

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Your progress, all in one place"
        description="A running record of assessments, certificates, and contributions — your professional AI portfolio."
      />
      <ProfileView />
    </div>
  );
}
