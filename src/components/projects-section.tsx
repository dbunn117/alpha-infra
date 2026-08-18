import { professionalProjects, personalProjects } from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export function ProjectsSection() {
  return (
    <section id="work" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          heading="A catalogue of what I've built with AI."
          intro="Professional engagements are described without client detail; personal projects link out where they're public. The through-line is the same: real problems, shipped."
        />

        {/* Professional */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Professional
            </h3>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {professionalProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <ProjectCard project={p} variant="professional" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Personal */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Personal
            </h3>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.03}>
                <ProjectCard project={p} variant="personal" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
