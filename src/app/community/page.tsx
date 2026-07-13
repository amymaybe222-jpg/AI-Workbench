import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { loadCommunityPostsInitialData } from "@/lib/community/loadCommunityPosts";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join an AI community of professionals sharing real workplace AI wins, prompts, and peer feedback.",
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
