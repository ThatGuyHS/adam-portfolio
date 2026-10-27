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
      {
        heading: "What running it teaches",
        body: "Your own affiliate site gives honest feedback: if the SEO thinking is wrong, traffic and revenue show it. This one taught me that Google crawls a new domain slowly and ignores pages that differ only by a number, such as one page per lawn size in square metres. None of those pages ever got an impression, so I merged them into fewer, fuller pages with redirects. Lessons like that, along with the punycode quirks of an åäö domain, go straight into client work.",
      },
    ],
    highlights: [
      "Exact-match åäö domain: bästarobotgräsklippare.se",
      "Comparison pages built from structured product data",
      "Server-rendered Next.js with structured data",
      "One of three guide sites running on the same system",
    ],
  },
};

module.exports = caseStudies;
