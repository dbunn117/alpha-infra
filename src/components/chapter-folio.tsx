"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ChapterRef = { id: string; title: string };

/*
 * Margin folio listing the chapters. When a chapter's bottom passes the
 * middle of the viewport, an ink tick draws beside it and stays, so by the
 * close the margin reads as a reviewed checklist. Hidden below xl; ticks
 * appear without drawing under reduced motion.
 */
export function ChapterFolio() {
  const [chapters, setChapters] = React.useState<ChapterRef[]>([]);
  const [done, setDone] = React.useState<ReadonlySet<string>>(() => new Set());
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const raf = requestAnimationFrame(() =>
      setChapters(
        els.map((el) => ({
          id: el.dataset.chapter ?? "",
          title: el.dataset.chapterTitle ?? el.dataset.chapter ?? "",
        }))
      )
    );

    const ioDone = new IntersectionObserver(
      (entries) => {
        setDone((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.chapter ?? "";
            const passed =
              !entry.isIntersecting && entry.boundingClientRect.bottom < window.innerHeight / 2;
            if (passed && !next.has(id)) {
              next.add(id);
              changed = true;
            } else if (!passed && next.has(id)) {
              next.delete(id);
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      { rootMargin: "-50% 0px 0px 0px", threshold: 0 }
    );
    const ioActive = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).dataset.chapter ?? null);
          }
        }
      },
      { rootMargin: "-50% 0px -49% 0px", threshold: 0 }
    );
    for (const el of els) {
      ioDone.observe(el);
      ioActive.observe(el);
    }
    return () => {
      cancelAnimationFrame(raf);
      ioDone.disconnect();
      ioActive.disconnect();
    };
  }, []);

  if (chapters.length === 0) return null;

  return (
    <nav
      aria-label="Chapters"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {chapters.map((chapter, i) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={cn(
            "caption group flex items-center gap-2 transition-colors duration-200",
            active === chapter.id ? "text-primary" : "hover:text-foreground"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "size-3.5 shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]",
              done.has(chapter.id) && "is-drawn"
            )}
            strokeWidth={2.25}
            aria-hidden
          >
            <path d="M4,12.5 L9.5,18 L20,6.5" pathLength={1} data-stroke />
          </svg>
          <span className="tabular-nums">{String(i).padStart(2, "0")}</span>
          <span className="hidden 2xl:inline">{chapter.title}</span>
          <span className="sr-only 2xl:hidden">{chapter.title}</span>
        </a>
      ))}
    </nav>
  );
}
