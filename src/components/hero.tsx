import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { StatStrip } from "@/components/stat-strip";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background — static, cheap, and purely aesthetic */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[560px] hero-glow" />
      </div>

      <div className="container-page pb-20 pt-20 md:pb-28 md:pt-28 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto mb-6 inline-flex items-center rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-accent-bright">
            {hero.eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {hero.subhead}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookACallButton label={hero.primaryCta} size="lg" />
            <Link
              href="#services"
              className={cn(cta({ variant: "outline", size: "lg" }))}
            >
              {hero.secondaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <StatStrip stats={hero.stats} className="mx-auto mt-16 max-w-3xl" />
      </div>
    </section>
  );
}
