import { experience } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          heading="A decade close to how businesses actually run."
          intro="From Big Four audit to venture-backed operations to private-equity innovation, the throughline is turning complexity into decisions people can act on."
        />

        <ol className="mt-14 space-y-4">
          {experience.map((role, i) => (
            <Reveal key={`${role.company}-${role.title}`} delay={i * 0.04} as="li">
              <div className="surface p-6 md:p-8">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <p className="text-accent-bright">{role.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground md:text-right">
                    <p>{role.dates}</p>
                    <p>{role.location}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-accent-bright"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
