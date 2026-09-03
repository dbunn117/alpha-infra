import { cn } from "@/lib/utils";

/*
 * One chapter of the homepage. `data-chapter` and `data-chapter-title` feed
 * the margin folio (chapter-folio.tsx); `data-ground` tells the nav which
 * ground it is passing over. Paper is the default ground.
 */
export function Chapter({
  id,
  title,
  ground = "paper",
  className,
  children,
}: {
  id: string;
  title: string;
  ground?: "ink" | "paper";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-chapter={id}
      data-chapter-title={title}
      data-ground={ground === "ink" ? "ink" : undefined}
      className={cn("section scroll-mt-16", className)}
    >
      {children}
    </section>
  );
}
