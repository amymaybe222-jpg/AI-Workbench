import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SettingsForm } from "@/components/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
  description: "Edit your AI Workbench display name, bio, and website link.",
};

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Edit your profile"
        description="Update how you appear across AI Workbench — your display name, a short bio, and a website link."
      />
      <SettingsForm />
    </div>
  );
}
