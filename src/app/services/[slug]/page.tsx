import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { SERVICES, getService } from "@/content/services";
import { PageHero } from "@/components/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { BookACallButton } from "@/components/book-a-call-button";
import { Reveal } from "@/components/reveal";
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
    openGraph: { title: `${service.name} · North Alpha`, description: service.subhead },
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
          <BookACallButton label="Book a discovery call" size="lg" />
          <Link
            href="/#pricing"
            className={cn(cta({ variant: "outline", size: "lg" }))}
          >
            See pricing
          </Link>
        </div>
      </PageHero>

      <div className="container-page grid gap-12 pb-8 pt-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        {/* Main column */}
        <div className="max-w-2xl space-y-12">
          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{service.problemHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.problem}
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{service.whatHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.what}
              </p>
            </section>
          </Reveal>

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
            <h2 className="mt-4 text-lg font-semibold">Pricing</h2>
            <p className="mt-1 text-xl font-semibold text-accent-bright">
              {service.priceDisplay}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.pricing}
            </p>
            <div className="mt-6">
              <BookACallButton label="Book a discovery call" className="w-full" />
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
            <BookACallButton label="Book a discovery call" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
