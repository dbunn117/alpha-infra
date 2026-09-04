import Link from "next/link";
import { proof } from "@/content/site";
import { Chapter } from "@/components/chapter";
import { Reveal } from "@/components/reveal";
import { DrawnTick } from "@/components/drawn-mark";
import { asset } from "@/lib/asset";

/*
 * Proof: the Entec outcome ledger beside the live system (blurred
 * screenshot) and, when known, one before/after number. Content and the
 * metric TODO live in `proof` in content/site.ts.
 */
export function ProofPlate() {
  return (
    <Chapter id="proof" title="Proof">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{proof.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {proof.heading}
            </h2>
            <p className="measure mt-5 text-pretty leading-relaxed text-muted-foreground">
              {proof.context}
            </p>
            <ol className="mt-8 divide-y divide-border border-y border-border">
              {proof.pillars.map((pillar, i) => (
                <Reveal
                  as="li"
                  key={pillar.title}
                  delay={i * 0.05}
                  className="grid grid-cols-[2rem_1fr] gap-4 py-5"
                >
                  <DrawnTick className="mt-0.5 text-primary" />
                  <div>
                    <p className="text-lg font-semibold leading-snug">{pillar.title}</p>
                    <p className="measure mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">{proof.built}</p>
            <Link href={proof.link.href} className="link-draw mt-4 inline-block text-sm font-medium text-primary">
              {proof.link.label}
            </Link>
          </div>

          <Reveal delay={0.1} className="lg:pt-10">
            <figure>
              {proof.image ? (
                <div className="grain surface surface-raised relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(proof.image.src)} alt={proof.image.alt} className="block w-full" />
                </div>
              ) : (
                <div
                  className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-border bg-surface-1 p-8 text-center"
                  aria-hidden
                >
                  <p className="caption">Live system screenshot</p>
                </div>
              )}
              <figcaption className="caption mt-3">
                {proof.client} · the system as the owner sees it
              </figcaption>
            </figure>
            {proof.metric ? (
              <dl className="mt-8 border-t border-border pt-6">
                <dt className="font-heading text-4xl font-medium tabular-nums text-primary">
                  {proof.metric.value}
                </dt>
                <dd className="caption mt-1">{proof.metric.label}</dd>
              </dl>
            ) : null}
          </Reveal>
        </div>
      </div>
    </Chapter>
  );
}
