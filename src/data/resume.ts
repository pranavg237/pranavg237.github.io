/**
 * Single source of truth for all resume-style content on the site.
 *
 * Reconciled from Resume_Pranav_Gillella-FINAL.docx, Resume_Pranav_Gillella.docx,
 * and Resume_Pranav_Gillella_MASTER.pdf per the rules in PROMPT.md.
 * The reasoning for every conflict is in reference/content-conflicts.md.
 *
 * Nothing in this file is invented. If a fact is not in one of those three
 * documents or in Pranav's own answers, it is not here.
 */

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface SubRole {
  readonly name: string;
  readonly href?: string;
  readonly summary: string;
  readonly bullets: readonly string[];
}

export interface Job {
  readonly org: string;
  readonly role: string;
  readonly dates: string;
  readonly location: string;
  readonly summary?: string;
  readonly bullets: readonly string[];
  readonly subRoles?: readonly SubRole[];
}

export interface Education {
  readonly school: string;
  readonly credential: string;
  readonly dates: string;
  readonly location: string;
  readonly bullets: readonly string[];
}

export interface Award {
  readonly name: string;
  readonly issuer?: string;
  readonly date: string;
}

export interface SkillGroup {
  readonly name: string;
  readonly items: readonly string[];
}

/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Pranav Gillella',
  /**
   * The masthead's second line. Short enough to sit beside the name at
   * display size, and the same claim BaseHead already makes in JSON-LD.
   */
  title: 'Founder, Quant Labs LLC',
  /** The one line, verbatim from PROMPT.md. */
  oneLiner:
    'Finance + CS at UIUC. Founder of Quant Labs LLC. Working toward quant trading and research.',
  location: 'Carrollton, TX',
  email: 'prg6@illinois.edu',
  altEmail: 'pranav.gillella1@gmail.com',
  github: 'https://github.com/pranavg237',
  linkedin: 'https://www.linkedin.com/in/pranavgillella',
  handshake: 'https://app.joinhandshake.com/profiles/rat3uj',
} as const;

/** Footer and home-page links, in order. */
export const links: readonly Link[] = [
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Handshake', href: profile.handshake },
  { label: 'Résumé (PDF)', href: '/resume.pdf' },
];

/** Home page "Now" block. Three bullets, each dated for the rail. */
export const now: readonly { date: string; text: string }[] = [
  {
    date: 'Aug 2026',
    text:
      'Freshman at UIUC, studying finance in Gies with a computer science minor in Grainger.',
  },
  {
    date: 'Jun 2026',
    text:
      'Running Quant Labs LLC — EarlyDMV, a Texas DPS appointment rebooking service, and Protestly, a property tax protest pipeline for Denton County homeowners.',
  },
  {
    date: 'Mar 2026',
    text:
      'Teaching myself quant: a moving average crossover backtester in Python, a Fama-French factor model, and Joshi’s quant finance interview guide.',
  },
];

/* -------------------------------------------------------------------------- */

