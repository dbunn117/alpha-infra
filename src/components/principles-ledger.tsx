"use client";

import * as React from "react";
import { principles } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/*
 * Seven beliefs as a ledger: prose at reading measure with hairlines, and a
 * sticky numeral in the margin that crossfades to whichever belief sits in
 * the middle of the viewport.
 */
export function PrinciplesLedger() {
  const listRef = React.useRef<HTMLOListElement>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[data-index]") ?? []
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-index")));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    for (const item of items) io.observe(item);
    return () => io.disconnect();
  }, []);

  return (
    <Chapter id="principles" title="Principles">
      <div className="container-page">
        <SectionHeading
          eyebrow={principles.eyebrow}
          heading={principles.heading}
          intro={principles.intro}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <span
                aria-hidden
                className="grid font-heading text-[11rem] font-medium leading-none tabular-nums text-primary"
              >
                {principles.items.map((item, i) => (
                  <span
                    key={item.order}
                    className={cn(
                      "col-start-1 row-start-1 transition-opacity duration-300 ease-out-soft",
                      i === active ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {item.order}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <ol ref={listRef} className="divide-y divide-border border-t border-border">
            {principles.items.map((item, i) => (
              <li key={item.order} data-index={i} className="py-8">
                <Reveal className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                  <span className="caption pt-2">
                    {item.order}
                  </span>
                  <div>
                    <h3 className="text-balance text-2xl leading-snug">
                      {item.title}
                    </h3>
                    <p className="measure mt-3 leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Chapter>
  );
}
