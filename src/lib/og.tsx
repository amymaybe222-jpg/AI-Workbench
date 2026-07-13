import type { ReactElement } from "react";

// Shared Open Graph / Twitter card template used by every route's opengraph-image.tsx.
// Kept isolated from the site's Tailwind setup — Satori (the renderer behind next/og's
// ImageResponse) only understands inline style objects and a subset of flexbox CSS.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const COLORS = {
  bg: "#f8f8fc",
  surface: "#ffffff",
  surfaceRaised: "#f2f0fb",
  border: "#e4e1f0",
  text: "#15131f",
  textMuted: "#6b6980",
  primary: "#5b4bd6",
  secondary: "#0369a1",
  accent: "#be185d",
};

// Satori (the renderer behind ImageResponse) requires ttf/otf/woff — it can't read woff2,
// which is all the modern css2 Google Fonts endpoint serves. The legacy v1 "css" endpoint
// (no UA spoofing needed) still serves plain .ttf, so we use that instead.
async function fetchFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}`;
    const css = await fetch(cssUrl).then((res) => res.text());

    const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
    if (!match) return null;

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([fetchFont("Inter", 400), fetchFont("Inter", 700)]);
  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[] = [];
  if (regular) fonts.push({ name: "Inter", data: regular, weight: 400, style: "normal" });
  if (bold) fonts.push({ name: "Inter", data: bold, weight: 700, style: "normal" });
  return fonts;
}

export function formatOgDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

interface OgTemplateProps {
  eyebrow: string;
  title: string;
  author?: string;
  date?: string;
}

export function OgTemplate({ eyebrow, title, author = "AI Workbench", date }: OgTemplateProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.surface} 45%, ${COLORS.surfaceRaised} 100%)`,
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Glow accents, echoing the site's hero background */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -120,
          width: 620,
          height: 620,
          borderRadius: "100%",
          background: `radial-gradient(circle, ${COLORS.primary}33 0%, rgba(0,0,0,0) 70%)`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -180,
          right: -140,
          width: 640,
          height: 640,
          borderRadius: "100%",
          background: `radial-gradient(circle, ${COLORS.secondary}26 0%, rgba(0,0,0,0) 70%)`,
          display: "flex",
        }}
      />

      {/* Top row: brand logo + section eyebrow badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              marginRight: 18,
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              color: COLORS.bg,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
            <span style={{ color: COLORS.primary }}>AI</span>
            <span style={{ color: COLORS.text }}>Workbench</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            borderRadius: 999,
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.primary,
            background: `${COLORS.primary}1f`,
            border: `2px solid ${COLORS.primary}55`,
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          fontSize: title.length > 60 ? 60 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: COLORS.text,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      {/* Footer: author + date */}
      <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: COLORS.textMuted }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "100%",
            marginRight: 16,
            background: `${COLORS.primary}26`,
            color: COLORS.primary,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {author
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>
        <span style={{ color: COLORS.text, fontWeight: 700 }}>{author}</span>
        {date && (
          <>
            <span style={{ margin: "0 14px", color: COLORS.border }}>•</span>
            <span>{date}</span>
          </>
        )}
      </div>
    </div>
  );
}
