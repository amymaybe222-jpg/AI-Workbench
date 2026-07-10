import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "Learn AI";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    <OgTemplate eyebrow="Learn AI" title="Understand AI before you rely on it" />,
    { ...ogSize, fonts }
  );
}
