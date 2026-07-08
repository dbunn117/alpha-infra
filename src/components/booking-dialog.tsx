"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingEmbed } from "@/components/booking-embed";

/*
 * A single app-wide booking modal. Every "Book a call" CTA opens this one
 * instance via context, so we don't hydrate a separate Dialog per button.
 */
const BookingContext = React.createContext<(() => void) | null>(null);

export function useBooking() {
  return React.useContext(BookingContext);
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const openBooking = React.useCallback(() => setOpen(true), []);

  return (
    <BookingContext.Provider value={openBooking}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full sm:max-w-2xl" showCloseButton>
          <DialogHeader>
            <DialogTitle>Book a discovery call</DialogTitle>
            <DialogDescription>
              A free 30-minute call to find your first AI win. No pressure, no
              jargon.
            </DialogDescription>
          </DialogHeader>
          <BookingEmbed className="mt-1" />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
