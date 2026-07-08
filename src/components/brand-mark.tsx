import { cn } from "@/lib/utils";

/*
 * North Alpha compass-needle mark (from brand/north-alpha-mark.svg), inlined so
 * it adapts to the theme: bright "north" half + muted "south" half. Colors match
 * the provided dark/light brand variants and switch on the `.dark` class.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      role="img"
      aria-label="North Alpha"
      className={cn("shrink-0", className)}
    >
      <circle
        cx="48"
        cy="48"
        r="30"
        strokeWidth="2.5"
        className="stroke-[#94A3B8] dark:stroke-[#3A466E]"
      />
      {/* North (bright) */}
      <polygon
        points="48,20 55,48 41,48"
        className="fill-[#2563EB] dark:fill-[#38BDF8]"
      />
      {/* South (muted) */}
      <polygon
        points="48,76 55,48 41,48"
        className="fill-[#94A3B8] dark:fill-[#3A466E]"
      />
      <circle
        cx="48"
        cy="48"
        r="4"
        strokeWidth="1.5"
        className="fill-background stroke-[#2563EB] dark:stroke-[#38BDF8]"
      />
    </svg>
  );
}
