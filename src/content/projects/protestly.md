---
title: Protestly
tagline: An automated property tax protest pipeline for Denton County homeowners.
stack: [Python, Claude API, Playwright, Chrome MCP, nginx, Cloudflare Tunnel]
role: Founder and property tax consultant
dates: Jun 2026 – Present
status: Live — service running, public site in development
featured: true
order: 2
---

## What it is

Denton County homeowners can protest their property appraisal every year, and most of them do not, because the process takes evidence they do not have and a hearing they do not want to sit through. Protestly does the whole thing: pulls the appraisal district data, builds the evidence packet, files through the eFile portal, evaluates the county's counter-offer, and argues the case at the Appraisal Review Board hearing.

It runs on a no-win, no-fee contingency model — 25% of what I save the homeowner, and zero upfront cost. If the protest does not reduce the bill, the homeowner pays nothing.

The service is running and has been through a full protest season. The public site at theqntlabs.com is still in development, so there is no link to it here yet.

## Why I built it

A property tax protest is a document assembly problem wearing a legal costume. The evidence that wins — comparable sales, an equity analysis against similar properties, market trend data — is public record sitting in the Denton Central Appraisal District's system. The work is gathering it, formatting it the way the ARB expects, and showing up. All three are automatable up to the point where a human has to talk, and I wanted to find out how far up that line software could get.

## What I built

**Four Claude agent skills**, each covering one stage of the protest:

- **DCP** — pulls property and comparable data from DCAD.
- **Protest** — assembles a 6-page evidence packet and submits it through the county eFile portal.
- **Counter-Offer** — evaluates the county's counter-offer against the modeled savings and decides whether to accept or go to hearing.
- **ARB Prep** — builds the hearing argument from the filed evidence.

DCAD scraping runs through Chrome MCP. eFile portal submission is automated end to end with Playwright, which removes manual filing from the workflow entirely — that was the step that would otherwise cap how many clients one person can carry.

**Client portal.** A 3-step intake wizard, a color-coded status dashboard so a homeowner can see where their protest is without emailing me, and an admin panel. Behind it: a DCAD ingest pipeline, cap-aware savings math, and automated invoicing off the contingency fee.

**Legal grounding.** Protests are filed under Texas Tax Code sections 41.41, 41.43 and 23.01, supported by comparable sales analysis, equity analysis and market trend data.

### The hard part

The savings math has to be cap-aware. Texas caps how much a homestead's assessed value can rise year over year, which means the assessed value and the market value are two different numbers, and a reduction in market value does not always reduce the tax bill. A naive calculation would promise savings on protests that could not produce any, and on a contingency model that means doing free work and telling the client a wrong number. Getting the cap logic right is what makes the fee honest.

## Results

- **30 Denton County homeowners** represented in online ARB video hearings.
- **$32K** in client tax bill reductions.
- **$8K** in contingency revenue.
- **All 30 clients retained** for a second protest cycle — a 100% commitment rate after the first full season.

## What's next

I am working toward a Texas real estate license and a TDLR property tax consultant license through Aceable, both in progress, and expanding the pipeline to the Collin, Tarrant and Dallas appraisal districts.

The data model, storage layer, payments and email infrastructure were designed to hold up at 2,000+ clients. That is the design target the architecture was built against, not a client count it has reached.
