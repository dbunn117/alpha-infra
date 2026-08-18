<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Alpha Infra — marketing site

Marketing site for **Alpha Infra LLC**, David Bunn's one-person AI consulting
practice (CA single-member LLC, registered July 2026). This is the public front
door for the business — it's under active build-out.

Full setup, env vars, and content map: see [`README.md`](./README.md). This file
covers what the README doesn't.

## Local environment

Node is **only** available via nvm on this machine — it is not on the default
PATH. Every shell that runs npm needs:

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
```

`.env.local` exists locally (gitignored, copied from `.env.example`). Every value
has a fallback, so the site runs with it unfilled — booking areas show a
placeholder and the contact form logs instead of emailing.

## Where things live

- **Copy and offerings** — `src/content/site.ts` and `src/content/services.ts`.
  These are typed objects; changing copy should almost never require touching a
  component. Reach for the content files first.
- **Design tokens** — CSS variables in `src/app/globals.css`. Dark is the default
  theme, light is a toggle. Brand accent is electric blue; button fills use
  blue-600 to clear WCAG AA on their labels.
- **CTA wiring** — `src/lib/cta.ts`, `src/components/booking-embed.tsx`.

## Deploy: two targets, and they differ

The README describes a Vercel deploy. That is the **intended** destination, not
what runs today. What actually ships is `.github/workflows/deploy-pages.yml`:
every push to `main` builds a static export to GitHub Pages at
`https://dbunn117.github.io/alpha-infra`.

The consequence worth remembering: **a static export cannot run the contact API**,
so the workflow deletes `src/app/api/` before building. `src/app/api/contact/route.ts`
still lives in the repo for the eventual server deploy, but it is dead on the
live site. Don't add server-only features assuming they'll work in production
until the site moves to Vercel.

`next.config.ts` switches on `GITHUB_PAGES=true`, which the workflow sets and
local builds don't — so `npm run dev` and `npm run build` keep the full server
including the API route.

## Not in this repo

- `docs/` — the build spec and copy deck are deliberately gitignored (the repo is
  public). They aren't in this clone or on the droplet.
- Business facts (rates, entity details, positioning, CRM) live in the Obsidian
  vault under `~/Documents/David OS/07 Alpha Infra/`, not here.
- Business **finances** are a separate app: `~/dev/business/alpha-ledger`.
