"use client";

import { useBooking } from "@/components/booking-dialog";
import { cn } from "@/lib/utils";
import { cta, type CtaVariants } from "@/lib/cta";

/*
 * Primary conversion CTA. Opens the single app-wide booking modal
 * (see components/booking-dialog.tsx) so it works from anywhere without
 * hydrating a Dialog per button.
 */
export function BookACallButton({
  label = "Book a discovery call",
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
  return (
    <button
      type="button"
      onClick={() => openBooking?.()}
      className={cn(cta({ variant, size }), className)}
    >
      {label}
    </button>
  );
}
