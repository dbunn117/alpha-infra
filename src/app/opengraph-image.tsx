import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";
import { MARK, SIGNAL_RED } from "@/components/brand-mark";

// Required for `output: export` (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The signal mark on Ink: paper-white trace, red circle (paths from brand-mark.tsx).
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="115" height="72" viewBox="${MARK.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${MARK.trace}" stroke="#f5f1e8" stroke-width="10"/><path d="${MARK.circle}" stroke="${SIGNAL_RED}" stroke-width="7"/></svg>`;
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
          <img src={markUri} width={115} height={72} alt="" />
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
            {hero.headline}
          </div>
          <div style={{ fontSize: 32, color: "#a39c8f" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
