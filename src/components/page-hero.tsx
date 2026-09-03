import { cn } from "@/lib/utils";
import { riseDelay } from "@/lib/motion";

/*
 * Inner-page title page: a hairline, a mono folio, a Newsreader headline,
 * and a 62ch subhead, all left-anchored. Lines rise in on load (JS only).
 */
export function PageHero({
  eyebrow,
  title,
  subhead,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative", className)}>
      <div className="container-page pb-6 pt-12 md:pt-16">
        <div className="border-t border-border pt-6 md:pt-8">
          {eyebrow ? (
            <p className="eyebrow rise" style={riseDelay(0)}>
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="rise mt-5 max-w-4xl text-balance font-heading text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            style={riseDelay(0.08)}
          >
            {title}
          </h1>
          {subhead ? (
            <p
              className="rise measure mt-6 text-pretty text-lg leading-relaxed text-muted-foreground"
              style={riseDelay(0.16)}
            >
              {subhead}
            </p>
          ) : null}
          {children ? (
            <div className="rise mt-8" style={riseDelay(0.24)}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
