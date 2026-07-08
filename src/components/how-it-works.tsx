import { howItWorks } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          heading={howItWorks.heading}
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.order} delay={i * 0.06} as="div">
              <div className="surface h-full p-6">
                <span className="stat-number text-4xl font-semibold">
                  {step.order}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
