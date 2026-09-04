import { cn } from "@/lib/utils";

/*
 * One chapter of the homepage. `data-chapter` and `data-chapter-title` feed
 * the margin folio (chapter-folio.tsx).
 */
export function Chapter({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-chapter={id}
      data-chapter-title={title}
      className={cn("section scroll-mt-16", className)}
    >
      {children}
    </section>
  );
}
