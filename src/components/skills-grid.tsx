import { skillSets } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ToolMark } from "@/components/tool-mark";

/* Two labelled halves: what David brings (finance and operations skills,
   credentials) and what he builds with (the stack). */
export function SkillsGrid() {
  return (
    <section id="skills" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills, credentials & tools"
          heading="What I bring, and what I build with."
          intro="I choose the stack for the problem rather than designing the problem around a tool."
        />

        <div className="mt-12 space-y-10">
          {skillSets.map((set, si) => (
            <div key={set.heading}>
              <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-bright">
                <span>{set.heading}</span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {set.groups.map((group, i) => (
                  <Reveal key={group.label} delay={(si * 2 + i) * 0.05}>
                    <div className="surface h-full p-6">
                      <h4 className="text-sm font-semibold text-foreground">{group.label}</h4>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-sm text-foreground"
                          >
                            {set.marks ? <ToolMark name={item} /> : null}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
