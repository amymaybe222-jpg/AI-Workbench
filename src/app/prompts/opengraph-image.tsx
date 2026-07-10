import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "Prompt Library";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    <OgTemplate eyebrow="Prompt Library" title="Real workplace prompts, ready to copy and adapt" />,
    { ...ogSize, fonts }
  );
}
