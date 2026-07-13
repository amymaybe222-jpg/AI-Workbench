import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { buildMetaDescription } from "@/lib/seo";
import { loadCommunityPostsInitialData } from "@/lib/community/loadCommunityPosts";

const PostDetail = dynamic(() => import("@/components/community/PostDetail").then((m) => m.PostDetail));

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
    const description = buildMetaDescription(
      "Read what an AI Workbench community member built or learned with AI.",
      "Browse more stories and add your own feedback in the AI Workbench community."
    );
    return {
      title: "Community post",
      description,
      openGraph: {
        title: "Community post — AI Workbench",
        description,
        type: "website",
        siteName: "AI Workbench",
      },
    };
  }
  const title = post.seo_title ?? post.title;
  const description = buildMetaDescription(
    post.seo_description ?? post.body,
    "Read the full story and add your own feedback in the AI Workbench community."
  );
  return {
    title,
    description,
    openGraph: {
      title: `${title} — AI Workbench`,
      description,
      type: "article",
      siteName: "AI Workbench",
    },
  };
}

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialData = await loadCommunityPostsInitialData();
  return <PostDetail postId={id} initialData={initialData} />;
}
