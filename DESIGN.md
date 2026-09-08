# DESIGN.md

The design brief for pranavg237.github.io. Written before any code.

**Subject:** a finance + CS student and founder aiming at quant roles.
**Job of the site:** make Pranav legible in 60 seconds to a quant recruiter, a professor, or a customer of one of his businesses, and let anyone who wants to dig further do so in one more click.
**Register:** a sharp personal site. Not an agency landing page, not a SaaS marketing page, not a résumé dumped into HTML.

---

## 1. Palette

Near-monochrome with one accent. Neutrals carry a very slight cool cast so they read as paper-under-fluorescent rather than warm editorial cream. Six named roles, each defined in both modes as a CSS custom property.

### Light

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F7F7F5` | Page background. Off-white, faintly cool. Not cream, not pure white. |
| `--ink` | `#15171B` | Body text and headings. Blue-black, never `#000`. |
| `--muted` | `#5C616A` | Dates, locations, meta, captions, secondary nav. |
| `--rule` | `#E2E1DD` | Hairlines — section dividers, the gutter rail, table lines. |
| `--accent` | `#2F3BA2` | Links, focus rings, the name rule, the one moment of colour. |
| `--accent-soft` | `#E8E9F7` | The single wash: active nav marker and inline `<mark>`-style emphasis. Used maybe four times site-wide. |

### Dark

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#101114` | |
| `--ink` | `#E7E7E4` | |
| `--muted` | `#969CA6` | |
| `--rule` | `#26282D` | |
| `--accent` | `#A6AEFF` | Lightened so it clears AA on a dark ground. |
| `--accent-soft` | `#1B1D33` | |

### Measured contrast (computed, not estimated)

| Pair | Light | Dark |
|---|---|---|
| ink on paper | **16.73:1** (AAA) | **15.24:1** (AAA) |
| muted on paper | **5.80:1** (AA) | **6.84:1** (AA) |
| accent on paper | **8.63:1** (AAA) | **9.10:1** (AAA) |

`--rule` is decorative hairline only (1.22:1 / 1.28:1) and never carries information on its own — every section it separates also has a heading. Focus rings use `--accent`, so they clear the 3:1 non-text requirement with room to spare in both modes.

**Why indigo.** The brief bans terracotta and bans acid green / vermilion. It also asks for restraint. A deep indigo is the one saturated hue that reads as considered rather than decorative next to a blue-black ink — it's close enough to `--ink` in hue to look like part of the same system, and far enough in chroma to be unmistakable when it appears. It is also the only colour on the site, so it can afford to be a colour people have seen before; the memorability budget is spent on structure instead (§4).

---

## 2. Typefaces

**One family, plus a mono restricted to code.**

### IBM Plex Sans — everything

`@fontsource-variable/ibm-plex-sans`, self-hosted, variable, woff2, `font-display: swap`, subset to latin. Weights used: 400, 500, 600 (from the variable axis, so one file).

Why:

- **It was drawn for technical documentation**, which is what most of this site is. It holds up at 14–16px in long runs of dense factual text — dates, dollar figures, tax code sections — which is where a display-first choice would fall apart.
- **True tabular lining figures**, available via `font-feature-settings: "tnum"`. The entire layout depends on numerals aligning in a column (§3, §4). Most free grotesques ship proportional figures by default and look ragged the moment you stack dates.
- **It is not the neutral default.** Plex has a visible point of view — the flat-sided `a`, the disjointed `g` bowl, the sheared terminals inherited from IBM's Selectric lineage. Set against Inter or a system stack, it reads as a choice. That's the whole reason to self-host a font on a text-first site.
- **One family covers the whole scale.** 600 at 2.5rem for the name, 600 at 1.0rem for section headings, 400 at 1.0rem for body, 400 at 0.875rem for meta. No second family needed, no second network cost.

**Fallback stack:** `"IBM Plex Sans Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`. Metrics are close enough to system-ui that swap causes no visible reflow.

### IBM Plex Mono — code only

