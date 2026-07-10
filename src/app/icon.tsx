import { ImageResponse } from "next/og";

// Generates the browser tab favicon at build time. Matches the "</>" mark
// and violet-to-blue gradient used in the live Logo component.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "linear-gradient(135deg, #6d5df5 0%, #0ea5e9 100%)",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        {"</>"}
      </div>
    ),
    { ...size }
  );
}
