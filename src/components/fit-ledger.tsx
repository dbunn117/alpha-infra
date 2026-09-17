import { fitCheck } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { DrawnCross, DrawnTick } from "@/components/drawn-mark";
import { RedPenNote } from "@/components/red-pen";

/*
 * Two ledger columns, no cards, one line per row: five ticks, four crosses.
 * The explanatory sentences under each "might be you" item were dropped so
 * the columns balance and the section scans in seconds.
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

        <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
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
                  className="grid grid-cols-[2rem_1fr] gap-4 py-4"
                >
                  <DrawnTick className="mt-0.5 size-6 text-primary" />
                  <p className="text-balance text-lg font-semibold leading-snug">{item.title}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.3} className="mt-5">
              <RedPenNote arrow="up">if you can name the number, call</RedPenNote>
            </Reveal>
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
                  className="grid grid-cols-[2rem_1fr] gap-4 py-4"
                >
                  <DrawnCross className="mt-0.5 text-muted-foreground" />
                  <p className="text-lg leading-snug text-muted-foreground">{item}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
