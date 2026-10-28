import profile from "./profile";

const userData = {
  ...profile,
  projects: [
    {
      title: "Dupe Cabinet",
      group: "own-site",
      link: "https://dupecabinet.com",
      imgUrl: "/projects/dupecabinet.jpg",
      kind: "Data-driven directory site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "An index of perfume dupes. Thousands of clone perfumes are matched to the originals they copy, with notes, bottle sizes and price per ml. A Python pipeline cleans up seller catalogs and feeds the statically generated site.",
    },
    {
      title: "Slow Cooker Converter",
      group: "own-site",
      link: "https://slowcookerconverter.com",
      imgUrl: "/projects/slowcookerconverter.jpg",
      kind: "Calculator tool site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "A free calculator that converts slow cooker times on Low or High to oven times and back, and slow cooker recipes to Instant Pot. Each common cook time also has its own static page.",
    },
    {
      title: "Sälja elbilen",
      group: "own-site",
      link: "https://saljaelbilen.se",
      imgUrl: "/projects/saljaelbilen.jpg",
      kind: "Comparison site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Compares the ways to sell a used EV in Sweden: direct buyers, bidding services, auctions and private sale. Each company's terms are checked against its own published conditions, and the guides for different situations and car models cite their sources.",
    },
    {
      title: "Yrkesförsäkring",
      group: "own-site",
      link: "https://yrkesforsakring.se",
      imgUrl: "/projects/yrkesforsakring.jpg",
      kind: "Content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish guide to business insurance by profession: which coverage matters for 40+ trades, what clients demand and the common mistakes. Pages are generated from structured JSON per profession.",
    },
    {
      title: "Elnätskollen",
      group: "own-site",
      link: "https://elnatskollen.se",
      imgUrl: "/projects/elnatskollen.jpg",
      kind: "Data comparison site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "Compares electricity grid fees in all 290 Swedish municipalities: prices, increases and each grid operator's price list. Python scripts parse the operators' tariffs into data for a statically exported Next.js site.",
    },
    {
      title: "Bokutgivningar",
      group: "own-site",
      link: "https://bokutgivningar.se",
      imgUrl: "/projects/bokutgivningar.jpg",
      kind: "Data-driven content site",
      stack: ["Next.js", "TypeScript", "Python"],
      blurb:
        "Upcoming Swedish book releases by author and month, built from harvested pre-order listings. Thousands of static pages generated from a single JSON dataset.",
    },
    {
      title: "Vinterplatsen",
      group: "own-site",
      featured: 3,
      link: "https://vinterplatsen.se",
      imgUrl: "/projects/vinterplatsen.jpg",
      kind: "Directory site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "Swedish directory of winter storage for boats, caravans, motorhomes, motorcycles and cars, from outdoor spots to cold and heated halls across the country. Listings are collected by script and rendered as a static Next.js export.",
    },
    {
      title: "Tidningstoppen",
      group: "own-site",
      link: "https://tidningstoppen.se",
      imgUrl: "/projects/tidningstoppen.jpg",
      kind: "Comparison site + digital product",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Vercel Blob"],
      blurb:
        "Compares Swedish magazine apps on price, catalogue and trial period, with no paid placements. The site also sells its own printable puzzle pack through Stripe Checkout, and the PDF is only served once the payment is verified.",
    },
    {
      title: "Robotklipparguiden",
      group: "own-site",
      link: "https://xn--bstarobotgrsklippare-bzbk.se",
      imgUrl: "/projects/robotklipparguiden.jpg",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish buying guide for robot lawn mowers on the åäö domain bästarobotgräsklippare.se. Mowers can be filtered by lawn size and needs, and every page is rendered on the server.",
    },
    {
      title: "Robotdammsugarguiden",
      group: "own-site",
      link: "https://www.basta-robotdammsugare.se",
      imgUrl: "/projects/robotdammsugarguiden.jpg",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish comparison site for robot vacuums, with a top list, a quiz that suggests a model and a guide to running costs. It runs on the same system as Robotklipparguiden.",
    },
    {
      title: "Luftrenarguiden",
      group: "own-site",
      link: "https://bastaluftrenaren.se",
      imgUrl: "/projects/luftrenarguiden.jpg",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish buying guide for air purifiers, with pages that filter by room size and needs such as pets. Same server-rendered Next.js setup as my other two guide sites.",
    },
    {
      title: "Rivals League",
      group: "product",
      featured: 1,
      link: "https://rivalsleague.gg",
      imgUrl: "/projects/rivalsleague.jpg",
      kind: "Esports league platform",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Express",
        "Supabase",
        "Stripe",
        "Discord.js",
        "Sanity",
      ],
      blurb:
        "Platform for a Swedish esports league in League of Legends, CS2 and VALORANT: team registration with Discord login, brackets, match pages, player stats and event tickets through Stripe. Built on React and Supabase, with Discord tooling that sets up the league's server.",
    },
    {
      title: "Create Discord Bot",
      group: "product",
      link: "https://creatediscordbot.com",
      imgUrl: "/projects/creatediscordbot.jpg",
      kind: "Productized service site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
      blurb:
        "Productized service for custom Discord bots, with fixed-price packages, a care plan and a quote form whose leads arrive through Resend.",
    },
    {
      title: "PXB Media",
      group: "client",
      featured: 5,
      link: "https://pxbmedia.com",
      imgUrl: "/projects/pxbmedia.jpg",
      kind: "Company website",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Contentful"],
      blurb:
        "Brand site for the esports broadcast and production company PXB Media, with content managed headlessly in Contentful.",
    },
    {
      title: "Cookbook generator",
      group: "product",
      link: "https://cookbookgenerator.com",
      imgUrl: "/projects/cookbookgenerator.jpg",
      kind: "Web app",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Stripe"],
      blurb:
        "Turns your recipes into a print-ready cookbook. The PDF is generated in the browser, recipes are stored in Supabase and checkout runs through Stripe.",
    },
    {
      title: "Adluelno",
      group: "client",
      featured: 6,
      link: "https://adluelno.se",
      imgUrl: "/projects/adluelno.jpg",
      kind: "Company website",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Website for Adluelno, a Swedish firm offering board and management advisory as well as software development. Built in Next.js with the technical SEO in place from launch.",
    },
    {
      title: "Weekend in Paris",
      group: "own-site",
      link: "https://weekendparis.com",
      imgUrl: "/projects/weekendparis.jpg",
      kind: "Travel content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      blurb:
        "Weekend itineraries for Paris. The guides are written in MDX and the site is statically generated.",
    },
    {
      title: "Svenska Esportförbundet",
      group: "client",
      featured: 2,
      link: "https://svenskesport.se",
      imgUrl: "/projects/sesf.jpg",
      kind: "Federation website + custom CMS",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi", "Resend"],
      blurb:
        "Official site of the Swedish Esports Federation, built as a freelance project with a headless Strapi CMS so the federation can publish news and content themselves.",
    },
    {
      title: "AoE2 Sverige",
      group: "work",
      link: "https://www.aoe2sverige.se/",
      imgUrl: "/projects/aoe2sverige.jpg",
      kind: "Community site",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      blurb:
        "Community hub for the Swedish Age of Empires II scene, with community data backed by Supabase.",
    },
    {
      title: "PromptBibliotek",
      group: "product",
      link: "https://promptbibliotek.se",
      imgUrl: "/projects/promptbibliotek.jpg",
      kind: "Web app / directory",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      blurb:
        "A Swedish library of AI prompts, skills and instruction files for AI agents, which you can browse, search and share. The content is stored in Supabase.",
    },
    {
      title: "Cryptoskatt",
      group: "product",
      featured: 4,
      link: "https://cryptoskatt.se",
      imgUrl: "/projects/cryptoskatt.jpg",
      kind: "Fintech web app",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
      blurb:
        "Helps Swedish crypto traders do their taxes. A Next.js app with Supabase for data and Stripe for payments.",
    },
    {
      title: "Portfolio",
      group: "product",
      link: "https://www.adampeleback.com",
      imgUrl: "/projects/portfolio.jpg",
      kind: "Personal site",
      stack: ["Next.js", "React", "Tailwind CSS", "Three.js", "React Three Fiber"],
      blurb:
        "This site. It also has a walkable 3D village version of my CV, built with React Three Fiber.",
    },
    {
      title: "Stryda",
      group: "work",
      link: "https://play.stryda.gg",
      imgUrl: "/projects/stryda.jpg",
      kind: "Esports platform (employer)",
      stack: ["TypeScript", "React", "Next.js"],
      blurb:
        "G-Loot's esports platform, now part of Challengermode. This was my day job: I worked on it as QA Developer and later as Frontend Developer.",
    },
    {
      title: "Phoenix Blue",
      group: "work",
      link: "https://pxb.gg",
      imgUrl: "/projects/pxb.jpg",
      kind: "Esports organization",
      stack: ["WordPress"],
      blurb:
        "Non-profit esports organization where I've served on the board since 2017 and helped create the Phoenix Blue Event Series.",
    },
  ],
  about: {
    title:
      "I'm a web developer and software tester in Stockholm, and most of my career so far has been in esports",
    description: [
      "I started in esports in 2017, writing event coverage for Znipe Esports and running the PUBG tournaments on G-Loot's Global Loot League. At G-Loot I moved into QA in 2018. I tested the platform by hand at first, then wrote test automation and advised the development teams on testing. In 2022 I switched to frontend development on the same platform, working in TypeScript, React and Next.js.",
      "After G-Loot I spent a few months as a frontend engineer at Zaver, working in Angular, and then a year freelancing. That year I built internal tools in Nest.js for Clutch Group, made the PXB Media website and built the first version of the Swedish Esports Federation's site, which I later rebuilt for them on Next.js and Strapi. Since September 2025 I work as a system tester at Decerno.",
      "I've been on the board of the non-profit esports organization Phoenix Blue since 2017 and helped start the Phoenix Blue Event Series. I also run a number of my own comparison and guide sites, which is where most of my SEO experience comes from.",
    ],
    currentProject: "PXB Media",
    currentProjectUrl: "https://pxbmedia.com",
  },
  experience: [
    {
      title: "System Tester",
      company: "Decerno AB",
      year: "Sep 2025–present",
      desc: "System testing and software testing of business systems.",
    },
    {
      title: "Freelance Web Developer",
      company: "Svenska E-sportförbundet",
      year: "Mar–Aug 2025",
      desc: "Freelance web development in TypeScript and React, including the federation's website on Next.js and Strapi.",
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      year: "Apr 2024–Apr 2025",
      desc: "Built internal tools and Discord bots for Clutch Group in Nest.js and discord.js, the PXB Media website in Next.js, and the first version of the Swedish Esports Federation's website with a custom CMS.",
    },
    {
      title: "Frontend Engineer",
      company: "Zaver",
      year: "Feb–Apr 2024",
      desc: "Frontend work in TypeScript and Angular.",
    },
    {
      title: "Frontend Developer",
      company: "G-Loot",
      year: "Oct 2022–Feb 2024",
      desc: "Frontend development on the G-Loot esports platform in TypeScript, React and Next.js.",
    },
    {
      title: "QA Developer",
      company: "G-Loot",
      year: "May 2021–Nov 2022",
      desc: "Test automation, manual testing of critical user flows, and advising the development teams on testing.",
    },
    {
      title: "QA Tester",
      company: "G-Loot Esports",
      year: "May 2018–May 2021",
      desc: "QA tester and tournament administrator for the Global Loot League, working closely with the tech team.",
    },
    {
      title: "Tournament Administrator",
      company: "G-Loot",
      year: "Aug 2017–May 2018",
      desc: "Responsible for the PUBG tournaments on the Global Loot League platform.",
    },
    {
      title: "General Member Board",
      company: "Phoenix Blue",
      year: "2017–present",
      desc: "Board member of the non-profit esports organization Phoenix Blue. Helped grow the organization and start the Phoenix Blue Event Series.",
    },
    {
      title: "Director of Social Media and Written Content",
      company: "Crimson Esports",
      year: "Nov 2017–May 2018",
      desc: "Ran social media and written content, and helped write sponsorship proposals.",
    },
    {
      title: "Esports Copywriter",
      company: "Znipe Esports",
      year: "Jan 2017–Apr 2018",
      desc: "Wrote event pages, match summaries, news articles and recaps.",
    },
  ],
};

export default userData;
