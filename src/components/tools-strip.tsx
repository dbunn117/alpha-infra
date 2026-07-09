import { tools } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function ToolsStrip() {
  return (
    <section id="tools" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow={tools.eyebrow}
          heading={tools.heading}
          intro={tools.intro}
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {tools.groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.05}>
              <div className="surface h-full p-6 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap justify-center gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-1 text-sm text-foreground"
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
