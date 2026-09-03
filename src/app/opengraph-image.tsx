import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Alpha Infra mark, per the brand guide: a single red checkmark on Ink.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 120 120" fill="none"><path d="M18,64 L46,92 L102,22" stroke="#C4283C" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
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
          background: "#14120f",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markUri} width={72} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 500, color: "#f5f1e8" }}>
            alpha infra
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 500,
              color: "#f5f1e8",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Put your people where judgment matters. Let AI handle the rest.
          </div>
          <div style={{ fontSize: 32, color: "#a39c8f" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
