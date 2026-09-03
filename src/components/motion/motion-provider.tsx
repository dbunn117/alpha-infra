"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/*
 * Mounted on the homepage only (not the root layout) so inner pages ship no
 * animation runtime. `strict` throws if anything imports the full `motion`
 * component instead of `m`, which keeps the bundle honest.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
