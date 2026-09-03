import { cn } from "@/lib/utils";

/*
 * Small ink marks that draw themselves when their Reveal wrapper becomes
 * visible (see `.js [data-stroke]` in globals.css). pathLength="1" lets the
 * CSS dash trick work regardless of the path's real length.
 */
const BASE =
  "size-5 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";

export function DrawnTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} className={cn(BASE, className)} aria-hidden>
      <path d="M4,12.5 L9.5,18 L20,6.5" pathLength={1} data-stroke />
    </svg>
  );
}

export function DrawnCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} className={cn(BASE, className)} aria-hidden>
      <path d="M6,6 L18,18.5" pathLength={1} data-stroke />
      <path
        d="M18,6 L6,18.5"
        pathLength={1}
        data-stroke
        style={{ "--draw-delay": "0.25s" } as React.CSSProperties}
      />
    </svg>
  );
}
