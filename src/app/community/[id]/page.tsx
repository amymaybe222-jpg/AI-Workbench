import type { Metadata } from "next";
import { PostDetail } from "@/components/community/PostDetail";
import { communityPosts } from "@/data/community";

export function generateStaticParams() {
  return communityPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Only seed posts are known server-side — posts a user adds live in their own
  // browser's localStorage and never reach the server, so unmatched ids fall
  // back to generic Community copy instead of an empty/broken title.
  const post = communityPosts.find((p) => p.id === id);
  if (!post) {
    return {
      title: "Community post",
      description: "Read what an AI Workbench community member built or learned with AI, and add your own feedback.",
    };
  }
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.body.slice(0, 155),
  };
}

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail postId={id} />;
}
