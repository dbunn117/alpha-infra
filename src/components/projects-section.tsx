import {
  personalProjects,
  PROFESSIONAL_PROJECT_GROUPS,
  professionalProjectsByGroup,
} from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export function ProjectsSection() {
  return (
    <section id="work" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          heading="Systems built around real decisions."
          intro="Some identify an opportunity or exception. Others create the data and workflow foundation that makes those decisions possible."
        />

        {/* Professional */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Professional
            </h3>
            <span className="h-px flex-1 bg-border" />
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Professional engagements below are described without client or firm
            detail unless the client has agreed otherwise.
          </p>
          <div className="space-y-10">
            {PROFESSIONAL_PROJECT_GROUPS.map((group) => (
              <div key={group.label}>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">
                  {group.label}
                </h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  {professionalProjectsByGroup(group.label).map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.04}>
                      <ProjectCard project={p} variant="professional" />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab: independent work, set apart from the client and professional
            work above so a buyer scanning for proof never mistakes the two. */}
        <div className="mt-16 rounded-2xl border border-dashed border-border bg-surface-2/60 p-6 sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Lab
            </h3>
            <span className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Personal projects, not client work
            </span>
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Independent systems where I test patterns before applying them in
            client work: proactive monitoring, durable memory, evidence-backed
            recommendations, and human approval before consequential actions.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <ProjectCard project={p} variant="personal" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
