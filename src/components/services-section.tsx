import { SERVICES, SERVICE_GROUPS, servicesByGroup } from "@/content/services";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { offerings } from "@/content/site";

/*
 * Offerings as a bento: the flagship plate spans two columns, Quick Win sits
 * beside it, and the three services a client grows into are ledger rows
 * under their group names. Also rendered on /services (withHeading=false).
 */
export function ServicesSection({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  const [buildGroup, ...laterGroups] = SERVICE_GROUPS;
  const build = servicesByGroup(buildGroup);
  const flagship = build.find((s) => s.mostPopular) ?? SERVICES[0];
  const entry = build.find((s) => s.slug !== flagship.slug);

  return (
    <Chapter id="services" title="Offerings">
      <div className="container-page">
        {withHeading ? (
          <SectionHeading heading={offerings.heading} intro={offerings.intro} />
        ) : null}

        <div className={withHeading ? "mt-14" : undefined}>
          <p className="mb-5 font-heading text-lg italic text-muted-foreground">
            {buildGroup}
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <ServiceCard service={flagship} variant="flagship" />
            </Reveal>
            {entry ? (
              <Reveal delay={0.06}>
                <ServiceCard service={entry} variant="entry" />
              </Reveal>
            ) : null}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {laterGroups.map((group) => (
            <div key={group}>
              <p className="border-b border-border pb-3 font-heading text-lg italic text-muted-foreground">
                {group}
              </p>
              <ol className="divide-y divide-border">
                {servicesByGroup(group).map((service, i) => (
                  <Reveal as="li" key={service.slug} delay={i * 0.05}>
                    <ServiceCard service={service} variant="row" />
                  </Reveal>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="measure mt-12 text-sm leading-relaxed text-muted-foreground">
          {offerings.footnote}
        </p>
      </div>
    </Chapter>
  );
}
