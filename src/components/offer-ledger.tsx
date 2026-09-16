import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { DrawnTick } from "@/components/drawn-mark";
import { RedPenLoop } from "@/components/red-pen";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { cn } from "@/lib/utils";

/*
 * Offers as a workpaper ledger, not a row of cards: one column per offer,
 * one hairlined row per question a buyer asks (start here if, what you get,
 * fee). Rows line up across offers so the three can be read against each
 * other. Below lg the columns would be too narrow to compare, so the
 * existing ServiceCard stacks instead. The flagship's name carries the
 * section's one red-pen mark.
 */
function LearnMore({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary"
    >
      <span className="link-draw">Learn more</span>
      <span className="sr-only"> about {service.name}</span>
      <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
    </Link>
  );
}

export function OfferLedger({
  services,
  variant = "door",
  showHighlights = true,
}: {
  services: Service[];
  variant?: "door" | "extension";
  /* the "You get" row; the homepage omits it and lets /services carry it */
  showHighlights?: boolean;
}) {
  const door = variant === "door" && showHighlights;
  const cols = services.length;
  const grid = cols === 3 ? "lg:grid-cols-[7.5rem_repeat(3,minmax(0,1fr))]" : "lg:grid-cols-[7.5rem_repeat(2,minmax(0,1fr))]";
  const cell = "px-5 py-5 first:pl-0";
  const label = "caption pt-6";

  return (
    <>
      {/* Stacked cards below lg */}
      <div className={cn("grid gap-5 lg:hidden", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.05}>
            <ServiceCard service={service} variant={variant} />
          </Reveal>
        ))}
      </div>

      {/* Ledger at lg and up */}
      <Reveal className={cn("hidden lg:grid", grid)}>
        {/* header row: order, name, tagline */}
        <div aria-hidden />
        {services.map((s) => (
          <div key={s.slug} className={cn(cell, "pt-0")}>
            <div className="flex items-center justify-between gap-3">
              <p className="caption">{s.order} · {s.role}</p>
              {s.chip ? (
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">{s.chip}</span>
              ) : null}
            </div>
            <h3 className={cn("mt-3 leading-snug", variant === "door" ? "text-2xl" : "text-xl")}>
              {s.chip === "Flagship" ? (
                <span className="relative inline-block">
                  {s.name}
                  <RedPenLoop className="-inset-x-3 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1.5rem)]" strokeWidth={2} delayS={0.4} />
                </span>
              ) : s.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
          </div>
        ))}

        {/* start here if */}
        <p className={cn(label, "border-t border-border")}>Start here if</p>
        {services.map((s) => (
          <div key={s.slug} className={cn(cell, "border-t border-border")}>
            <p className="text-sm leading-snug text-foreground">{s.pain}</p>
          </div>
        ))}

        {/* you get */}
        {door ? (
          <>
            <p className={cn(label, "border-t border-border")}>You get</p>
            {services.map((s) => (
              <div key={s.slug} className={cn(cell, "border-t border-border")}>
                <ul className="space-y-2">
                  {s.highlights?.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                      <DrawnTick className="mt-0.5 size-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : null}

        {/* fee */}
        <p className={cn(label, "border-y border-border")}>Fee</p>
        {services.map((s) => (
          <div key={s.slug} className={cn(cell, "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-y border-border")}>
            <span className="text-lg font-semibold tabular-nums">{s.priceDisplay}</span>
            <LearnMore service={s} />
          </div>
        ))}
      </Reveal>
    </>
  );
}
