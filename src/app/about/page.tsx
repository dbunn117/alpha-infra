import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { aboutPage, aboutBlock, workCta } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";
import { RedPenNote } from "@/components/red-pen";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillsGrid } from "@/components/skills-grid";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.subhead,
  alternates: { canonical: "/about" },
};

/*
 * The two penny-drop moments from "Where AI came in", as before-and-after
 * figures. Every figure here appears in the section's own prose; the
 * caveat line is the prose's caveat, kept so the numbers are not oversold.
 */
const MOMENTS = [
  {
    label: "A CFO dashboard, rebuilt",
    before: "6 months",
    after: "days",
    note: "to a working first version",
  },
  {
    label: "700MB of market data, read",
    before: "a week",
    after: "hours",
    note: "to a first pass of charts, takeaways, and narrative",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.h1}
        subhead={aboutPage.subhead}
      />

      {/* The two moments: the story's turning point as two figures */}
      <section className="container-page pb-4 pt-10">
        <Reveal>
          <div className="grid gap-6 border-y border-border py-8 md:grid-cols-2 md:gap-12">
            {MOMENTS.map((m, i) => (
              <div key={m.label} className={cn(i === 1 && "md:border-l md:border-border md:pl-12")}>
                <p className="caption">{m.label}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 font-heading text-3xl font-medium leading-none tracking-tight sm:text-4xl">
                  <span className="text-muted-foreground line-through decoration-1">{m.before}</span>
                  <span aria-hidden className="text-muted-foreground">→</span>
                  <span className="text-foreground">{m.after}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm text-muted-foreground">
              First versions, not finished products: the data still needed validation, controls, and testing. What changed was how much one person could build, and how fast the useful questions arrived.
            </p>
            <RedPenNote arrow="left">the penny dropped, twice</RedPenNote>
          </div>
        </Reveal>
      </section>

      <div className="container-page grid gap-12 pb-8 pt-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[300px] lg:sticky lg:top-24 lg:self-start">
          <div className="surface aspect-square overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/david-bunn.jpg")}
              alt="David Bunn"
              width={600}
              height={600}
              className="size-full object-cover"
            />
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

        {/* The story: each section shows its heading and first paragraph;
            the rest opens on request, so the page reads in a minute and
            still holds the whole account. */}
        <div className="max-w-2xl divide-y divide-border">
          {aboutPage.sections.map((s) => {
            // A section written as one long paragraph folds after its
            // second sentence, so every section opens at about the same length.
            let [first, ...rest]: string[] = [...s.body];
            if (rest.length === 0 && first.length > 320) {
              const sentences = first.match(/[^.!?]+[.!?]+(?:["”])?\s*/g) ?? [first];
              if (sentences.length > 3) {
                first = sentences.slice(0, 2).join("").trim();
                rest = [sentences.slice(2).join("").trim()];
              }
            }
            return (
              <Reveal key={s.heading} as="section" className="py-8 first:pt-0">
                <h2 className="text-2xl font-semibold">{s.heading}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{first}</p>
                {rest.length > 0 ? (
                  <details className="group mt-3">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
                      <span className="link-draw">Read the rest</span>
                      <ChevronDown className="size-4 transition-transform duration-300 ease-out-soft group-open:rotate-180" aria-hidden />
                    </summary>
                    <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">
                      {rest.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </Reveal>
            );
          })}

          <div className="pt-8">
            <div className="surface flex flex-col gap-5 p-8">
              <h2 className="text-balance text-2xl font-semibold">{aboutPage.ctaLine}</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <BookACallButton size="lg" />
                <Link href="/contact#message" className={cn(cta({ variant: "outline", size: "lg" }))}>
                  Send a message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExperienceTimeline />
      <SkillsGrid />

      <section className="section scroll-mt-16">
        <div className="container-page">
          <Reveal>
            <div className="border-t border-border pt-12 md:pt-16">
              <h2 className="max-w-3xl text-balance font-heading text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                {workCta.heading}
              </h2>
              <p className="measure mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {workCta.subhead}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 text-lg">
                <BookACallButton label={workCta.primaryCta} size="lg" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
