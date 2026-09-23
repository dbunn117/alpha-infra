"use client";

import * as React from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { proof } from "@/content/site";
import { Lightbox } from "@/components/lightbox";
import { RedPenLoop } from "@/components/red-pen";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/*
 * The Entec walkthrough, in two presentations of the same three steps.
 *
 * Desktop (lg+): the real morning view stays pinned while the three revenue
 * motions scroll past it. Each step lights the part of the screen it is
 * about (the rest dims, a red-pen loop draws round it). A short buffer step
 * then returns the screen to its whole, undimmed state before the pinned
 * layout releases, so the owner's quote enters cleanly underneath. Steps
 * are discrete, switched by an IntersectionObserver at mid-viewport;
 * nothing is scroll-scrubbed, and only opacity and the pen stroke animate.
 *
 * Phones and tablets: a stepper. Each step shows a different crop of the
 * screenshot, so the highlighted interface fills the visual, with the
 * heading and paragraph directly beneath, previous and next controls,
 * swipe, and progress dots.
 *
 * REGIONS and CROPS are percentages of the 1600x860 screenshot, measured by
 * eye on the image: re-measure them if the screenshot is ever replaced.
 * Crops share one aspect ratio (their width and height percentages are
 * equal), so every slide's visual is the same size.
 */
const REGIONS = [
  { left: 8.4, top: 39.5, width: 58, height: 60.5 }, // Today's Priority Actions: key-customer rows
  { left: 25.3, top: 18, width: 16.6, height: 20.2 }, // Channel 2: Inbound Inquiries
  { left: 58.5, top: 18, width: 33.2, height: 20.2 }, // Channels 4 and 5: public opportunities, targets
] as const;

const CROPS = [
  { left: 8, top: 38, width: 48, height: 48 },
  { left: 8.5, top: 10, width: 35, height: 35 },
  { left: 57.5, top: 10, width: 35, height: 35 },
] as const;
const IMG_W = 1600;
const IMG_H = 860;

function Dots({ count, active, className }: { count: number; active: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full transition-colors duration-300",
            i === active ? "bg-foreground" : "bg-foreground/25"
          )}
        />
      ))}
    </span>
  );
}

function Quote({ className }: { className?: string }) {
  /* The owner's recorded words, 2026-09-23 (see content/site.ts proof.testimonial). */
  return (
    <blockquote className={className}>
      <p className="text-pretty font-heading text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
        &ldquo;{proof.testimonial.quote}&rdquo;
      </p>
      <footer className="mt-4 text-sm font-medium text-muted-foreground">{proof.testimonial.name}</footer>
    </blockquote>
  );
}

