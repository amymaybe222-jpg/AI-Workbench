import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";
import { supabase } from "@/lib/supabase";
import { LearnTopic } from "@/types";

export const alt = "Learn AI";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const { data } = await supabase.from("learn_topics").select("slug");
  return (data ?? []).map((topic) => ({ slug: topic.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabase.from("learn_topics").select("*").eq("slug", slug).maybeSingle();
  const topic = data as LearnTopic | null;
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={topic?.category ?? "Learn AI"}
        title={topic?.title ?? "Learn AI"}
        date={topic ? `${topic.read_time} read` : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
