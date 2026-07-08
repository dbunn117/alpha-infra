import Link from "next/link";
import { Check } from "lucide-react";
import { pricing } from "@/content/site";
import { getService } from "@/content/services";
import { SectionHeading } from "@/components/section-heading";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          heading={pricing.heading}
          intro={pricing.intro}
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pricing.rows.map((row, i) => {
            const service = getService(row.slug);
            if (!service) return null;
            const popular = service.mostPopular;
            return (
              <Reveal key={row.slug} delay={i * 0.04} as="div">
                <div
                  className={cn(
                    "surface relative flex h-full flex-col p-6",
                    popular && "border-accent-bright/50 ring-1 ring-accent-bright/30"
                  )}
                >
                  {popular ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="mt-3 text-xl font-semibold text-accent-bright">
                    {service.priceDisplay}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {row.blurb}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <BookACallButton label="Book a call" size="sm" />
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`${service.name} details`}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-8 flex max-w-2xl items-start gap-2 text-center text-sm text-muted-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
          <span>{pricing.footnote}</span>
        </p>
      </div>
    </section>
  );
}
