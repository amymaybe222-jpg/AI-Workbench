import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "AI Workbench — Learn, Apply, and Track AI at Work";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="For professionals who use AI at work"
        title="Understand AI. Apply it well. Prove your progress."
      />
    ),
    { ...ogSize, fonts }
  );
}
