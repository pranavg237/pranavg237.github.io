# DECISIONS.md

Design and structural micro-decisions made without asking, and why. Content
decisions are in `reference/content-conflicts.md`; the visual system is in
`DESIGN.md`.

---

## Stack and build

**`build.format: 'file'` with `trailingSlash: 'never'`.** Pages build as
`about.html` and are served at `/about`. GitHub Pages resolves extensionless
URLs to `.html` natively, so there is no redirect hop and no trailing slash to
keep consistent across links, canonicals and the sitemap. The alternative
(directory format) makes every internal link either carry a trailing slash or
eat a 301.

**Canonical URLs are normalised, not taken from `Astro.url`.** With `format:
'file'`, `Astro.url.pathname` is `/about.html`, which is not the URL anyone
visits or the one the sitemap lists. `BaseHead.astro` strips `.html` and maps
`index` to `/`. Caught by diffing the emitted canonicals against the sitemap.

**Zod imported from `zod`, not re-exported from `astro:content`.** Astro 7
deprecates the re-export; `astro check` flags every use. Also uses `z.url()`
rather than the deprecated `z.string().url()` from Zod 4.

**Fonts copied into `public/fonts/` rather than imported from `node_modules`.**
Importing the `@fontsource` CSS would let Vite hash the filename, which makes it
impossible to write a stable `<link rel="preload">`. A fixed path plus a
hand-written `@font-face` gives a preload hint and exactly one font request per
family. The tradeoff is no cache-busting on the font files, which is the right
trade for files that will not change.

**One variable font file for the whole sans scale.** `ibm-plex-sans-latin-wght-normal.woff2`
is 45KB and covers weights 100–700, so the 400/500/600 the site uses cost one
request. Plex Mono ships no variable build, but it is only used for code at one
weight, so a static 15KB file is the same cost either way.

**`satori` + `sharp` are devDependencies and the OG image is committed.**
`npm run og` is run by hand and its output lives in `public/`. The build and the
deploy workflow never touch it, so a broken image pipeline can never break a
deploy, and CI does not carry an image toolchain it needs once a year.

**The favicon `.ico` is assembled by hand.** `sharp` cannot write ICO. A modern
`.ico` is a 6-byte header, a 16-byte directory entry and a PNG payload, which is
~20 lines in `scripts/generate-og.mjs` and avoids another dependency.

---

## Layout and CSS

**No cards, globally enforced.** `border-radius: 0` and `box-shadow: none` are
set on `*` in the reset. This is a guardrail rather than a style: it means a
card cannot appear later by accident from a copied snippet.

**The rail is one element, not a border per row.** Drawn as a `::before` on
`.shell`, absolutely positioned at `calc(2rem + var(--gutter))` to match where
the grid puts the gutter's right edge. The first implementation put a
`border-right` on each row's date cell; the moment rows got vertical margins the
"rail" became a dashed line. See `DESIGN.md` §4.

**Footer content is indented into the text column, but the footer's divider is
not.** Shifting the whole `<footer>` right also shifted its divider, so the
footer rule stopped short of where every other rule on the page starts. Only
`.footer__nav` and `.footer__meta` are shifted.

**No persistent top navigation.** The home page links to everything, so on a
six-page site a nav bar is furniture. Interior pages get a back link to `/`
placed in the gutter, left of the rail, plus the full footer nav.

**The type scale grew from five steps to six.** A `section` step at 1.25rem was
added mid-build because section `<h2>`s and entry `<h3>`s at the same size made
"Work" and "Quant Labs LLC" read as siblings. Recorded in `DESIGN.md` §2.

**Tailwind is used for the reset and nothing else.** All styling is hand-written
CSS with custom properties and component-scoped `<style>` blocks. Tailwind's
preflight is genuinely useful; its utility classes would have scattered the
design system across markup where it could not be reasoned about. Two bugs came
out of preflight and are fixed explicitly in `global.css`: headings inherit
`font-size`, and lists lose their markers.

---

## Behaviour

**A manual theme toggle, in addition to `prefers-color-scheme`.** The brief made
it optional. It is a real `<button>` with `aria-pressed`, keyboard operable, and
the stored choice overrides the OS in both directions.

**The toggle reads `matchMedia` when no choice is stored.** With no explicit
preference, `<html>` carries no `data-theme` and the OS decides. Reading only
the attribute reported `aria-pressed="false"` to screen readers on a dark OS —
the button lied about its own state. It now falls back to the media query, and
re-syncs if the OS flips while the page is open.

**One page-load animation, on `/` only.** The accent rule under the name scales
from 0 to 1 over 320ms. Only `transform` animates, never `width`, so it
contributes nothing to layout shift. Measured CLS is 0 on every page.

**`localStorage` access is wrapped in `try/catch` in both directions.** It
throws outright in some privacy configurations. The theme falls back to the OS
rather than the page failing to render.

---

## Content structure

**`resume.ts` is typed and exported as `readonly`.** Every page reads from it,
so `/experience` and `/resume` cannot drift apart — they render the same arrays
through the same `Entry` component.

**Drafts, not filename globs, keep posts out of the build.** The first version
excluded `_`-prefixed files with a `**/[^_]*.md` pattern, which left the
`writing` collection empty and made `astro build` emit two warnings on every
run. Now `_example.md` is loaded with `draft: true` and is simply never routed
or listed. One mechanism instead of two, and the build is silent. The underscore
survives as a convention for humans.

**`/writing` is built but unlinked.** It is absent from the footer nav and
filtered out of the sitemap. Both places to change are noted in the README and
in `_example.md`.

**The résumé PDF is linked, not embedded.** Reasoning in `DESIGN.md` §9.

**Screenshot directories are committed empty via `.gitkeep`.** `public/projects/<slug>/`
exists for each project so images can be dropped in without creating paths.

---

## Things deliberately not done

- **No analytics, no third-party scripts, no external font or icon requests.**
  The only JavaScript that ships is the theme toggle and the inline
  anti-flash script.
- **No `<Image>` component usage yet.** There are no images on the site beyond
  the OG card and favicons. When project screenshots arrive they should go
  through `astro:assets`, which is why the projects live in a content
  collection.
- **No custom domain.** `astro.config.mjs` has a comment marking the two things
  to change, and the README has the procedure.
