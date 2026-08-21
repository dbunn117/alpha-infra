import { principles } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Principles() {
  return (
    <section id="principles" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow={principles.eyebrow}
          heading={principles.heading}
          intro={principles.intro}
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.items.map((item, i) => (
            <Reveal key={item.order} delay={i * 0.05} as="div">
              <div className="surface h-full p-6">
                <span className="stat-number text-4xl font-semibold">
                  {item.order}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
