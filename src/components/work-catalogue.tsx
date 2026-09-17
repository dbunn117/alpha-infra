"use client";

import * as React from "react";
import {
  personalProjects,
  professionalProjects,
  PROFESSIONAL_PROJECT_GROUPS,
} from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * The catalogue, selective first: six featured professional projects, each
 * with a drawn glyph, the decision it supports, and the signals it reads.
 * Filters narrow by kind of work; "Show all work" opens the rest. The Lab
 * keeps its own panel so personal projects never read as client proof.
 */
const FILTERS = [
  { key: "featured", label: "Featured" },
  ...PROFESSIONAL_PROJECT_GROUPS.map((g) => ({ key: g.label, label: g.label.split(" and ")[0] + " systems" })),
  { key: "lab", label: "Lab" },
] as const;

export function WorkCatalogue() {
  const [filter, setFilter] = React.useState<string>("featured");
  const [all, setAll] = React.useState(false);

  const featured = professionalProjects.filter((p) => p.featured);
  const rest = professionalProjects.filter((p) => !p.featured);
  const professional =
    filter === "featured"
      ? all ? [...featured, ...rest] : featured
      : filter === "lab"
        ? []
        : professionalProjects.filter((p) => p.group === filter);
  const showLab = filter === "lab" || (filter === "featured" && all);

  const labels: Record<string, string> = {
    "Decision and opportunity systems": "Decision systems",
    "Workflow and knowledge infrastructure": "Workflow infrastructure",
  };

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Filter the catalog" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-[background-color,color,border-color] duration-150",
              filter === f.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {labels[f.key] ?? f.label}
          </button>
        ))}
      </div>

      {professional.length > 0 ? (
        <>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Professional engagements are described without client or firm detail unless the client has agreed otherwise.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {professional.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <ProjectCard project={p} variant="professional" />
              </Reveal>
            ))}
          </div>
        </>
      ) : null}

      {filter === "featured" ? (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            aria-expanded={all}
            className="link-draw text-sm font-medium text-primary"
          >
            {all ? "Show featured work only" : `Show all work (${rest.length + personalProjects.length} more)`}
          </button>
        </div>
      ) : null}

      {showLab ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface-2/60 p-6 sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Lab</h3>
            <span className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Personal projects, not client work
            </span>
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Independent systems where I test patterns before applying them in client work: proactive monitoring, durable memory, evidence-backed recommendations, and human approval before consequential actions.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <ProjectCard project={p} variant="personal" />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
