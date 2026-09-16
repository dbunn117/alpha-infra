import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getService, servicesByGroup } from "@/content/services";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { OfferLedger } from "@/components/offer-ledger";
import { Reveal } from "@/components/reveal";
import { RedPenLoop } from "@/components/red-pen";
import { offerings } from "@/content/site";

/*
 * Offerings. `compact` (homepage): three doors, each a name, one line, and a
 * fee, with one line for the extensions and a link to the full page.
 * /services renders the full ledger, the six examples, and the extensions.
 */
export function ServicesSection({
  withHeading = true,
  compact = false,
}: {
  withHeading?: boolean;
  compact?: boolean;
}) {
  const doors = servicesByGroup("Front door");
  const extensions = servicesByGroup("Extension");
  const examples = getService("quick-win")?.examples;

  if (compact) {
    return (
      <Chapter id="services" title="Offerings">
        <div className="container-page">
          <SectionHeading heading={offerings.heading} />
          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {doors.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.06} className="border-t border-border pt-5">
                <p className="caption">{s.order} · {s.role}</p>
                <h3 className="mt-3 text-2xl leading-snug">
                  {s.chip === "Flagship" ? (
                    <span className="relative inline-block">
                      {s.name}
                      <RedPenLoop className="-inset-x-3 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)]" strokeWidth={2} delayS={0.4} />
                    </span>
                  ) : s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <span className="text-lg font-semibold tabular-nums">{s.priceDisplay}</span>
                  <Link href={`/services/${s.slug}`} className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    <span className="link-draw">Learn more</span>
                    <span className="sr-only"> about {s.name}</span>
                    <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <p>
              Build clients can add{" "}
              {extensions.map((e, i) => (
                <span key={e.slug}>
                  <Link href={`/services/${e.slug}`} className="link-draw font-medium text-foreground">{e.name}</Link>
                  {i < extensions.length - 1 ? " or " : "."}
                </span>
              ))}
            </p>
            <Link href="/services" className="link-draw font-medium text-primary">
              Every offer in detail, with examples
            </Link>
          </Reveal>
        </div>
      </Chapter>
    );
  }

  return (
    <Chapter id="services" title="Offerings">
      <div className="container-page">
        {withHeading ? (
          <SectionHeading heading={offerings.heading} intro={offerings.intro} />
        ) : null}

        <div className={withHeading ? "mt-12" : undefined}>
          <OfferLedger services={doors} variant="door" />
        </div>

        {examples ? (
          <div className="mt-14">
            <div className="max-w-3xl">
              <h3 className="text-xl">{offerings.examplesHeading}</h3>
              <p className="measure mt-2 text-muted-foreground">{offerings.examplesIntro}</p>
            </div>
            <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
              {examples.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.04} className="border-t border-border py-5">
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="caption mt-3">{item.tools}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14">
          <div className="max-w-3xl">
            <h3 className="text-xl">{offerings.extensionsHeading}</h3>
            <p className="measure mt-2 text-muted-foreground">{offerings.extensionsIntro}</p>
          </div>
          <div className="mt-6">
            <OfferLedger services={extensions} variant="extension" />
          </div>
        </div>

        <p className="measure mt-8 text-sm leading-relaxed text-muted-foreground">
          {offerings.footnote}
        </p>
      </div>
    </Chapter>
  );
}
