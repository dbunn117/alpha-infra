import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";

/*
 * Brand lockup: Alpha Infra mark + wordmark. Per the 2026-09-02 brand guide,
 * the wordmark is lowercase "alpha infra" in Newsreader (via next/font),
 * paired with the checkmark mark, no two-tone color split.
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
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <BrandMark className="size-8" />
      <span className="font-heading text-lg font-medium tracking-tight text-foreground">
        alpha infra
      </span>
    </Link>
  );
}
