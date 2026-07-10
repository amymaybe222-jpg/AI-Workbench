import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "Community";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    <OgTemplate eyebrow="Community" title="Learn from how others are applying AI" />,
    { ...ogSize, fonts }
  );
}
