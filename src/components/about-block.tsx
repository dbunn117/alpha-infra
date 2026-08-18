import Link from "next/link";
import { aboutBlock } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { cta } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function AboutBlock() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[320px]">
            <div className="surface aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/david-bunn.jpg")}
                alt="David Bunn"
                width={600}
                height={600}
                className="size-full object-cover"
              />
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
