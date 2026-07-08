import { cn } from "@/lib/utils";

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
    <section className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px]" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 hero-glow" />
      </div>
      <div className="container-page pb-6 pt-16 md:pt-20">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-bright">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subhead ? (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {subhead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
