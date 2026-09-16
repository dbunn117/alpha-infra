"use client";

import * as React from "react";
import { RedPenNote } from "@/components/red-pen";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * The market scorecard, live: four signal weights the visitor can change and
 * a ranked list of six illustrative markets that re-sorts as the weights
 * move, with a one-line read for the leader and a status line saying what
 * moved. Fictional markets and invented figures, labelled as such; scoring
 * is a weighted average in the browser. It shows the investment side of the
 * practice without touching any real methodology or data.
 */
type Signal = { key: "jobs" | "population" | "rents" | "supply"; label: string; good: string; bad: string };

const SIGNALS: readonly Signal[] = [
  { key: "jobs", label: "Job growth", good: "strong hiring", bad: "flat hiring" },
  { key: "population", label: "Population growth", good: "people moving in", bad: "population drifting out" },
  { key: "rents", label: "Rent growth", good: "rents rising", bad: "rents soft" },
  { key: "supply", label: "Low new supply", good: "little new supply", bad: "a heavy pipeline of new supply" },
] as const;

/* 0 to 100 per signal; supply is already inverted, so high = little new supply */
const MARKETS: readonly { name: string; s: Record<Signal["key"], number> }[] = [
  { name: "Northshore", s: { jobs: 82, population: 64, rents: 58, supply: 40 } },
  { name: "Riverbend", s: { jobs: 55, population: 78, rents: 72, supply: 62 } },
  { name: "Eastgate", s: { jobs: 68, population: 52, rents: 44, supply: 86 } },
  { name: "Pinecrest", s: { jobs: 40, population: 46, rents: 80, supply: 70 } },
  { name: "Harbor City", s: { jobs: 74, population: 60, rents: 66, supply: 30 } },
  { name: "Midvale", s: { jobs: 48, population: 84, rents: 50, supply: 56 } },
];

type Weights = Record<Signal["key"], number>;
const DEFAULT: Weights = { jobs: 2, population: 2, rents: 2, supply: 1 };
const STEPS = [
  { v: 0, label: "Off" },
  { v: 1, label: "Low" },
  { v: 2, label: "Mid" },
  { v: 3, label: "High" },
] as const;

function score(m: (typeof MARKETS)[number], w: Weights) {
  const total = SIGNALS.reduce((a, s) => a + w[s.key], 0) || 1;
  return SIGNALS.reduce((a, s) => a + w[s.key] * m.s[s.key], 0) / total;
}

function rankAll(w: Weights) {
  return MARKETS.map((m) => ({ m, score: score(m, w) })).sort((a, b) => b.score - a.score);
}

function read(m: (typeof MARKETS)[number], w: Weights) {
  const weighted = SIGNALS.filter((s) => w[s.key] > 0);
  if (weighted.length === 0) return "Turn on at least one signal to rank the markets.";
  const best = [...weighted].sort((a, b) => m.s[b.key] * w[b.key] - m.s[a.key] * w[a.key])[0];
  const worst = [...weighted].sort((a, b) => m.s[a.key] - m.s[b.key])[0];
  return best.key === worst.key
    ? `${m.name} leads on ${best.good}.`
    : `${m.name} leads on ${best.good}, held back by ${worst.bad}.`;
}

