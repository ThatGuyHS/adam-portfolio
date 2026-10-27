// Services offered, shared between the /services page and the village notice
// board in the 3D world so the two can never drift apart.

const services = [
  {
    title: "Web Development",
    shortDescription: "Websites and web apps in React and Next.js that load fast and can be found in search.",
    fullDescription: `I build websites and web apps in React, Next.js and TypeScript, from small company sites to platforms with payments and a CMS. I worked as a frontend developer at G-Loot and Zaver and have freelanced since 2024.

What you get:
• Responsive, mobile-first design
• Performance work on Core Web Vitals
• Technical SEO and structured data
• Testing across browsers
• Code the next developer can pick up

That can be a single landing page or a full web application.`,
    icon: "💻",
    highlight: "React · Next.js · TypeScript",
    deliverables: ["Responsive UI", "SEO setup", "Core Web Vitals tuning"],
    accent: {
      cardHover: "hover:border-blue-200 hover:-translate-y-1",
      iconBg: "bg-blue-100 text-blue-600",
      bullet: "bg-blue-500",
      primaryBtn: "bg-blue-500 text-white hover:bg-blue-600",
      secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  },
  {
    title: "Test Automation",
    shortDescription: "Automated tests and a test strategy from someone who has worked in QA since 2018.",
    fullDescription: `I've worked in QA since 2018: as a QA tester and later QA developer at G-Loot, where I wrote test automation and advised the development teams on testing, and since 2025 as a system tester at Decerno.

I can help with:
• Unit testing
• Integration testing
• End-to-end testing
• Performance testing
• Running the tests in your CI/CD pipeline
• Finding the gaps in your test coverage

Tests catch regressions before your users do, and I'll tell you where a manual check is the better use of time.`,
    icon: "⚡",
    highlight: "QA since 2018",
    deliverables: ["Unit tests", "E2E coverage", "CI pipeline integration"],
    accent: {
      cardHover: "hover:border-yellow-200 hover:-translate-y-1.5",
      iconBg: "bg-yellow-100 text-yellow-700",
      bullet: "bg-yellow-500",
      primaryBtn: "bg-red-500 text-white hover:bg-red-600",
      secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  },
  {
    title: "Discord Bot Development",
    shortDescription: "Custom Discord bots for moderation, onboarding, tournaments and integrations.",
    fullDescription: `I build Discord bots in Node.js and TypeScript with discord.js. The biggest one so far runs match check-ins and score reporting for the Rivals League tournament platform.

Common requests:
• Custom commands and interactions
• Server moderation tools
• Welcome messages and role management
• Music playback
• Game integrations
• Analytics and reporting
• Multi-language support

It can be a small utility bot or one with many features.`,
    icon: "🤖",
    highlight: "Built with discord.js",
    deliverables: ["Custom commands", "Moderation tools", "Role automation"],
    accent: {
      cardHover: "hover:border-purple-200 hover:-translate-y-1 hover:rotate-[0.3deg]",
      iconBg: "bg-purple-100 text-purple-700",
      bullet: "bg-purple-500",
      primaryBtn: "bg-indigo-500 text-white hover:bg-indigo-600",
      secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  },
  {
    title: "Esports Tournament Administration",
    shortDescription: "Tournament administration for online competitions: brackets, registrations, scheduling and results.",
    fullDescription: `I've organized esports tournaments since 2017, starting with the PUBG tournaments on G-Loot's Global Loot League. I'm also on the board of Phoenix Blue, where I helped start the Phoenix Blue Event Series.

I can take care of:
• Tournament brackets
• Registration setup
• Prize pool administration
• Contact with the teams
• Scheduling
• Results tracking and reporting`,
    icon: "🎮",
    highlight: "Running tournaments since 2017",
    deliverables: ["Bracket setup", "Team coordination", "Results reporting"],
    accent: {
      cardHover: "hover:border-red-200 hover:-translate-y-1 hover:rotate-[-0.3deg]",
      iconBg: "bg-red-100 text-red-600",
      bullet: "bg-red-500",
      primaryBtn: "bg-rose-500 text-white hover:bg-rose-400",
      secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  },
];

export default services;
