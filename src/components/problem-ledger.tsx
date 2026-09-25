import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { problems } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { RedPenNote } from "@/components/red-pen";

/*
 * Straight after the hero: six problems in the customer's words, each with
 * what gets built and what it is measured in. A ledger, no cards, so it
 * scans in seconds; the quote carries the row. One red-pen note, at the
 * end, pointing at the first call.
 */
export function ProblemLedger() {
  return (
    <Chapter id="problems" title="Problems">
      <div className="container-page">
        <SectionHeading eyebrow={problems.eyebrow} heading={problems.heading} intro={problems.intro} />

        <div className="mt-12">
          <div className="hidden grid-cols-[minmax(0,7fr)_minmax(0,3fr)_minmax(0,3fr)] gap-x-8 border-b border-border pb-3 text-sm font-semibold text-muted-foreground md:grid">
            <p>{problems.columns.problem}</p>
            <p>{problems.columns.built}</p>
            <p>{problems.columns.measure}</p>
          </div>
          <ol className="divide-y divide-border border-b border-border md:border-b-0">
            {problems.rows.map((row, i) => (
              <Reveal
                as="li"
                key={row.built}
                delay={i * 0.05}
                className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)_minmax(0,3fr)] md:items-baseline"
              >
                <p className="text-pretty font-heading text-xl font-medium leading-snug tracking-tight sm:text-[1.35rem]">
                  &ldquo;{row.problem}&rdquo;
                </p>
                <p className="text-sm font-semibold leading-snug">
                  <span className="caption mr-2 md:hidden">{problems.columns.built}</span>
                  {row.built}
                </p>
                <p className="text-sm leading-snug text-muted-foreground">
                  <span className="caption mr-2 md:hidden">{problems.columns.measure}</span>
                  {row.measure}
                </p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <Reveal delay={0.3}>
              <RedPenNote arrow="up">{problems.note}</RedPenNote>
            </Reveal>
            <Link href={problems.link.href} className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="link-draw">{problems.link.label}</span>
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
