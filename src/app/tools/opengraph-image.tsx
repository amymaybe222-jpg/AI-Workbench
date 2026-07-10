import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";

export const alt = "Tool Picker";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    <OgTemplate eyebrow="Tool Picker" title="Not sure which AI tool to use? Ask in plain language." />,
    { ...ogSize, fonts }
  );
}
