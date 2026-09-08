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
  /** Omitted for projects, which have a stack in `org` and no place of work. */
  readonly location?: string;
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
  linkedin: 'https://www.linkedin.com/in/pranav-gillella-a953ba435',
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
      'Running Quant Labs LLC — EarlyDMV, a Texas DPS appointment rebooking service, and Protestly, property tax protests for Denton County homeowners.',
  },
  {
    date: 'Mar 2026',
    text:
      'Teaching myself quant: a crossover backtester in Python, a Fama-French factor model, and working problems out of Joshi and Zhou’s Green Book.',
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
      'A two-product software company I run alone, across product, infrastructure, payments, legal and go-to-market. $9K in revenue over the first 3 months.',
    bullets: [
      'Drafted the Terms of Service, Privacy Policy and Refund Policy for both products, without outside counsel.',
      'Handle all customer acquisition, billing and support across both product lines.',
      'Self-host both sites on personal Linux hardware behind a Cloudflare Tunnel, at $0 hosting cost.',
    ],
    subRoles: [
      {
        name: 'EarlyDMV',
        href: 'https://earlydmv.com',
        summary:
          'A paid service that finds and secures earlier Texas DPS driver license appointments.',
        bullets: [
          'Cut appointment waits by 2 weeks on average across 10 customers in the first 2 months.',
          'Built the full stack solo in Django and HTMX, with Stripe checkout, Apple Pay and transactional email.',
          'Set up CI/CD on self-hosted GitHub Actions runners, and fixed live failures — nginx 405s blocking Stripe webhooks, Apple Pay domain verification.',
          'Rearchitected and rebranded it from an earlier SlotFinder build split across three repositories.',
          'Shipped an animated demo on GitHub Pages and ran go-to-market through TikTok, Instagram, Facebook and print flyers.',
        ],
      },
      {
        // No href: theqntlabs.com is still in development and does not serve
        // over HTTPS, so linking it would send visitors into a browser TLS
        // warning. Restore the href once the site ships.
        name: 'Protestly',
        summary:
          'Automated property tax protests for Denton County homeowners, on a no-win, no-fee 25% contingency. The public site at theqntlabs.com is still in development.',
        bullets: [
          'Represented 30 homeowners in Appraisal Review Board video hearings, cutting their tax bills by $32K and generating $8K in fees.',
          'Retained all 30 clients for a second protest cycle — a 100% commitment rate after the first full season.',
          'Engineered 4 Claude AI agent skills: DCAD data pulls, 6-page evidence packets, eFile submission, counter-offer evaluation and hearing prep.',
          'Designed a client portal — 3-step intake, status dashboard, admin panel — over a DCAD ingest pipeline with cap-aware savings math and automated invoicing.',
          'Filed protests on comparable sales, equity and market trend evidence under Texas Tax Code 41.41, 41.43 and 23.01.',
          'Pursuing a Texas real estate license and a TDLR property tax consultant license, while expanding into the Collin, Tarrant and Dallas appraisal districts.',
        ],
      },
    ],
  },
  {
    org: 'Intellichoice Tutoring',
    role: 'Co-President',
    dates: 'Aug 2025 – May 2026',
    location: 'Carrollton, TX',
    bullets: [
      'Recruited 15 peer tutors through social media and club partnerships to serve 200 students.',
      'Ran 3-hour Saturday sessions at a local elementary school, Pre-Algebra through Calculus and Physics.',
      'Handled scheduling and logistics for a community program serving underserved students.',
    ],
  },
  {
    org: 'Self-Employed',
    role: 'Private Tutor',
    dates: 'Dec 2024 – May 2026',
    location: 'Remote',
    bullets: [
      'Tutored 5 AP Calculus AB and BC students, 2 hours weekly across two academic years.',
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
      'Customer service, food prep and cash handling in a high-volume cafe.',
      'Held order accuracy and service speed through peak hours on a rotating shift team.',
    ],
  },
];

/* -------------------------------------------------------------------------- */

/**
 * Self-directed work, kept out of `experience` on purpose: none of it is
 * employment, and the résumé PDF draws the same line. `org` carries the stack
 * rather than an employer, and there is no location.
 */
export const projects: readonly Job[] = [
  {
    org: 'Python, Alpaca Markets API',
    role: 'MA Crossover Backtesting Engine',
    dates: 'Mar 2026 – Present',
    bullets: [
      'Built a moving average crossover backtesting engine in Python: signal generation, position sizing, transaction costs and equity curve simulation.',
      'Wrote the metrics from scratch — Sharpe, maximum drawdown, win rate — instead of using a backtesting library.',
      'Ran it on a $100K paper portfolio through the Alpaca Markets API. Paper trading, not live capital.',
      'Applied walk-forward optimization across short and long SMA windows to remove look-ahead bias.',
      'Extending it to a Fama-French factor model, alongside Joshi’s quant finance interview guide.',
    ],
  },
  {
    org: 'Linux, nginx, Cloudflare Tunnel',
    role: 'Self-Hosted Web Infrastructure',
    dates: 'Jun 2026 – Present',
    bullets: [
      'Run both production business sites off local Linux hardware at $0 hosting cost.',
      'Configured nginx reverse proxying, TLS and GitHub Actions self-hosted runners for deploys.',
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
      'Represent Gies to prospective and admitted students through campus tours and panels.',
      'Support recruitment and branding through video features, photo shoots and admitted student events.',
    ],
  },
  {
    org: 'Hebron High School Band',
    role: 'Squad Leader',
    dates: 'Aug 2022 – May 2026',
    location: 'Carrollton, TX',
    bullets: [
      'Led a squad in a 200+ member ensemble, as liaison between the directors and members.',
      'Earned TMEA All-State Band membership in 2026 and All-Area clarinet honors across three consecutive years.',
      'Earned consecutive Superior ratings at UIL Solo and Ensemble competition.',
      'With the ensemble: 3rd at BOA Grand Nationals (2023), 1st at UIL State (2024), 1st at BOA Super Regionals (2025).',
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
export const resumeUpdated = '2026-09-08';
