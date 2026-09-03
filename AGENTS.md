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
- **Design tokens** — CSS variables in `src/app/globals.css`. "Paper, ink, and
  one red pen": Paper (light) is the default, Ink (dark) is the toggle, and
  Signal Red (`#C4283C`) appears at most once per viewport (the brand mark, or
  the drawn tick in the homepage peak while the nav mark goes mono). No glows,
  no gradient text; depth only via `--elev-*` shadows, `--edge-light`,
  overlap (`.fold-top`), and `.grain`. `data-ground="ink"` on any element
  scopes the Ink tokens to it (the `dark` variant matches inside it too).
- **Motion** — the homepage is scroll-driven with the `motion` package, mounted
  only in `src/app/page.tsx` via `MotionProvider` (`LazyMotion` + `m`, strict).
  Only `src/components/ink-diagram/*`, `process-rail.tsx`, and
  `src/components/motion/*` may import `motion`; everything else uses CSS
  transitions, `Reveal`, and `[data-stroke]` drawn paths. Never animate
  width/height/top/left or use `transition: all`. `?motion=reduced` (dev only)
  forces the reduced-motion branch for checking.
- **Verifying the homepage** — walk it at every half viewport on desktop, on a
  390px mobile viewport, in the Ink theme, and with `?motion=reduced`; check
  for console errors, horizontal overflow, dead scroll (identical consecutive
  frames outside pinned holds), copy stuck below full opacity, more than one
  red per frame, and that the nav flips exactly at the paper fold.
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
