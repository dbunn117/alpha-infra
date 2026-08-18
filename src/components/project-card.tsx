import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectIcon } from "@/components/project-icon";
import { asset } from "@/lib/asset";

export function ProjectCard({
  project,
  variant = "personal",
}: {
  project: Project;
  variant?: "professional" | "personal";
}) {
  const external = Boolean(project.href);
  const internal = Boolean(project.internalHref);

  return (
    <article className="group surface flex h-full flex-col overflow-hidden transition-colors hover:border-accent-bright/40">
      {/* Media — only shown for projects with a real screenshot */}
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(project.image)}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-lg border border-border bg-secondary text-accent-bright">
            <ProjectIcon name={project.icon} className="size-4" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {project.tag}
          </span>
        </div>

        <h3 className="mt-2.5 text-base font-semibold">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-muted-foreground">
          {project.blurb}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tools.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        {external || internal ? (
          <div className="mt-3 border-t border-border pt-3">
            {external ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-bright hover:underline"
              >
                {project.linkLabel ?? "Visit site"}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : (
              <Link
                href={project.internalHref!}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-bright hover:underline"
              >
                {project.linkLabel ?? "See more"}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-3 border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">
              {variant === "professional"
                ? "Confidential engagement — details on request."
                : "Personal project — happy to walk through it."}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
