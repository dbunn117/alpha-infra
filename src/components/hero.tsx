import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { BookACallButton } from "@/components/book-a-call-button";
import { MorningView } from "@/components/morning-view";
import { riseDelay } from "@/lib/motion";

/*
 * Hero: a headline, two sentences, one button, and the live morning view.
 * The view is the thesis, not an illustration of it. On phones it stacks
 * under the copy within the first screen and a half.
 */
export function Hero() {
  return (
    <section id="top" data-chapter="top" data-chapter-title="Top" className="border-b border-border">
      <div className="container-page grid items-center gap-10 py-12 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-6">
          <p className="eyebrow rise" style={riseDelay(0)}>
            {hero.eyebrow}
          </p>
          <h1
            className="rise mt-6 max-w-3xl text-balance font-heading text-[2.5rem] font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
            style={riseDelay(0.08)}
          >
            {hero.headline}
          </h1>
          <p
            className="rise measure mt-7 text-pretty text-lg leading-relaxed text-muted-foreground"
            style={riseDelay(0.2)}
          >
            {hero.subhead}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={riseDelay(0.3)}>
            <BookACallButton label={hero.primaryCta} size="lg" />
            <Link href="#how-it-works" className="group/link inline-flex items-center gap-1.5 font-medium text-foreground">
              <span className="link-draw">{hero.secondaryCta}</span>
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="rise lg:col-span-6" style={riseDelay(0.3)}>
          <MorningView compact className="mx-auto w-full max-w-[640px] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
