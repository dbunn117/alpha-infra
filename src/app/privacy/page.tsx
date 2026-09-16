import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

/*
 * This page is a plain-English summary, not legal advice. Before any real
 * launch decision, have it reviewed by a lawyer for the jurisdictions this
 * business operates in; nothing generated here should be presented as
 * legal advice on its own.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Alpha Infra handles the information you share.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy" />
      <div className="container-page pb-16 pt-6">
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Alpha Infra LLC is a one-person consulting practice run by{" "}
            {site.founder}. This is a short, plain-English summary of how your
            information is handled.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              What I collect
            </h2>
            <p className="mt-2">
              On this website: only what you choose to send, the details you
              enter in the contact form (name, email, optional company, area of
              interest, and your message) and anything you share when booking a
              call. This is separate from any data processed once we&apos;re
              working together on an engagement, which is governed by our own
              agreement and documented for that engagement specifically.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              How it&apos;s used
            </h2>
            <p className="mt-2">
              To reply to you and, if we work together, to deliver the
              engagement. I don&apos;t sell your information. Beyond what it
              takes to run this site and reply to you, it may be shared with the
              processors involved: email delivery, scheduling (once connected),
              hosting, and analytics. Any engagement work that relies on AI or
              automation providers is documented separately, provider by
              provider, before that work starts.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions, or want your information removed? Email{" "}
              <a
                href={`mailto:${site.ownerEmail}`}
                className="font-medium text-accent-bright hover:underline"
              >
                {site.ownerEmail}
              </a>
              .
            </p>
          </div>
          <p className="text-sm">
            This page is a general summary, not legal advice.
          </p>
        </div>
      </div>
    </>
  );
}
