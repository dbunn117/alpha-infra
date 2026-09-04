import { fitCheck } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { DrawnCross, DrawnTick } from "@/components/drawn-mark";

/*
 * Two ledger columns, no cards.
 * Each "might be you" row gets a tick drawn in ink; each "not a fit" row a
 * drawn cross. Marks draw as rows reveal, with a small stagger.
 */
export function FitLedger() {
  return (
    <Chapter id="fit" title="Fit">
      <div className="container-page">
        <SectionHeading
          eyebrow={fitCheck.eyebrow}
          heading={fitCheck.heading}
          intro={fitCheck.intro}
        />

        <div className="mt-14 grid gap-x-20 gap-y-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="border-b border-border pb-3 text-sm font-semibold text-muted-foreground">
              This might be you if
            </p>
            <ol className="divide-y divide-border">
              {fitCheck.forYou.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 0.05}
                  className="grid grid-cols-[2rem_1fr] gap-4 py-7"
                >
                  <DrawnTick className="mt-1 size-6 text-primary" />
                  <div>
                    <p className="text-balance text-xl font-semibold leading-snug">
                      {item.title}
                    </p>
                    <p className="measure mt-2 leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <p className="border-b border-border pb-3 text-sm font-semibold text-muted-foreground">
              Probably not a fit if
            </p>
            <ul className="divide-y divide-border">
              {fitCheck.notForYou.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={0.1 + i * 0.05}
                  className="grid grid-cols-[2rem_1fr] gap-4 py-5"
                >
                  <DrawnCross className="mt-0.5 text-muted-foreground" />
                  <p className="leading-relaxed text-muted-foreground">{item}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
