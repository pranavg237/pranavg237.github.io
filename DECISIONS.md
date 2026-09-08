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

**One variable file per family.** Schibsted Grotesk (46KB) and Geist (29KB) each
cover the whole weight axis, so the 400 and 600 the site uses cost one request
apiece. Both are preloaded. Geist Mono (a third variable file) is not preloaded
— only project pages with code blocks ever ask for it.

**Two families rather than one.** The original build used IBM Plex Sans for
everything. The restyle splits structure from running text: Schibsted Grotesk
carries labels, names, headings and facts; Geist carries body copy and bullets.
On a page that is mostly a grid of facts against paragraphs, two voices make the
grid legible before you read a word. See `DESIGN.md` §2.

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

**One record primitive, used everywhere.** Experience entries, education,
awards, project cards and posts are all a hairline above a two-column grid:
facts left, prose right. `Entry` renders the first two, `Row` the rest, and
`EducationList` maps an `Education` onto a `Job` rather than repeating the
markup. Adding a section means composing these, not writing layout.

**Both hairline weights are 1px; the colour carries the difference.** The
reference draws section separators at 1px `#383838` and entry separators at
0.5px of the same colour. Sub-pixel borders round to a full pixel inconsistently
across browsers and zoom levels, so entry separators use a dimmer `#2A2A2A` at
1px instead. Same result, stable everywhere.

**The measure is a fixed length, not `ch`.** `68ch` in Geist rendered about 95
characters to the line, because Geist's `0` glyph is far narrower than its
average lowercase letter. Replaced with `--measure: 34rem`, applied to
`.prose`, `.entry__body` and `.row__body` alike, which measures 72–81 characters
in the browser depending on the character mix.

**A persistent top navigation was added with the restyle.** The original build
had none — the home page was the nav. The reference puts a link opposite the
name in the masthead, and with the identity and contact links now living in
site chrome rather than on the home page, there needs to be a visible way
between pages. Four items, `aria-current` on the current one.

**The date rail was removed, not ported.** It was the original design's
memorable element. The reference puts dates inside each record's left column
next to the organisation and location, which is incompatible with hoisting them
into a page-wide margin. Dates keep `tabular-nums`, so they still align within
their column. See `DESIGN.md` §4.

**Tailwind is used for the reset and nothing else.** All styling is hand-written
CSS with custom properties and component-scoped `<style>` blocks. Tailwind's
preflight is genuinely useful; its utility classes would have scattered the
design system across markup where it could not be reasoned about. Two bugs came
out of preflight and are fixed explicitly in `global.css`: headings inherit
`font-size`, and lists lose their markers.

---

## Behaviour

**Dark is the default for everyone; `prefers-color-scheme` is not read at all.**
The design is black the way the reference is black. Following a light OS
preference into a palette the design was not drawn for produces a different,
worse site. The toggle still offers light, and that explicit choice is the only
thing that switches — which also collapsed the toggle from three states to two
and removed the `matchMedia` fallback it previously needed to report its own
state honestly.

**No animation anywhere.** The one page-load moment — the accent rule under the
name drawing itself — went with the accent colour. Only a 120ms colour
transition on link hover remains, and the `prefers-reduced-motion` block drops
that too.

**`localStorage` access is wrapped in `try/catch` in both directions.** It
throws outright in some privacy configurations. The theme falls back to the
default dark palette rather than the page failing to render.

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
- **No project screenshots yet.** The only photograph is the About page
  portrait (`src/assets/headshot.jpg`, through `astro:assets`); otherwise the
  images are the OG card and favicons. When project screenshots arrive they
  should go through `astro:assets` too, which is why the projects live in a
  content collection.
- **No custom domain.** `astro.config.mjs` has a comment marking the two things
  to change, and the README has the procedure.
