import Link from "next/link";
import { aboutBlock, hero } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FactsLine } from "@/components/facts-line";
import { ToolsLedger } from "@/components/tools-ledger";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/*
 * About plate: the photo overlaps the chapter's top hairline (depth by
 * overlap, with grain), copy at reading measure, the three real figures as a
 * facts line, and the tools as a typeset ledger.
 */
export function AboutBlock() {
  return (
    <Chapter id="about" title="About">
      <div className="container-page">
        <div className="border-t border-border" />
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <Reveal className="-mt-8 lg:-mt-12">
            <div className="grain surface surface-raised relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/david-bunn.jpg")}
                alt="David Bunn"
                width={600}
                height={750}
                className="size-full object-cover"
              />
            </div>
          </Reveal>

          <div className="pt-2 lg:pt-12">
            <SectionHeading heading={aboutBlock.heading} />
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {aboutBlock.body}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              {aboutBlock.credibility.join(" · ")}
            </p>
            <div className="mt-8">
              <Link href="/about" className={cn(cta({ variant: "link", size: "md" }))}>
                More about Alpha Infra
              </Link>
            </div>
          </div>
        </div>

        <FactsLine stats={hero.stats} className="mt-14" />
        <ToolsLedger className="mt-10" />
      </div>
    </Chapter>
  );
}
