import { getService } from "@/content/services";
import { howItWorks } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { RedPenNote } from "@/components/red-pen";
import { BookACallButton } from "@/components/book-a-call-button";

/*
 * Process as five numbered titles on one drawn line, read from the flagship
 * offer so the homepage and /services/system always agree. The step detail
 * lives on the Alpha System page; here the sequence is the point.
 */
export function ProcessSection() {
  const flagship = getService("system");
  if (!flagship) return null;
  const steps = flagship.howItWorks;

  return (
    <Chapter id="how-it-works" title="Process">
      <div className="container-page">
        <SectionHeading eyebrow={howItWorks.eyebrow} heading={howItWorks.heading} />

        <Reveal className="mt-12">
          <ol className="relative grid gap-8 sm:grid-cols-5 sm:gap-4">
            {/* the connecting line, drawn as the list reveals */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-[0.9rem] top-0 hidden h-full w-px sm:left-0 sm:top-[0.6rem] sm:block sm:h-px sm:w-full"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <path d="M0,0.5 H100" pathLength={1} data-stroke stroke="currentColor" strokeWidth={1} className="text-border" vectorEffect="non-scaling-stroke" />
            </svg>
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 sm:block">
                <span className="relative z-10 flex size-[1.4rem] shrink-0 items-center justify-center rounded-full border border-primary bg-background font-mono text-[0.7rem] font-medium text-primary sm:mb-4">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg leading-snug sm:pr-4">{step.title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <p className="max-w-md text-balance font-heading text-2xl font-medium leading-snug tracking-tight">
            {flagship.ctaLine}
          </p>
          <BookACallButton size="md" />
          <RedPenNote arrow="left">you own it outright</RedPenNote>
        </Reveal>
      </div>
    </Chapter>
  );
}
