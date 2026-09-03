import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { InlineScript } from "@/components/inline-script";
import { ScrollFade } from "@/components/motion/scroll-fade";
import { cta } from "@/lib/cta";
import { riseDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Title page. Ink ground, type only, left-anchored, bottom-set like a book's
 * half-title. Lines rise in on load; the whole block drifts up and fades as
 * the reader scrolls into the peak. No metric strip: the three real figures
 * live in the About plate's facts line.
 *
 * The inline script flips the nav to the Ink ground before first paint on
 * hard loads; nav.tsx's observer takes over after hydration.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-chapter="top"
      data-chapter-title="Title"
      className="grain relative"
    >
      <InlineScript html="var n=document.querySelector('[data-site-nav]');if(n)n.setAttribute('data-ground','ink');" />
      <ScrollFade className="container-page flex min-h-svh flex-col justify-end pb-20 pt-32 md:pb-28">
        <p className="eyebrow rise" style={riseDelay(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="mt-8 max-w-5xl font-heading text-[2.5rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]">
          {hero.headlineLines.map((line, i) => (
            <span key={line} className="rise sm:block" style={riseDelay(0.08 + i * 0.08)}>
              {line}{" "}
            </span>
          ))}
        </h1>
        <p
          className="rise measure mt-8 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          style={riseDelay(0.3)}
        >
          {hero.subhead}
        </p>
        <div
          className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={riseDelay(0.38)}
        >
          <BookACallButton label={hero.primaryCta} size="lg" />
          <Link
            href="#services"
            className={cn(cta({ variant: "outline", size: "lg" }))}
          >
            {hero.secondaryCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <p className="rise measure mt-5 text-sm text-muted-foreground" style={riseDelay(0.46)}>
          {hero.ctaNote}
        </p>
      </ScrollFade>
    </section>
  );
}