`@fontsource-variable/ibm-plex-mono`, 400 only. Used **exclusively** inside `<code>` and `<pre>` on project pages. Not for dates, not for stack chips, not for labels — see §5.

Metrically related sibling of Plex Sans, so code blocks sit inside prose without a step change in colour or weight.

### Type scale

A 1.25 ratio, capped at five sizes. Sizes in `rem`, line heights unitless.

| Step | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `xl` | 2.5rem / 40px | 1.25 | 600 | The name on `/`, page `<h1>` |
| `lg` | 1.5rem / 24px | 1.25 | 600 | Project page `<h1>`, home one-liner |
| `section` | 1.25rem / 20px | 1.25 | 600 | Section `<h2>` |
| `md` | 1.0625rem / 17px | 1.25 | 600 | Entry titles `<h3>`, prose `<h2>` |
| `base` | 1.0625rem / 17px | 1.65 | 400 | Body |
| `sm` | 0.875rem / 14px | 1.5 | 400 | Dates, meta, footer, stack lists |

**The `section` step was added during the build, not planned.** The first pass
set section headings and entry titles both at `md`, and on `/experience` that
made "Work" and "Quant Labs LLC" read as siblings rather than as a section and
the entry inside it. Position and the divider above were not enough to carry the
hierarchy on their own. Six steps rather than five, and the scale is still small
enough to hold together.

On viewports under 480px, `xl` steps down to 2rem. Nothing else changes — the scale is small enough to survive mobile intact, which is the point of capping it at five.

**Measure:** body text `max-width: 68ch`. Meta and headings share the same column and the same left edge.

---

## 3. Layout concept

Everything is one left-aligned column of at most 68ch, and every dated thing in Pranav's life hangs off a single vertical hairline to the left of it. On screens 1024px and wider the page splits into a narrow 8rem gutter and the text column: the gutter holds the date, right-aligned, in tabular figures, so `Jun 2026 – Present`, `Mar 2026 – Present` and `Aug 2025 – May 2026` stack into a true right-flush numeric column against the rail, and the eye can read the chronology of a career vertically without touching the prose. Section dividers are single hairlines that bleed leftward across the gutter and stop at the right edge of the text column, so the page reads as a ruled sheet rather than a stack of boxes. Below 1024px the gutter collapses and dates move inline above each entry title in `--muted`; the hairline rail disappears rather than becoming a decorative stub. There are no cards anywhere on the site — no borders, no shadows, no fills. Grouping is done entirely with the rail, the rules and vertical space, which means the same layout primitive carries experience entries, project lists, awards and the writing index without any of them needing a different container.

### Home page wireframe (1280px)

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │  [skip to content]  (visible on focus, top-left)                     │
 │                                                                      │
 │        │ Pranav Gillella                                    ☾        │
 │        │ ━━━━━━━━━━━━━━━━━━                    (theme toggle)        │
 │        │ ← the one accent rule, draws once on load                   │
 │        │                                                             │
 │        │ Finance + CS at UIUC. Founder of Quant Labs LLC.            │
 │        │ Working toward quant trading and research.                  │
 │        │                                                             │
 │        │ GitHub   LinkedIn   prg6@illinois.edu   Résumé (PDF)        │
 │        │                                                             │
 │────────┼─────────────────────────────────────────────────────────────│  ← rule bleeds into gutter
 │        │                                                             │
 │        │ Now                                                         │
 │  2026  │ Freshman at UIUC — B.S. Finance (Gies), CS minor            │
 │        │ (Grainger).                                                 │
 │  2026  │ Running Quant Labs LLC — EarlyDMV and Protestly.            │
 │  2026  │ Quant self-study — backtester, Fama-French, Joshi's         │
 │        │ interview book.                                             │
 │        │                                                             │
 │────────┼─────────────────────────────────────────────────────────────│
 │        │                                                             │
 │        │ Selected projects                                           │
 │        │                                                             │
 │ Jun 26 │ EarlyDMV                                                    │
 │        │ A paid Texas DPS appointment rebooking service.             │
 │        │ Django · HTMX · Stripe · Cloudflare Tunnel                  │
 │        │                                                             │
 │ Jun 26 │ Protestly                                                   │
 │        │ An automated property tax protest pipeline for              │
 │        │ Denton County homeowners.                                   │
 │        │ Python · Claude API · Playwright · Django                   │
 │        │                                                             │
 │ Mar 26 │ MA crossover backtester                                     │
 │        │ A moving average crossover engine with walk-forward         │
 │        │ optimization, run on a paper portfolio.                     │
 │        │ Python · numpy · pandas · Alpaca API                        │
 │        │                                                             │
 │        │ All projects                                                │
 │        │                                                             │
 │────────┼─────────────────────────────────────────────────────────────│
 │        │                                                             │
 │        │ About   Experience   Projects   Résumé                      │
 │        │ prg6@illinois.edu   GitHub   LinkedIn                       │
 │        │                                                             │
 │        └── the rail: 1px --rule, runs the full page                  │
 └──────────────────────────────────────────────────────────────────────┘
   ← 8rem gutter →│← 68ch text column →
