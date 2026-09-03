import { cn } from "@/lib/utils";

/*
 * Alpha Infra mark, per the 2026-09-02 brand guide: a single hand-drawn
 * checkmark in Signal Red, reading as "reviewed/approved." Path and viewBox
 * taken directly from the brand guide artboards, not redrawn.
 *
 * `tone="mono"` draws it in currentColor. The nav uses that while it sits
 * over an Ink section so the homepage peak's drawn tick stays the one red
 * element in the viewport.
 */
export function BrandMark({
  className,
  tone = "red",
}: {
  className?: string;
  tone?: "red" | "mono";
}) {
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
        stroke={tone === "red" ? "#C4283C" : "currentColor"}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-[stroke] duration-200"
      />
    </svg>
  );
}
