import { ChevronDown } from "lucide-react";
import { faq } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Faq() {
  return (
    <section id="faq" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow={faq.eyebrow}
          heading={faq.heading}
          intro={faq.intro}
          align="center"
        />

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.03}>
              <details className="surface group p-5 open:pb-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
                  {item.question}
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
