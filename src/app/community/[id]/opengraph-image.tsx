import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate, formatOgDate } from "@/lib/og";
import { communityPosts } from "@/data/community";

export const alt = "Community post";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return communityPosts.map((post) => ({ id: post.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Only the seed posts are known server-side — posts a user adds live in their
  // own browser's localStorage and never reach the server, so they fall back
  // to a generic Community card here rather than failing to render.
  const post = communityPosts.find((p) => p.id === id);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={post?.team ?? "Community"}
        title={post?.title ?? "A Community post on AI Workbench"}
        author={post?.author}
        date={post ? formatOgDate(post.createdAt) : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
