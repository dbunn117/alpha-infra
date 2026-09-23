import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { DrawnTick } from "@/components/drawn-mark";
import { cn } from "@/lib/utils";

const LIFT =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-primary/30 hover:surface-raised motion-reduce:transform-none";

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
 * Offer card. Every card opens with the buyer situation it answers ("Start
 * here if"), then the name, the one-liner, and the price. Front doors also
 * list three headline deliverables.
 */
export function ServiceCard({
  service,
  variant = "door",
}: {
  service: Service;
  variant?: "door" | "extension";
}) {
  const door = variant === "door";
  return (
    <article className={cn("group surface flex h-full flex-col p-7", LIFT)}>
      <div className="flex items-center justify-between gap-3">
        <p className="caption">
          {service.role}
        </p>
        {service.chip ? (
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            {service.chip}
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-snug">
        <span className="font-semibold text-primary">Start here if</span>{" "}
        <span className="text-foreground">{service.pain}</span>
      </p>

      <h3 className={cn("mt-4 leading-snug", door ? "text-2xl" : "text-xl")}>{service.name}</h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>

      {door && service.highlights ? (
        <ul className="mt-5 space-y-2">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <DrawnTick className="mt-0.5 size-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-5">
        <span className="text-lg font-semibold tabular-nums">{service.priceDisplay}</span>
        <LearnMore service={service} />
      </div>
    </article>
  );
}
