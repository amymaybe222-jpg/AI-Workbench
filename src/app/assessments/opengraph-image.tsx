import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "Assessments";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgTemplate eyebrow="Assessments" title="Test your understanding" />, {
    ...ogSize,
    fonts,
  });
}
