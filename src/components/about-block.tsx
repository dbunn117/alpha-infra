import Link from "next/link";
import { UserRound } from "lucide-react";
import { aboutBlock } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function AboutBlock() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Headshot placeholder — swap for David's photo (spec §9 FOUNDER_PHOTO) */}
          <div className="mx-auto w-full max-w-[320px]">
            <div className="surface flex aspect-square items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <UserRound className="size-12" aria-hidden />
                <span className="text-sm">Headshot coming soon</span>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="About" heading={aboutBlock.heading} />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {aboutBlock.body}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {aboutBlock.credibility.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/about"
                className={cn(cta({ variant: "outline", size: "md" }))}
              >
                More about Alpha Infra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
