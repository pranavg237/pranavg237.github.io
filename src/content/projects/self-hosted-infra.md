---
title: Self-hosted web infrastructure
tagline: Production hosting for two live businesses, on hardware I own.
stack: [Linux, nginx, Cloudflare Tunnel, launchd, GitHub Actions]
role: Sole operator
dates: Jun 2026 – Present
status: Live
featured: false
order: 4
---

## What it is

Both Quant Labs products — [EarlyDMV](/projects/earlydmv) and [Protestly](/projects/protestly) — run in production off self-managed local Linux hardware, behind a Cloudflare Tunnel. There is no cloud provider in the path and no hosting bill.

## Why I built it

Two reasons, and the second is the real one.

The first is cost. A student running two businesses at $0 hosting spend keeps the margin on early revenue instead of handing it to a platform.

The second is that hosting on a managed platform means never learning what the platform is doing for you. Running it myself meant I had to understand reverse proxying, TLS, process supervision and deploy automation well enough to fix them at 2am when a customer's payment is not going through. That knowledge is what made the [nginx 405 webhook bug](/projects/earlydmv) findable rather than mysterious.

## What I built

**Cloudflare Tunnel** exposes the local machine publicly without opening a port on my network or holding a static IP.

**nginx** handles reverse proxying to the application processes and TLS termination.

**launchd** supervises the services, so they come back on their own after a restart or a crash.

**GitHub Actions with self-hosted runners** deploys to the same box that serves the sites, which means a deploy is a normal CI job rather than a manual copy.

### The tradeoff, stated honestly

This setup has a single point of failure — the hardware, and the residential connection it sits on. That is an acceptable trade at the current scale, where an outage costs me a support email, and it would not be acceptable at 2,000 clients. The architecture is designed so the application layer can move to managed hosting without a rewrite; what stays behind is the box, not the code.

## Results

- Two live production sites, both serving paying customers.
- **$0** cloud hosting cost.
