// Long-form case studies for flagship projects, keyed by the /project/[slug]
// route slug. Project pages that have an entry here render the full write-up
// and are indexed; the rest stay "noindex, follow" until they get one.
// CommonJS on purpose — scripts/generate-sitemap.js requires this file too.

const caseStudies = {
  "rivals-league": {
    role: "Design, full-stack development and operations",
    intro:
      "Rivals League is a tournament platform for competitive gaming — leagues, brackets, match operations and payments in one product. I built it end to end: frontend, API, data model, payment flow and the Discord bot that runs match operations.",
    sections: [
      {
        heading: "The problem",
        body: "Running an esports league involves a surprising amount of manual work: registrations, seeding, match check-ins, score reporting, disputes and payouts. Most organizers juggle this across spreadsheets, Discord DMs and generic bracket tools that don't talk to each other. Having administered tournaments professionally at G-Loot, I knew exactly where that workflow breaks down — so Rivals League was designed around removing those manual steps.",
      },
      {
        heading: "What I built",
        body: "The platform is a React frontend (Vite) backed by an Express API on Supabase, with Stripe handling entry fees and payments. Editorial content — news, league pages, rules — lives in a Strapi CMS so it can be updated without deploys, and a separate stats backend aggregates match results into player and team statistics. The piece that ties it together is a Discord bot built with discord.js: teams check in, report scores and get bracket updates directly in Discord, where players already are, and the bot syncs everything back to the platform.",
      },
      {
        heading: "Why it's built this way",
        body: "Match operations live in Discord because that's where esports teams actually communicate on match day — asking them to switch tabs to a website mid-series loses them. Keeping the API as a thin Express layer over Supabase keeps the data model in one place, and Stripe means the money flow is auditable rather than handled over Swish screenshots. The stats backend is separate so heavy aggregation never slows down match-day traffic.",
      },
    ],
    highlights: [
      "Full tournament lifecycle: registration, seeding, brackets, results, payouts",
      "Discord bot for match check-ins and score reporting, synced to the platform",
      "Stripe-powered entry fees and payments",
      "Strapi CMS for self-serve editorial content",
      "Separate stats backend for player and team statistics",
    ],
  },

  "svenska-esportforbundet": {
    role: "Freelance web developer — design, build and CMS setup",
    intro:
      "The official website of the Swedish Esports Federation (Svenska E-sportförbundet), built as a freelance project so the federation can publish news, information and member content themselves — without a developer in the loop.",
    sections: [
      {
        heading: "The problem",
        body: "A national sports federation publishes constantly: news, statements, member information, event announcements. The federation needed a site that non-technical staff could keep current, that presents the organization credibly to the public, press and policymakers — and that a small non-profit can afford to run.",
      },
      {
        heading: "What I built",
        body: "I first built the initial iteration of the federation's site with a custom CMS solution, then rebuilt it on a sturdier setup: a Next.js frontend in TypeScript with a headless Strapi CMS behind it, and Resend for transactional email. Editors work entirely in Strapi — writing news and updating pages — and the site renders it server-side, so the public site stays fast and indexable regardless of what's published.",
      },
      {
        heading: "Why it's built this way",
        body: "Headless CMS was the whole point of the assignment: the deliverable wasn't a website so much as the federation's independence from me. Next.js server rendering keeps the content crawlable — which matters for an organization whose statements get referenced by press — and the stack is boring on purpose, so any developer they hire after me can pick it up.",
      },
    ],
    highlights: [
      "Next.js + TypeScript frontend, server-rendered for speed and crawlability",
      "Headless Strapi CMS — the federation publishes without developer involvement",
      "Transactional email via Resend",
      "Two iterations: custom CMS first, then a rebuild on a long-term stack",
    ],
  },

  cryptoskatt: {
    role: "Design and full-stack development",
    intro:
      "Cryptoskatt helps Swedish crypto traders sort out their taxes — turning transaction history into the numbers needed for the K4 declaration, a chore that otherwise means a spreadsheet and a long evening with Skatteverket's rules.",
    sections: [
      {
        heading: "The problem",
        body: "Sweden taxes each crypto disposal as a capital gain, calculated with the average cost basis (genomsnittsmetoden). Anyone who has traded across exchanges quickly ends up with hundreds of transactions to reconcile by hand. The tools that exist are mostly international, priced in dollars, and not built around how Swedish declarations actually work.",
      },
      {
        heading: "What I built",
        body: "A Next.js app in TypeScript where traders import transactions — CSV from Binance, Coinbase or Kraken, or directly from a Bitcoin, Ethereum, Solana or EVM wallet address — and get their cost basis calculated with the average-cost method, including crypto-to-crypto trades and SEK conversion per transaction day using Riksbanken's exchange rates. The output is a finished K4 form (SKV 2104) ready to upload to Skatteverket, with the 30% capital gains tax and the 70% loss deduction rule applied automatically. Supabase handles accounts and data storage, and Stripe handles payment.",
      },
      {
        heading: "Why it's built this way",
        body: "Building specifically for the Swedish rules — in Swedish, around the K4 flow — is the product. Supabase keeps the backend small enough for a solo developer to operate safely, with the database's row-level security protecting what is genuinely sensitive financial data, and Stripe means paying works the way Swedish users expect.",
      },
    ],
    highlights: [
      "Average-cost method per Skatteverket's rules, including crypto-to-crypto trades",
      "Imports from exchange CSVs and directly from wallet addresses across seven chains",
      "Exports a finished K4 form (SKV 2104) ready for Skatteverket",
      "Next.js + TypeScript, Supabase for auth and data, Stripe for payments",
      "Swedish-first: language, rules and declaration flow",
    ],
  },

  robotklipparguiden: {
    role: "Everything — content system, SEO strategy and development",
    intro:
      "Robotklipparguiden is a Swedish buying guide for robot lawn mowers, living on the internationalized domain bästarobotgräsklippare.se. It's one of a family of three guide sites I run — with my own money on the line — and it's the working proof behind the SEO work I sell.",
    sections: [
      {
        heading: "The idea",
        body: "Swedes searching for a robot mower search in Swedish, and the exact-match domain for the most valuable query — bästa robotgräsklippare — was available as an internationalized (åäö) domain. The bet: server-rendered, genuinely useful comparison content on a technically clean site can rank in a competitive affiliate niche without a big brand behind it.",
      },
      {
        heading: "What I built",
        body: "A Next.js site in TypeScript, styled with Tailwind, where comparison pages, reviews and buying guides are generated from structured product data rather than written one by one. Everything renders on the server: crawlers and readers get complete HTML, Core Web Vitals stay green, and structured data marks up the comparisons. The same system powers the sibling sites Robotdammsugarguiden (robot vacuums) and Luftrenarguiden (air purifiers).",
      },
      {
        heading: "What running it teaches",
        body: "Operating affiliate sites is an honest feedback loop: if the SEO thinking is wrong, the traffic — and the revenue — says so. Handling the punycode quirks of an åäö-domain, keeping programmatic pages from becoming thin content, and watching how Google and AI search treat comparison pages are lessons that flow directly into client work.",
      },
    ],
    highlights: [
      "Ranks in a competitive Swedish affiliate niche on an exact-match IDN domain",
      "Comparison pages generated from structured product data — not hand-written",
      "Fully server-rendered Next.js with structured data and green Core Web Vitals",
      "One of three guide sites running on the same system",
    ],
  },
};

module.exports = caseStudies;
