"use client";

import Link from "next/link";
import { useBooking } from "@/components/booking-dialog";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { cta, type CtaVariants } from "@/lib/cta";

/*
 * Primary conversion CTA. No real booking URL exists yet (site.bookingUrl is
 * unset), so this renders as an honest link to the contact form rather than
 * opening a modal that just points back at itself. Once a real scheduling
 * link is configured, it opens the single app-wide booking modal instead
 * (see components/booking-dialog.tsx), and every caller that didn't pass an
 * explicit label picks up "Book a discovery call" automatically.
 */
export function BookACallButton({
  label,
  variant = "primary",
  size = "md",
  className,
}: {
  label?: string;
  variant?: CtaVariants["variant"];
  size?: CtaVariants["size"];
  className?: string;
}) {
  const openBooking = useBooking();
  const hasRealBooking = Boolean(site.bookingUrl);
  const text = label ?? (hasRealBooking ? "Book a discovery call" : "Start a conversation");

  if (!hasRealBooking) {
    return (
      <Link href="/contact#message" className={cn(cta({ variant, size }), className)}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openBooking?.()}
      className={cn(cta({ variant, size }), className)}
    >
      {text}
    </button>
  );
}
