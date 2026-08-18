"use client";

import * as React from "react";
import { Building2, Users, Info } from "lucide-react";
import {
  MARKETS,
  METRICS,
  marketMetric,
  marketTotalSf,
  marketAvgRent,
  marketAvgOccupancy,
  type MetricKey,
  type Market,
} from "@/content/portfolio-sample";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const VB_W = 800;
const VB_H = 460;
const PAD_X = 60;
const PAD_Y = 50;
const MIN_R = 12;
const MAX_R = 46;

function fmtSf(thousands: number): string {
  return thousands >= 1000
    ? `${(thousands / 1000).toFixed(2)}M sf`
    : `${Math.round(thousands)}K sf`;
}
function fmtRent(v: number): string {
  return `$${v.toFixed(0)}/sf`;
}
function fmtOcc(v: number): string {
  return `${Math.round(v * 100)}%`;
}
function fmtMetric(m: Market, key: MetricKey): string {
  if (key === "sf") return fmtSf(marketTotalSf(m));
  if (key === "rentPsf") return fmtRent(marketAvgRent(m));
  return fmtOcc(marketAvgOccupancy(m));
}

export function AssetMapDemo() {
  const [metric, setMetric] = React.useState<MetricKey>("sf");
  const [selectedId, setSelectedId] = React.useState<string>("nyc");

  const { min, max } = React.useMemo(() => {
    const vals = MARKETS.map((m) => marketMetric(m, metric));
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [metric]);

  const selected = MARKETS.find((m) => m.id === selectedId) ?? MARKETS[0];

  const radiusFor = (m: Market) => {
    const v = marketMetric(m, metric);
    const norm = max === min ? 0.5 : (v - min) / (max - min);
    return MIN_R + norm * (MAX_R - MIN_R);
  };
  const opacityFor = (m: Market) => {
    const v = marketMetric(m, metric);
    const norm = max === min ? 0.5 : (v - min) / (max - min);
    return 0.28 + norm * 0.5;
  };

  const px = (x: number) => PAD_X + x * (VB_W - 2 * PAD_X);
  const py = (y: number) => PAD_Y + y * (VB_H - 2 * PAD_Y);

  // Sort markets so smaller bubbles render on top (clickable).
  const drawOrder = [...MARKETS].sort(
    (a, b) => radiusFor(b) - radiusFor(a)
  );

  const activeMetricLabel =
    METRICS.find((mm) => mm.key === metric)?.label ?? "";

  return (
    <section id="asset-map" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Interactive demo"
          heading="A taste of what I build: a live portfolio map."
          intro="This is a working recreation of a real-estate Asset Map dashboard I built — switch the metric to resize the market bubbles, and click any market to drill into its assets and tenants."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          {/* Map panel */}
          <div className="surface p-4 sm:p-6">
            {/* Metric toggle */}
            <div
              className="inline-flex rounded-xl border border-border bg-secondary/50 p-1"
              role="group"
              aria-label="Size markets by metric"
            >
              {METRICS.map((mm) => (
                <button
                  key={mm.key}
                  type="button"
                  onClick={() => setMetric(mm.key)}
                  aria-pressed={metric === mm.key}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    metric === mm.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mm.label}
                </button>
              ))}
            </div>

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="mt-4 h-auto w-full"
              role="img"
              aria-label={`U.S. market map, bubble size = ${activeMetricLabel}`}
            >
              {/* faint grid */}
              <defs>
                <pattern id="amgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width={VB_W}
                height={VB_H}
                fill="url(#amgrid)"
                opacity="0.5"
              />
              {/* region hints */}
              {["West", "Central", "East"].map((label, i) => (
                <text
                  key={label}
                  x={PAD_X + (i + 0.5) * ((VB_W - 2 * PAD_X) / 3)}
                  y={VB_H - 14}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ fontSize: 12, opacity: 0.5 }}
                >
                  {label}
                </text>
              ))}

              {drawOrder.map((m) => {
                const cx = px(m.x);
                const cy = py(m.y);
                const r = radiusFor(m);
                const isSel = m.id === selectedId;
                return (
                  <g
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${m.name}: ${fmtMetric(m, metric)}. ${m.assets.length} asset${m.assets.length > 1 ? "s" : ""}.`}
                    aria-pressed={isSel}
                    onClick={() => setSelectedId(m.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(m.id);
                      }
                    }}
                    className="cursor-pointer outline-none [&:focus-visible_circle.hit]:stroke-ring"
                  >
                    {isSel && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 6}
                        fill="none"
                        stroke="var(--color-accent-bright)"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        opacity="0.8"
                      />
                    )}
                    <circle
                      className="hit transition-all"
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="var(--color-accent-bright)"
                      fillOpacity={opacityFor(m)}
                      stroke="var(--color-accent-bright)"
                      strokeWidth={isSel ? 2.5 : 1.5}
                    />
                    <text
                      x={cx}
                      y={cy - r - 6}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 13, fontWeight: 600 }}
                    >
                      {m.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="size-3.5" aria-hidden />
              Illustrative sample data — not a real portfolio. Bubble size ={" "}
              {activeMetricLabel.toLowerCase()}.
            </p>
          </div>

          {/* Detail panel */}
          <div className="surface flex flex-col p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Market detail
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{selected.name}</h3>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniStat label="Total SF" value={fmtSf(marketTotalSf(selected))} />
              <MiniStat label="Avg rent" value={fmtRent(marketAvgRent(selected))} />
              <MiniStat label="Occupancy" value={fmtOcc(marketAvgOccupancy(selected))} />
            </div>

            <div className="mt-5 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Assets ({selected.assets.length})
              </p>
              {selected.assets.map((a) => {
                const maxSf = Math.max(...selected.assets.map((x) => x.sf));
                return (
                  <div
                    key={a.name}
                    className="rounded-xl border border-border bg-secondary/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="size-4 text-accent-bright" aria-hidden />
                        <span className="font-medium">{a.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {fmtOcc(a.occupancy)} occ.
                      </span>
                    </div>
                    {/* SF bar */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-accent-bright"
                        style={{ width: `${(a.sf / maxSf) * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{fmtSf(a.sf)}</span>
                      <span>{fmtRent(a.rentPsf)}</span>
                      <span>Mgr: {a.manager}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="size-3.5" aria-hidden />
                      {a.tenants.join(" · ")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3">
      <p className="stat-number text-lg font-semibold leading-none">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
