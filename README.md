# Alpha Infra — alphainfra.us

The website for Alpha Infra LLC, David Bunn's independent AI consulting and
custom-build practice. A static site: a hand-written Node build script turns the
templates and copy in `build.mjs` into plain HTML in `site/`, which GitHub Pages
serves on https://alphainfra.us.

## Working on it

Node is only available via nvm on this machine:

```sh
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
npm test                 # syntax check, build into site/, run verify.mjs
python3 -m http.server 5180 --bind 127.0.0.1 --directory site
```

Then open http://127.0.0.1:5180/. There are no dependencies to install.
`site/` is generated and gitignored; edit the source files and rebuild.

- `build.mjs`: every page template, all copy, the 14 portfolio records, the
  five offers, the Hermes page, redirects from retired routes, and the
  sitemap/robots/CNAME output.
- `styles.css`: the design system (cream, dark green, cobalt; Newsreader-style
  display serif with a hand-written annotation face).
- `app.js`: the homepage examples, tabs, project dialogs, portfolio filter,
  idea explorer drafts (session storage only), and the contact form, which
  prepares a `mailto:` draft rather than posting anywhere.
- `verify.mjs`: checks the built HTML (one h1, canonical, og image, no
  preview wording, no em or en dashes in copy, internal links and anchors
  resolve, sitemap covers every page, CNAME and robots are right).
- `assets/`: portrait, the redacted Entec screenshot, the logo, the mark,
  and the social image (`og.png`, a 1200×630 capture of the homepage).

## Deploy

Every push to `main` runs `.github/workflows/deploy-pages.yml`: `npm test`,
then the `site/` folder is uploaded to GitHub Pages. DNS is at GoDaddy and
Google Workspace mail for the domain lives there too, so never touch the MX
or TXT records.

## History

The previous site (Next.js, "Opportunity AI" positioning, live until
2026-10-05) is pinned at tag `opportunity-ai-site-2026-10-05` and branch
`opportunity-ai-site`, with a built copy in
`~/dev/business/alpha-infra-backups/`.
