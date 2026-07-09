import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";

export const metadata: Metadata = {
  title: "Community",
  description: "See how colleagues are applying AI day to day, and share your own work for feedback.",
};

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="Learn from how others are applying AI"
        description="Share what you built or learned, and get practical feedback from peers across the company."
      />
      <CommunityFeed />
    </div>
  );
}
