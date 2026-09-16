import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";

/*
 * Brand lockup: the signal mark (trace + red circle) beside lowercase
 * "alpha infra" in Newsreader, no two-tone. The mark is 1.6:1, so it is
 * sized by height and takes its own width.
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
      aria-label="Alpha Infra home"
      className={cn("inline-flex items-center gap-2.5 text-foreground", className)}
    >
      <BrandMark className="h-8 w-auto" />
      <span className="font-heading text-lg font-medium tracking-tight">
        alpha infra
      </span>
    </Link>
  );
}
