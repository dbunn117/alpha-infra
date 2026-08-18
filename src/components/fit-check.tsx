import { CheckCircle2, XCircle } from "lucide-react";
import { fitCheck } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function FitCheck() {
  return (
    <section id="fit" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow={fitCheck.eyebrow}
          heading={fitCheck.heading}
          intro={fitCheck.intro}
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal>
            <div className="surface h-full p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                This might be you if
              </h3>
              <ul className="mt-5 space-y-5">
                {fitCheck.forYou.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-success"
                      aria-hidden
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="surface h-full p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Probably not a fit if
              </h3>
              <ul className="mt-5 space-y-4">
                {fitCheck.notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
