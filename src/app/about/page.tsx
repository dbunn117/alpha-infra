import type { Metadata } from "next";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { aboutPage, aboutBlock } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.subhead,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.h1}
        subhead={aboutPage.subhead}
      />

      <div className="container-page grid gap-12 pb-8 pt-12 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* Headshot placeholder — swap for David's photo (spec §9 FOUNDER_PHOTO) */}
        <div className="mx-auto w-full max-w-[300px] lg:sticky lg:top-24 lg:self-start">
          <div className="surface flex aspect-square items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <UserRound className="size-12" aria-hidden />
              <span className="text-sm">Headshot coming soon</span>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {aboutBlock.credibility.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-2xl space-y-10">
          {aboutPage.sections.map((s) => (
            <Reveal key={s.heading}>
              <section>
                <h2 className="text-2xl font-semibold">{s.heading}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </section>
            </Reveal>
          ))}

          <div className="surface flex flex-col gap-5 p-8">
            <h2 className="text-balance text-2xl font-semibold">
              {aboutPage.ctaLine}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookACallButton label="Book a discovery call" size="lg" />
              <Link
                href="/contact#message"
                className={cn(cta({ variant: "outline", size: "lg" }))}
              >
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
