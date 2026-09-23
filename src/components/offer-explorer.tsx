"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { OfferLedger } from "@/components/offer-ledger";
import { ServiceCard } from "@/components/service-card";
import { InteractiveChip } from "@/components/interactive-chip";
import { cn } from "@/lib/utils";

/*
 * The path finder: one question, three answers, in front of the full
 * comparison. Choosing an answer names the offer that fits, says why in the
 * offer's own "start here if" words, tints its column in the ledger, and on
 * phones expands only that offer so the section is one screen, not three.
 * The whole ledger stays underneath for anyone doing diligence.
 */
export function OfferExplorer({ services }: { services: Service[] }) {
  const [slug, setSlug] = React.useState<string | null>(null);
  const chosen = services.find((s) => s.slug === slug) ?? null;

  return (
    <div>
      <div className="rounded-2xl border border-border bg-surface-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl">Where are you starting?</h3>
          <InteractiveChip verb="pick one" />
        </div>
        <div role="radiogroup" aria-label="Where are you starting?" className="mt-4 grid gap-3 md:grid-cols-3">
          {services.map((s) => {
            const on = s.slug === slug;
            return (
              <button
                key={s.slug}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSlug(on ? null : s.slug)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm font-medium leading-snug transition-[border-color,background-color,color] duration-150",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/40 bg-surface-1 text-foreground hover:border-primary hover:bg-primary/5"
                )}
              >
                {s.scan?.choice ?? s.name}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className={cn("mt-4 text-sm leading-relaxed", !chosen && "sr-only")}>
          {chosen ? (
            <>
              <span className="font-semibold text-foreground">Start with {chosen.name}.</span>{" "}
              <span className="text-muted-foreground">It fits when {chosen.pain}</span>{" "}
              <Link href={`/services/${chosen.slug}`} className="group/link inline-flex items-center gap-1 font-medium text-primary">
                <span className="link-draw">See {chosen.name}</span>
                <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
              </Link>
            </>
          ) : (
            ""
          )}
        </p>
      </div>

      {/* Phones and tablets: compact rows, with only the chosen offer opened */}
      <ul className="mt-6 space-y-3 lg:hidden">
        {services.map((s) =>
          s.slug === slug ? (
            <li key={s.slug}>
              <ServiceCard service={s} variant="door" />
            </li>
          ) : (
            <li key={s.slug} className="rounded-xl border border-border bg-surface-1 px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold">{s.name}</p>
                <p className="shrink-0 text-sm font-semibold tabular-nums">{s.priceDisplay}</p>
              </div>
              {s.scan ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.scan.outcome} · {s.scan.time}
                </p>
              ) : null}
              <Link href={`/services/${s.slug}`} className="link-draw mt-2 inline-block text-sm font-medium text-primary">
                Learn more<span className="sr-only"> about {s.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Desktop: the full comparison, chosen column tinted */}
      <div className="mt-10">
        <OfferLedger services={services} variant="door" highlight={slug} mobile={false} />
      </div>
    </div>
  );
}
