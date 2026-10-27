// Long-form case studies for flagship projects, keyed by the /project/[slug]
// route slug. Project pages that have an entry here render the full write-up
// and are indexed; the rest stay "noindex, follow" until they get one.
// CommonJS on purpose — scripts/generate-sitemap.js requires this file too.

const caseStudies = {
  "rivals-league": {
    role: "Design, full-stack development and operations",
    intro:
      "Rivals League is a tournament platform for competitive gaming that handles leagues, brackets, match operations and payments. I built all of it: the frontend, the API, the data model, the payment flow and the Discord bot that runs match day.",
    sections: [
      {
        heading: "The problem",
        body: "Running an esports league means a lot of manual work: registrations, seeding, match check-ins, score reporting, disputes and payouts. Most organizers spread it across spreadsheets, Discord DMs and bracket tools that don't share any data. I administered tournaments at G-Loot and knew where that setup falls apart, so I designed Rivals League to remove those manual steps.",
      },
      {
        heading: "What I built",
        body: "The frontend is React on Vite, talking to an Express API on Supabase. Stripe handles entry fees and payments. News, league pages and rules live in a Strapi CMS, so they can change without a deploy, and a separate stats backend turns match results into player and team statistics. The Discord bot is built with discord.js. Teams check in, report scores and get bracket updates in Discord, and the bot syncs everything back to the platform.",
      },
      {
        heading: "Why it's built this way",
        body: "On match day, teams are already talking to each other in Discord. Ask them to open a website between maps and some of them won't. The API is a thin Express layer over Supabase, so the data model lives in one place. Stripe leaves a record of every payment, which beats collecting Swish screenshots. The stats backend runs on its own so heavy aggregation never slows down match-day traffic.",
      },
    ],
    highlights: [
      "Full tournament lifecycle: registration, seeding, brackets, results, payouts",
      "Discord bot for match check-ins and score reporting, synced to the platform",
      "Entry fees and payments through Stripe",
      "Strapi CMS, so admins edit content without a developer",
      "Separate stats backend for player and team statistics",
    ],
  },

  "svenska-esportforbundet": {
    role: "Freelance web developer: design, build and CMS setup",
    intro:
      "The official website of the Swedish Esports Federation (Svenska E-sportförbundet). I built it as a freelance project, and the federation's staff publish news, information and member content on it without needing a developer.",
    sections: [
      {
        heading: "The problem",
        body: "A national sports federation publishes all the time: news, statements, member information and event announcements. The federation needed a site that staff without technical skills could keep up to date, that looks credible to the public, the press and policymakers, and that a small non-profit can afford to run.",
      },
      {
        heading: "What I built",
        body: "The first version ran on a custom CMS I wrote. I later rebuilt it as a Next.js frontend in TypeScript with a headless Strapi CMS behind it and Resend for transactional email. Editors write news and update pages in Strapi, and Next.js renders the content on the server, so the public site stays fast and crawlable whatever gets published.",
      },
      {
        heading: "Why it's built this way",
        body: "The main goal was for the federation to run the site without me, and that decided the headless CMS. Server rendering keeps the content crawlable, which matters when the press quotes the federation's statements. The stack is boring on purpose, so any developer they hire after me can pick it up.",
      },
    ],
    highlights: [
      "Next.js and TypeScript frontend, rendered on the server for speed and crawlability",
      "Headless Strapi CMS, so the federation publishes without a developer",
      "Transactional email via Resend",
      "Two versions: a custom CMS first, then a rebuild on a long-term stack",
    ],
  },

  cryptoskatt: {
    role: "Design and full-stack development",
    intro:
      "Cryptoskatt turns a Swedish crypto trader's transaction history into the numbers for the K4 tax form. Without a tool, that means a spreadsheet and a long evening with Skatteverket's rules.",
    sections: [
      {
        heading: "The problem",
        body: "Sweden taxes each crypto disposal as a capital gain, calculated with the average cost basis (genomsnittsmetoden). Anyone who has traded on more than one exchange soon has hundreds of transactions to reconcile by hand. The existing tools are mostly international, priced in dollars and not built around the Swedish declaration.",
      },
      {
        heading: "What I built",
        body: "A Next.js app in TypeScript. Traders import transactions as CSV files from Binance, Coinbase or Kraken, or straight from a Bitcoin, Ethereum, Solana or EVM wallet address. The app calculates the cost basis with the average-cost method, including crypto-to-crypto trades, and converts each transaction to SEK with Riksbanken's exchange rate for that day. The result is a finished K4 form (SKV 2104) ready to upload to Skatteverket, with the 30% tax on gains and the 70% rule for deducting losses already applied. Supabase handles accounts and data storage, and Stripe handles payment.",
      },
      {
        heading: "Why it's built this way",
        body: "The Swedish rules are the product, so the app is in Swedish and follows the K4 flow. Supabase keeps the backend small enough for one developer to run safely, and row-level security in the database protects what is sensitive financial data. Stripe handles payment the way Swedish users are used to.",
      },
    ],
    highlights: [
      "Average-cost method per Skatteverket's rules, including crypto-to-crypto trades",
      "Imports from exchange CSVs and directly from wallet addresses across seven chains",
      "Exports a finished K4 form (SKV 2104) ready for Skatteverket",
      "Next.js and TypeScript, Supabase for auth and data, Stripe for payments",
      "Built for Sweden: Swedish language, Swedish tax rules, the K4 flow",
    ],
  },

  robotklipparguiden: {
    role: "Everything: content system, SEO and development",
    intro:
      "Robotklipparguiden is a Swedish buying guide for robot lawn mowers on the åäö domain bästarobotgräsklippare.se. It's one of three guide sites I run on the same system and pay for myself, and they're where I try out the SEO ideas I later use for clients.",
    sections: [
      {
        heading: "The idea",
        body: "People in Sweden search for robot mowers in Swedish, and the exact-match domain for the most valuable query, bästa robotgräsklippare, was free as an åäö domain. I wanted to see whether useful, server-rendered comparisons on a technically clean site could compete in an affiliate niche without a big brand behind them.",
      },
      {
        heading: "What I built",
        body: "A Next.js site in TypeScript and Tailwind. Comparison pages and buying guides are built from structured product data, and visitors can filter mowers by lawn size and needs. Everything renders on the server, so crawlers and readers get complete HTML, and structured data marks up the comparisons. The same system runs Robotdammsugarguiden (robot vacuums) and Luftrenarguiden (air purifiers).",
      },
    ],
    highlights: [
      "Exact-match åäö domain: bästarobotgräsklippare.se",
      "Comparison pages built from structured product data",
      "Server-rendered Next.js with structured data",
      "One of three guide sites running on the same system",
    ],
  },

  vinterplatsen: {
    role: "Everything: idea, data pipeline, design, development and SEO",
    intro:
      "Vinterplatsen is a Swedish directory of winter storage for boats, caravans, motorhomes, motorcycles and cars. You pick a vehicle type and a town and get the places that store it over winter, with hall type and published prices where the business has them. It went live on 30 August 2026, and I run it myself.",
    sections: [
      {
        heading: "The idea",
        body: "Every autumn, people across Sweden search for somewhere to keep the boat or the caravan over winter, and most bookings happen between September and November. For searches on a single town, Google showed individual marinas, the map pack, Facebook groups and forum threads. No page listed the options in one town side by side. Launching at the end of August gave the site one full season to show whether that gap was worth filling.",
      },
      {
        heading: "What I built",
        body: "A Next.js site in TypeScript and Tailwind, exported as static HTML: about 310 pages covering vehicle type and town, town and county overviews, price pages and ten guides, for example on storing a boat on a trailer. The price pages only show prices a business has published itself, grouped by unit, with the cheapest of each named. For boats there's a calculator that applies 24 boatyards' own square-metre rates and area formulas to your boat and shows each yard's price separately, never an average. Storage owners can list themselves for free or buy an extended listing for 1 495 kr per season through Stripe, and insurance partner links are marked as sponsored.",
      },
      {
        heading: "Where the data comes from",
        body: "Around 1 700 business listings were collected by script from public business directories. Most of the work went into cleaning them: dropping private individuals, removing companies that matched a search but don't store anything, and merging duplicates. On top of that, 191 places have been checked by hand against their own websites, including hall type and prices, and storage owners who email in are added the same way. The directories' own descriptions and ratings are not shown, so every listing only says what the site can back up.",
      },
    ],
    highlights: [
      "About 310 static pages from one Next.js codebase",
      "191 listings checked by hand against each business's own website",
      "Only published prices, plus a boat calculator built on 24 boatyards' own rates",
      "Paid listings through Stripe, with partner links marked as sponsored",
    ],
  },
};

module.exports = caseStudies;
