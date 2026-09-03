import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { InkDiagramStatic } from "@/components/ink-diagram/ink-diagram-static";
import { DrawnTick } from "@/components/drawn-mark";
import { cn } from "@/lib/utils";

const LIFT =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:surface-raised motion-reduce:transform-none";

function Badge({ service }: { service: Service }) {
  const label = service.mostPopular
    ? "Flagship"
    : service.isEntry
      ? "Entry"
      : service.isHighEnd
        ? "High end"
        : null;
  return (
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {service.order}
      {label ? ` · ${label}` : null}
    </p>
  );
}

function LearnMore({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
        className
      )}
    >
      <span className="link-draw">Learn more</span>
      <span className="sr-only"> about {service.name}</span>
      <ArrowRight
        className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

/*
 * Offerings come in three sizes: the flagship plate (two columns, with the
 * diagram's final frame as art bleeding off its corner), the entry card, and
 * a ledger row for the services that come later in a relationship.
 */
export function ServiceCard({
  service,
  variant = "entry",
}: {
  service: Service;
  variant?: "flagship" | "entry" | "row";
}) {
  if (variant === "row") {
    return (
      <div className="group grid gap-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
        <span className="pt-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {service.order}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-2xl font-medium leading-snug">{service.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <span className="font-heading text-lg">{service.priceDisplay}</span>
            <LearnMore service={service} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "flagship") {
    return (
      <article className={cn("group surface relative flex h-full flex-col overflow-hidden", LIFT)}>
        <div className="grid h-full gap-8 p-7 sm:p-9 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col">
            <Badge service={service} />
            <h3 className="mt-4 font-heading text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl">
              {service.name}
            </h3>
            <p className="measure mt-5 leading-relaxed text-muted-foreground">
              {service.tagline}
            </p>
            {service.highlights ? (
              <ul className="mt-5 space-y-2">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <DrawnTick className="mt-0.5 size-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-4 text-sm text-foreground">
              <span className="text-muted-foreground">Best for:</span> {service.bestFor}
            </p>
            <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-6">
              <span className="font-heading text-xl">{service.priceDisplay}</span>
              <LearnMore service={service} />
            </div>
          </div>
          <div className="relative hidden min-h-[16rem] md:block" aria-hidden>
            <InkDiagramStatic
              showAnnotation={false}
              tickTone="mono"
              className="absolute -bottom-10 -right-14 w-[130%] max-w-none opacity-80 transition-transform duration-500 ease-out-soft group-hover:-translate-y-1"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group surface relative flex h-full flex-col p-7", LIFT)}>
      <Badge service={service} />
      <h3 className="mt-4 font-heading text-2xl font-medium leading-snug tracking-tight">
        {service.name}
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{service.tagline}</p>
      <p className="mt-4 text-sm text-foreground">
        <span className="text-muted-foreground">Best for:</span> {service.bestFor}
      </p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
        <span className="font-heading text-xl">{service.priceDisplay}</span>
        <LearnMore service={service} />
      </div>
    </article>
  );
}
