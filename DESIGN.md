# DESIGN.md

The design brief for pranavg237.github.io.

**Subject:** a finance + CS student and founder aiming at quant roles.
**Job of the site:** make Pranav legible in 60 seconds to a quant recruiter, a professor, or a customer of one of his businesses, and let anyone who wants to dig further do so in one more click.
**Register:** a sharp personal site. Not an agency landing page, not a SaaS marketing page, not a résumé dumped into HTML.

> **Revision note.** The site was originally built to a light, indigo-accented
> design whose memorable element was a vertical date rail in an 8rem gutter.
> Pranav then asked for it to be rebuilt to match a specific reference —
> `https://public-buzz-pure.figma.site`, a black single-page résumé template.
> The routes and the content structure were kept; the entire visual language was
> replaced. This document describes what is actually shipped. Where a decision
> reverses the original brief, it says so and says why.

---

## 1. Palette

Black, white, and one grey. There is no accent colour and no hue anywhere on the site — the reference has none, and adding one would be the single loudest thing on the page.

### Dark — the default for everyone

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#000000` | Page background. True black, as in the reference. |
| `--ink` | `#FFFFFF` | Names, headings, body copy, bullets. |
| `--muted` | `#ABABAB` | Organisations, dates, locations, summaries, secondary labels. |
| `--rule` | `#383838` | Section separators — the heavier of the two hairlines. |
| `--hairline` | `#2A2A2A` | Entry separators, sub-role borders, the toggle's border. |

### Light — the opt-in

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | |
| `--ink` | `#0A0A0A` | |
| `--muted` | `#5C5C5C` | |
| `--rule` | `#D4D4D4` | |
| `--hairline` | `#E6E6E6` | |

### Measured contrast (computed, not estimated)

| Pair | Dark | Light |
|---|---|---|
| ink on paper | **21.00:1** (AAA) | **19.80:1** (AAA) |
| muted on paper | **9.14:1** (AAA) | **6.69:1** (AA) |

`--rule` (1.79:1 / 1.48:1) and `--hairline` (1.46:1 / 1.25:1) are decorative separators only and never carry information on their own — every section they separate also has a heading. Focus rings use `--ink`, which is the highest-contrast colour available in either mode.

**Why two hairline weights.** The reference draws section separators at 1px `#383838` and entry separators at 0.5px of the same colour. Sub-pixel borders round to a full pixel inconsistently across browsers and zoom levels, so both are 1px here and the *colour* carries the weight difference instead. The visual result is the same and it is stable everywhere.

**Why dark is not behind `prefers-color-scheme`.** This design is black the way the reference is black. Following a light OS preference into a palette the design was not drawn for produces a different, worse site. So `:root` is dark for everyone, and nothing in the stylesheet reads `prefers-color-scheme`; only an explicit choice from the toggle switches it. This reverses the original brief, which was light-first with dark as an override.

---

## 2. Typefaces

**Two families, split by job, plus a mono restricted to code.** This also reverses the original brief, which used one family for everything.

### Schibsted Grotesk — structure

`@fontsource-variable/schibsted-grotesk`, self-hosted, variable, woff2, `font-display: swap`, subset to latin. Weights used: 400 and 600 from the variable axis, so one file.

Carries everything that is a label rather than a sentence: the name, the nav, section headings, entry titles, organisations, dates, locations, chips, the footer. It is the reference's own display face, and the tight negative tracking at 600 is most of why the masthead reads the way it does.

### Geist — running text

`@fontsource-variable/geist`, same treatment. Carries body copy, bullets, summaries and prose — everything that is read as a sentence rather than scanned as a fact.

The split is the point: on a page that is mostly a two-column grid of facts against paragraphs, giving the two jobs two voices makes the grid legible before you read a word. Both faces are neutral grotesques with similar proportions, so the page still reads as one system.

### Geist Mono — code only

