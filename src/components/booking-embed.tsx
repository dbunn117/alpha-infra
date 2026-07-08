import { CalendarClock } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { cta } from "@/lib/cta";

/*
 * Provider-agnostic booking embed. Renders an iframe of NEXT_PUBLIC_BOOKING_URL
 * (works for Cal.com or Calendly). Until that env var is set, shows a clearly
 * marked placeholder with a mailto fallback so the page is never broken.
 */
export function BookingEmbed({ className }: { className?: string }) {
  const url = site.bookingUrl;

  if (!url) {
    return (
      <div
        className={cn(
          "surface flex min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center",
          className
        )}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-secondary text-accent-bright">
          <CalendarClock className="size-6" aria-hidden />
        </span>
        <div className="space-y-1">
          <p className="font-heading text-lg font-semibold">
            Booking link coming soon
          </p>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            The live calendar will appear here once the booking link is
            connected. In the meantime, email me and we&apos;ll find a time.
          </p>
        </div>
        <a
          href={`mailto:${site.ownerEmail}?subject=Discovery%20call`}
          className={cn(cta({ variant: "primary", size: "md" }))}
        >
          Email {site.founder.split(" ")[0]}
        </a>
        {/* Config: set NEXT_PUBLIC_BOOKING_URL in .env.local to enable the embed. */}
      </div>
    );
  }

  return (
    <div className={cn("surface overflow-hidden", className)}>
      <iframe
        src={url}
        title="Book a discovery call with North Alpha"
        loading="lazy"
        className="h-[680px] w-full border-0"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}
