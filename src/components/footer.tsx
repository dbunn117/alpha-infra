import Link from "next/link";
import { Mail } from "lucide-react";
import { site, footer } from "@/content/site";
import { Wordmark } from "@/components/wordmark";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* Masthead close: hairline, lockup, two ledger columns, mono colophon line. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark tone="mono" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">Pages</p>
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-draw text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">Contact</p>
            <a
              href={`mailto:${site.ownerEmail}`}
              className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden />
              <span className="link-draw">{site.ownerEmail}</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="size-4" />
              <span className="link-draw">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} · {site.legalName} · California
          </p>
          <Link href="/privacy" className="link-draw transition-colors hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
