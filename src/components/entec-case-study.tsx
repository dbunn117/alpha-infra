/*
 * The testimonial (content/site.ts proof.testimonial) is Bylo's own recorded
 * quote from 2026-09-23, given for use on the website. Transcript and status
 * in the vault: 07 Alpha Infra/Strategy & Positioning/Entec Access Systems -
 * Case Study.md.
 */
import { CheckCircle2 } from "lucide-react";
import { proof } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EntecWalkthrough } from "@/components/entec-walkthrough";

const FACTS = ["15-person team", "SimPRO + Xero + Outlook", "Five revenue channels", "One morning view"] as const;

export function EntecCaseStudy() {
  return (
    <section id="entec" className="scroll-mt-16 border-b border-border pb-14 pt-8 md:pb-16 md:pt-10 lg:pb-20 lg:pt-12">
      <div className="container-page">
        <SectionHeading
          eyebrow="Case study: Entec Access Systems"
          heading="A system built to drive revenue, not just report it."
        />

        {/* The setup as four facts, then three sentences, so the artifact
            arrives early. The five channels are named after the walkthrough. */}
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-4 sm:grid-cols-4">
          {FACTS.map((f) => (
            <li key={f} className="text-sm font-semibold leading-snug">{f}</li>
          ))}
        </ul>
        <p className="measure mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          Entec Access Systems is an owner-led business in the UK, providing doors and access systems to retail, healthcare, education, and public-sector customers. Its jobs and quotes lived in SimPRO, the money in Xero, and customer conversations in Outlook. Each system worked, but none held the complete commercial picture.
        </p>
      </div>

      {/* The signature moment: the real screen on an ink band, three revenue
          motions lit in turn, closing on the owner's quote. */}
      <div className="dark mt-8 border-y border-border bg-background py-8 text-foreground lg:py-10">
        <div className="container-page">
          <EntecWalkthrough />
        </div>
      </div>

      <div className="container-page">
        <Reveal className="mt-10">
          <div className="surface border-l-2 border-primary p-6">
            <p className="caption text-primary">{proof.channels.heading}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{proof.channels.body}</p>
          </div>
        </Reveal>
      </div>

      <div className="container-page">
        <Reveal className="mt-8">
          <div className="surface grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <h3 className="text-lg font-semibold">How it was built</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Built with Claude Code over eight working sessions between June and August 2026.
                The definitions were set with the owner and revised as the system met real use.
                Key accounts, for example, started as the top 20 by spend; by the fifth session
                they read his own Diamond and Gold customer tiers in SimPRO, because his tiering
                captures strategic importance that spend alone misses. Approved for daily use at
                the end of July.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Deterministic code handles data syncing, calculations, thresholds, and exact matching. AI is used where interpretation is required: extracting inquiry details, summarizing correspondence, assessing relevance, and helping rank what deserves attention",
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
