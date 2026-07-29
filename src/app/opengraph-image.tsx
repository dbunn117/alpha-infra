import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Alpha Infra mark (dark variant) as a data URI, for the OG lockup:
// an alpha peak rising from foundation layers.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 96 96" fill="none"><polygon points="48,16 76,56 20,56" fill="#38BDF8"/><polygon points="48,40 58,56 38,56" fill="#070c1f"/><rect x="20" y="64" width="56" height="7" rx="3.5" fill="#3A466E"/><rect x="30" y="77" width="36" height="7" rx="3.5" fill="#3A466E" opacity="0.7"/></svg>`;
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
            Alpha<span style={{ color: "#60a5fa" }}>&nbsp;Infra</span>
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
