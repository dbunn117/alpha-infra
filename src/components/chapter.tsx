import { cn } from "@/lib/utils";

/*
 * One chapter of the homepage. `data-chapter` and `data-chapter-title` feed
 * the margin folio (chapter-folio.tsx).
 *
 * `tone` gives the page its rhythm without new colours: "paper" is the
 * narrative ground, "system" is a few percent of Ink Blue for sections
 * about how the machine works, and "ink" flips the chapter to the dark
 * tokens for one proof moment per page. `tight` trims the padding for
 * chapters that don't need ceremony (FAQ, catalogues).
 */
export function Chapter({
  id,
  title,
  className,
  tone = "paper",
  tight = false,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  tone?: "paper" | "system" | "ink";
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-chapter={id}
      data-chapter-title={title}
      className={cn(
        tight ? "section-tight" : "section",
        "scroll-mt-16",
        tone === "system" && "tone-system",
        tone === "ink" && "dark tone-ink bg-background text-foreground",
        className
      )}
    >
      {children}
    </section>
  );
}
