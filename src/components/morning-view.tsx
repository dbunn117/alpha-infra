"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  KIND_LABEL,
  MORNING_ITEMS,
  PACE_THRESHOLDS,
  QUOTE_TARGETS,
  type MorningItem,
} from "@/content/morning-view-sample";
import { hero } from "@/content/site";
import { RedPenLoop, RedPenNote } from "@/components/red-pen";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * The morning view: a small, live version of what an Alpha System puts in
 * front of an owner each day. Illustrative data, two rules the visitor can
 * change, and a list that re-ranks with the evidence line under each item.
 * Every change answers with its consequence: how many items now need
 * attention and which ones moved, said once in a status line (and to
 * screen readers) and shown by a brief wash on the rows that moved.
 * Ranking is plain arithmetic in the browser (no model, no network), which
 * mirrors the trust claim on the flagship page: exact work stays exact.
 * Re-ordering animates with a hand-rolled FLIP on transform only; reduced
 * motion skips it.
 */
type Rules = { pace: (typeof PACE_THRESHOLDS)[number]; quote: (typeof QUOTE_TARGETS)[number] };
const DEFAULT_RULES: Rules = { pace: 10, quote: 48 };

type Ranked = { item: MorningItem; score: number; evidence: string; action: string; flagged: boolean };

function assess(item: MorningItem, rules: Rules): Ranked {
  switch (item.kind) {
    case "account": {
      const behind = Math.abs(item.pace ?? 0);
      const flagged = behind >= rules.pace;
      const tierBoost = item.tier === "Diamond" ? 12 : 6;
      return {
        item,
        flagged,
        score: flagged ? 60 + (behind - rules.pace) * 3 + tierBoost : behind * 2,
        evidence: `Invoicing ${behind}% behind last year's pace, rule set at ${rules.pace}% · ${item.tier} account`,
        action: flagged ? "Call to get back on their radar" : "Within the rule, keep watching",
      };
    }
    case "enquiry": {
      const h = item.hoursOpen ?? 0;
      const overdue = h >= rules.quote;
      const near = h >= rules.quote - 12;
      return {
        item,
        flagged: near,
        score: overdue ? 55 + (h - rules.quote) * 0.8 : near ? 42 + (h - (rules.quote - 12)) : h,
        evidence: `Open ${h}h without a quote, target ${rules.quote}h`,
        action: overdue ? "Quote today, past the target" : near ? "Quote before the target passes" : "Inside the target",
      };
    }
    case "tender": {
      const d = item.daysToClose ?? 99;
      const flagged = d <= 10;
      return {
        item,
        flagged,
        score: flagged ? 38 + (10 - d) * 4 : 10,
        evidence: `Matched public tender, closes in ${d} days`,
        action: flagged ? "Decide whether to bid this week" : "Not due yet",
      };
    }
    case "service": {
      const d = item.daysSinceInstall ?? 0;
      const flagged = d >= 30;
      return {
        item,
        flagged,
        score: flagged ? 32 + Math.min(d - 30, 60) / 3 : d / 2,
        evidence: `Install completed ${d} days ago, no service contract`,
        action: flagged ? "Offer the service contract" : "Too early to ask",
      };
    }
  }
}

function rank(rules: Rules) {
  const all = MORNING_ITEMS.map((i) => assess(i, rules));
  const flagged = all.filter((r) => r.flagged).sort((a, b) => b.score - a.score);
  const watching = all.filter((r) => !r.flagged).sort((a, b) => b.score - a.score);
  return { flagged, watching };
}

