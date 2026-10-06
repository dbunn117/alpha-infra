# Alpha Infra — marketing site

Marketing site for **Alpha Infra LLC**, David Bunn's one-person AI consulting
practice (CA single-member LLC, registered July 2026). Live at
https://alphainfra.us. Positioning since 2026-10-05: an independent AI
consultant and builder with five starting points (tools, data, workflows,
team enablement, exploring an idea). "Opportunity AI" survives only as a
personal point of view on the About page.

Setup and file map: see [`README.md`](./README.md). This file covers what the
README doesn't.

## Local environment

Node is **only** available via nvm on this machine:

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
```

`npm test` is the whole loop: syntax check, build to `site/`, verify. The
browser preview config (`.claude/launch.json`, name `dev`) serves `site/` with
Python's http.server on port 5180; rebuild before reloading, nothing watches.

## Where things live

- **Everything content-shaped is in `build.mjs`**: templates, copy, the
  `projects` records (also emitted as `site/projects.json` for the dialogs),
  `offers`, `faqs`, `helpAreas`, the About timeline, the Hermes agents, and
  the `pages` array (route, title, description, body). Copy changes almost
  never touch `app.js` or `styles.css`.
- **Routes**: `/`, `/services/` plus `/services/{quick-win,system,strategy,
  workshops,care}/`, `/work/`, `/work/entec/`, `/hermes/`, `/about/`,
  `/contact/`, `/explore/`, `/privacy/`, `404.html`. Retired routes from the
  previous site (`/book/`, `/services/coaching/`) are meta-refresh stubs
  written from the `redirects` list; add to that list rather than deleting a
  URL outright.
- **Production head**: every page gets a canonical URL, `og:*` tags and the
  social image. `verify.mjs` fails the build on any `noindex`, any "preview"
  wording, or an em/en dash in visible copy.
- **Interactive pieces** (`app.js`): three homepage examples with clearly
  labelled illustrative data, the idea explorer (authored suggestions, no
  model, session storage only), the portfolio filter and project dialogs, the
  Entec case-study tabs and image viewer, and the contact form (validates,
  then posts to Formspree via `FORM_ENDPOINT` in `app.js`, with a
  `mailto:` draft as the fallback). The Cal.com link is real.

## Rules that carry over

- No em or en dashes as punctuation anywhere on the site. Use "to" for
  ranges ("2 to 3 weeks", "$10,000 to $15,000").
- Never the word "quietly". Never invent a number.
- Avoid the rhetorical "this, not that" contrast in new copy.
- Real Entec customer names never appear; the screenshot is the redacted one.
- Nothing from the Stockbridge market dashboard beyond pattern-level
  description.
- William van der Byl's quote is used with his permission; edits to its
  wording are allowed, inventing new claims is not.
- Commit and push only when David asks.

## Deploy

`.github/workflows/deploy-pages.yml`: every push to `main` runs `npm test` and
uploads `site/` to GitHub Pages on the custom domain (`site/CNAME` is written
by the build). DNS at GoDaddy; Google Workspace mail lives there, so never
touch the MX or TXT records.

## Not in this repo

- `docs/` is gitignored (the repo is public).
- Business facts (rates, entity details, positioning, CRM) live in the
  Obsidian vault under `~/Documents/David OS/07 Alpha Infra/`.
- The previous Next.js site is at tag `opportunity-ai-site-2026-10-05`.
