import { Quote } from "lucide-react";
import { socialProof } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";

/*
 * Social proof. Slots are intentionally left as placeholders at launch
 * (spec §9 [TESTIMONIALS]). Replace the items below with real quotes as they're
 * collected: { quote, name, role }.
 */
const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export function Testimonials() {
  const items =
    TESTIMONIALS.length > 0
      ? TESTIMONIALS
      : Array.from({ length: 3 }, () => null);

  return (
    <section id="testimonials" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading heading={socialProof.heading} align="center" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <figure key={i} className="surface flex h-full flex-col p-6">
              <Quote className="size-6 text-accent-bright" aria-hidden />
              {item ? (
                <>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-muted-foreground">
                      {item.role}
                    </span>
                  </figcaption>
                </>
              ) : (
                <>
                  <div className="mt-4 flex-1 space-y-2" aria-hidden>
                    <div className="h-3 w-full rounded bg-border" />
                    <div className="h-3 w-11/12 rounded bg-border" />
                    <div className="h-3 w-3/4 rounded bg-border" />
                  </div>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    Your words here
                  </figcaption>
                </>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
