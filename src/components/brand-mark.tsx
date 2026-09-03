import { cn } from "@/lib/utils";

/*
 * Alpha Infra mark, per the 2026-09-02 brand guide: a single hand-drawn
 * checkmark in Signal Red, reading as "reviewed/approved." One tick only,
 * never recolored or duplicated. Path and viewBox taken directly from the
 * brand guide artboards, not redrawn.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="Alpha Infra"
      className={cn("shrink-0", className)}
    >
      <path
        d="M18,64 L46,92 L102,22"
        stroke="#C4283C"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
