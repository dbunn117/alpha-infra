import { skillGroups, credentials } from "@/content/profile";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { GraduationCap } from "lucide-react";

export function SkillsGrid() {
  return (
    <section id="skills" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills & tools"
          heading="The stack I build with."
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

        <Reveal className="mt-5">
          <div className="surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-accent-bright">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {credentials.map((c) => (
                <li key={c} className="text-sm text-muted-foreground">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
