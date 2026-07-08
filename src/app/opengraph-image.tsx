import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(60% 60% at 50% 0%, #12204a 0%, #070c1f 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#f5f7ff" }}>
          North<span style={{ color: "#60a5fa" }}>&nbsp;Alpha</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#f5f7ff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Put your people where judgment matters. Let AI handle the rest.
          </div>
          <div style={{ fontSize: 32, color: "#a9b2cf" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
