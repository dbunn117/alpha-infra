import Link from "next/link";
import { proofStrip } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProofSchematic } from "@/components/proof-schematic";

/*
 * Proof: three things built, chosen for range, each with a small schematic
 * drawn in the hero diagram's language. The full catalogue is on /work.
 */
export function ProofStrip() {
  return (
    <Chapter id="proof" title="Proof">
      <div className="container-page">
        <SectionHeading
          eyebrow={proofStrip.eyebrow}
          heading={proofStrip.heading}
          intro={proofStrip.intro}
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {proofStrip.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08}>
              <article className="surface flex h-full flex-col overflow-hidden">
                <div className="grain relative border-b border-border bg-surface-2 px-3 pt-4 pb-2">
                  <ProofSchematic data={item.schematic} title={item.title} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg leading-snug">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="caption mt-4">{item.tools}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <Link href={proofStrip.link.href} className="link-draw mt-8 inline-block text-sm font-medium text-primary">
          {proofStrip.link.label}
        </Link>
      </div>
    </Chapter>
  );
}
