"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Lightweight scroll-in reveal — CSS transition + IntersectionObserver, no
 * animation library. Fade/slide is applied only when JS is present (the `js`
 * class on <html>, set synchronously in the layout to avoid a flash) and when
 * the user hasn't asked for reduced motion. Without JS, content is always
 * visible; reduced-motion users skip straight to the resting state.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
