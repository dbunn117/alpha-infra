import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

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
              Only what you choose to send: the details you enter in the contact
              form (name, email, optional company, area of interest, and your
              message) and anything you share when booking a call.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              How it&apos;s used
            </h2>
            <p className="mt-2">
              To reply to you and, if we work together, to deliver the
              engagement. I don&apos;t sell your information or share it with
              third parties beyond the tools used to run this site (for example,
              the email and scheduling providers that deliver your messages).
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
            This page is a general summary, not legal advice. Replace it with a
            full policy before launch if your jurisdiction requires one.
          </p>
        </div>
      </div>
    </>
  );
}
