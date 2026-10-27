const userData = {
  githubUsername: "ThatGuyHS",
  name: "Adam Peleback",
  designation: "Frontend Developer, Esports Tournament Organizer",
  avatarUrl: "/adam.png",
  email: "adampeleback@gmail.com",
  address: "Stockholm, Sweden",
  projects: [
    {
      title: "Dupe Cabinet",
      link: "https://dupecabinet.com",
      imgUrl: "/dupecabinet.png",
      kind: "Data-driven directory site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "An index of perfume dupes. Thousands of clone perfumes are matched to the originals they copy, with notes, bottle sizes and price per ml. A Python pipeline cleans up seller catalogs and feeds the statically generated site.",
    },
    {
      title: "Slow Cooker Converter",
      link: "https://slowcookerconverter.com",
      imgUrl: "/slowcookerconverter.png",
      kind: "Calculator tool site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "A free calculator that converts slow cooker times on Low or High to oven times and back, and slow cooker recipes to Instant Pot. Each common cook time also has its own static page.",
    },
    {
      title: "Sälja elbilen",
      link: "https://saljaelbilen.se",
      imgUrl: "/saljaelbilen.png",
      kind: "Comparison site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Compares the ways to sell a used EV in Sweden: direct buyers, bidding services, auctions and private sale. Each company's terms are checked against its own published conditions, and the guides for different situations and car models cite their sources.",
    },
    {
      title: "Yrkesförsäkring",
      link: "https://yrkesforsakring.se",
      imgUrl: "/yrkesforsakring.png",
      kind: "Content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish guide to business insurance by profession: which coverage matters for 40+ trades, what clients demand and the common mistakes. Pages are generated from structured JSON per profession.",
    },
    {
      title: "Elnätskollen",
      link: "https://elnatskollen.se",
      imgUrl: "/elnatskollen.png",
      kind: "Data comparison site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "Compares electricity grid fees in all 290 Swedish municipalities: prices, increases and each grid operator's price list. Python scripts parse the operators' tariffs into data for a statically exported Next.js site.",
    },
    {
      title: "Bokutgivningar",
      link: "https://bokutgivningar.se",
      imgUrl: "/bokutgivningar.png",
      kind: "Data-driven content site",
      stack: ["Next.js", "TypeScript", "Python"],
      blurb:
        "Upcoming Swedish book releases by author and month, built from harvested pre-order listings. Thousands of static pages generated from a single JSON dataset.",
    },
    {
      title: "Vinterplatsen",
      link: "https://vinterplatsen.se",
      imgUrl: "/vinterplatsen.png",
      kind: "Directory site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Python"],
      blurb:
        "Swedish directory of winter storage for boats, caravans, motorhomes, motorcycles and cars, from outdoor spots to cold and heated halls across the country. Listings are collected by script and rendered as a static Next.js export.",
    },
    {
      title: "Tidningstoppen",
      link: "https://tidningstoppen.se",
      imgUrl: "/tidningstoppen.png",
      kind: "Comparison site + digital product",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Vercel Blob"],
      blurb:
        "Compares Swedish magazine apps on price, catalogue and trial period, with no paid placements. The site also sells its own printable puzzle pack through Stripe Checkout, and the PDF is only served once the payment is verified.",
    },
    {
      title: "Robotklipparguiden",
      link: "https://xn--bstarobotgrsklippare-bzbk.se",
      imgUrl: "/robotklipparguiden.png",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish buying guide for robot lawn mowers on the åäö domain bästarobotgräsklippare.se. Mowers can be filtered by lawn size and needs, and every page is rendered on the server.",
    },
    {
      title: "Robotdammsugarguiden",
      link: "https://www.basta-robotdammsugare.se",
      imgUrl: "/robotdammsugarguiden.png",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish comparison site for robot vacuums, with a top list, a quiz that suggests a model and a guide to running costs. It runs on the same system as Robotklipparguiden.",
    },
    {
      title: "Luftrenarguiden",
      link: "https://bastaluftrenaren.se",
      imgUrl: "/luftrenarguiden.png",
      kind: "Affiliate content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Swedish buying guide for air purifiers, with pages that filter by room size and needs such as pets. Same server-rendered Next.js setup as my other two guide sites.",
    },
    {
      title: "Rivals League",
      featured: 1,
      link: "https://rivalsleague.gg",
      imgUrl: "/rivalsleague.png",
      kind: "Esports tournament platform",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Express",
        "Supabase",
        "Stripe",
        "Discord.js",
        "Strapi",
      ],
      blurb:
        "Full-stack tournament platform: React front end, Express API on Supabase, Stripe payments, a Discord bot for match operations, plus a Strapi CMS and a separate stats backend.",
    },
    {
      title: "Create Discord Bot",
      link: "https://creatediscordbot.com",
      imgUrl: "/creatediscordbot.PNG",
      kind: "Productized service site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Resend"],
      blurb:
        "A service selling custom-built Discord bots, with Stripe checkout and transactional email through Resend.",
    },
    {
      title: "PXB Media",
      featured: 2,
      link: "https://pxbmedia.com",
      imgUrl: "/pxbmedia1.png",
      kind: "Company website",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Contentful"],
      blurb:
        "Brand site for the esports broadcast and production company PXB Media, with content managed headlessly in Contentful.",
    },
    {
      title: "Cookbook generator",
      featured: 5,
      link: "https://cookbookgenerator.com",
      imgUrl: "/cookbookgenerator.png",
      kind: "Web app",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Stripe"],
      blurb:
        "Turns your recipes into a print-ready cookbook. The PDF is generated in the browser, recipes are stored in Supabase and checkout runs through Stripe.",
    },
    {
      title: "Adluelno",
      featured: 3,
      link: "https://adluelno.se",
      imgUrl: "/adluelno.png",
      kind: "Company website",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      blurb:
        "Website for a Swedish business advisory and consulting firm, built in Next.js with the technical SEO in place from launch.",
    },
    {
      title: "Book Report Template",
      link: "https://bookreporttemplate.com",
      imgUrl: "/bookreporttemplate.PNG",
      kind: "AI web app",
      stack: ["React", "TypeScript", "Vite", "shadcn/ui", "Stripe"],
      blurb:
        "Book report generator: pick a template and an AI model drafts the report. Payment goes through Stripe.",
    },
    {
      title: "Webbdoktorn",
      link: "https://webbdoktorn.se",
      imgUrl: "./webbdoktorn.PNG",
      kind: "Agency website",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      blurb:
        "Swedish web agency that builds, maintains and optimizes websites for small businesses.",
    },
    {
      title: "Weekend in Paris",
      featured: 4,
      link: "https://weekendparis.com",
      imgUrl: "/weekendparis.PNG",
      kind: "Travel content site",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
      blurb:
        "Weekend itineraries for Paris. The guides are written in MDX and the site is statically generated.",
    },
    {
      title: "Svenska Esportförbundet",
      link: "https://svenskesport.se",
      imgUrl: "/sesf.png",
      kind: "Federation website + custom CMS",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi", "Resend"],
      blurb:
        "Official site of the Swedish Esports Federation, built as a freelance project with a headless Strapi CMS so the federation can publish news and content themselves.",
    },
    {
      title: "AoE2 Sverige",
      featured: 7,
      link: "https://www.aoe2sverige.se/",
      imgUrl: "/aoe2sverige.png",
      kind: "Community site",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      blurb:
        "Community hub for the Swedish Age of Empires II scene, with community data backed by Supabase.",
    },
    {
      title: "PromptBibliotek",
      featured: 8,
      link: "https://promptbibliotek.se",
      imgUrl: "/promptbibliotek.png",
      kind: "Web app / directory",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      blurb:
        "A Swedish library of AI prompts that you can browse, search and share. The prompts are stored in Supabase.",
    },
    {
      title: "Cryptoskatt",
      link: "https://cryptoskatt.se",
      imgUrl: "/cryptoskatt.png",
      kind: "Fintech web app",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
      blurb:
        "Helps Swedish crypto traders do their taxes. A Next.js app with Supabase for data and Stripe for payments.",
    },
    {
      title: "Remote Work Radar",
      link: "https://remoteworkradar.com",
      imgUrl: "/remoteworkradar.png",
      kind: "Content site / blog",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
      blurb:
        "Blog about remote work. Posts are written in Markdown and the site is statically generated.",
    },
    {
      title: "Nexus Collegiate",
      link: "https://nexuscollegiate.com",
      imgUrl: "/nexus-collegiate.png",
      kind: "Esports organization site",
      stack: [],
      blurb: "Website for a collegiate esports organization.",
    },
    {
      title: "Best Travel Route",
      link: "https://besttravelroute.com",
      imgUrl: "/in-progress.jpeg",
      kind: "AI web app (in progress)",
      stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      blurb:
        "Uses AI to plan the best route between travel destinations. Still in development.",
    },

    {
      title: "Portfolio",
      featured: 6,
      link: "https://www.adampeleback.com",
      imgUrl: "/portfolio.png",
      kind: "Personal site",
      stack: ["Next.js", "React", "Tailwind CSS", "Three.js", "React Three Fiber"],
      blurb:
        "This site. It also has a walkable 3D village version of my CV, built with React Three Fiber.",
    },
    {
      title: "Stryda",
      link: "https://play.stryda.gg",
      imgUrl: "/stryda.png",
      kind: "Esports platform (employer)",
      stack: ["TypeScript", "React", "Next.js"],
      blurb:
        "G-Loot's esports platform, now part of Challengermode. This was my day job: I worked on it as QA Developer and later as Frontend Developer.",
    },
    {
      title: "Phoenix Blue",
      link: "https://pxb.gg",
      imgUrl: "/pxb.png",
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
      year: "sep. 2025–now",
      desc: "System testing and software testing.",
    },
    {
      title: "Freelance Web Developer",
      company: "Svenska E-sportförbundet",
      year: "mar. 2025–aug. 2025",
      desc: "Freelance web development using Typescript and React.js.",
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      year: "apr. 2024–apr. 2025",
      desc: "Developed new solutions and internal tools using Nest.js at Clutch Group. Created the PXB Media brand website using Next.js. Developed the first iteration of the Swedish Esports Association website, including a custom CMS solution.",
    },
    {
      title: "Frontend Engineer",
      company: "Zaver",
      year: "feb. 2024–apr. 2024",
      desc: "Skills: Typescript, Angular",
    },
    {
      title: "Frontend Developer",
      company: "G-Loot",
      year: "oct. 2022–feb. 2024",
      desc: "Skills: Typescript, Next.JS, JavaScript, React.js",
    },
    {
      title: "QA Developer",
      company: "G-Loot",
      year: "may 2021–nov. 2022",
      desc: "Test automation, Manual testing of crucial user flows, Advising development teams within testing",
    },
    {
      title: "QA Tester",
      company: "G-Loot Esports",
      year: "may 2018–may 2021",
      desc: "Worked as a QA tester and tournament administrator for the Global Loot League. Supported the tech team and utilized knowledge from previous ventures within esports.",
    },
    {
      title: "Tournament Administrator",
      company: "G-Loot",
      year: "aug. 2017–may 2018",
      desc: "Responsible for the PUBG tournaments on the Global Loot League platform.",
    },
    {
      title: "General Member Board",
      company: "Phoenix Blue",
      year: "2017–now",
      desc: "Board member for the non-profit organization Phoenix Blue. Helped grow the organization and was involved in the creation of the Phoenix Blue Event Series.",
    },
    {
      title: "Director of Social Media and Written Content",
      company: "Crimson Esports",
      year: "nov. 2017–may 2018",
      desc: "In charge of all social media and content operations. Helped write sponsorship proposals.",
    },
    {
      title: "Esports Copywriter",
      company: "Znipe Esports",
      year: "jan. 2017–apr. 2018",
      desc: "Responsible for producing written content on event pages, writing summaries, news articles, and recaps.",
    },
  ],
  resumeUrl: "/experience",
  socialLinks: {
    instagram: "https://instagram.com/adampeleback",
    linkedin: "https://www.linkedin.com/in/adam-p-507593113/",
    github: "https://github.com/ThatGuyHS",
  },
};

export default userData;
