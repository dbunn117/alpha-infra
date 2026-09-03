import { faq } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";

export function Faq() {
  return (
    <Chapter id="faq" title="FAQ">
      <div className="container-page">
        <SectionHeading
          eyebrow={faq.eyebrow}
          heading={faq.heading}
          intro={faq.intro}
          align="center"
        />
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </div>
    </Chapter>
  );
}
