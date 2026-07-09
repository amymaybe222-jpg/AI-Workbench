import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileView } from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your AI learning profile — assessments completed, certificates earned, and saved prompts.",
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
