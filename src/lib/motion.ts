/*
 * Shared motion constants. The site's one easing curve (also --ease-out in
 * globals.css), three durations, and the spring that smooths scroll progress.
 * Only ink-diagram/*, process-rail, chapter-folio, and components/motion/*
 * may import the `motion` package; everything else animates with CSS.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = { fast: 0.15, base: 0.3, slow: 0.6 } as const;

export const SCROLL_SPRING = {
  stiffness: 120,
  damping: 30,
  restDelta: 0.001,
} as const;

/* Inline style helper for the `.rise` load-in: staggers via --rise-delay. */
export function riseDelay(seconds: number): React.CSSProperties {
  return { "--rise-delay": `${seconds}s` } as React.CSSProperties;
}