```

At 375px the gutter is gone and the same page is a single column: name, rule, one-liner, links, then each section's entries with the date sitting inline above the title in `--muted` at `sm`.

### Navigation

Top-of-page nav is deliberately absent. The home page *is* the nav — it links to everything. Interior pages get a single small "Pranav Gillella" link back to `/` above the `<h1>`, plus the full footer nav. This removes a horizontal element that would otherwise fight the rail, and it's honest about a six-page site: a persistent nav bar is furniture a site this size doesn't need.

`/writing` is not linked from the footer or anywhere else until a real post exists.

---

## 4. The one memorable element

**The date rail.**

A single hairline running the full height of every page, with every date in Pranav's life right-flush against it in tabular figures — 2023 at the bottom of the experience page, Jun 2026 at the top, the whole thing readable as a column of numbers before you read a single word of prose.

It earns its place three ways:

1. **It's the content.** Everything on this site is dated — four jobs, four projects, four awards, a degree, a graduation. Most personal sites bury dates in a meta line; here the chronology is the primary structure, which is the correct emphasis for someone whose story is "look how much I've shipped and how recently".
2. **It's the subject.** A right-flush column of tabular figures against a rule is what a ledger looks like, and what a P&L looks like, and what a backtest output looks like. The form matches the person without a single illustration, icon or metaphor.
3. **It costs nothing.** One grid template, one pseudo-element, one `font-variant-numeric: tabular-nums`. No JavaScript, no images, no layout shift, and it degrades to plain inline dates on mobile without losing information.

**Implementation note.** The rail is drawn once as a `::before` on `.shell`,
absolutely positioned at `calc(2rem + var(--gutter))` — the same x the grid puts
the gutter's right edge at. The first pass drew it as a `border-right` on each
row's date cell, which turned it into a dashed line the moment rows had vertical
margins between them. A rail that is a single element cannot break.

The accent rule under the name on the home page is the second-order moment — the only saturated colour above the fold, and the only animation on the site.

---

## 5. Review against the banned-defaults list

Checked before writing any code. Where the first-pass plan matched, the revision is recorded.

| Generic default | Status |
|---|---|
| Cream bg + serif display + terracotta accent | **Clear.** Cool off-white `#F7F7F5`, no serif anywhere, indigo accent. |
| Near-black + acid green / vermilion | **Clear.** Blue-black `#15171B` + indigo `#2F3BA2`. |
| Identical rounded cards with the same grey shadow | **Clear.** There are no cards on the site. `border-radius: 0` and `box-shadow: none` are global. Grouping is rails, rules and space. |
| Gradient washes, glassmorphism, floating blobs | **Clear.** Every surface is one flat token. No `linear-gradient`, no `backdrop-filter`, no decorative absolute-positioned shapes. |
| Tracked-out all-caps eyebrow labels above headings | **REVISED.** First pass had `NOW`, `SELECTED PROJECTS`, `EXPERIENCE` as `letter-spacing: 0.08em; text-transform: uppercase` section labels. Cut. Section headings are now sentence-case `md`/600 in `--ink`, distinguished from body by the hairline above them, not by tracking. No `text-transform` in the stylesheet at all. |
| Middle dots joining meta strings | **REVISED.** First pass had `Jun 2026 · Carrollton, TX · Founder` and `Django · HTMX · Stripe` interpuncts throughout. The meta line is now a `<dl>`-style pair or plain spacing; stack lists are `<ul>` with `display: flex; gap: 1rem` and no separator glyph. *(The wireframe above still shows `·` in the stack rows — that's ASCII shorthand for the gaps, not the shipped mark.)* |
| Arrows appended to every link | **Clear.** No `→` after any link. "All projects" and "Read more" are plain underlined text. The one arrow on the site is the `←` on the back-to-home link on interior pages, where it indicates direction rather than decorating. |
| Monospace for every small label | **REVISED.** First pass set the entire date rail in IBM Plex Mono, on the reasoning that dates are data. That is exactly the banned pattern with a justification attached. Revised: the rail uses **IBM Plex Sans with `font-variant-numeric: tabular-nums`**, which gives the same numeric alignment without the costume. Mono is now confined to `<code>` and `<pre>` on project pages. |
| Fade-and-slide-up entrances on each section, hover animation on every card | **Clear.** No scroll-triggered animation of any kind, no `IntersectionObserver`, no hover transform. Links get an underline colour change on hover, 0ms. |
| Numbered 01/02/03 markers on non-sequences | **Clear.** The only numbers in the margin are real dates. |
| Stock illustrations | **Clear.** The only images on the site are project screenshots supplied by Pranav, an optional headshot, and `og.png`. |

---

## 6. Motion

One deliberate page-load moment, on `/` only: the accent rule under the name animates its `transform: scaleX()` from 0 to 1 over 320ms with `ease-out`, once, on load. It is a rule that draws itself. Nothing else on the site moves.

Under `@media (prefers-reduced-motion: reduce)` the rule is simply present at full width with no animation, and a global rule sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on everything.

Because the rule occupies its final box from the first frame (only `transform` is animated, never `width` or `height`), the moment contributes zero to CLS.

---

## 7. Theme

Supports `prefers-color-scheme` natively, plus a manual toggle in the top-right of the home page and interior page headers.

- Flicker-free: a small blocking inline script in `<head>` reads `localStorage.theme` and sets `data-theme` on `<html>` before first paint. No FOUC, no flash of the wrong mode.
- The toggle is a real `<button>` with `aria-pressed`, reachable and operable by keyboard, with a visible `--accent` focus ring.
- Three states: no stored preference means the OS decides; an explicit choice is stored and wins.
- Every colour is defined on bare `:root` first, so the light palette is the base and dark is an override in two places (`@media (prefers-color-scheme: dark)` guarded against an explicit light choice, and `[data-theme="dark"]`).

---

## 8. Responsive breakpoints

| Width | Layout |
|---|---|
| **375px** | Single column, 1.25rem side padding. Gutter collapsed, dates inline above titles. `xl` drops to 2rem. Footer nav wraps to two rows. |
| **768px** | Same single column, wider padding, `xl` back to 2.5rem. Gutter still collapsed — 768px doesn't have room for an 8rem margin plus a 68ch measure. |
| **1024px** | Gutter and rail appear. Dates move right-flush into the margin. This is the design's real form. |
| **1280px** | Identical to 1024px, centred, with more surrounding whitespace. The measure never grows past 68ch. |

Mobile-first: the base stylesheet is the 375px layout; the gutter is added in a single `min-width: 64rem` block.

---

## 9. What each page is for

One job per page. If a sentence doesn't serve the job, it's cut.

| Page | Job |
|---|---|
| `/` | 60 seconds. Who he is, what he runs, what he's aiming at, three proofs, four links out. |
| `/about` | The why. 150–250 words, first person, Carrollton to UIUC, why finance and CS together. Plus the short "outside of work" list. |
| `/experience` | The full record for someone who's already interested — experience, leadership, education, skills, awards. The date rail does the most work here. |
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
