import { cn } from "@/lib/utils";

/*
 * Alpha Infra mark: an alpha peak rising from foundation layers — a literal
 * diagram of "AI foundations that drive meaningful growth." Inlined so it
 * adapts to the theme (bright peak, muted foundations).
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      role="img"
      aria-label="Alpha Infra"
      className={cn("shrink-0", className)}
    >
      {/* Peak (alpha / growth) */}
      <polygon
        points="48,16 76,56 20,56"
        className="fill-[#2563EB] dark:fill-[#38BDF8]"
      />
      {/* Notch — makes the peak read as an "A" */}
      <polygon points="48,40 58,56 38,56" className="fill-background" />
      {/* Foundation layers (infra) */}
      <rect
        x="20"
        y="64"
        width="56"
        height="7"
        rx="3.5"
        className="fill-[#94A3B8] dark:fill-[#3A466E]"
      />
      <rect
        x="30"
        y="77"
        width="36"
        height="7"
        rx="3.5"
        className="fill-[#94A3B8] opacity-70 dark:fill-[#3A466E]"
      />
    </svg>
  );
}
