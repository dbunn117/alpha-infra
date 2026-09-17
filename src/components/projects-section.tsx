import { SectionHeading } from "@/components/section-heading";
import { WorkCatalogue } from "@/components/work-catalogue";

/*
 * Selected work: the heading, then the filterable catalogue (featured
 * first, the rest and the Lab on request).
 */
export function ProjectsSection() {
  return (
    <section id="work" className="section-tight scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          heading="Systems built around real decisions."
          intro="Some identify an opportunity or exception. Others create the data and workflow foundation that makes those decisions possible."
        />
        <WorkCatalogue />
      </div>
    </section>
  );
}
