---
title: EarlyDMV
tagline: A paid Texas DPS appointment rebooking service.
stack: [Django, HTMX, Stripe, nginx, Cloudflare Tunnel, GitHub Actions]
role: Sole developer, designer and operator
dates: Jun 2026 – Present
status: Live
links:
  live: https://earlydmv.com
featured: true
order: 1
---

## What it is

Texas DPS appointment slots for a driver license are booked out months ahead, but they open up constantly as other people cancel. EarlyDMV watches for those openings and rebooks customers into an earlier slot than the one they were stuck with. It is a paid service — customers pay through Stripe checkout, and the site handles everything from intake to confirmation email.

## Why I built it

I went through the DPS booking process myself and found the same thing everyone finds: the first available appointment is months out, and the only way to do better is to sit and refresh the site. That is a job for a computer. The problem also had the two properties I wanted in a first business — the pain is specific and dated, and the person feeling it is willing to pay to make it go away.

## What I built

The whole stack is mine: product, code, infrastructure, payments, the legal docs and go-to-market.

**Application.** Django with HTMX on the front end. HTMX rather than a single-page framework because the app is a handful of forms and a status view — a React bundle would have been more machinery than the problem needed, and server-rendered HTML keeps the whole thing in one language.

**Payments.** Stripe checkout, including Apple Pay. Transactional email is automated end to end, so a customer gets confirmation without me touching anything.

**Hosting.** The production application runs on personal Linux hardware, exposed to the internet through a Cloudflare Tunnel. nginx handles reverse proxying and TLS termination, and launchd supervises the services. Cloud hosting spend is $0. That is written up separately in [self-hosted infrastructure](/projects/self-hosted-infra).

**Deploys.** CI/CD through GitHub Actions with self-hosted runners, so the runner is the same box the site runs on.

### The hard parts

**nginx was returning 405 on Stripe webhooks.** Stripe posts to the webhook endpoint, nginx answered `405 Method Not Allowed`, and payments completed on Stripe's side while the application never heard about them. The cause was nginx matching the webhook path against a location block that served static files, and static file handlers reject POST. Payments looked fine in the Stripe dashboard and broken in my database, which is the worst way for a bug to present itself. Fixed by making the webhook path match the proxy location before it could fall through to the static handler.

**Apple Pay domain verification.** Apple Pay requires serving a verification file from a well-known path on the exact domain, and the request has to reach it unmodified. Behind a tunnel and a reverse proxy there are several places that path can get rewritten or intercepted before it lands. Getting the verification to pass meant tracing the request through every hop.

**The SlotFinder rewrite.** The product started as SlotFinder, split across three repositories — `SlotFinderUI`, `SlotFinderAPI` and `SlotFinderScheduler`. Three repos for a one-person project meant every change touched all three and nothing could be deployed atomically. I rearchitected it into a single Django application and rebranded to EarlyDMV.

## Results

- $9K in revenue across Quant Labs in the first 3 months.
- 10 customers in the first 2 months, with appointment waits cut by **2 weeks on average**.
- $0 cloud hosting cost.

## Go-to-market

I ran acquisition myself: TikTok, Instagram and Facebook content plus print flyer campaigns, and an animated HTML product demo hosted on GitHub Pages. I also wrote the Terms of Service, Privacy Policy and Refund Policy without outside counsel.