export function EntecWalkthrough() {
  const pillars = proof.pillars;
  const [active, setActive] = React.useState(0); // desktop: 0..2 steps, 3 = released
  const [slide, setSlide] = React.useState(0); // mobile: 0..2
  const steps = React.useRef<(HTMLElement | null)[]>([]);
  const touch = React.useRef<number | null>(null);

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!proof.image) return null;
  const src = asset(proof.image.src);
  const go = (n: number) => setSlide(Math.max(0, Math.min(pillars.length - 1, n)));

  return (
    <>
      {/* ───────── Desktop: pinned screen, scrolling steps ───────── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-x-10">
          <figure className="sticky top-24 col-span-8 self-start">
            <div className="grain surface relative overflow-hidden">
              <Lightbox src={src} alt={proof.image.alt} title="Entec's morning view" />
              {REGIONS.map((r, i) => (
                <div
                  key={i}
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute rounded-lg transition-opacity duration-500 ease-out-soft",
                    active === i ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    left: `${r.left}%`,
                    top: `${r.top}%`,
                    width: `${r.width}%`,
                    height: `${r.height}%`,
                    // dims everything outside this box; clipped by the figure's overflow
                    boxShadow: "0 0 0 9999px color-mix(in oklab, var(--background) 62%, transparent)",
                  }}
                >
                  <RedPenLoop drawn={active === i} className="-inset-x-2 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]" strokeWidth={2.5} delayS={0.15} />
                </div>
              ))}
            </div>
            <figcaption className="caption mt-3 flex items-center justify-between gap-4">
              <span>The owner&rsquo;s morning view. Names and figures blurred.</span>
              <Dots count={pillars.length} active={active} />
            </figcaption>
          </figure>

          <ol className="col-span-4">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                data-step={i}
                ref={(el) => { steps.current[i] = el; }}
                className={cn(
                  "flex min-h-[78vh] flex-col justify-center py-8 transition-opacity duration-500 ease-out-soft",
                  active === i ? "opacity-100" : "opacity-40"
                )}
              >
                {i === 0 ? (
                  <p
                    className={cn(
                      "caption mb-6 inline-flex items-center gap-2 transition-opacity duration-500",
                      active === 0 ? "opacity-100" : "opacity-0"
                    )}
                  >
                    Scroll to explore the system
                    <ArrowDown className="size-3.5" aria-hidden />
                  </p>
                ) : null}
                <p className="caption text-primary">{i + 1} of {pillars.length}</p>
                <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
            {/* exit buffer: the screen returns whole before the pin releases */}
            <li
              aria-hidden
              data-step={pillars.length}
              ref={(el) => { steps.current[pillars.length] = el; }}
              className="min-h-[34vh]"
            />
          </ol>
        </div>

        <Quote className="mt-4 max-w-3xl border-t border-border pt-10" />
      </div>

      {/* ───────── Phones and tablets: a stepper with a crop per step ───────── */}
      <div className="lg:hidden">
        <div
          className="grid"
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            touch.current = null;
            if (Math.abs(dx) > 40) go(slide + (dx < 0 ? 1 : -1));
          }}
        >
          {pillars.map((p, i) => {
            const c = CROPS[i];
            const r = REGIONS[i];
            // the region, re-expressed inside the crop, clamped to its edges
            const rl = Math.max(0, ((r.left - c.left) / c.width) * 100);
            const rt = Math.max(0, ((r.top - c.top) / c.height) * 100);
            const rw = Math.min(100 - rl, (r.width / c.width) * 100);
            const rh = Math.min(100 - rt, (r.height / c.height) * 100);
            const on = slide === i;
            return (
              <article
                key={p.title}
                aria-hidden={!on}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-400 ease-out-soft",
                  on ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <div
                  className="grain surface relative overflow-hidden"
                  style={{ aspectRatio: `${c.width * IMG_W} / ${c.height * IMG_H}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={on ? `${p.title}: the relevant part of Entec's morning view` : ""}
                    className="absolute max-w-none"
                    style={{
                      width: `${(100 / c.width) * 100}%`,
                      left: `${(-c.left / c.width) * 100}%`,
                      top: `${(-c.top / c.height) * 100}%`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{ left: `${rl}%`, top: `${rt}%`, width: `${rw}%`, height: `${rh}%` }}
                  >
                    <RedPenLoop drawn={on} className="inset-0 h-full w-full" strokeWidth={2.5} delayS={0.2} />
                  </div>
                </div>
                <p className="caption mt-5 text-primary">{i + 1} of {pillars.length}</p>
                <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(slide - 1)}
            disabled={slide === 0}
            aria-label="Previous step"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-opacity disabled:opacity-30"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <div className="flex flex-col items-center gap-2">
            <Dots count={pillars.length} active={slide} />
            <span className="caption">{slide === 0 ? "Swipe or tap to explore" : `${slide + 1} of ${pillars.length}`}</span>
          </div>
          <button
            type="button"
            onClick={() => go(slide + 1)}
            disabled={slide === pillars.length - 1}
            aria-label="Next step"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-opacity disabled:opacity-30"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>

        <div className="mt-5 text-center">
          <Lightbox
            src={src}
            alt={proof.image.alt}
            title="Entec's morning view"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <Maximize2 className="size-3.5" aria-hidden />
            <span className="link-draw">View the whole screen</span>
          </Lightbox>
          <p className="caption mt-2">Names and figures blurred.</p>
        </div>

        <Quote className="mt-10 border-t border-border pt-8" />
      </div>
    </>
  );
}
