import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { DrawnTick } from "@/components/drawn-mark";
import { cn } from "@/lib/utils";

const LIFT =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-primary/30 hover:surface-raised motion-reduce:transform-none";

function chipLabel(service: Service) {
  if (service.mostPopular) return "Flagship";
  if (service.isEntry) return "Entry";
  if (service.isHighEnd) return "High end";
  return null;
}

function LearnMore({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary"
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
 * Offer card. The flagship spans two columns and lists its three headline
 * deliverables; the others share one layout.
 */
export function ServiceCard({
  service,
  variant = "standard",
}: {
  service: Service;
  variant?: "flagship" | "standard";
}) {
  const chip = chipLabel(service);
  const flagship = variant === "flagship";

  return (
    <article className={cn("group surface flex h-full flex-col p-7", flagship && "sm:p-9", LIFT)}>
      <div className="flex items-center justify-between gap-3">
        <p className="caption">
          {service.order} · {service.group}
        </p>
        {chip ? (
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            {chip}
          </span>
        ) : null}
      </div>

      <h3 className={cn("mt-4 leading-snug", flagship ? "text-3xl" : "text-2xl")}>{service.name}</h3>

      <p className={cn("mt-4 leading-relaxed text-muted-foreground", flagship && "measure")}>
        {service.tagline}
      </p>

      {flagship && service.highlights ? (
        <ul className="mt-5 space-y-2">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <DrawnTick className="mt-0.5 size-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 text-sm text-foreground">
        <span className="text-muted-foreground">Best for:</span> {service.bestFor}
      </p>

      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-5">
        <span className="text-lg font-semibold tabular-nums">{service.priceDisplay}</span>
        <LearnMore service={service} />
      </div>
    </article>
  );
}
