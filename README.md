# Alpha Infra — marketing website

Marketing site for Alpha Infra, a one-person AI consulting practice.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui**
(Base UI primitives), `motion` for the homepage's scroll-driven chapters,
`lucide-react`, `next-themes`, and Resend for the contact form.

> The build brief and copy deck live in [`docs/`](./docs).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional to start)
npm run dev                  # http://localhost:3000
```

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint

## Configuration

All config is via environment variables — see [`.env.example`](./.env.example).
Nothing is required to run locally; sensible fallbacks/placeholders are used.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com/Calendly link. Until set, booking areas show a placeholder + email fallback. |
| `OWNER_EMAIL` | Where contact-form submissions are emailed (default `davibunn@gmail.com`). |
| `RESEND_API_KEY` | Enables real email via [Resend](https://resend.com). If empty, submissions log server-side and the form still succeeds. |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (e.g. `hello@alphainfra.ai`). |
| `NEXT_PUBLIC_LINKEDIN_URL` | Footer + structured data. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap/robots/OG. |

### Wiring the two CTAs

- **Book a call** — create a free Cal.com or Calendly link and paste it into
  `NEXT_PUBLIC_BOOKING_URL`. It powers the nav modal, the hero, `/book`, and
  `/contact`. The embed is a provider-agnostic iframe (`src/components/booking-embed.tsx`).
- **Contact form** — posts to `src/app/api/contact/route.ts` (validation +
  honeypot + rate limit). Add `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` to send
  real email; otherwise submissions are logged to the server console.

## Editing content

All copy lives in typed objects — no need to touch layout:

- `src/content/site.ts` — hero, problem/POV, how-it-works, pricing rows, about,
  footer, and site config.
- `src/content/services.ts` — all five offerings (cards + full service pages).
- `src/content/projects.ts` and `src/content/profile.ts` — the `/work` catalogue
  and the `/about` timeline, skills, and credentials.
- `inkPeak` in `src/content/site.ts` — captions and labels for the homepage's
  scroll-drawn ink diagram (all lifted from copy that exists elsewhere).

## Placeholders to fill later

- **Testimonials** — add entries to the `TESTIMONIALS` array in
  `src/components/testimonials.tsx` (the section renders nothing while empty).
- **Booking link** — set `NEXT_PUBLIC_BOOKING_URL` (see above).

## Design system

Paper, ink, one red pen, and blue for the work. Paper (a warm near-white) is
the default theme; Ink (dark) is the toggle (`next-themes`). Tokens are CSS
variables in `src/app/globals.css`. Ink Blue (`--primary`) marks anything you
can act on or should scan first: buttons, links, eyebrows, highlights, and the
routes and system plate in the hero diagram. Signal Red appears only in the
brand mark and the diagram's drawn tick. Newsreader is for display only (h1,
h2, big numerals, the wordmark); IBM Plex Sans does everything else; Plex Mono
only for tiny captions (`.caption`). Depth comes from tinted shadows, edge
light, overlap, and grain, never glows or gradients.

The homepage is a chaptered page. The hero's ink diagram is a looping motion
graphic (`src/components/ink-diagram/ink-animation.tsx`, the only file that
imports `motion`), paused while off-screen and replaced by its final frame
under reduced motion. The margin folio (`chapter-folio.tsx`) ticks chapters
off as they are read. Everything else animates with CSS. In development,
`?motion=reduced` on any URL exercises the reduced-motion branch without
changing OS settings.

## Deploy (Vercel)

1. Push to a Git repo and import into [Vercel](https://vercel.com/new).
2. Add the environment variables above in the project settings.
3. Add the custom domain `alphainfra.ai`.