Used **exclusively** inside `<code>` and `<pre>` on project pages. Not for dates, not for chips, not for labels — see §5. Metrically related to Geist, so code sits inside prose without a step change in colour.

**Preloading.** Schibsted Grotesk and Geist are both `<link rel="preload">`ed. Geist Mono is not — only some project pages use it.

### Type scale

Small, and stepped at the reference's own breakpoints rather than at round numbers.

| Token | Size | Steps at | Weight | Used for |
|---|---|---|---|---|
| `--fs-display` | 20px | 22px @800, 24px @1200 | 600 | The name, the title beneath it, the nav ≥800px |
| `--fs-entry` | 16px | — | 600 | Entry titles, card titles, prose headings |
| `--fs-body` | 15px | 16px @1280 | 400 | Body, bullets, summaries, dates, locations |
| `--fs-label` | 13px | — | 600 | Section headings, the primary rail link, the footer |
| `--fs-small` | 12px | — | 400 | Secondary rail links, chips, the footer's contact row |

Section headings being *smaller* than the entry titles they introduce is the reference's move, and it works because the hairline above them plus 37px of air below does the separating. It also reverses the original brief, which added a larger `section` step precisely to stop headings and entry titles reading as siblings.

**Measure:** `--measure: 34rem`, applied to `.prose`, `.entry__body` and `.row__body` so every block of running text on the site wraps at the same width. This is a fixed length rather than `ch` on purpose — Geist's `0` glyph is much narrower than its average lowercase letter, so the original `68ch` was running about 95 characters to the line. 34rem holds 72–81 depending on the character mix, measured in the browser.

---

## 3. Layout concept

The page is a centred 1440px column with 20–30px of side padding. It opens with a masthead — the name and title on the left, the nav on the right — and then a very tall gap, `clamp(3.5rem, 11vw, 10rem)`, which is the single most recognisable thing about the reference and costs nothing but space.

Below that the page is two columns:

- **The rail** (max 368px, `position: sticky`): the one-liner under a section rule, then the contact links, each in its own bordered row with a `↗` on the right. It is site chrome, identical on every page, and it stays in view while the content scrolls past.
- **The content column** (flexible): a stack of sections. Each section is a 1px `--rule` above, a 13px SemiBold heading, 37px of air, then its records.

Each record is itself two columns — **facts on the left, the account of the work on the right**, separated by a 1px `--hairline` running the full width above it. Experience entries put role / organisation / dates / location on the left and a summary plus bullets on the right; awards, project cards and posts put a date on the left and the content on the right. The same primitive carries all of them.

There are still no cards anywhere — no fills, no shadows, no radii. `border-radius: 0` and `box-shadow: none` are global. Grouping is done entirely with the two hairline weights and vertical space.

Below 800px — the reference's own breakpoint — the masthead stacks (identity, then nav), the rail moves above the content, and every record collapses to a single column with the facts above the prose. Nothing is hidden at any width.

### Wireframe (1280px)

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │  [skip to content]  (visible on focus, top-left)                       │
 │                                                                        │
 │  Pranav Gillella,               About  Experience  Projects  Résumé ◑  │
 │  Founder, Quant Labs LLC                                               │
 │                                                                        │
 │                        ← clamp(3.5rem, 11vw, 10rem) of air             │
 │                                                                        │
 │  ──────────────────────    ──────────────────────────────────────────  │
 │  Finance + CS at UIUC.     Work                                        │
 │  Founder of Quant Labs                                                 │
 │  LLC. Working toward       ──────────────────────────────────────────  │
 │  quant trading and         Founder          A two-product software     │
 │  research.                 Quant Labs LLC   company I run alone —      │
 │                            Jun 2026 –       sole developer, designer   │
 │  ──────────────────────    Present          and operator across…       │
 │  prg6@illinois.edu    ↗    Carrollton, TX                              │
 │  ──────────────────────                     • Drafted the Terms of     │
 │  GitHub               ↗                       Service, Privacy Policy… │
 │  ──────────────────────                     • Handle all customer…     │
 │  LinkedIn             ↗                                                │
 │  ──────────────────────                     │ EarlyDMV ↗               │
 │  Résumé (PDF)         ↗                     │ A paid Texas DPS…        │
 │  ──────────────────────                     │ • Cut appointment…       │
 │                                                                        │
 │  ↑ sticky rail             ↑ scrolls                                   │
 │                                                                        │
 │  ────────────────────────────────────────────────────────────────────  │
 │  About  Experience  Projects  Résumé                                   │
 │  prg6@illinois.edu  pranav.gillella1@gmail.com  GitHub  LinkedIn       │
 │  © 2026 Pranav Gillella    Carrollton, TX                              │
 └────────────────────────────────────────────────────────────────────────┘
   ←   368px rail   →│←            content column             →
