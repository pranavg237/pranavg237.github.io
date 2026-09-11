# Content conflicts between the two resumes

Sources:
- **F** = `Resume_Pranav_Gillella-FINAL.docx` → `reference/resume-final.md`
- **2** = `Resume_Pranav_Gillella.docx` → `reference/resume-2.md`

Rules applied (from PROMPT.md):
- **R1** — 2 wins on numbers.
- **R2** — F wins on technical detail (stack, infrastructure, internals, skills, band details).
- **R3** — when both give a date, the more specific one wins.
- **R4** — Quant Labs LLC is ONE experience entry with EarlyDMV and Protestly as sub-sections.
- **R5** — label honestly (paper trading; "2,000+ client scale" is a design target).
- **R6** — omissions: phone, Cafe Associate, "USING CLAUDE CODE", "(Website in production)", street address, gmail.

---

## 1. Header / contact

| Field | F | 2 | Resolution |
|---|---|---|---|
| Email | pranav.gillella1@gmail.com **and** prg6@illinois.edu | prg6@illinois.edu | `prg6@illinois.edu` only (R6) |
| Phone | (redacted) | (redacted) | Omitted everywhere (R6) |
| Location | Carrollton, TX | Carrollton, TX / Champaign, IL | City only where needed; no street address (R6) |
| Sites | earlydmv.com, theqntlabs.com in header | not listed | Kept, but on project pages and footer rather than a header link dump |
| Tagline | "Finance with CS Minor · Gies College of Business, UIUC '30" | none | Site uses the one-liner specified in PROMPT.md instead |

## 2. Education

| Field | F | 2 | Resolution |
|---|---|---|---|
| UIUC dates | Aug 2026 – May 2030 | "Expected Graduation: May 2030" | **Aug 2026 – May 2030** (R3) |
| Degree | B.S. Finance, Computer Science Minor | B.S. Finance, Gies; Minor in CS, **Grainger College of Engineering** | Merge: B.S. Finance (Gies), CS minor (Grainger). 2 is more specific about the minor's college. |
| GPA / ACT | listed as a bullet under **UIUC** | listed under **Hebron High School** | 2 is correct — 3.95 UW / 5.03 W and ACT 34 are high-school figures. Attaching them to UIUC (F) would be misleading. Placed under Hebron. |
| Hebron High School | not a separate entry | Carrollton, TX, graduation May 2026 | Included as a second education entry (2) |
| National Merit Commended | bullet under UIUC | in Awards, dated Sep 2025 | Awards only, dated (R1/R3) — not duplicated under education |
| Coursework | "Relevant Coursework (planned): CS 225, Probability & Statistics, Financial Accounting, Business Analytics" | none | **UNRESOLVED — needs your input.** Not publishing "planned" coursework. See open questions. |

## 3. Quant Labs LLC — structure

**F** splits this into three separate jobs: "Founder & CEO | Quant Labs LLC" (Jun 2026 – Present), "Founder & Full-Stack Developer | EarlyDMV.com" (2026 – Present), and "Property Tax Consultant | Quant Labs LLC / Protestly" (2026 – Present).
**2** has one entry: "Quant Labs LLC — Founder & Full-Stack Developer, Jun 2026 – Present".

**Resolution (R4):** one entry, **Founder, Quant Labs LLC, Jun 2026 – Present, Carrollton, TX**, with EarlyDMV and Protestly as sub-sections underneath. The three-job version overstates headcount and reads as padding to a recruiter.

Title conflict: F says "Founder & CEO", 2 says "Founder & Full-Stack Developer". PROMPT.md specifies "Founder". Using **Founder** — "CEO" of a solo company is noise, and "Full-Stack Developer" is covered by the bullets.

### Proposed final entry

