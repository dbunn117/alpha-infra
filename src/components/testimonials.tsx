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
  // No blank-placeholder fallback on purpose — three empty cards under "what
  // people say" reads worse than no section at all. Render nothing until
  // TESTIMONIALS has real, approved quotes in it.
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading heading={socialProof.heading} align="center" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure key={item.name} className="surface flex h-full flex-col p-6">
              <Quote className="size-6 text-accent-bright" aria-hidden />
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
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
