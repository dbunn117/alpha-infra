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
- **Design tokens** — CSS variables in `src/app/globals.css`. Paper (warm
  near-white `#FAF9F6`) is the default, Ink (dark) is the toggle. Two accents
  with fixed roles. **Blue is the system**: Ink Blue (`--primary`, `#1D4ED8`
  on Paper / `#93C5FD` on Ink) for buttons, links, `.eyebrow`, highlights,
  the diagram's routes and plate, anything the machine does or the visitor
  can act on. **Red is the hand**: Signal Red (`#C4283C`, exported as
  `SIGNAL_RED` from `brand-mark.tsx`, never a token) appears only on
  handwritten marks: the brand mark's circle and the `RedPen*` components in
  `src/components/red-pen.tsx` (loop, underline, margin note in `font-hand`).
  Nothing handwritten is any other colour, and each section gets at most one
  red mark. No glows, no gradient text; depth only via `--elev-*` shadows,
  `--edge-light`, overlap, and `.grain`.
- **The mark** — the signal mark (ink trace, red hand-drawn circle on a
  mid-line point, line continuing past). Paths live in
  `src/components/brand-mark.tsx`; `src/app/icon.svg` (circle-only small form)
  and `src/app/opengraph-image.tsx` copy them, so change all three together.
  The brand note in the vault records why it was chosen.
- **Type** — Newsreader (`font-heading`) for display only: h1, h2, big
  numerals, the wordmark. `h3`/`h4` are Plex Sans semibold by base rule.
  `.eyebrow` is sans, semibold, blue; `.caption` is the only mono use.
  `font-hand` (Caveat for now, to be replaced by David's own handwriting) is
  reserved for red-pen notes and diagram annotations.
- **Live demos** — the hero is `src/components/morning-view.tsx` and the
  second proof card is `src/components/market-scorecard.tsx`: illustrative
  data in `src/content/morning-view-sample.ts` and inline, deterministic
  scoring in the browser, no network, no model. Re-ordering is a hand-rolled
  FLIP on `transform` only, skipped under reduced motion. Keep every name
  fictional and every figure obviously invented; the labels say so.
- **Motion** — the ink diagram (now on the Alpha System page, above the five
  layers) draws once
  in about a second and holds its finished frame, in
  `src/components/ink-diagram/ink-animation.tsx` (`useAnimate`, explicit
  `[from, to]` keyframes, paused until first in view). That file is the only
  importer of `motion`; nothing is scroll-scrubbed. Scroll-led pieces (the
  Entec walkthrough) switch discrete steps with an IntersectionObserver and
  animate opacity and pen strokes only. Everything else uses CSS transitions, `Reveal`, and
  `[data-stroke]` drawn paths (`.is-drawn` draws them without a Reveal).
  Never animate width/height/top/left or use `transition: all`.
  `?motion=reduced` (dev only) forces the reduced-motion branch for checking.
- **Layout grammar** — sections alternate a reading column with a right
  column that has a job (the diagram, the process CTA, a margin note); cards
  are for the work catalogue and the two proof cards only. Offers are a
  ledger (`offer-ledger.tsx`) at `lg` and `ServiceCard` stacks below it.
  The homepage runs claim, demonstration, proof: hero, proof strip with the
  owner's quote, the idea, offers in brief (`compact`: no deliverables row,
  three examples, four `featured` FAQs), process, founder, close. It should
  stay around ten desktop screens; the fit ledger, full offer detail, all
  six examples, and the full FAQ live on /services.
- **Interactive moments** — three, and no more: the morning view (hero),
  the Entec walkthrough on /work (`entec-walkthrough.tsx`: the real
  screenshot pinned on an ink band, three regions lit in turn by percentage
  boxes measured on the image, closing on the owner's quote), and the
  Services path finder (`offer-explorer.tsx`: one question, three answers,
  tints the chosen ledger column and opens only that offer on phones).
  Anything that accepts input carries an "Interactive · try it" chip. The
  idea section is deliberately not interactive: one comparison of two
  models of AI (`positioning-block.tsx`), Productivity AI as the small flat
  panel and Opportunity AI as the dominant one, ending in a visible output
  (the ranked opportunity, reusing the hero's illustrative Northgate
  account) that carries the section's red-pen mark. It stacks on phones.
- **Section tones** — `Chapter` takes `tone`: "paper" for narrative,
  "system" (a few percent of Ink Blue) for how-the-machine-works sections,
  "ink" (class `dark` re-scopes the tokens) for one proof moment per page,
  and `tight` for FAQ and catalogues. White elevated surfaces are for live
  artifacts only.
- **Work catalogue** — `work-catalogue.tsx`: six `featured` projects first,
  each with a drawn glyph (`project-glyph.tsx`), the decision supported and
  the signals connected (both restate the blurb; add no new claims), tech as
  a footnote; filters by group; the Lab stays in its own labelled panel.
- **Copy rule** — avoid the rhetorical "this, not that" contrast in new
  copy; state the thing itself. No em or en dashes as punctuation.
- **First screen** — nothing above the fold is ever parked at opacity 0.
  `.rise` is a quarter-second settle from 0.6 opacity; `Reveal` is for
  content further down. Live demos answer every change with a `role=status`
  line (what changed, how many need attention) and a brief `.is-moved` wash
  on the rows that moved, plus a Reset control.
- **Verifying the homepage** — walk it at every half viewport on desktop, on a
  390px mobile viewport, in the Ink theme, and with `?motion=reduced`; check
  for console errors, horizontal overflow, dead scroll, copy stuck below full
  opacity, red anywhere that is not handwritten, that the diagram reports
  `data-ink-state="playing"` while in view and `paused` once scrolled past,
  that the morning view and scorecard re-rank when a rule or weight changes,
  and that the reduced branch renders the static frame with no FLIP.
- **CTA wiring** — `src/lib/cta.ts`, `src/components/booking-embed.tsx`
  (Cal.com embed library for cal.com links, sized to content and themed;
  iframe fallback for other providers; placeholder until the env var is set).

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
