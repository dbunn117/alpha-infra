/*
 * Shared motion constants. The site's one easing curve (also --ease-out in
 * globals.css). Only ink-diagram/ink-animation.tsx may import the `motion`
 * package; everything else animates with CSS.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* Inline style helper for the `.rise` load-in: staggers via --rise-delay. */
export function riseDelay(seconds: number): React.CSSProperties {
  return { "--rise-delay": `${seconds}s` } as React.CSSProperties;
}
