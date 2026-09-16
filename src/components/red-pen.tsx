import type { CSSProperties } from "react";
import { SIGNAL_RED } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

/*
 * The red pen: the site's one handwritten accent, always Signal Red, rationed
 * to one mark per section. Three gestures:
 *  - RedPenNote: a short handwritten margin note (font-hand), optional arrow.
 *  - RedPenLoop: a hand-drawn loop around whatever it is placed over. The
 *    host must be `relative`; the loop is absolutely positioned and drawn
 *    with data-stroke, so it draws when its Reveal fires (or immediately with
 *    `drawn`).
 *  - RedPenUnderline: a single wavering underline beneath an inline phrase.
 * Every stroke uses currentColor set to Signal Red, never a theme token, so
 * the hand stays the same red on Paper and on Ink.
 */

function delay(s?: number): CSSProperties | undefined {
  return s ? ({ "--draw-delay": `${s}s` } as CSSProperties) : undefined;
}

export function RedPenNote({
  children,
  arrow = "none",
  className,
  drawn = false,
}: {
  children: React.ReactNode;
  /* a short arrow beside the note, pointing toward the thing it annotates */
  arrow?: "none" | "up" | "left" | "down-left";
  className?: string;
  drawn?: boolean;
}) {
  const arrows: Record<Exclude<typeof arrow, "none">, { d: string; head: string; box: string; cls: string }> = {
    up: { d: "M12,44 C10,32 14,20 22,8", head: "M14,14 L22,7 L28,16", box: "0 0 40 48", cls: "h-10 w-8" },
    left: { d: "M46,12 C34,8 20,10 6,14", head: "M14,6 L5,14 L14,22", box: "0 0 48 24", cls: "h-5 w-10" },
    "down-left": { d: "M44,6 C34,14 20,26 10,40", head: "M8,30 L9,42 L21,40", box: "0 0 48 48", cls: "h-10 w-10" },
  };
  const a = arrow === "none" ? null : arrows[arrow];
  return (
    <span
      className={cn("inline-flex items-start gap-1.5 font-hand text-[1.35rem] leading-tight", drawn && "is-drawn", className)}
      style={{ color: SIGNAL_RED }}
    >
      {a && arrow === "left" ? (
        <svg viewBox={a.box} className={cn("mt-1 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]", a.cls)} strokeWidth={1.75} aria-hidden>
          <path d={a.d} pathLength={1} data-stroke />
          <path d={a.head} pathLength={1} data-stroke style={delay(0.35)} />
        </svg>
      ) : null}
      <span data-fade="">{children}</span>
      {a && arrow !== "left" ? (
        <svg viewBox={a.box} className={cn("shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]", a.cls)} strokeWidth={1.75} aria-hidden>
          <path d={a.d} pathLength={1} data-stroke style={delay(0.2)} />
          <path d={a.head} pathLength={1} data-stroke style={delay(0.55)} />
        </svg>
      ) : null}
    </span>
  );
}

export function RedPenLoop({
  className,
  drawn = false,
  delayS,
  strokeWidth = 2.25,
}: {
  className?: string;
  drawn?: boolean;
  delayS?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 64"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] fill-none [stroke-linecap:round] [stroke-linejoin:round]",
        drawn && "is-drawn",
        className
      )}
      style={{ color: SIGNAL_RED }}
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {/* one loop, overshooting its start along the first stroke */}
      <path
        d="M372,10 C300,-4 60,-2 22,20 C-8,40 40,62 200,60 C340,58 400,44 386,26 C380,16 356,10 336,10"
        pathLength={1}
        data-stroke
        style={delay(delayS)}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function RedPenUnderline({
  children,
  className,
  drawn = false,
  delayS,
}: {
  children: React.ReactNode;
  className?: string;
  drawn?: boolean;
  delayS?: number;
}) {
  return (
    <span className={cn("relative inline-block", drawn && "is-drawn", className)}>
      {children}
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] left-[-0.1em] h-[0.32em] w-[calc(100%+0.2em)] fill-none [stroke-linecap:round]"
        style={{ color: SIGNAL_RED }}
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path d="M2,8 C40,3 80,10 120,6 S180,3 198,7" pathLength={1} data-stroke style={delay(delayS)} vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
