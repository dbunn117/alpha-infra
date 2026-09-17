import { positioning } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { InkAnimation } from "@/components/ink-diagram/ink-animation";

/*
 * The idea, in three lines. Productivity AI vs Opportunity AI as three
 * short contrasts set large, the one-line note, and the looping ink
 * diagram giving the right column its job. No survey figures: the site's
 * own systems are the evidence.
 */
export function PositioningBlock() {
  const contrasts = positioning.paragraphs.slice(1);
  return (
    <Chapter id="positioning" title="The idea">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={positioning.eyebrow} heading={positioning.heading} />
          <Reveal className="mt-10 space-y-6">
            {contrasts.map((line) => {
              const [first, ...rest] = line.split(". ");
              return (
                <p key={line} className="max-w-xl text-pretty font-heading text-xl leading-snug sm:text-2xl">
                  <span className="text-muted-foreground">{first}.</span>{" "}
                  <span className="text-foreground">{rest.join(". ")}</span>
                </p>
              );
            })}
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <p className="measure font-medium text-foreground">{positioning.note}</p>
          </Reveal>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <InkAnimation className="w-full" />
            <p className="caption mt-2 text-center">Four sources, one decision system</p>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