> **Founder — Quant Labs LLC** · Jun 2026 – Present · Carrollton, TX
> A two-product software company I run as sole developer, designer, and operator — product, infrastructure, payments, legal docs, and go-to-market. $9K in revenue in the first 3 months.
>
> **EarlyDMV.com** — a paid Texas DPS appointment rebooking service that finds and secures earlier driver license slots.
> - Built and shipped the full stack solo in Django and HTMX with Stripe checkout including Apple Pay, plus automated transactional email.
> - Cut appointment waits by about 2 weeks on average for 10 customers in the first 2 months.
> - Self-hosted on personal Linux hardware, exposed through a Cloudflare Tunnel — $0 cloud hosting spend.
> - Set up CI/CD with GitHub Actions self-hosted runners; debugged live production failures including nginx 405 errors blocking Stripe webhooks and Apple Pay domain verification.
> - Rebranded and rearchitected from an earlier SlotFinder build (SlotFinderUI / SlotFinderAPI / SlotFinderScheduler); shipped an animated HTML product demo on GitHub Pages.
> - Ran go-to-market alone: TikTok, Instagram and Facebook content, print flyers, and drafted the Terms of Service, Privacy Policy and Refund Policy.
>
> **Protestly (theqntlabs.com)** — an automated property tax protest pipeline for Denton County homeowners, on a 25% contingency fee, no win no fee.
> - Represented 30 Denton County homeowners in Appraisal Review Board hearings, cutting their tax bills by $32K and generating $8K in contingency revenue. All 30 committed to a second cycle.
> - Engineered 4 Claude AI agent skills (DCP, Protest, Counter-Offer, ARB Prep) that automate DCAD data pulls, 6-page evidence packet generation, eFile portal submission, counter-offer evaluation and ARB hearing prep.
> - Built a client portal with a 3-step intake wizard, a color-coded status dashboard and an admin panel, backed by a DCAD ingest pipeline, cap-aware savings math and automated invoicing.
> - Filed protests covering comparable sales, equity analysis and market trend data, and argued them myself in online ARB video hearings.

**Number conflicts inside this entry:** F carries no numbers, 2 carries all of them → 2 wins outright (R1). Note the two revenue windows in 2 are different ("$9K in 3 months" for the company, "10 customers in 2 months" for EarlyDMV); both are kept as written rather than reconciled into one window, because they measure different things.

**Dropped from F:**
- "(Website in production)" next to theqntlabs.com (R6).
- "USING CLAUDE CODE" (appears twice in F; notes to self). Claude Code appears once, in the tools list (R6).
- "Pursuing TDLR Property Tax Consultant license and Texas real estate license; expanding pipeline to Collin, Tarrant, and Dallas CAD counties" — **held pending your confirmation** that this is still current (see open questions).

## 4. Independent quant research

| Field | F | 2 | Resolution |
|---|---|---|---|
| Org name | "Independent" | "Independent Quantitative Research" | **Independent Quant Research** (per PROMPT.md site map) |
| Title | Quant Developer | Quantitative Developer | Quantitative Developer (2 — spelled out) |
| Dates | Mar 2026 – Present | Mar 2026 – Present | No conflict |
| Portfolio | not mentioned | "$100K paper portfolio via the Alpaca Markets API" | Kept and **explicitly labelled paper trading** (R5) |
| Extras | Sharpe, max drawdown, win rate from scratch; Joshi's quant interview book; Fama-French in progress | Sharpe and drawdown; walk-forward optimization | Merge — F's technical detail (R2) plus 2's walk-forward and portfolio size (R1) |

### Proposed final entry

> **Quantitative Developer — Independent Quant Research** · Mar 2026 – Present · Remote
> - Built a moving average crossover backtesting engine in Python, implementing signal generation, position sizing and performance metrics (Sharpe ratio, max drawdown, win rate) from scratch.
> - Ran the strategy on a $100K **paper** portfolio through the Alpaca Markets API, with walk-forward optimization to avoid look-ahead bias.
> - Pulling historical OHLCV data through Alpaca; extending the engine to a Fama-French factor model and working through Joshi's quant finance interview book.

## 5. Intellichoice Tutoring

| Field | F | 2 | Resolution |
|---|---|---|---|
| Title | Co-President | Co-President | No conflict |
| Dates | 2025 – 2026 | **Aug 2025 – May 2026** | Aug 2025 – May 2026 (R3) |
| Numbers | none | 15 peer tutors, 200 students | 2 (R1) |
| Detail | "expanded STEM programs serving underserved students", "Math (Pre-Algebra through Calculus) and Physics" | "3-hour weekly Saturday sessions at a local elementary school", "Pre-Algebra to Calculus" | Merge. **Subject-range conflict:** F includes Physics, 2 does not. Kept F's wider range under R2; flag if that's wrong. |

### Proposed final entry