export const experience: readonly Job[] = [
  {
    org: 'Quant Labs LLC',
    role: 'Founder',
    dates: 'Jun 2026 – Present',
    location: 'Carrollton, TX',
    summary:
      'A two-product software company I run alone — sole developer, designer and operator across product, infrastructure, payments, legal documentation and go-to-market. $9K in revenue over the first 3 months.',
    bullets: [
      'Drafted the Terms of Service, Privacy Policy and Refund Policy for both products without outside counsel.',
      'Handle all customer acquisition, billing and support across both product lines.',
      'Self-host both production sites on personal Linux hardware behind a Cloudflare Tunnel, at $0 cloud hosting cost.',
    ],
    subRoles: [
      {
        name: 'EarlyDMV',
        href: 'https://earlydmv.com',
        summary:
          'A paid Texas DPS appointment rebooking service that finds and secures earlier driver license slots.',
        bullets: [
          'Cut appointment waits by 2 weeks on average across 10 customers in the first 2 months.',
          'Built the full stack solo in Django and HTMX, with Stripe checkout, Apple Pay support and automated transactional email.',
          'Configured CI/CD with GitHub Actions self-hosted runners, and fixed live production failures including nginx 405 errors blocking Stripe webhooks and Apple Pay domain verification.',
          'Rearchitected and rebranded the product from an earlier SlotFinder build that spanned separate UI, API and scheduler repositories.',
          'Shipped an animated HTML product demo on GitHub Pages and ran go-to-market through TikTok, Instagram, Facebook and print flyer campaigns.',
        ],
      },
      {
        // No href: theqntlabs.com is still in development and does not serve
        // over HTTPS, so linking it would send visitors into a browser TLS
        // warning. Restore the href once the site ships.
        name: 'Protestly',
        summary:
          'An automated property tax protest pipeline for Denton County homeowners, on a no-win, no-fee 25% contingency model with zero upfront cost. The public site at theqntlabs.com is still in development.',
        bullets: [
          'Represented 30 Denton County homeowners in online Appraisal Review Board video hearings, cutting client tax bills by $32K and generating $8K on the contingency fee.',
          'Retained all 30 clients for a second protest cycle — a 100% commitment rate after the first full season.',
          'Engineered 4 Claude AI agent skills automating DCAD data pulls, 6-page evidence packet generation, eFile portal submission, counter-offer evaluation and ARB hearing preparation.',
          'Designed a client portal with a 3-step intake wizard, a color-coded status dashboard and an admin panel, backed by a DCAD ingest pipeline, cap-aware savings math and automated invoicing.',
          'Filed protests supported by comparable sales analysis, equity analysis and market trend data under Texas Tax Code sections 41.41, 41.43 and 23.01.',
          'Working toward a Texas real estate license and a TDLR property tax consultant license through Aceable, both in progress, while expanding the pipeline to the Collin, Tarrant and Dallas appraisal districts.',
        ],
      },
    ],
  },
  {
    org: 'Independent Quant Research',
    role: 'Quantitative Developer',
    dates: 'Mar 2026 – Present',
    location: 'Carrollton, TX',
    bullets: [
      'Built a moving average crossover backtesting engine in Python, implementing signal generation, position sizing, transaction cost modeling and full equity curve simulation.',
      'Computed performance metrics from scratch — Sharpe ratio, maximum drawdown, win rate — rather than relying on an external backtesting library.',
      'Ran the strategy on a $100K paper portfolio through the Alpaca Markets API, with historical OHLCV data pulls. Paper trading, not live capital.',
      'Applied walk-forward optimization across parameterized short and long SMA windows to remove look-ahead bias.',
      'Extending the engine to a Fama-French factor model while working through Joshi’s quantitative finance interview guide.',
    ],
  },
  {
    org: 'Intellichoice Tutoring',
    role: 'Co-President',
    dates: 'Aug 2025 – May 2026',
    location: 'Carrollton, TX',
    bullets: [
      'Recruited 15 peer tutors through social media outreach and club partnerships to serve 200 students.',
      'Directed 3-hour weekly Saturday sessions at a local elementary school, spanning Pre-Algebra through Calculus and Physics.',
      'Oversaw scheduling and logistics for a community math and science program targeting underserved students.',
    ],
  },
  {
    org: 'Self-Employed',
    role: 'Private Tutor',
    dates: 'Sep 2023 – May 2026',
    location: 'Remote',
    bullets: [
      'Tutored 5 AP Calculus AB and BC students nationwide, 2 hours weekly across three academic years.',
      'All 5 scored a 4 or higher on the AP exam, with course averages above 85%.',
    ],
  },
  {
    org: 'Snow City Cafe',
    role: 'Cafe Associate',
    // Months confirmed by Pranav; the résumé PDF still carries the vaguer
    // "2025 – 2026" span and should be corrected to match.
    dates: 'Feb 2026 – Aug 2026',
    location: 'Carrollton, TX',
    bullets: [
      'Handled customer service, food preparation and cash handling in a high-volume cafe.',
      'Maintained order accuracy and service speed during peak hours alongside a rotating shift team.',
    ],
  },
];

/* -------------------------------------------------------------------------- */

