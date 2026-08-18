/*
 * Testimonial placeholder — the drafted quote (see Obsidian: 07 Alpha Infra/
 * Offers & Positioning/Entec Access Systems - Case Study.md) is NOT approved
 * by Bylo yet. Do not swap the block below for the real quote/attribution
 * until he has read it, edited it into his own words, and explicitly signed
 * off — publishing an unapproved quote under his real name is not okay even
 * though he's likely to approve it.
 */
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const PILLARS = [
  {
    title: "Account memory",
    body: "A live picture of every key account — last touchpoint, current-year spend, whether they've gone quiet — instead of that living in one person's head.",
  },
  {
    title: "Inbound accountability",
    body: "Flags inbound enquiries the moment they land, including which ones matter most, and tracks whether the team is responding and quoting inside the target they set.",
  },
  {
    title: "Forward pipeline",
    body: "Holds the target list — the businesses he wants to win next — so there's an actual place future pipeline lives, not a notebook.",
  },
] as const;

export function EntecCaseStudy() {
  return (
    <section id="entec" className="section scroll-mt-16 border-b border-border">
      <div className="container-page">
        <SectionHeading
          eyebrow="Case study — Entec Access Systems"
          heading="From three logins to one system he opens every morning."
          intro="Entec Access Systems (Staines, UK — ~15 people, 20 years trading, doors and access systems for retail, healthcare, education, and public-sector customers) ran sales the way most owner-operators do: one system for jobs and quotes, one for the money, one for email. Nothing talked to anything else."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
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

        <Reveal className="mt-10">
          <div className="surface grid gap-8 p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <h3 className="text-lg font-semibold">How it was built</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Eight working sessions over ten weeks — not a spec handed over once and delivered
                blind. The definition of &ldquo;key account&rdquo; changed twice as his actual usage
                corrected the first guess. That&rsquo;s normal, and it&rsquo;s why this is something
                he actually opens every morning instead of software he was sold once and stopped
                using.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  "Live in daily use since July 2026",
                  "Replaces a generic CRM with something built around how he actually sells",
                  "Every AI-made match is shown as AI-made, never blended in as if a person did it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Client testimonial coming soon.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