```

### Navigation

The original brief had no top nav — the home page *was* the nav. The reference puts a link opposite the name in the masthead, so the site now carries a persistent four-item nav there, at the same size as the name on screens ≥800px. The current page is marked with `aria-current="page"` and rendered in `--muted`.

This is the one place the restyle added furniture. It earns it: with the home page no longer opening on the name and one-liner (the masthead and rail carry those on every page now), there needs to be a way between pages that is always visible.

`/writing` is still not linked from the nav or the footer until a real post exists.

---

## 4. The one memorable element

**The masthead and the sticky rail, read as one object.**

The name and title set at display size against an almost absurd amount of empty space, and then — permanently, on every page, never scrolling away — a narrow column holding the one-liner and four bordered link rows. Everything else on the site is a variation on one hairline-separated two-column record.

It earns its place three ways:

1. **It is the same information on every page.** Who he is and how to reach him are not a section you scroll to; they are the frame the rest of the site sits inside. A recruiter who lands on `/projects/protestly` from a search result gets the identity and the email without a click.
2. **It commits.** True black, no accent, no illustration, two typefaces doing two jobs, and one grid that never varies. The restraint is the statement.
3. **It costs nothing.** One flex row, one `position: sticky`, no JavaScript, no images, no layout shift.

**What was removed to get here.** The date rail — a vertical hairline with right-flush tabular dates in an 8rem gutter — was the original brief's memorable element, and it was good. It could not survive the reference's layout: the reference puts dates *inside* the left column of each record, next to the organisation and the location, which is incompatible with hoisting them into a page-wide margin. Dates are still `font-variant-numeric: tabular-nums` everywhere, so they still align within their column; they just no longer form a page-height ledger.

---

## 5. Review against the banned-defaults list

Re-checked after the restyle.

| Generic default | Status |
|---|---|
| Cream bg + serif display + terracotta accent | **Clear.** True black, no serif anywhere, no accent at all. |
| Near-black + acid green / vermilion | **Clear.** Black and white with one grey. There is no hue on the site. |
| Identical rounded cards with the same grey shadow | **Clear.** There are no cards. `border-radius: 0` and `box-shadow: none` are global. Grouping is hairlines and space. |
| Gradient washes, glassmorphism, floating blobs | **Clear.** Every surface is one flat token. No `linear-gradient`, no `backdrop-filter`, no decorative shapes. |
| Tracked-out all-caps eyebrow labels above headings | **Clear.** Section headings are sentence-case 13px/600 in `--ink`. No `text-transform` in the stylesheet at all. |
| Middle dots joining meta strings | **Clear.** Facts are one per line in a flex column with a 2px gap; chip lists are `<ul>` with `gap` and no separator glyph. |
| Arrows appended to every link | **REVISED.** The original brief banned these outright. The reference marks outbound links with `↗`, and in a design where links carry no underline outside running prose, that glyph *is* the affordance — it is the only thing distinguishing "GitHub" in the rail from a label. So `↗` now appears on links that leave the site or the page, and nowhere else: not on `/projects`, not on `All projects`, not on nav items. It is drawn by a `::after` on `.ext` rather than typed into the content, so it never lands in a copied string. |
| Monospace for every small label | **Clear.** Mono is confined to `<code>` and `<pre>`. Dates use Schibsted Grotesk with `tabular-nums`, which gives numeric alignment without the costume. |
| Fade-and-slide-up entrances, hover animation on every card | **Clear.** No scroll-triggered animation, no `IntersectionObserver`, no hover transform. Links get a 120ms colour transition and nothing else. |
| Numbered 01/02/03 markers on non-sequences | **Clear.** The only numbers in a margin are real dates. |
| Stock illustrations | **Clear.** The only images are Pranav's About page portrait, project screenshots he supplies, and `og.png`. |

---

## 6. Motion

**None.** The original brief's one moment — the accent rule under the name drawing itself on load — went with the accent colour. Nothing on the site animates except a 120ms colour transition on link hover.

The global `prefers-reduced-motion` block remains, setting `animation-duration` and `transition-duration` to `0.01ms`, so the hover transition is dropped too for anyone who asks.

---

## 7. Theme

Dark is the base for everyone; light is available from a toggle.

- Two states, not three. `prefers-color-scheme` is not consulted anywhere — see §1.
- Flicker-free: a small blocking inline script in `<head>` reads `localStorage.theme` and sets `data-theme` on `<html>` before first paint. Because dark is the stylesheet default, that script only ever has to act for someone who chose light.
- The toggle is a real `<button>` with `aria-pressed` and a label that says what pressing it will do, reachable and operable by keyboard, with a visible `--ink` focus ring.
- `<meta name="theme-color" content="#000000">` so mobile browser chrome matches the page.

---

## 8. Responsive breakpoints

Mobile-first. The base stylesheet is the 375px layout; everything else is added in `min-width` blocks at the reference's own steps.

| Width | Layout |
|---|---|
| **375px** | Single column, 20px side padding. Masthead stacks: identity, then nav at 13px with the toggle opposite. Rail above content. Records collapse to one column, facts above prose. |
| **800px** (`50rem`) | The design's real form. Masthead goes to one row and the nav rises to display size. Rail and content split into two columns, rail becomes sticky. Records become two columns. |
| **1200px** (`75rem`) | Display size steps 22px → 24px. |
| **1280px** (`80rem`) | Body steps 15px → 16px. |
| **1440px** | The content column stops growing and centres. |

---

## 9. What each page is for

Unchanged by the restyle. One job per page. If a sentence doesn't serve the job, it's cut.

| Page | Job |
|---|---|
| `/` | 60 seconds. What he's doing now, three proofs, links out. The identity and contact details are in the masthead and rail, so the page opens straight into the record. |
| `/about` | The why. 150–250 words, first person, Carrollton to UIUC, why finance and CS together. Plus the short "outside of work" list. |
| `/experience` | The full record for someone who's already interested — work, leadership, education, skills, awards. |
| `/projects` | Four projects, dated, one line each. |
| `/projects/[slug]` | Depth for one thing. What it is → why I built it → what I built → results → links. |
| `/resume` | Get the PDF. Plus an inline summary that mirrors it, for anyone who won't download a file. The PDF is **linked, not embedded** — see below. |
| `/writing` | Scaffolded, unlinked, empty until there's a real post. |
| `/404` | Say what happened, link home. |

**Why the résumé PDF is not embedded.** The brief allows embedding "if it can be
done without a layout mess on mobile". It cannot. iOS Safari does not render
PDFs inside `<iframe>` or `<embed>` — it paints a blank box or a grey download
affordance, and a three-page document in a fixed-height frame on a 375px screen
is unreadable even where it does render. So `/resume` links the PDF and carries
the full record inline as real HTML, which is better than an embed for
search engines, screen readers and anyone on a phone alike.
