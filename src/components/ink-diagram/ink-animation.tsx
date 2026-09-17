"use client";

import * as React from "react";
import { useAnimate, type AnimationSequence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import { InkDiagramStatic } from "./ink-diagram-static";
import { CLIP_HIDDEN, CLIP_SHOWN, SOURCES, TIMELINE as T } from "./paths";

/*
 * The ink diagram's motion: one quick sequence that draws four sources,
 * routes them into one system, annotates it by hand, and loops the key row
 * in red, then holds the finished frame for good. Every segment uses
 * explicit [from, to] keyframes. Paused until it is first in view; reduced
 * motion shows the final frame.
 */
/* A stroke draws over [at, at+duration]; it also flips from invisible to
   visible at `at` so its round caps never show as a dot beforehand. */
function draw(seq: AnimationSequence, selector: string, at: number, duration: number) {
  seq.push([selector, { opacity: [0, 1] }, { duration: 0.05, at }]);
  seq.push([selector, { pathLength: [0, 1] }, { duration, at }]);
}

function buildSequence(): AnimationSequence {
  const seq: AnimationSequence = [];

  SOURCES.forEach((s, i) => {
    const at = T.sourceStart + i * T.sourceGap;
    s.strokes.forEach((_, k) => {
      draw(seq, `[data-ink-source="${s.id}"] [data-ink-i="${k}"]`, at + k * T.strokeStagger, T.strokeDuration);
    });
    const glyphEnd = at + T.strokeDuration + (s.strokes.length - 1) * T.strokeStagger;
    seq.push([
      `[data-ink-source="${s.id}"] [data-ink="fade"]`,
      { opacity: [0, 1] },
      { duration: T.labelDuration, at: glyphEnd - 0.3 },
    ]);
  });

  SOURCES.forEach((s, i) => {
    draw(seq, `[data-ink-route="${s.id}"]`, T.routesStart + i * T.routeGap, T.routeDuration);
  });

  draw(seq, "[data-ink-plate-outline]", T.plateStart, T.plateDuration);
  seq.push(["[data-ink-plate-outline]", { fillOpacity: [0, 0.06] }, { duration: T.plateFillDuration, at: T.plateFillStart }]);
  seq.push(['[data-ink-plate] [data-ink="fade"]', { opacity: [0, 1] }, { duration: T.plateFillDuration, at: T.plateFillStart }]);

  seq.push([
    '[data-ink="clip"]',
    { clipPath: [CLIP_HIDDEN, CLIP_SHOWN] },
    { duration: T.annotationDuration, at: T.annotationStart, ease: "linear" },
  ]);
  draw(seq, "[data-ink-arrow]", T.arrowStart, T.arrowDuration);
  draw(seq, "[data-ink-arrowhead]", T.arrowHeadStart, T.arrowHeadDuration);

  draw(seq, "[data-ink-tick] path", T.tickStart, T.tickDuration);
  seq.push(["[data-ink-tick]", { scale: [1, 1.06, 1] }, { duration: T.settleDuration, at: T.settleStart }]);

  return seq;
}

export function InkAnimation({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  React.useEffect(() => {
    if (reduced) return;
    const el = scope.current;
    if (!el) return;
    // Draws once and holds the finished frame; paused until first in view.
    const controls = animate(buildSequence(), {
      defaultTransition: { ease: EASE_OUT },
    });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.play();
          el.dataset.inkState = "playing";
        } else {
          controls.pause();
          el.dataset.inkState = "paused";
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controls.stop();
    };
  }, [animate, reduced, scope]);

  if (reduced) return <InkDiagramStatic className={className} />;
  return (
    <div ref={scope} className={className}>
      <InkDiagramStatic animated />
    </div>
  );
}