> **Co-President — Intellichoice Tutoring** · Aug 2025 – May 2026 · Carrollton, TX
> - Recruited 15 peer tutors through social media and club partnerships to serve 200 students.
> - Ran 3-hour Saturday sessions at a local elementary school, covering Pre-Algebra through Calculus and Physics.
> - Handled logistics, scheduling and tutor recruitment for the program.

## 6. Private tutor

| Field | F | 2 | Resolution |
|---|---|---|---|
| Dates | 2023 – 2026 | **Sep 2023 – May 2026** | Sep 2023 – May 2026 (R3) |
| Location | Remote | Carrollton, TX | "Remote" (F) — matches "students across the US" |
| Numbers | "students across the US", "strong student pass rates" (vague) | 5 students, all scored 4+, 85%+ course averages, 2 hrs/week, three academic years | 2 (R1). F's "strong student pass rates" is dropped as unquantified. |

### Proposed final entry

> **Private Tutor — Self-Employed** · Sep 2023 – May 2026 · Remote
> - Tutored 5 AP Calculus AB and BC students, 2 hours a week across three academic years.
> - All 5 scored a 4 or higher on the AP exam and finished with 85%+ course averages.

**Minor unresolved:** F says "students across the US"; 2 says 5 students. These are compatible but I've used only the specific number. Say the word if the "across the US" framing matters to you.

## 7. Cafe Associate — Snow City Cafe

Only in F (2025 – 2026, Carrollton TX; customer service, food prep, cash handling). **Omitted per R6.**

**My recommendation: leave it off.** It is the only entry on the site that doesn't support the quant / founder / technical story, and you already have four substantive entries plus leadership. It stays on the resume PDF where a recruiter expects completeness; the site is not the resume. Tell me if you want it back and I'll add it under Experience.

## 8. Leadership

| Item | F | 2 | Resolution |
|---|---|---|---|
| Financial Engineering Club | "Fall 2026 – Present", no detail | **Aug 2026 – Present**, Member, weekly sessions on derivatives pricing / market microstructure / quant trading strategy, Python research projects | Aug 2026 (R3) + 2's detail (only source) |
| Gies Ambassadors | "Fall 2026 – Present", no detail | **Aug 2026 – Present**, campus tours, student panels, video features and photo shoots, admitted student events | Aug 2026 (R3) + 2's detail |
| Hebron Band dates | 2022 – 2026 | **Aug 2022 – May 2026** | Aug 2022 – May 2026 (R3) |
| Band role | "Squad Leader and liaison between directors and a 200+ member ensemble" | "Squad Leader… liaison between directors and members" of a 200+ member ensemble | No real conflict |
| All-Area clarinet | "2024–26" | "three consecutive years" | Same claim, F is more specific (R2/R3) → 2024–26 |
| UIL Solo & Ensemble | "consecutive Superior ratings" | not mentioned | Kept (R2, F is the only source) |
| Ensemble results | 3rd BOA Grand Nationals (2023), 1st UIL State (2024), 1st BOA Super Regionals (2025) | same three, undated | F's years (R2/R3) |

## 9. Awards

F lists awards undated and in one run-on line. 2 dates every one. **2 wins (R1/R3):**

- TMEA All-State Band, Texas Music Educators Association — Feb 2026
- National Merit Commended Scholar — Sep 2025
- AP Scholar with Distinction, 5s in Calculus AB, Calculus BC, Computer Science A — Jul 2025
- National Finalist, InvestWrite, and Grand Champion, Stock Market Game — May 2023

F's "ACT 34" is listed as an award; moved to education (2's placement) since it isn't one.

## 10. Skills

R2 says F wins on the skills list. F's groups and contents:

- **Languages** — Python (numpy, pandas, matplotlib), Java
- **Frameworks** — React / Next.js, Playwright
- **Infrastructure** — Linux (self-hosted), nginx, Cloudflare Tunnel, launchd, GitHub Actions (self-hosted runners), Git/GitHub
- **Tools / APIs** — Alpaca Markets API, Claude API, Stripe (incl. Apple Pay)
- **Finance** — options pricing, equity valuation, backtesting, Texas property tax law (Tax Code 41.41, 41.43, 23.01)
- **Quant** — factor models (Fama-French, in progress)

Changes I'm applying:

