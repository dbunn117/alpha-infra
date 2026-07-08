import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Styled text wordmark. A compass/needle mark can slot in to the left of the
 * text later (see spec §9 [LOGO]); for now it's type-only.
 */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="North Alpha — home"
      className={cn(
        "font-heading text-lg font-semibold tracking-tight text-foreground",
        className
      )}
    >
      North<span className="text-accent-bright">&nbsp;Alpha</span>
    </Link>
  );
}