export function MarketScorecard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [w, setW] = React.useState<Weights>(DEFAULT);
  const [status, setStatus] = React.useState("");
  const [moved, setMoved] = React.useState<ReadonlySet<string>>(() => new Set());
  const ranked = React.useMemo(() => rankAll(w), [w]);
  const isDefault = SIGNALS.every((s) => w[s.key] === DEFAULT[s.key]);

  const apply = (next: Weights, reset = false) => {
    const before = rankAll(w);
    const after = rankAll(next);
    const changed = new Set<string>();
    before.forEach((r, i) => {
      const j = after.findIndex((x) => x.m.name === r.m.name);
      if (j !== i) changed.add(r.m.name);
    });
    const leaderChanged = before[0]?.m.name !== after[0]?.m.name;
    const msg = reset
      ? "Reset to the example's weights."
      : leaderChanged
        ? `${after[0].m.name} now ranks first, ahead of ${before[0].m.name}.`
        : changed.size
          ? `${after[0].m.name} still first; ${changed.size} markets changed place.`
          : "No change to the ranking.";
    setStatus(msg);
    setMoved(changed);
    setW(next);
  };

  React.useEffect(() => {
    if (moved.size === 0) return;
    const t = window.setTimeout(() => setMoved(new Set()), 1500);
    return () => window.clearTimeout(t);
  }, [moved]);

  const rows = React.useRef(new Map<string, HTMLLIElement>());
  const prev = React.useRef(new Map<string, number>());
  React.useLayoutEffect(() => {
    const next = new Map<string, number>();
    rows.current.forEach((el, id) => next.set(id, el.getBoundingClientRect().top));
    if (!reduced) {
      rows.current.forEach((el, id) => {
        const before = prev.current.get(id);
        const after = next.get(id);
        if (before === undefined || after === undefined || before === after) return;
        el.style.transition = "none";
        el.style.transform = `translateY(${before - after}px)`;
        void el.offsetHeight;
        el.style.transition = "transform 0.45s var(--ease-out)";
        el.style.transform = "";
      });
    }
    prev.current = next;
  }, [ranked, reduced]);

  const leader = ranked[0];

  return (
    <div className={cn("text-foreground", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="caption">Illustrative markets</p>
        <button
          type="button"
          onClick={() => apply(DEFAULT, true)}
          disabled={isDefault}
          className="text-[0.7rem] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline disabled:invisible"
        >
          Reset
        </button>
      </div>

      <div className="mt-2 grid gap-y-1">
        {SIGNALS.map((s) => (
          <div key={s.key} className="flex items-center justify-between gap-2">
            <span className="text-[0.7rem] font-medium text-muted-foreground">{s.label}</span>
            <div role="radiogroup" aria-label={`${s.label} weight`} className="inline-flex shrink-0 rounded-md border border-border bg-surface-1 p-0.5">
              {STEPS.map((st) => (
                <button
                  key={st.v}
                  type="button"
                  role="radio"
                  aria-checked={w[s.key] === st.v}
                  onClick={() => apply({ ...w, [s.key]: st.v })}
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[0.65rem] font-semibold transition-[background-color,color] duration-150",
                    w[s.key] === st.v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p role="status" aria-live="polite" className={cn("mt-2 text-[0.75rem] font-medium", !status && "sr-only")}>
        {status}
      </p>

      <ol className="mt-2 divide-y divide-border border-t border-border">
        {ranked.map(({ m, score: sc }, i) => (
          <li
            key={m.name}
            ref={(el) => { if (el) rows.current.set(m.name, el); else rows.current.delete(m.name); }}
            className={cn(
              "grid grid-cols-[1.25rem_5.5rem_minmax(0,1fr)_2rem] items-center gap-x-2 rounded py-1.5",
              moved.has(m.name) && "is-moved"
            )}
          >
            <span className="caption tabular-nums">{i + 1}</span>
            <span className={cn("truncate text-xs", i === 0 ? "font-semibold" : "font-medium text-muted-foreground")}>{m.name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-500 ease-out-soft"
                style={{ width: `${Math.round(sc)}%` }}
              />
            </span>
            <span className="caption text-right tabular-nums">{Math.round(sc)}</span>
          </li>
        ))}
      </ol>

      <div className="mt-2 flex items-start justify-between gap-3">
        <p className="text-[0.75rem] leading-snug text-muted-foreground">{read(leader.m, w)}</p>
        <RedPenNote key={leader.m.name} drawn className="shrink-0 text-[1.1rem]">
          top read
        </RedPenNote>
      </div>
    </div>
  );
}
