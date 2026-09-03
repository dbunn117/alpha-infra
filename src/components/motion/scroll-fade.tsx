"use client";

import * as React from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/*
 * Drifts its children up and fades them out as the block scrolls off the top
 * of the viewport (the title page leaving). MotionValues write straight to
 * the DOM, so scrolling never re-renders React.
 */
export function ScrollFade({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -distance]);

  return (
    <m.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { opacity, y }}
    >
      {children}
    </m.div>
  );
}
