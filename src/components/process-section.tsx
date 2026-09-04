import { getService } from "@/content/services";
import { howItWorks } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { BookACallButton } from "@/components/book-a-call-button";

/*
 * Process as step cards, read from the flagship offer so the homepage and
 * /services/system always agree. The sixth cell is the call to action.
 */
export function ProcessSection() {
  const flagship = getService("system");
  if (!flagship) return null;

  return (
    <Chapter id="how-it-works" title="Process">
      <div className="container-page">
        <SectionHeading heading={howItWorks.heading} />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {flagship.howItWorks.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.05}>
              <div className="surface flex h-full flex-col p-6">
                <span className="font-heading text-4xl font-medium tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={flagship.howItWorks.length * 0.05}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-accent p-6 text-accent-foreground">
              <p className="text-balance font-heading text-2xl font-medium leading-snug">
                {flagship.ctaLine}
              </p>
              <div className="mt-6">
                <BookACallButton label="Book a discovery call" size="md" />
              </div>
            </div>
          </Reveal>
        </ol>
      </div>
    </Chapter>
  );
}
