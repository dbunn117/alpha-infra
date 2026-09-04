import { SERVICES } from "@/content/services";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { offerings } from "@/content/site";

/*
 * Offerings as a card grid: the flagship spans two columns, the other four
 * follow. Also rendered on /services (withHeading=false).
 */
export function ServicesSection({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  const flagship = SERVICES.find((s) => s.mostPopular) ?? SERVICES[0];
  const rest = SERVICES.filter((s) => s.slug !== flagship.slug);

  return (
    <Chapter id="services" title="Offerings">
      <div className="container-page">
        {withHeading ? (
          <SectionHeading heading={offerings.heading} intro={offerings.intro} />
        ) : null}

        <div className={withHeading ? "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"}>
          <Reveal className="md:col-span-2">
            <ServiceCard service={flagship} variant="flagship" />
          </Reveal>
          {rest.map((service, i) => (
            <Reveal key={service.slug} delay={0.05 + i * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <p className="measure mt-10 text-sm leading-relaxed text-muted-foreground">
          {offerings.footnote}
        </p>
      </div>
    </Chapter>
  );
}
