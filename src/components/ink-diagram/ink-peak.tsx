"use client";

import * as React from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { inkPeak } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SCROLL_SPRING } from "@/lib/motion";
import { InkDiagram } from "./ink-diagram";
import { InkDiagramStatic } from "./ink-diagram-static";
import { STAGES } from "./paths";

/* Flip to false if the mobile preset shows jank: below md the peak then
   renders as its final frame with the captions stacked. */
const PIN_ON_MOBILE = true;

const CAPTION =
  "font-heading text-2xl font-medium leading-[1.15] tracking-tight text-balance md:text-[1.75rem] lg:text-[2rem]";

function Caption({
  p,
  text,
  enter,
  exit,
}: {
  p: MotionValue<number>;
  text: string;
  enter: readonly [number, number];
  exit?: readonly [number, number];
}) {
  const inV = useTransform(p, [enter[0], enter[1]], [0, 1], { clamp: true });
  const outV = useTransform(p, exit ? [exit[0], exit[1]] : [2, 3], [0, 1], { clamp: true });
  const opacity = useTransform([inV, outV], ([i, o]: number[]) => i * (1 - o));
  const y = useTransform([inV, outV], ([i, o]: number[]) => (1 - i) * 14 - o * 10);
  return (
    <m.p data-caption className={`absolute inset-x-0 top-0 ${CAPTION}`} style={{ opacity, y }}>
      {text}
    </m.p>
  );
}

function PinnedPeak() {
  const wrapperRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <section
      ref={wrapperRef}
      id="system"
      data-chapter="system"
      data-chapter-title="The system"
      className="peak-span relative"
      style={{ height: "calc(var(--peak-span) * 100svh)" }}
    >
      <div className="grain sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="container-page grid items-center gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <InkDiagram progress={progress} className="mx-auto max-h-[62svh]" />
          </div>
          <div className="relative min-h-[7.5rem] md:col-span-4 md:min-h-[10rem]">
            <Caption p={progress} text={inkPeak.captions[0]} enter={STAGES.captionA.in} exit={STAGES.captionA.out} />
            <Caption p={progress} text={inkPeak.captions[1]} enter={STAGES.captionB.in} exit={STAGES.captionB.out} />
            <Caption p={progress} text={inkPeak.captions[2]} enter={STAGES.captionC.in} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticPeak() {
  return (
    <section
      id="system"
      data-chapter="system"
      data-chapter-title="The system"
      className="section"
    >
      <div className="container-page grid items-center gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <InkDiagramStatic className="mx-auto max-h-[62svh]" />
        </div>
        <div className="space-y-4 md:col-span-4">
          {inkPeak.captions.map((text) => (
            <p key={text} data-caption className={CAPTION}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * The peak: a pinned act, 2.8 viewport-heights on desktop (2 on mobile), in
 * which scrolling draws four scattered sources, routes them into one running
 * system, annotates it by hand, and ticks it in red. Reduced motion (or the
 * mobile fallback flag) shows the final frame instead.
 */
export function InkPeak() {
  const reduced = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)", true);
  const pinned = !reduced && (PIN_ON_MOBILE || isMd);
  return pinned ? <PinnedPeak /> : <StaticPeak />;
}