1. **Django and HTMX added to Frameworks.** F's skills list omits Django entirely even though F's own experience bullets say EarlyDMV is built in Django + HTMX; 2's skills list includes Django. This is an internal inconsistency in F, not a genuine disagreement, so the more complete list wins.
2. **Finance and Quant merged into one "Finance & Quant" group**, per the site map.
3. **Claude Code added once to Tools / APIs**, per R6.
4. Proficiency levels from 2 ("Python advanced, Java intermediate") **dropped** — self-assessed levels don't survive contact with a quant recruiter, and F (the technical-detail winner) doesn't use them.

**UNRESOLVED:** F lists **Next.js** under Frameworks, but no project in either resume uses it (EarlyDMV is Django + HTMX, Protestly is Python + Claude API, the backtester is Python). Flagging rather than dropping — see open questions.

## 11. Projects

F is the only source for the projects section. Four project pages, per PROMPT.md:

| Slug | Sources |
|---|---|
| `earlydmv` | F's EarlyDMV bullets (stack, infra, nginx 405, Apple Pay verification, SlotFinder history, GTM) + 2's numbers |
| `protestly` | F's agent-skill and portal internals + 2's 30 homeowners / $32K / $8K / second cycle |
| `ma-crossover-backtest` | F's project entry and experience bullets + 2's $100K paper portfolio |
| `self-hosted-infra` | F only (Linux, nginx, Cloudflare Tunnel, TLS, launchd, self-hosted runners) |

Title changes:
- "MA Crossover Backtesting Engine **(Built with Claude Code)**" → "MA crossover backtesting engine" (R6).
- "Designed data model, storage, payments, and email infrastructure for **2,000+ client scale**" → phrased as a design target: "designed the data model, storage, payments and email infrastructure to hold up at 2,000+ clients — a design target, not a number it has hit" (R5).

---

## Resolved — Pranav's answers, 7 Sep 2026

All open questions are closed. A third source also arrived with these answers:
**`Resume_Pranav_Gillella_MASTER.pdf`** (referred to below as **M**), which is
now `public/resume.pdf`. M is a reconciled document that already merges most of
F and 2, and it resolves nearly every conflict above in the same direction the
rules did. Where M adds something neither F nor 2 had, it is treated as
authoritative — it is the most recent document and the one the site links to.

| # | Question | Answer | What the site does |
|---|---|---|---|
| 1 | This semester's coursework | Calc 3, Microeconomics, Public Speaking, CS 124, Business 101, Freshman Academy (FIN 199) | Published under UIUC as "This semester", replacing F's "planned" list. M's planned-coursework line is **not** used. |
| 2 | TDLR + Texas real estate licence | Still pursuing both, through Aceable | Phrased "in progress" on `/experience` and the Protestly project page, naming Aceable |
| 3 | Cafe Associate | **Add it** (overrides the omit rule in PROMPT.md) | Included on `/experience` and `/resume` as its own entry |
| 4 | Next.js in skills | **Keep it** | Kept in Frameworks. M also lists it, alongside Django and HTMX |
| 5 | EarlyDMV / Protestly start dates | Both **Jun 2026** | M dates both sub-entries Jun 2026, matching the parent company |
| 6 | Physics at Intellichoice | Keep (default accepted) | Kept. M confirms: "Pre-Algebra through Calculus and Physics" |
| 7 | Gmail on the site | **Add it** (overrides the omit rule in PROMPT.md) | `pranav.gillella1@gmail.com` recorded in `src/data/resume.ts` as `altEmail` |
| — | Résumé PDF | Supplied | `public/resume.pdf`, linked from `/resume` with a "last updated" date |
| — | Headshot | Skipping | No headshot anywhere; the layout was designed not to need one |

### New facts M contributes that neither F nor 2 had

- Quant Labs: "Drafted Terms of Service, Privacy Policy and Refund Policy for both products **without outside counsel**"; "Manage all customer acquisition, billing and support across both product lines".
- Protestly: "Retained all 30 clients for a second protest cycle, a **100% commitment rate** after the first full season"; the no-win-no-fee model "requiring **zero upfront cost** from homeowners"; protests filed "under Texas Tax Code sections **41.41, 41.43 and 23.01**".
- Backtester: "transaction cost modeling" and "full equity curve simulation"; metrics computed from scratch "**rather than relying on external backtesting libraries**".
- Infrastructure: "**TLS termination**" named explicitly alongside nginx reverse proxying.
- Education: Hebron carries "High School Diploma" as a credential line.
- Skills: adds **Chrome MCP** to Tools & APIs, and **Django / HTMX** to Frameworks — confirming §10's fix independently.
- Awards: **All-Area Clarinet, TMEA Region, 2024–2026** listed as its own dated award.

