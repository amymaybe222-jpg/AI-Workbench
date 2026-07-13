import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate, formatOgDate } from "@/lib/og";
import { supabase } from "@/lib/supabase";

export const alt = "Community post";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const { data } = await supabase.from("posts").select("id").not("author", "is", null);
  return (data ?? []).map((post) => ({ id: post.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Posts added through the UI still live in Supabase, but this render can
  // happen at build time — unmatched ids fall back to a generic Community
  // card rather than failing to render.
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={post?.team ?? "Community"}
        title={post?.title ?? "A Community post on AI Workbench"}
        author={post?.author ?? undefined}
        date={post ? formatOgDate(post.created_at) : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
