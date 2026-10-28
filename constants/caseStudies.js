// Long-form case studies for flagship projects, keyed by the /project/[slug]
// route slug. Project pages that have an entry here render the full write-up
// and are indexed; the rest stay "noindex, follow" until they get one.
// CommonJS on purpose — scripts/generate-sitemap.js requires this file too.

const caseStudies = {
  "rivals-league": {
    role: "Lead developer: design, full-stack development and operations",
    intro:
      "Rivals League is a Swedish esports league for League of Legends, Counter-Strike 2 and VALORANT. The platform handles team registration, brackets, match pages, player stats and tickets for the live event. I'm the lead developer and run it day to day, with a developer from Challengermode and a few others contributing to parts of it.",
    sections: [
      {
        heading: "The problem",
        body: "Running an esports league means a lot of manual work: registrations, seeding, Discord channels and roles for every team, match results and player stats. Most organizers spread it across spreadsheets, Discord DMs and bracket tools that don't share any data. I administered tournaments at G-Loot and knew where that setup falls apart, so the platform is built to remove those manual steps.",
      },
      {
        heading: "What I built",
        body: "The frontend is React on Vite, backed by serverless API routes, an Express server and Supabase. Teams register and sign in with Discord, players link their Riot accounts, and the platform integrates with Challengermode and the Riot API. A separate stats backend turns match data into player and team statistics. News and guides are edited in Sanity, and Stripe Checkout sells tickets to the live event.",
      },
      {
        heading: "Discord operations",
        body: "Every season the league's Discord server needs announcement and group channels per division, a private voice channel and a role for each team, and the right permissions for admins. I wrote discord.js scripts that build all of that from the roster, with a dry-run mode; the current setup covers 154 teams in 7 divisions. A scheduled job posts to Discord when a team goes live on Twitch, registration changes go to a staff channel, and the admin dashboard tracks how each game's Discord community grows week by week.",
      },
      {
        heading: "Why it's built this way",
        body: "Players already live in Discord, so login is Discord and the server structure comes from the same roster as the website instead of being clicked together by hand each season. The stats backend runs on its own so heavy aggregation never slows down match-day traffic, and Stripe leaves a record of every ticket sold.",
      },
    ],
    highlights: [
      "Team registration, brackets, match pages, player stats and leaderboards",
      "Discord login, plus discord.js scripts that set up channels and roles for 154 teams",
      "Twitch go-live alerts posted to Discord by a scheduled job",
      "Riot API and Challengermode integrations",
      "Stripe Checkout for event tickets, Sanity for editorial content",
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

  "dupe-cabinet": {
    role: "Everything: data pipeline, design, development and SEO",
    intro:
      "Dupe Cabinet is an English-language index of perfume dupes. It matches 3,053 clone products from seven sources to the designer and niche fragrances they say they copy, with notes, bottle sizes and price per ml from the sellers' own catalogs.",
    sections: [
      {
        heading: "The idea",
        body: "People look for cheaper versions of expensive perfumes all the time, and the answers are scattered across clone houses' product pages, Reddit threads and YouTube reviews. Each clone house only lists its own products. Dupe Cabinet puts every known dupe of a fragrance on one page, sorted by what it costs per ml.",
      },
      {
        heading: "Where the pairings come from",
        body: "Most pairings come from the clone houses' own product text, where they name the original they imitate, and the site only quotes those claims rather than adding its own. Houses that never name originals, such as Armaf or Lattafa, come from a curated list based on reviewer consensus and are graded close or moderate. Every row says which of the two it is. A Python pipeline normalizes brand names and matches them against a reference list of about 25,000 fragrances to add families, launch years and notes.",
      },
      {
        heading: "What I built",
        body: "A statically generated Next.js site in TypeScript and Tailwind: a page per original with at least two dupes, pages per brand and clone house, a most-duped list and a price-per-ml tool. Matching is done by rules in code. Short summaries on 150 fragrance pages are written by an AI model from that page's data only, and each one is labelled as an AI-assisted summary. The method page explains all of this, including the date the prices were read.",
      },
    ],
    highlights: [
      "3,053 clone products from seven sources, matched to the originals they reference",
      "Seller claims quoted, community pairings graded, and every row labelled with its source",
      "Python pipeline that normalizes and matches against about 25,000 reference fragrances",
      "Price per ml from the sellers' catalogs, with the read date shown",
      "AI summaries limited to page data and labelled as such",
    ],
  },

  tidningstoppen: {
    role: "Everything: data pipeline, design, development and SEO",
    intro:
      "Tidningstoppen compares the Swedish magazine apps, such as Readly, Wype, Arcy and Nextory, on price, catalogue and trial period. Readers can look up which apps carry a given magazine and roughly when its next issue comes out.",
    sections: [
      {
        heading: "The idea",
        body: "Someone choosing a magazine app mostly wants to know two things: does it have my magazine, and what does it cost? The apps answer the first question one title at a time on their own sites. Tidningstoppen puts the catalogues and prices side by side, without paid placements.",
      },
      {
        heading: "What I built",
        body: "A Next.js site with around 500 magazine pages, comparisons between the apps, a price page per service and a release calendar for 222 titles. The calendar dates are estimates based on each title's publishing pace in its digital edition, and the site says so next to them. Scripts rebuild the catalogue data every week through GitHub Actions. The site also sells its own printable puzzle pack through Stripe Checkout, and the PDF is only served once the payment has been verified.",
      },
      {
        heading: "Who uses it",
        body: "Biblioteken.fi, the Swedish-language portal of the Finnish public libraries, lists Tidningstoppen and its release calendar among its resources for magazines, next to the National Library of Sweden.",
      },
    ],
    highlights: [
      "Around 500 magazine pages and a release calendar for 222 titles",
      "Catalogue data rebuilt weekly by scripts in GitHub Actions",
      "Estimated dates labelled as estimates, never presented as publisher dates",
      "Own digital product sold through Stripe Checkout, with the PDF behind payment verification",
      "Listed as a resource by Biblioteken.fi",
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