export const leadership: readonly Job[] = [
  {
    org: 'Financial Engineering Club, University of Illinois',
    role: 'Member',
    dates: 'Aug 2026 – Present',
    location: 'Champaign, IL',
    bullets: [
      'Attend weekly sessions on derivatives pricing, market microstructure and quantitative trading strategy.',
      'Work with peers on Python-based research and trading projects outside of coursework.',
    ],
  },
  {
    org: 'Gies Ambassadors, Gies College of Business',
    role: 'Ambassador',
    dates: 'Aug 2026 – Present',
    location: 'Champaign, IL',
    bullets: [
      'Represent Gies to prospective and admitted students and families through campus tours and student panels.',
      'Support college recruitment and branding through video features, photo shoots and admitted student events.',
    ],
  },
  {
    org: 'Hebron High School Band',
    role: 'Squad Leader',
    dates: 'Aug 2022 – May 2026',
    location: 'Carrollton, TX',
    bullets: [
      'Led a squad within a 200+ member ensemble, serving as liaison between the directors and members.',
      'Earned TMEA All-State Band membership in 2026 and All-Area clarinet honors across three consecutive years.',
      'Earned consecutive Superior ratings at UIL Solo and Ensemble competition.',
      'Placed 3rd at BOA Grand Nationals in 2023, 1st at UIL State in 2024 and 1st at BOA Super Regionals in 2025 with the ensemble.',
    ],
  },
];

/* -------------------------------------------------------------------------- */

export const education: readonly Education[] = [
  {
    school: 'University of Illinois Urbana-Champaign',
    credential: 'B.S. Finance, Gies College of Business',
    dates: 'Aug 2026 – May 2030',
    location: 'Champaign, IL',
    bullets: [
      'Minor in Computer Science, Grainger College of Engineering.',
      'This semester: Calculus III, Microeconomics, Public Speaking, CS 124, Business 101, and Freshman Academy (FIN 199).',
    ],
  },
  {
    school: 'Hebron High School',
    credential: 'High School Diploma',
    dates: 'Aug 2022 – May 2026',
    location: 'Carrollton, TX',
    bullets: [
      'GPA 3.95 unweighted / 5.03 weighted. ACT 34.',
      'National Merit Commended Scholar. AP Scholar with Distinction, with 5s in Calculus AB, Calculus BC and Computer Science A.',
    ],
  },
];

/* -------------------------------------------------------------------------- */

export const awards: readonly Award[] = [
  {
    name: 'TMEA All-State Band',
    issuer: 'Texas Music Educators Association',
    date: 'Feb 2026',
  },
  { name: 'All-Area Clarinet', issuer: 'TMEA Region', date: '2024 – 2026' },
  { name: 'National Merit Commended Scholar', date: 'Sep 2025' },
  {
    name: 'AP Scholar with Distinction',
    issuer: '5s in Calculus AB, Calculus BC and Computer Science A',
    date: 'Jul 2025',
  },
  { name: 'National Finalist, InvestWrite', date: 'May 2023' },
  { name: 'Grand Champion, Stock Market Game', date: 'May 2023' },
];

/* -------------------------------------------------------------------------- */

export const skills: readonly SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'numpy', 'pandas', 'matplotlib', 'Java'],
  },
  {
    name: 'Frameworks',
    items: ['Django', 'HTMX', 'React', 'Next.js', 'Playwright'],
  },
  {
    name: 'Infrastructure',
    items: [
      'Linux (self-hosted)',
      'nginx',
      'Cloudflare Tunnel',
      'launchd',
      'GitHub Actions (self-hosted runners)',
      'Git/GitHub',
    ],
  },
  {
    name: 'Tools & APIs',
    items: [
      'Alpaca Markets API',
      'Claude API',
      'Claude Code',
      'Chrome MCP',
      'Stripe (incl. Apple Pay)',
    ],
  },
  {
    name: 'Finance & Quant',
    items: [
      'Equity valuation',
      'Options pricing',
      'Strategy backtesting',
      'Factor models (Fama-French)',
      'Texas property tax law (Tax Code 41.41, 41.43, 23.01)',
    ],
  },
];

/* -------------------------------------------------------------------------- */

/** Short list for /about. Pranav edits this one. */
export const outsideOfWork: readonly string[] = [
  'Clarinet — TMEA All-State Band, 2026',
  'DCI marching band',
  'Gym and natural bodybuilding',
  'Basketball',
  'Math problem-solving for its own sake',
];

/** Shown on /resume next to the PDF link. Update when public/resume.pdf changes. */
export const resumeUpdated = '2026-09-07';