function Segmented<T extends number>({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div role="radiogroup" aria-label={label} className="inline-flex rounded-lg border border-border bg-surface-1 p-0.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={o === value}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-semibold tabular-nums transition-[background-color,color] duration-150",
              o === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {format(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MorningView({
  className,
  compact = false,
}: {
  className?: string;
  /* homepage: one rule, one evidence line per row, the watching list as a count */
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const [rules, setRules] = React.useState<Rules>(DEFAULT_RULES);
  const [status, setStatus] = React.useState<string>("");
  const [moved, setMoved] = React.useState<ReadonlySet<string>>(() => new Set());
  const [showWatching, setShowWatching] = React.useState(false);
  const { flagged, watching } = React.useMemo(() => rank(rules), [rules]);
  const isDefault = rules.pace === DEFAULT_RULES.pace && rules.quote === DEFAULT_RULES.quote;

  // Apply a rule change and describe its consequence.
  const apply = React.useCallback(
    (next: Rules, reset = false) => {
      const before = rank(rules);
      const after = rank(next);
      const wasFlagged = new Set(before.flagged.map((r) => r.item.id));
      const nowFlagged = new Set(after.flagged.map((r) => r.item.id));
      const entered = after.flagged.filter((r) => !wasFlagged.has(r.item.id)).map((r) => r.item.name);
      const left = before.flagged.filter((r) => !nowFlagged.has(r.item.id)).map((r) => r.item.name);
      const changed = new Set<string>([...entered, ...left].map((n) => MORNING_ITEMS.find((i) => i.name === n)?.id ?? n));
      // rows that changed rank inside the attention list also get the wash
      before.flagged.forEach((r, i) => {
        const j = after.flagged.findIndex((x) => x.item.id === r.item.id);
        if (j !== -1 && j !== i) changed.add(r.item.id);
      });
      const parts = [`${after.flagged.length} of ${MORNING_ITEMS.length} need attention.`];
      if (entered.length) parts.push(`${entered.join(" and ")} now need${entered.length === 1 ? "s" : ""} attention.`);
      if (left.length) parts.push(`${left.join(" and ")} moved to watching.`);
      if (!entered.length && !left.length) parts.push(changed.size ? "Order changed, nothing crossed a rule." : "No change to the list.");
      setStatus(reset ? `Reset to the example's rules. ${parts[0]}` : parts.join(" "));
      setMoved(changed);
      setRules(next);
    },
    [rules]
  );

  React.useEffect(() => {
    if (moved.size === 0) return;
    const t = window.setTimeout(() => setMoved(new Set()), 1500);
    return () => window.clearTimeout(t);
  }, [moved]);

  // FLIP: remember where each row was, then slide it from there after a re-rank.
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
  }, [flagged, watching, reduced]);

  const register = (id: string) => (el: HTMLLIElement | null) => {
    if (el) rows.current.set(id, el);
    else rows.current.delete(id);
  };

  const top = flagged[0];

  return (
    <div className={cn("grain surface surface-raised relative overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-5 py-3">
        <p className="caption">Today · illustrative data</p>
        <p className="text-xs text-muted-foreground">Change the rule. The list answers.</p>
      </div>

      <div className="flex flex-col gap-2 border-b border-border bg-surface-2 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          <Segmented
            label={compact ? "Flag a key account when invoicing runs behind by" : "Flag a key account when invoicing runs behind last year by"}
            options={PACE_THRESHOLDS}
            value={rules.pace}
            onChange={(pace) => apply({ ...rules, pace })}
            format={(v) => `${v}%`}
          />
          {compact ? (
            <button
              type="button"
              onClick={() => apply(DEFAULT_RULES, true)}
              disabled={isDefault}
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline disabled:invisible"
            >
              Reset
            </button>
          ) : null}
        </div>
        {!compact ? (
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
            <Segmented
              label="Quote every enquiry within"
              options={QUOTE_TARGETS}
              value={rules.quote}
              onChange={(quote) => apply({ ...rules, quote })}
              format={(v) => `${v}h`}
            />
            <button
              type="button"
              onClick={() => apply(DEFAULT_RULES, true)}
              disabled={isDefault}
              className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline disabled:invisible"
            >
              Reset example
            </button>
          </div>
        ) : null}
        <p role="status" aria-live="polite" className={cn("text-xs font-medium text-foreground", !status && "sr-only")}>
          {status}
        </p>
      </div>

      <div className="px-5 pb-4 pt-3">
        <p className="mb-1 text-xs font-semibold text-foreground">
          Needs attention <span className="font-normal text-muted-foreground">· {flagged.length} of {MORNING_ITEMS.length}</span>
        </p>
        <ol className="divide-y divide-border">
          {flagged.map((r, i) => (
            <li
              key={r.item.id}
              ref={register(r.item.id)}
              className={cn(
                "relative grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 rounded-md py-2.5",
                moved.has(r.item.id) && "is-moved"
              )}
            >
              {i === 0 ? (
                <RedPenLoop key={`loop-${r.item.id}`} drawn className="-inset-x-1 -inset-y-0.5 h-[calc(100%+0.25rem)] w-[calc(100%+0.5rem)]" strokeWidth={2} />
              ) : null}
              <span className="caption tabular-nums">{i + 1}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-snug">{r.item.name}</p>
                <p className="text-xs leading-snug text-muted-foreground">{compact ? r.evidence.split(" · ")[0] : r.evidence}</p>
                {!compact ? (
                  <p className="mt-0.5 text-xs font-medium leading-snug text-primary">{r.action}</p>
                ) : null}
              </div>
              <span className="caption flex flex-col items-end gap-1">
                {KIND_LABEL[r.item.kind]}
                {i === 0 && top ? (
                  <RedPenNote key={`note-${top.item.id}`} arrow="left" drawn className="mt-1 text-[1.2rem] normal-case tracking-normal">
                    start here
                  </RedPenNote>
                ) : null}
              </span>
            </li>
          ))}
          {flagged.length === 0 ? (
            <li className="py-3 text-sm text-muted-foreground">Nothing crosses the rules today. The rules may be too loose.</li>
          ) : null}
        </ol>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-muted-foreground">
            Watching · {watching.length} within the rules, nothing to do yet
          </p>
          <button
            type="button"
            onClick={() => setShowWatching((v) => !v)}
            aria-expanded={showWatching}
            className={cn("text-xs font-medium text-primary", !compact && "lg:hidden")}
          >
            {showWatching ? "Hide" : "Show"}
          </button>
        </div>
        <ol className={cn("mt-1 divide-y divide-border", !showWatching && (compact ? "hidden" : "hidden lg:block"))}>
          {watching.map((r) => (
            <li
              key={r.item.id}
              ref={register(r.item.id)}
              className={cn(
                "grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 rounded-md py-1.5 text-muted-foreground",
                moved.has(r.item.id) && "is-moved"
              )}
            >
              <span className="caption">·</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{r.item.name}</p>
                <p className="text-[0.7rem] leading-snug">{r.evidence}</p>
              </div>
              <span className="caption">{KIND_LABEL[r.item.kind]}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-border bg-surface-2 px-5 py-2.5">
        <Link href={hero.demoLink.href} className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-primary">
          <span className="link-draw">{hero.demoLink.label}</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
