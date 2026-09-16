import Link from "next/link";
import { proof, proofStrip } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProofSchematic } from "@/components/proof-schematic";
import { Lightbox } from "@/components/lightbox";
import { asset } from "@/lib/asset";

/*
 * Proof: two things built, one visual and one line each. The operating
 * business shows its real screen (click to enlarge); the investment tool
 * shows its schematic. Then the owner's words. Detail lives on /work.
 */
export function ProofStrip() {
  const [entec, market] = proofStrip.items;
  return (
    <Chapter id="proof" title="Proof">
      <div className="container-page">
        <SectionHeading eyebrow={proofStrip.eyebrow} heading={proofStrip.heading} />

        {/* On phones the owner's quote sits directly under the Entec card so
            it cannot read as the scorecard's; at md and up the two cards share
            a row and the quote runs full width beneath them. */}
        <ul className="mt-10 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
          <Reveal as="li" className="md:order-1">
            <article className="flex h-full flex-col">
              {proof.image ? (
                <div className="grain surface relative overflow-hidden">
                  <Lightbox src={asset(proof.image.src)} alt={proof.image.alt} title="Entec's morning view" />
                </div>
              ) : null}
              <h3 className="mt-5 text-lg leading-snug">{entec.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entec.summary}</p>
            </article>
          </Reveal>

          {/* The owner's own words. Drafted, not yet signed off by Bylo (see
              content/site.ts proof.testimonial). */}
          <Reveal as="li" delay={0.12} className="border-t border-border pt-8 md:order-3 md:col-span-2">
            <div className="grid gap-6 lg:grid-cols-12">
              <blockquote className="lg:col-span-8">
                <p className="text-pretty font-heading text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
                  &ldquo;{proof.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-medium text-muted-foreground">{proof.testimonial.name}</footer>
              </blockquote>
              <div className="flex items-end lg:col-span-4 lg:justify-end">
                <Link href={proofStrip.link.href} className="link-draw text-sm font-medium text-primary">
                  {proofStrip.link.label}
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal as="li" delay={0.08} className="md:order-2">
            <article className="flex h-full flex-col">
              <div className="grain surface relative overflow-hidden bg-surface-2 px-3 pt-4 pb-2">
                <ProofSchematic data={market.schematic} title={market.title} />
              </div>
              <h3 className="mt-5 text-lg leading-snug">{market.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{market.summary}</p>
            </article>
          </Reveal>
        </ul>
      </div>
    </Chapter>
  );
}
