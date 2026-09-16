/*
 * Testimonial quote below is drafted, not yet reviewed/edited by Bylo
 * directly (see Obsidian: 07 Alpha Infra/Offers & Positioning/Entec Access
 * Systems - Case Study.md). David decided 2026-08-19 it's fine to publish
 * as-is since this URL isn't shared/discoverable anywhere yet. Get his actual
 * sign-off (or a recorded quote) before linking this page from LinkedIn, a
 * proposal, or anywhere else with real traffic.
 */
import { CheckCircle2 } from "lucide-react";
import { proof } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Lightbox } from "@/components/lightbox";
import { asset } from "@/lib/asset";

const PILLARS = proof.pillars;

export function EntecCaseStudy() {
  return (
    <section id="entec" className="section scroll-mt-16 border-b border-border">
      <div className="container-page">
        <SectionHeading
          eyebrow="Case study: Entec Access Systems"
          heading="A system built to drive revenue, not just report it."
          intro="Entec Access Systems is a 15-person, owner-led business in the UK, providing doors and access systems to retail, healthcare, education, and public-sector customers. Its jobs and quotes lived in SimPRO, the money in Xero, and customer conversations in Outlook. Each system worked, but none held the complete commercial picture, which made five revenue motions difficult to manage consistently: protecting key accounts, converting inbound enquiries, developing target customers, turning installations into service revenue, and finding relevant public opportunities in time to act."
        />

        <Reveal className="mt-10">
          <div className="surface border-l-2 border-primary p-6">
            <p className="caption text-primary">{proof.channels.heading}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{proof.channels.body}</p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="surface h-full p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {proof.image ? (
          <Reveal as="figure" className="mt-8">
            <div className="grain surface relative overflow-hidden">
              <Lightbox src={asset(proof.image.src)} alt={proof.image.alt} title="Entec's morning view" />
            </div>
            <figcaption className="caption mt-3">
              The owner&rsquo;s morning view. Account names and figures blurred. Click to enlarge.
            </figcaption>
          </Reveal>
        ) : null}

        {/* The owner's words come before the build notes: the result and the
            customer's response persuade more than the implementation. */}
        <Reveal className="mt-8">
          <blockquote className="max-w-3xl border-l-2 border-primary pl-6">
            <p className="text-pretty font-heading text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
              &ldquo;{proof.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-medium text-muted-foreground">{proof.testimonial.name}</footer>
          </blockquote>
        </Reveal>

        <Reveal className="mt-8">
          <div className="surface grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <h3 className="text-lg font-semibold">How it was built</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Built with Claude Code over eight working sessions, not a spec
                handed over once and delivered blind. The definition of &ldquo;key account&rdquo;
                changed twice as his actual usage corrected the first guess. That&rsquo;s normal,
                and it&rsquo;s why this is something he actually opens every morning instead of
                software he was sold once and stopped using.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Live in daily use since July 2026",
                  "Deterministic code handles data syncing, calculations, thresholds, and exact matching. AI is used where interpretation is required: extracting enquiry details, summarising correspondence, assessing relevance, and helping rank what deserves attention",
                  "Every AI-made match or suggestion is identified as AI-made and kept reviewable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="text-lg font-semibold">What the owner sees</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li><span className="font-medium text-foreground">Connected information.</span> Jobs, quotes, invoices, and relevant email read together, per account.</li>
                <li><span className="font-medium text-foreground">Ranked opportunity.</span> Today&rsquo;s priority actions across all five channels, ordered by his own rules.</li>
                <li><span className="font-medium text-foreground">Evidence and next action.</span> Why each item is there, and the one thing to do about it.</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
