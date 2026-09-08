# pranavg237.github.io

Personal site for Pranav Gillella. Astro, static output, deployed to GitHub
Pages at <https://pranavg237.github.io>.

- **`DESIGN.md`** — the visual system: palette, type, layout, the wireframe.
- **`DECISIONS.md`** — every design and structural call made along the way.
- **`reference/content-conflicts.md`** — how the three résumés were reconciled.

---

## One-time setup

After creating the repo on GitHub and pushing:

> **Repo Settings → Pages → Source → select "GitHub Actions"**

That is the only manual step. Without it the workflow builds and then fails at
the deploy stage. The repo must be **public** for Pages to serve on a free
account.

---

## Run locally

```sh
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run check` | `astro check` — types and diagnostics |
| `npm run og` | Regenerate `public/og.png` and the favicon set |

`npm run build` and `npm run check` both need to finish with **zero errors and
zero warnings**. They do today; keep it that way.

---

## Add a project

Create `src/content/projects/<slug>.md`. The slug becomes the URL:
`/projects/<slug>`.

```markdown
---
title: Project name
tagline: One sentence saying what it is, not how good it is.
stack: [Python, Django, nginx]
role: Sole developer
dates: Jun 2026 – Present
status: Live
links:
  live: https://example.com    # all three are optional
  repo: https://github.com/...
  demo: https://...
featured: true                 # true puts it on the home page
order: 1                       # sort order, low first
---

## What it is
## Why I built it
## What I built
## Results
## Links
```

Those five headings, in that order, are the house format. `featured: true`
surfaces it on the home page; the home page shows featured projects sorted by
`order`.

Screenshots go in `public/projects/<slug>/`. Reference them as
`/projects/<slug>/name.png`.

## Add a post

`/writing` is built but **not linked anywhere yet**, deliberately — there are no
posts. Create `src/content/writing/<slug>.md`:

```markdown
---
title: Post title
description: One sentence. Used for the listing and the meta description.
date: 2026-09-07
draft: false
---
```

`draft: true` keeps a post out of the build entirely — it is never routed and
never listed. `src/content/writing/_example.md` is a format reference kept that
way. The leading underscore is only a convention for humans; `draft` is what the
build honours.

**When the first real post ships, link the section in two places:**

1. `src/components/Footer.astro` — add `{ label: 'Writing', href: '/writing' }`
   to the `pages` array.
2. `astro.config.mjs` — delete the `filter` option from `sitemap()` so
   `/writing` and its posts get indexed.

## Update the résumé

1. Replace `public/resume.pdf`.
2. Update `resumeUpdated` at the bottom of `src/data/resume.ts` — it drives the
   "last updated" date shown on `/resume`.
3. If the facts changed, update `src/data/resume.ts` too. It is the single
   source for `/experience`, `/resume` and the home page, so the pages cannot
   drift apart.

## Update the OG image or favicons

Edit `scripts/generate-og.mjs`, then `npm run og`. Output is committed to
`public/`. This never runs during a build or in CI, so it cannot break a deploy.

---

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds with
`withastro/action` and publishes with `actions/deploy-pages`.

```sh
git push origin main
```

Watch it under the repo's **Actions** tab. First run takes a couple of minutes.

## Add a custom domain later

1. Create `public/CNAME` containing just the domain, e.g. `pranavgillella.com`.
2. In `astro.config.mjs`, change `site` to `https://<the domain>`. Leave `base`
   unset — it is a root-served site either way.
3. Point DNS at GitHub Pages: an `ALIAS`/`ANAME` on the apex to
   `pranavg237.github.io`, or four `A` records to GitHub's Pages IPs.
4. Repo **Settings → Pages → Custom domain**, then tick **Enforce HTTPS** once
   the certificate is issued.

`site` also feeds canonical URLs, the sitemap and the OG image URL, so changing
it is what makes those point at the new domain.

---

## Project layout

```
public/
  fonts/            self-hosted IBM Plex, referenced by a stable path
  projects/<slug>/  screenshot slots
  og.png            generated, committed
  resume.pdf        supplied by hand, not generated
src/
  components/       BaseHead, Footer, Entry, Row, ThemeToggle
  content/
    projects/       four project pages, one Markdown file each
    writing/        empty except the format reference
  data/resume.ts    single source of truth for résumé-style content
  layouts/Base.astro
  pages/
  styles/global.css design tokens and the layout system
scripts/
  generate-og.mjs   OG image + favicon set
reference/          the source résumés and the reconciliation notes
```

## Notes

- No analytics, no third-party scripts, no external font requests. The only
  JavaScript on the page is the theme toggle.
- Lighthouse scores 100 across performance, accessibility, best practices and
  SEO on every page, measured against `astro preview`. Cumulative layout shift
  is 0.
- `theqntlabs.com` is not linked from the site: it is still in development and
  does not serve over HTTPS, so a link would land visitors in a browser security
  warning. The two places to restore it are commented — see
  `reference/content-conflicts.md`.
