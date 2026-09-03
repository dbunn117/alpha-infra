import type { Service } from "@/content/services";
import { Reveal } from "@/components/reveal";
import { DrawnCross, DrawnTick } from "@/components/drawn-mark";

/*
 * Five ways AI projects stall, each paired with the step of the engagement
 * that prevents it. The cross draws for the failure, the tick for the
 * counter. Figures cite one dated primary source, linked in the footnote.
 */
export function StallLedger({ stalls }: { stalls: NonNullable<Service["stalls"]> }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-balance text-2xl font-semibold">{stalls.heading}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{stalls.intro}</p>
        <ol className="mt-8 divide-y divide-border border-y border-border">
          {stalls.items.map((item, i) => (
            <Reveal as="li" key={item.fail} delay={i * 0.05} className="py-6">
              <div className="grid grid-cols-[2rem_1fr] gap-4">
                <DrawnCross className="mt-1 text-muted-foreground" />
                <div>
                  <p className="font-heading text-xl font-medium leading-snug">{item.fail}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
              <div
                className="mt-4 grid grid-cols-[2rem_1fr] gap-4"
                style={{ "--draw-delay": "0.45s" } as React.CSSProperties}
              >
                <DrawnTick className="mt-0.5" />
                <p className="leading-relaxed text-foreground">
                  <span className="font-medium">Here:</span> {item.counter}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          <a
            href={stalls.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw"
          >
            {stalls.source.label}
          </a>
        </p>
      </section>
    </Reveal>
  );
}
