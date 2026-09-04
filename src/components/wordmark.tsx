import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";

/*
 * Brand lockup: mark + lowercase "alpha infra" in Newsreader, no two-tone.
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
      <BrandMark className="size-8" />
      <span className="font-heading text-lg font-medium tracking-tight">
        alpha infra
      </span>
    </Link>
  );
}
