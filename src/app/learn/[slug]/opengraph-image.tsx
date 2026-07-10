import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";
import { learnTopics, getLearnTopic } from "@/data/learn";

export const alt = "Learn AI";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return learnTopics.map((topic) => ({ slug: topic.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getLearnTopic(slug);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={topic?.category ?? "Learn AI"}
        title={topic?.title ?? "Learn AI"}
        date={topic ? `${topic.readTime} read` : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
