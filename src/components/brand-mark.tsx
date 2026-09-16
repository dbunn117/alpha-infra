import { cn } from "@/lib/utils";

/*
 * Alpha Infra mark (adopted 2026-09-16): a precise ink trace of the
 * business's activity, and one hand-drawn red circle around the point that
 * matters, with the line continuing past it. Read: the opportunity,
 * identified in time. The ink trace is currentColor so it follows the theme;
 * Signal Red is fixed to the circle. The circle alone is the small form
 * (favicon, app icon, anywhere under ~24px), where the trace would turn to
 * mud. These paths are the source of truth; icon.svg and the OG image copy
 * them by hand, so change all three together.
 */
export const SIGNAL_RED = "#C4283C";

export const MARK = {
  viewBox: "0 0 160 100",
  /* activity trace: gentle drift up, the circled point mid-line, never the end */
  trace: "M10,86 L40,58 L60,70 L88,38 L108,50 L150,14",
  /* hand-drawn loop around (88,38): starts top-right, overshoots the start */
  /* the overshoot runs back along the first stroke, the way a pen does,
     rather than curling inward (which reads as a spiral at small sizes) */
  circle: "M98,22 C84,14 68,24 68,38 C68,54 84,60 98,54 C110,48 112,34 104,26 C101,23 96,20 90,19",
} as const;

export const MARK_SMALL = {
  viewBox: "0 0 120 120",
  circle: "M86,28 C60,12 22,28 18,58 C14,88 42,112 74,106 C104,100 116,64 100,42 C96,36 90,30 82,27",
  dot: { cx: 60, cy: 66, r: 8 },
} as const;

export function BrandMark({
  className,
  variant = "full",
}: {
  className?: string;
  /* "full": trace + circle (lockups, hero). "circle": the small form. */
  variant?: "full" | "circle";
}) {
  if (variant === "circle") {
    return (
      <svg
        viewBox={MARK_SMALL.viewBox}
        fill="none"
        role="img"
        aria-label="Alpha Infra"
        className={cn("shrink-0", className)}
      >
        <circle cx={MARK_SMALL.dot.cx} cy={MARK_SMALL.dot.cy} r={MARK_SMALL.dot.r} fill="currentColor" />
        <path
          d={MARK_SMALL.circle}
          stroke={SIGNAL_RED}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox={MARK.viewBox}
      fill="none"
      role="img"
      aria-label="Alpha Infra"
      className={cn("shrink-0", className)}
    >
      <path
        d={MARK.trace}
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={MARK.circle}
        stroke={SIGNAL_RED}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
