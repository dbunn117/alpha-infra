import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Compass mark (dark variant) as a data URI, for the OG lockup.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="30" stroke="#3A466E" stroke-width="2.5"/><polygon points="48,20 55,48 41,48" fill="#38BDF8"/><polygon points="48,76 55,48 41,48" fill="#3A466E"/><circle cx="48" cy="48" r="4" fill="#070c1f" stroke="#38BDF8" stroke-width="1.5"/></svg>`;
const markUri = `data:image/svg+xml,${encodeURIComponent(markSvg)}`;

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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markUri} width={72} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#f5f7ff" }}>
            North<span style={{ color: "#60a5fa" }}>&nbsp;Alpha</span>
          </div>
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
