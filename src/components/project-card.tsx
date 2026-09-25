import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectIcon } from "@/components/project-icon";
import { ProjectGlyph } from "@/components/project-glyph";
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
    <article
      className={
        external || internal
          ? "group surface flex h-full flex-col overflow-hidden transition-colors hover:border-accent-bright/40"
          : // no link, so no lift: a flat ruled panel that doesn't promise a click
            "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
      }
    >
      {/* Media: only shown for projects with a real screenshot */}
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

      {/* Featured cards open with a small drawn glyph of the artifact's shape */}
      {!project.image && project.glyph ? (
        /* fixed height so the sketch stays a motif on phones instead of a
           third of the screen; the svg keeps its own aspect inside it */
        <div className="grain relative flex h-24 items-center justify-center border-b border-border bg-surface-2 px-6">
          <ProjectGlyph kind={project.glyph} className="h-full w-auto max-w-full" />
        </div>
      ) : null}

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {project.decision ? (
          /* Featured: the tag as a caption, the title, then two plain
             sentences (the question it answers, what it reads). No labels,
             no icon: the glyph above already carries the shape. */
          <>
            <p className="caption">{project.tag}</p>
            <h3 className="mt-2 text-lg font-semibold leading-snug">{project.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground">{project.decision}.</p>
            {project.signals ? (
              <p className="mt-1 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                Reads {project.signals.charAt(0).toLowerCase() + project.signals.slice(1)}.
              </p>
            ) : null}
          </>
        ) : (
          <>
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
          </>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          {project.tools.slice(0, 3).join(" · ")}
        </p>

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
        ) : variant === "personal" ? (
          <div className="mt-3 border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">
              Personal project. Happy to walk through it.
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
