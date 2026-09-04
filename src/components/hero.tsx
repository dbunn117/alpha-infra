import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { InkAnimation } from "@/components/ink-diagram/ink-animation";
import { cta } from "@/lib/cta";
import { riseDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Hero: copy on the left, the looping ink diagram on the right. Lines rise
 * in on load (JS only). The diagram is hidden below sm, where its labels
 * would be too small to read.
 */
export function Hero() {
  return (
    <section id="top" data-chapter="top" data-chapter-title="Top" className="border-b border-border">
      <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <p className="eyebrow rise" style={riseDelay(0)}>
            {hero.eyebrow}
          </p>
          <h1
            className="rise mt-6 max-w-3xl text-balance font-heading text-[2.5rem] font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
            style={riseDelay(0.08)}
          >
            {hero.headline}
          </h1>
          <p
            className="rise measure mt-7 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl"
            style={riseDelay(0.2)}
          >
            {hero.subhead}
          </p>
          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={riseDelay(0.3)}
          >
            <BookACallButton label={hero.primaryCta} size="lg" />
            <Link href="#services" className={cn(cta({ variant: "outline", size: "lg" }))}>
              {hero.secondaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <p className="rise measure mt-5 text-sm text-muted-foreground" style={riseDelay(0.38)}>
            {hero.ctaNote}
          </p>
        </div>

        <div className="rise hidden sm:block lg:col-span-5" style={riseDelay(0.3)}>
          <InkAnimation className="mx-auto w-full max-w-[640px] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
