import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * The one chip that marks a live moment. Filled Ink Blue so it reads as a
 * control rather than a label, with a pointer glyph so the eye knows the
 * thing beside it can be touched. Reader feedback (2026-09-23): the old
 * outlined version "just looks like text".
 */
export function InteractiveChip({ verb = "try it", className }: { verb?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[0.7rem] font-semibold leading-none text-primary-foreground",
        className
      )}
    >
      <MousePointerClick className="size-3" aria-hidden />
      Interactive · {verb}
    </span>
  );
}
