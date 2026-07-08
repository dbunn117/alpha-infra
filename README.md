# North Alpha — marketing website

Marketing site for North Alpha, a one-person AI consulting practice.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui**,
`framer-motion`, `lucide-react`, `next-themes`, and Resend for the contact form.

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
| `CONTACT_FROM_EMAIL` | Verified Resend sender (e.g. `hello@northalpha.ai`). |
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
- `src/content/services.ts` — all seven offerings (cards + full service pages).

## Placeholders to fill later

- **Headshot** — `AboutBlock` and `/about` show a placeholder (spec §9 `FOUNDER_PHOTO`).
- **Testimonials** — add entries to the `TESTIMONIALS` array in
  `src/components/testimonials.tsx`.
- **Wordmark** — currently styled text; a compass/needle mark can be added in
  `src/components/wordmark.tsx`.

## Design system

Dark is the default/hero theme with a light-mode toggle (`next-themes`). Tokens
are CSS variables in `src/app/globals.css` (spec §7.1). Brand accent is electric
blue; button fills use blue-600 so labels clear WCAG AA contrast.

## Deploy (Vercel)

1. Push to a Git repo and import into [Vercel](https://vercel.com/new).
2. Add the environment variables above in the project settings.
3. Add the custom domain `northalpha.ai`.
