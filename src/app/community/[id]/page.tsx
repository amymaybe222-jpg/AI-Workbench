import type { Metadata } from "next";
import { PostDetail } from "@/components/community/PostDetail";

export const metadata: Metadata = {
  title: "Community post",
  description: "Read what a colleague built or learned with AI, and add your own feedback.",
};

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail postId={id} />;
}
