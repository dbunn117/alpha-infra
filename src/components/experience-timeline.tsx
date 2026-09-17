import { ChevronDown } from "lucide-react";
import { experience } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/*
 * Experience as a timeline, not a stack of cards: dates in the margin, one
 * ink line, a marker per role, title and company on the line. The bullets
 * open on request, so the page shows the arc at a glance and the detail
 * only to whoever wants it.
 */
export function ExperienceTimeline() {
  return (
    <section id="experience" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          heading="A decade close to decisions that move the numbers."
        />

        <ol className="relative mt-12 max-w-3xl border-l border-border pl-8 sm:ml-32 sm:pl-10">
          {experience.map((role, i) => (
            <Reveal key={`${role.company}-${role.title}`} delay={i * 0.04} as="li" className="relative pb-9 last:pb-0">
              {/* marker on the line */}
              <span aria-hidden className="absolute -left-[calc(2rem+0.3rem)] top-2 size-2.5 rounded-full border border-primary bg-background sm:-left-[calc(2.5rem+0.3rem)]" />
              {/* dates in the margin at sm+ */}
              <p className="caption sm:absolute sm:-left-[calc(8rem+2.5rem)] sm:top-1.5 sm:w-28 sm:text-right">{role.dates}</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug sm:mt-0">{role.title}</h3>
              <p className="text-sm text-muted-foreground">
                {role.company} · {role.location}
              </p>
              <details className="group mt-2">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
                  <span className="link-draw">What I did</span>
                  <ChevronDown className="size-4 transition-transform duration-300 ease-out-soft group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="mt-3 space-y-2">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-accent-bright"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
