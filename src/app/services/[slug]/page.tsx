import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { SERVICES, getService } from "@/content/services";
import { PageHero } from "@/components/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";
import { InkAnimation } from "@/components/ink-diagram/ink-animation";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.subhead,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.name} · Alpha Infra`, description: service.subhead },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={service.h1} subhead={service.subhead}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <BookACallButton size="lg" />
          <Link
            href="/services"
            className={cn(cta({ variant: "outline", size: "lg" }))}
          >
            See all services & pricing
          </Link>
        </div>
      </PageHero>

      {service.glance ? (
        <div className="container-page pt-4">
          <dl className="surface grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              ["Signals", service.glance.signals],
              ["Judgment", service.glance.judgment],
              ["Output", service.glance.output],
            ].map(([label, text]) => (
              <div key={label} className="p-6">
                <dt className="caption">{label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <div className="container-page grid gap-12 pb-8 pt-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        {/* Main column */}
        <div className="max-w-2xl space-y-12">
          <p className="border-l-2 border-primary pl-4 text-lg leading-snug">
            <span className="font-semibold text-primary">Start here if</span> {service.pain}
          </p>

          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{service.problemHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.problem}
              </p>
            </section>
          </Reveal>

          {service.stallsNote ? (
            <Reveal>
              <section>
                <h2 className="text-2xl font-semibold">{service.stallsNote.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.stallsNote.body}</p>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{service.whatHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.what}
              </p>
            </section>
          </Reveal>

          {service.layers ? (
            <Reveal>
              <section>
                {/* the system in one drawing, before the five layers name its parts */}
                <figure className="mb-10 max-w-xl">
                  <InkAnimation className="w-full" />
                  <figcaption className="caption mt-2">Four sources, one decision system</figcaption>
                </figure>
                <h2 className="text-2xl font-semibold">{service.layers.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.layers.intro}</p>
                <ol className="mt-6 divide-y divide-border border-y border-border">
                  {service.layers.items.map((layer) => (
                    <li key={layer.name} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                      <p className="caption pt-1.5">{layer.name}</p>
                      <div>
                        <h3 className="text-lg">{layer.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                          {layer.points.map((pt) => (
                            <li key={pt} className="text-sm text-foreground">· {pt}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ) : null}

          {service.examples ? (
            <Reveal>
              <section>
                <h2 className="text-2xl font-semibold">{service.examples.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.examples.intro}</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {service.examples.items.map((item) => (
                    <li key={item.title} className="rounded-xl border border-border bg-surface-2 p-5">
                      <p className="font-semibold leading-snug">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                      <p className="caption mt-3">{item.tools}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">What you get</h2>
              <ul className="mt-5 space-y-3">
                {service.whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-1 size-5 shrink-0 text-success"
                      aria-hidden
                    />
                    <span className="leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {service.trust ? (
            <Reveal>
              <section>
                <h2 className="text-2xl font-semibold">How it earns trust</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A decision system is only valuable if people can trust how it reaches a conclusion and what it is allowed to do. Exact work stays exact, AI judgment is tested, and consequential actions remain visible.
                </p>
                <ul className="mt-5 space-y-3">
                  {service.trust.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                      <span className="leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {!service.timeline ? (
            <Reveal>
              <section>
                <h2 className="text-2xl font-semibold">How it works</h2>
                <ol className="mt-5 space-y-4">
                  {service.howItWorks.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="stat-number text-xl font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ) : null}

          {service.timeline ? (
            <Reveal>
              <section>
                <h2 className="text-2xl font-semibold">{service.timeline.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.timeline.intro}</p>
                <ol className="mt-6 divide-y divide-border border-y border-border">
                  {service.timeline.steps.map((step) => (
                    <li key={step.when} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                      <p className="caption pt-1">{step.when}</p>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">Who it&apos;s for</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.whoItsFor}
              </p>
            </section>
          </Reveal>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-accent-bright">
              <ServiceIcon name={service.icon} className="size-5" />
            </span>
            {!service.listed ? (
              <p className="caption mt-4">Offered privately to existing clients</p>
            ) : null}
            <h2 className="mt-4 text-lg font-semibold">Pricing</h2>
            <p className="mt-1 text-xl font-semibold text-accent-bright">
              {service.priceDisplay}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.pricing}
            </p>
            <div className="mt-6">
              <BookACallButton className="w-full" />
            </div>
            <Link
              href="/contact#message"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Or send a message
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </div>

      {/* CTA line */}
      <section className="section scroll-mt-16">
        <div className="container-page">
          <div className="surface flex flex-col items-center gap-6 px-6 py-14 text-center">
            <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
              {service.ctaLine}
            </h2>
            <BookACallButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
