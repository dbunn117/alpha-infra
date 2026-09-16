import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BookingEmbed } from "@/components/booking-embed";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contact, contactNext, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute discovery call, or send a message and I'll reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's find the first opportunity worth building."
        subhead="Book a 30-minute discovery call, or send a note and I'll get back to you within one business day."
      />

      <div className="container-page grid gap-12 pb-8 pt-12 lg:grid-cols-2 lg:gap-16">
        {/* Booking (primary) */}
        <section id="book" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">Book a discovery call</h2>
          <p className="mt-2 text-muted-foreground">
            Pick a time that works (30 minutes, free).
          </p>
          <BookingEmbed className="mt-6" />
        </section>

        {/* Message (secondary) */}
        <section id="message" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">{contact.heading}</h2>
          <p className="mt-2 text-muted-foreground">{contact.prompt}</p>
          <div className="mt-6">
            <ContactForm />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{contact.note}</p>
        </section>
      </div>

      <div className="container-page pb-16 pt-4">
        <Reveal>
          <div className="surface max-w-2xl p-8">
            <h2 className="text-xl font-semibold">{contactNext.heading}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {contactNext.body}
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${site.ownerEmail}?subject=Opportunity%20worth%20building`}
                className="font-medium text-accent-bright hover:underline"
              >
                {site.ownerEmail}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
