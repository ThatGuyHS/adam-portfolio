// Services offered, shared between the /services page and the village notice
// board in the 3D world so the two can never drift apart.

const services = [
  {
    title: "Web Development",
    shortDescription: "Creating modern, responsive web applications with cutting-edge technologies.",
    fullDescription: `I specialize in creating modern, responsive, and user-friendly web applications. With 8+ years of experience, I build scalable solutions using cutting-edge technologies like React, Next.js, and Node.js.

Key Features:
• Modern, responsive design
• Performance optimization
• SEO best practices
• Cross-browser compatibility
• Mobile-first approach
• Clean, maintainable code

From simple landing pages to complex web applications, I deliver high-quality code that meets your specific needs.`,
    icon: "💻",
    highlight: "Performance-first builds",
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
    shortDescription: "Streamlining testing processes through automation and robust test suites.",
    fullDescription: `I help businesses streamline their testing processes through automation. Using industry-standard tools and frameworks, I create robust test suites that ensure your applications are reliable and bug-free.

Services Include:
• Unit testing
• Integration testing
• End-to-end testing
• Performance testing
• Automated CI/CD pipelines
• Test coverage optimization

My expertise spans across various platforms and testing methodologies to ensure comprehensive quality assurance.`,
    icon: "⚡",
    highlight: "Confidence in every release",
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
    shortDescription: "Building custom Discord bots to enhance your server's functionality and engagement.",
    fullDescription: `I create custom Discord bots tailored to your specific needs, helping you automate tasks and enhance your server's functionality.

Features Include:
• Custom commands and interactions
• Server moderation tools
• Welcome messages and role management
• Music playback systems
• Game integration
• Analytics and reporting
• Multi-language support

Whether you need a simple utility bot or a complex multi-feature bot, I can help you create the perfect solution for your Discord community.`,
    icon: "🤖",
    highlight: "Community automation",
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
    shortDescription: "Comprehensive tournament management services for competitive gaming events.",
    fullDescription: `With years of experience in esports tournament organization, I provide comprehensive tournament management services. From setting up tournament brackets and managing registrations to handling prize pools and coordinating with teams.

Services Offered:
• Tournament bracket management
• Registration system setup
• Prize pool administration
• Team coordination
• Event scheduling
• Results tracking and reporting

I ensure smooth execution of competitive gaming events, handling all aspects of tournament administration professionally.`,
    icon: "🎮",
    highlight: "Smooth event operations",
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