### Where the site still departs from M, and why

M is a résumé and the site is not, so three of PROMPT.md's rules still override it:

1. **M splits Quant Labs into three entries** (Quant Labs LLC / EarlyDMV.com / Protestly, all "Jun 2026 – Present"). The site keeps **one** entry with two sub-sections, per the structural rule. Three entries for a solo two-product company reads as padding on a web page even where it is conventional on a résumé.
2. **M's title is "Founder & Chief Executive Officer".** The site says **Founder**. "CEO" of a company with one employee adds nothing a recruiter will credit.
3. **M dates Snow City Cafe "[Month] 2025 - [Month] 2026"** — an unfilled placeholder. The site uses **2025 – 2026** from F. *Fill the months into the PDF before sending it anywhere.*

### One thing found by testing, not by reading

`theqntlabs.com` **does not serve over HTTPS.** The domain resolves to an IONOS
address that returns a parking page over plain HTTP and fails the TLS handshake
outright on 443 (`ERR_SSL_PROTOCOL_ERROR`). Pranav confirmed the site is still
in development.

The Protestly project page therefore carries **no link** to it — a link would
drop a recruiter into a full-page browser security warning, which is worse than
no link. The domain still appears as plain text, and the page says the public
site is in development. Restore the link by putting `links.live` back in
`src/content/projects/protestly.md` and the `href` back on the Protestly
sub-role in `src/data/resume.ts`, both of which are commented at the spot.

The business itself is live and is described as such — 30 clients, a full
protest season, $32K in reductions. It is only the website that is not.

---

## Revised master — 10 Sep 2026

Pranav supplied a revised `Resume_Pranav_Gillella_MASTER.pdf` (4 pages) and a
new one-page `Resume_Pranav_Gillella.pdf`. The one-pager is now
`public/resume.pdf`; the site's content follows the master. Diffed against the
previous master (commit `186f0ad`), these are the substantive changes — the
rest is abbreviations spelled out for ATS parsing, which the site does not copy.

| Change in the master | What the site does |
|---|---|
| Degree **Finance → Undeclared**, Gies | Credential reads "B.S., Undeclared". The one-liner, home title, OG image and About copy say "Business + CS" / "undeclared in Gies" instead of claiming a finance major. About still argues for finance as the interest, which it is. |
| Weighted GPA (5.03) and ACT 34 removed | Removed. Hebron shows GPA 3.95 / 4.00 only. |
| Intellichoice: 15 → **15+** tutors, 200 → **200 elementary** students | Updated. |
| Private tutor: "nationwide" | Added; location stays Remote. |
| Snow City Cafe months filled in (Feb – Aug 2026) and moved above Intellichoice | Reordered to match. The months already matched. |
| Projects reordered, Self-Hosted Infrastructure first; all dated to the month | Reordered to match. |
| New "EarlyDMV.com Scheduling Platform" project | **Not** duplicated on `/experience` — it restates the EarlyDMV sub-role directly above it, and `/projects/earlydmv` already covers it. Same for the Property Tax Protest Automation Pipeline, which the old master also had. |
| Gies Ambassadors: "Represent" → "Promote" | Updated, with "and families". |
| Band: TMEA All-State / All-Area bullet removed | Removed; both remain under Awards. |
| Skills now carry self-assessed levels throughout | **Reverses §10's decision to drop levels.** Pranav added them on purpose to both résumés, so the site shows them, tiered per group. |
| Interests rewritten (Timberwolves, DCI, bodybuilding, Apple hardware, local AI models; Vikings on the one-pager) | Merged into "Outside of work". Clarinet and math problem-solving are kept because nothing contradicts them. |

Unchanged on purpose: the Quant Labs structure and "Founder" title, Independent
Quant Research living under Projects, "this semester" coursework instead of the
planned list, and the LinkedIn URL. Both PDFs still print
`linkedin.com/in/pranavgillella` as plain text (no hyperlink in the .docx),
which is the same text the previous one-pager carried when the site was pointed
at `/in/pranav-gillella-a953ba435` on 8 Sep. LinkedIn answers automated requests
with a 999, so neither URL could be verified from here.
