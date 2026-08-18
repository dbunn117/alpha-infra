import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceIcon } from "@/components/service-icon";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group surface relative flex h-full flex-col p-6 transition-colors hover:border-accent-bright/40",
        service.mostPopular && "border-accent-bright/40"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-accent-bright">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <span className="stat-number text-sm font-semibold">
          {service.order}
        </span>
      </div>

      <h3 className="mt-5 flex items-center gap-2 text-xl font-semibold">
        {service.name}
        {service.mostPopular ? (
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            flagship
          </span>
        ) : null}
        {service.isEntry ? (
          <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            entry
          </span>
        ) : null}
        {service.isHighEnd ? (
          <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            high end
          </span>
        ) : null}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.tagline}
      </p>

      <p className="mt-4 text-sm text-foreground">
        <span className="text-muted-foreground">Best for:</span>{" "}
        {service.bestFor}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-lg font-semibold text-accent-bright">
          {service.priceDisplay}
        </span>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent-bright"
        >
          Learn more<span className="sr-only"> about {service.name}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
