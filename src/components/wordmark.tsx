import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";

/*
 * Brand lockup: compass mark + styled text. The text stays live (Space Grotesk
 * via next/font) rather than baked into an image, so it renders crisply and
 * adapts to the theme alongside the mark.
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
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <BrandMark className="size-8" />
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
        North<span className="text-accent-bright">&nbsp;Alpha</span>
      </span>
    </Link>
  );
}
