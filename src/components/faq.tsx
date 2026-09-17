import Link from "next/link";
import { faq } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";

/*
 * FAQ. The homepage shows the four questions flagged `featured` in the
 * content and links to the full set on /services; /services shows all of
 * them.
 */
export function Faq({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const items = featuredOnly ? faq.items.filter((i) => "featured" in i && i.featured) : faq.items;
  const rest = faq.items.length - items.length;
  return (
    <Chapter id="faq" title="FAQ" tight>
      <div className="container-page">
        <SectionHeading
          eyebrow={faq.eyebrow}
          heading={faq.heading}
          intro={faq.intro}
          align="center"
        />
        <Reveal className="mx-auto mt-10 max-w-2xl">
          <FaqAccordion items={items} />
          {featuredOnly && rest > 0 ? (
            <p className="mt-6 text-center text-sm">
              <Link href="/services#faq" className="link-draw font-medium text-primary">
                {rest} more questions on the services page
              </Link>
            </p>
          ) : null}
        </Reveal>
      </div>
    </Chapter>
  );
}
