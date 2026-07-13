import type { Metadata } from "next";
import { PostDetail } from "@/components/community/PostDetail";
import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  const { data } = await supabase.from("posts").select("id").not("author", "is", null);
  return (data ?? []).map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Only seed/DB posts are known server-side — posts a user adds through the
  // UI are written straight to Supabase too, but this metadata call happens
  // at build/request time and unmatched ids fall back to generic Community
  // copy instead of an empty/broken title.
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!post) {
    return {
      title: "Community post",
      description: "Read what an AI Workbench community member built or learned with AI, and add your own feedback.",
    };
  }
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.body.slice(0, 155),
  };
}

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail postId={id} />;
}
