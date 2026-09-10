import { getService, servicesByGroup } from "@/content/services";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { offerings } from "@/content/site";

/*
 * Offerings: three front doors (Start, Build, Decide), then the two
 * extensions for build clients. Also rendered on /services (withHeading=false).
 */
export function ServicesSection({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  const doors = servicesByGroup("Front door");
  const extensions = servicesByGroup("Extension");
  const examples = getService("quick-win")?.examples;

  return (
    <Chapter id="services" title="Offerings">
      <div className="container-page">
        {withHeading ? (
          <SectionHeading heading={offerings.heading} intro={offerings.intro} />
        ) : null}

        <div className={withHeading ? "mt-14 grid gap-5 md:grid-cols-3" : "grid gap-5 md:grid-cols-3"}>
          {doors.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <ServiceCard service={service} variant="door" />
            </Reveal>
          ))}
        </div>

        {examples ? (
          <div className="mt-14">
            <div className="max-w-3xl">
              <h3 className="text-xl">{offerings.examplesHeading}</h3>
              <p className="measure mt-2 text-muted-foreground">{offerings.examplesIntro}</p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {examples.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.04} className="rounded-xl border border-border bg-surface-2 p-5">
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="caption mt-3">{item.tools}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-16">
          <div className="max-w-3xl">
            <h3 className="text-xl">{offerings.extensionsHeading}</h3>
            <p className="measure mt-2 text-muted-foreground">{offerings.extensionsIntro}</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {extensions.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} variant="extension" />
              </Reveal>
            ))}
          </div>
        </div>

        <p className="measure mt-10 text-sm leading-relaxed text-muted-foreground">
          {offerings.footnote}
        </p>
      </div>
    </Chapter>
  );
}
