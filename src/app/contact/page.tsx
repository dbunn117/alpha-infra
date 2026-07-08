import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BookingEmbed } from "@/components/booking-embed";
import { ContactForm } from "@/components/contact-form";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute discovery call or send a message. No pressure, no jargon — just a clear next step.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's find your first AI win."
        subhead="Book a 30-minute discovery call, or send a note and I'll get back to you within one business day."
      />

      <div className="container-page grid gap-12 pb-8 pt-12 lg:grid-cols-2 lg:gap-16">
        {/* Booking (primary) */}
        <section id="book" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">Book a discovery call</h2>
          <p className="mt-2 text-muted-foreground">
            Pick a time that works — 30 minutes, free.
          </p>
          <BookingEmbed className="mt-6" />
        </section>

        {/* Contact form */}
        <section id="message" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">{contact.heading}</h2>
          <p className="mt-2 text-muted-foreground">
            Not ready to book? Send a note and I&apos;ll reply within one
            business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
