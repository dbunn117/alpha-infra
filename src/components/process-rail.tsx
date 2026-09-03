"use client";

import * as React from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { howItWorks } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SCROLL_SPRING } from "@/lib/motion";

const STEPS = howItWorks.steps;
/* A slightly wavering pen line across a 1000-unit stage */
const RULE = "M0,6 C120,4.5 260,7.5 400,5.5 S640,4 780,6.5 S920,7 1000,5.5";
const RULE_RANGE: readonly [number, number] = [0.06, 0.9];

/* Progress at which the rule reaches step i's dot (dots sit at column starts) */
function stepAt(i: number) {
  return RULE_RANGE[0] + (RULE_RANGE[1] - RULE_RANGE[0]) * (i / STEPS.length) + 0.03;
}

function StepBody({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {step.order}
      </span>
      <h3 className="mt-3 font-heading text-2xl font-medium leading-snug tracking-tight">
        {step.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
    </>
  );
}

function Step({ p, index }: { p: MotionValue<number>; index: number }) {
  const t = stepAt(index);
  const opacity = useTransform(p, [t - 0.03, t + 0.03], [0.35, 1], { clamp: true });
  const y = useTransform(p, [t - 0.03, t + 0.03], [10, 0], { clamp: true });
  const dot = useTransform(p, [t - 0.02, t + 0.01], [0, 1], { clamp: true });
  return (
    <m.li data-step className="relative pt-10" style={{ opacity, y }}>
      <m.span
        aria-hidden
        className="absolute left-0 top-0 size-3 rounded-full bg-foreground"
        style={{ scale: dot }}
      />
      <StepBody step={STEPS[index]} />
    </m.li>
  );
}

function PinnedRail() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, SCROLL_SPRING);
  const rule = useTransform(p, [RULE_RANGE[0], RULE_RANGE[1]], [0, 1], { clamp: true });
  const ruleOpacity = useTransform(rule, [0, 0.01], [0, 1], { clamp: true });

  return (
    <section
      ref={ref}
      id="how-it-works"
      data-chapter="how-it-works"
      data-chapter-title="Process"
      className="relative scroll-mt-16"
      style={{ height: "160svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center">
        <div className="container-page">
          <SectionHeading heading={howItWorks.heading} />
          <div className="relative mt-16">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-3 w-full"
              viewBox="0 0 1000 12"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            >
              <m.path
                d={RULE}
                style={{ pathLength: rule, opacity: ruleOpacity }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol className="grid grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <Step key={step.order} p={p} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticRail() {
  return (
    <section
      id="how-it-works"
      data-chapter="how-it-works"
      data-chapter-title="Process"
      className="section scroll-mt-16"
    >
      <div className="container-page">
        <SectionHeading heading={howItWorks.heading} />
        <Reveal className="relative mt-14">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-3 w-full md:block"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            <path d={RULE} pathLength={1} data-stroke vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.order} data-step className="relative md:pt-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 hidden size-3 rounded-full bg-foreground md:block"
                />
                <StepBody step={step} />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/*
 * Process as a pinned rail: a pen line draws left to right with scroll and
 * each step turns from faint to full ink as the line reaches it. Below md, or
 * with reduced motion, it is a plain drawn list.
 */
export function ProcessRail() {
  const reduced = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)", true);
  return !reduced && isMd ? <PinnedRail /> : <StaticRail />;
}
