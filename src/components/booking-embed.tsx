"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CalendarClock } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { cta } from "@/lib/cta";

/*
 * Booking embed. For a cal.com link it uses Cal.com's embed library, which
 * sizes itself to its content (no clipped time-slot list) and follows the
 * site theme, with Ink Blue as the brand colour on both grounds. Any other
 * provider (Calendly) falls back to a plain iframe. Until NEXT_PUBLIC_BOOKING_URL
 * is set, a clearly marked placeholder with a mailto keeps the page whole.
 */
const NS = "discovery";

function calLinkFrom(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/(^|\.)cal\.com$/.test(u.hostname)) return null;
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    return path || null;
  } catch {
    return null;
  }
}

export function BookingEmbed({ className }: { className?: string }) {
  const url = site.bookingUrl;
  const calLink = calLinkFrom(url);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  // Fail-safe: if the calendar has not reported ready within a few seconds
  // (blocked iframes, slow networks), offer the scheduler in a new tab and
  // email underneath. The embed stays in place either way.
  const [ready, setReady] = React.useState(false);
  const [slow, setSlow] = React.useState(false);

  React.useEffect(() => {
    if (!calLink) return;
    const t = window.setTimeout(() => setSlow(true), 3000);
    return () => window.clearTimeout(t);
  }, [calLink]);

  React.useEffect(() => {
    if (!calLink) return;
    let cancelled = false;
    getCalApi({ namespace: NS }).then((cal) => {
      if (cancelled) return;
      cal("on", { action: "linkReady", callback: () => setReady(true) });
      cal("ui", {
        theme,
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#1d4ed8" },
          dark: { "cal-brand": "#93c5fd" },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [calLink, theme]);

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
          <p className="text-lg font-semibold">Booking link coming soon</p>
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

  if (!calLink) {
    return (
      <div className={cn("surface overflow-hidden", className)}>
        <iframe
          src={url}
          title="Book a discovery call with Alpha Infra"
          loading="lazy"
          className="h-[760px] w-full border-0"
          allow="camera; microphone; fullscreen"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Height reserved so the section never collapses while the calendar
          loads; a labelled loading state sits in it until Cal reports ready. */}
      <div className="surface relative min-h-[640px] overflow-hidden">
        {!ready ? (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-secondary text-accent-bright">
              <CalendarClock className="size-5" aria-hidden />
            </span>
            <p className="text-sm font-medium">Loading available times…</p>
            {slow ? (
              <p className="max-w-sm text-sm text-muted-foreground">
                Taking longer than usual. If your browser blocks embedded calendars, use the link below.
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}>
          <Cal
            namespace={NS}
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view", theme }}
          />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Prefer a separate window?{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-primary">
          Open the scheduler directly
        </a>
        {" "}· or email{" "}
        <a href={`mailto:${site.ownerEmail}?subject=Discovery%20call`} className="link-draw font-medium text-primary">
          {site.ownerEmail}
        </a>
      </p>
    </div>
  );
}
