import Link from "next/link";
import { aboutBlock } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { Reveal } from "@/components/reveal";
import { RedPenUnderline } from "@/components/red-pen";
import { FactsLine } from "@/components/facts-line";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/*
 * About plate: the photo overlaps the chapter's top hairline (depth by
 * overlap, with grain), copy at reading measure, the three proof points as a
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
            <Reveal>
              <h2 className="max-w-3xl text-balance font-heading text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {aboutBlock.heading.startsWith("The business comes before") ? (
                  <>
                    The business comes{" "}
                    <RedPenUnderline delayS={0.3}>before</RedPenUnderline> the technology.
                  </>
                ) : (
                  aboutBlock.heading
                )}
              </h2>
            </Reveal>
            {/* one paragraph here; the full story is on /about */}
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {aboutBlock.body[aboutBlock.body.length - 1]}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              {aboutBlock.credibility.join(" · ")}
            </p>
            <div className="mt-8">
              <Link href="/about" className={cn(cta({ variant: "link", size: "md" }))}>
                {aboutBlock.ctaLine}
              </Link>
            </div>
          </div>
        </div>

        <FactsLine stats={aboutBlock.proofPoints} className="mt-14" />
      </div>
    </Chapter>
  );
}
