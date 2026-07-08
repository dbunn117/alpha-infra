import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BookingEmbed } from "@/components/booking-embed";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Book a free 30-minute discovery call with North Alpha.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Discovery call"
        title="Book a free 30-minute call."
        subhead="We'll talk through where you are, where AI can help most, and a clear first step. No pressure, no jargon."
      />
      <div className="container-page pb-16 pt-6">
        <BookingEmbed className="mx-auto max-w-3xl" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to write first?{" "}
          <Link
            href="/contact#message"
            className="font-medium text-accent-bright hover:underline"
          >
            Send a message instead
          </Link>
          .
        </p>
      </div>
    </>
  );
}
