import { skillGroups } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function SkillsGrid() {
  return (
    <section id="skills" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills & tools"
          heading="Selected skills and tools."
          intro="I choose the stack for the problem rather than designing the problem around a tool."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="surface h-full p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-sm text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
