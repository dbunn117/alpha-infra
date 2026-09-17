import { ArrowDown, ArrowRight } from "lucide-react";
import { positioning } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { DrawnTick } from "@/components/drawn-mark";
import { RedPenLoop, RedPenNote } from "@/components/red-pen";

/*
 * The idea as one comparison: two models of AI, side by side. Productivity
 * AI is the smaller, flatter panel (one prompt, one task, faster output).
 * Opportunity AI is the dominant one: four sources drawn into the business's
 * rules, ending in a visible output, the ranked opportunity, which carries
 * the section's one red-pen mark. Nothing to operate; on phones the panels
 * stack with a bridge line between them, so no viewport loses the visual.
 */
const P = positioning.productivity;
const O = positioning.opportunity;

function Chip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={
        muted
          ? "inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-muted-foreground"
          : "inline-flex h-8 items-center rounded-md border border-foreground/70 px-3 text-xs font-medium text-foreground"
      }
    >
      {children}
    </span>
  );
}

export function PositioningBlock() {
  return (
    <Chapter id="positioning" title="The idea">
      <div className="container-page">
        <SectionHeading eyebrow={positioning.eyebrow} heading={positioning.heading} intro={positioning.intro} />

        <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_3fr] lg:gap-6">
          {/* Productivity AI: flat and quiet */}
          <Reveal className="flex flex-col rounded-2xl border border-border p-6 sm:p-7">
            <p className="caption">{P.label}</p>
            <p className="mt-3 font-heading text-xl leading-snug text-muted-foreground sm:text-2xl">&ldquo;{P.prompt}&rdquo;</p>

            <div className="mt-6 flex flex-col items-start gap-1.5" aria-hidden>
              {P.flow.map((step, i) => (
                <div key={step} className="flex flex-col items-start gap-1.5">
                  <Chip muted>{step}</Chip>
                  {i < P.flow.length - 1 ? <ArrowDown className="ml-3 size-3.5 text-muted-foreground" /> : null}
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {P.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-sm font-semibold text-muted-foreground">{P.verdict}</p>
          </Reveal>

          {/* bridge, phones only */}
          <p className="caption flex items-center justify-center gap-2 lg:hidden">
            <ArrowDown className="size-3.5" aria-hidden />
            {positioning.bridge}
          </p>

          {/* Opportunity AI: dominant, elevated, ends in an output */}
          <Reveal delay={0.08} className="grain surface surface-raised relative flex flex-col p-6 sm:p-7">
            <p className="caption text-primary">{O.label}</p>
            <p className="mt-3 font-heading text-xl leading-snug sm:text-2xl">&ldquo;{O.prompt}&rdquo;</p>

            {/* sources, your rules, ranked opportunity: left to right at md+, top to bottom below */}
            <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0">
              <ul className="flex flex-wrap gap-1.5 md:w-28 md:flex-col md:flex-nowrap" aria-label="Signals">
                {O.sources.map((src) => (
                  <li key={src}><Chip>{src}</Chip></li>
                ))}
              </ul>

              {/* four routes drawn into one */}
              <svg aria-hidden viewBox="0 0 56 152" preserveAspectRatio="none" className="hidden h-[9.5rem] w-12 shrink-0 text-primary md:block" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                <path d="M0,16 C30,16 26,76 56,76" pathLength={1} data-stroke />
                <path d="M0,56 C26,56 30,76 56,76" pathLength={1} data-stroke />
                <path d="M0,96 C26,96 30,76 56,76" pathLength={1} data-stroke />
                <path d="M0,136 C30,136 26,76 56,76" pathLength={1} data-stroke />
              </svg>
              <ArrowDown aria-hidden className="ml-3 size-4 text-primary md:hidden" />

              <div className="shrink-0 rounded-lg border border-primary bg-accent/60 px-3.5 py-3 text-primary md:w-32">
                <p className="font-heading text-base leading-tight">{O.rules}</p>
                <p className="mt-1 text-[0.7rem] leading-snug opacity-90">definitions, priorities, thresholds</p>
              </div>

              <ArrowRight aria-hidden className="mx-2 hidden size-4 shrink-0 text-primary md:block" />
              <ArrowDown aria-hidden className="ml-3 size-4 text-primary md:hidden" />

              {/* the output: the piece the old diagram never showed */}
              <div className="relative min-w-0 flex-1">
                <div className="relative rounded-lg border border-border bg-surface-1 px-4 py-3 shadow-elev-1">
                  <RedPenLoop className="-inset-x-2.5 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.25rem)]" strokeWidth={2.25} delayS={0.5} />
                  <p className="caption">{O.output.label} · {O.output.caption}</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug">{O.output.title}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{O.output.evidence}</p>
                  <p className="mt-1 text-xs font-medium leading-snug text-primary">{O.output.action}</p>
                </div>
                <div className="mt-3 flex justify-end">
                  <RedPenNote arrow="up">{O.annotation}</RedPenNote>
                </div>
              </div>
            </div>

            <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {O.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <DrawnTick className="mt-0.5 size-4 text-primary" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-sm font-semibold">{O.verdict}</p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <p className="measure font-medium text-foreground">{positioning.note}</p>
        </Reveal>
      </div>
    </Chapter>
  );
}
