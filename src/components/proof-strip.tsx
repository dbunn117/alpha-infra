import Link from "next/link";
import { proof, proofStrip } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { asset } from "@/lib/asset";

/*
 * Proof: three things built, chosen for range, with the Entec screenshot on
 * the one card that has a public image. The full catalogue is on /work.
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
            <Reveal as="li" key={item.title} delay={i * 0.05}>
              <article className="surface flex h-full flex-col overflow-hidden">
                {item.image && proof.image ? (
                  <div className="grain relative border-b border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(proof.image.src)} alt={proof.image.alt} className="block w-full" />
                  </div>
                ) : null}
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
