import { SERVICE_GROUPS, servicesByGroup } from "@/content/services";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { offerings } from "@/content/site";

export function ServicesSection({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  return (
    <section id="services" className="section scroll-mt-16">
      <div className="container-page">
        {withHeading ? (
          <SectionHeading
            eyebrow="Offerings"
            heading={offerings.heading}
            intro={offerings.intro}
            align="center"
          />
        ) : null}

        <div className="mt-14 space-y-16">
          {SERVICE_GROUPS.map((group) => {
            const services = servicesByGroup(group);
            return (
              <div key={group}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {group}
                  </h3>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, i) => (
                    <Reveal key={service.slug} delay={i * 0.05} as="div">
                      <ServiceCard service={service} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
          {offerings.footnote}
        </p>
      </div>
    </section>
  );
}
