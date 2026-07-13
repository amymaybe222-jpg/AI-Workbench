import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { loadCommunityPostsInitialData } from "@/lib/community/loadCommunityPosts";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the AI Workbench community to see how colleagues across the company are applying AI at work, share your own wins and prompts, and get peer feedback.",
  openGraph: {
    title: "Community — AI Workbench",
    description:
      "Join the AI Workbench community to see how colleagues across the company are applying AI at work, share your own wins and prompts, and get peer feedback.",
    type: "website",
    siteName: "AI Workbench",
  },
};

export default async function CommunityPage() {
  const initialData = await loadCommunityPostsInitialData();

  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="Learn from how others are applying AI"
        description="Share what you built or learned, and get practical feedback from peers across the company."
      />
      <CommunityFeed initialData={initialData} />
    </div>
  );
}
