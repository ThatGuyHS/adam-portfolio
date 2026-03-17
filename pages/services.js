import ContainerBlock from "../components/ContainerBlock";
import Modal from "../components/Modal";
import { useState } from "react";
import Link from "next/link";

export default function Services() {
  const siteUrl = "https://adampeleback.com";
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      title: "Web Development",
      shortDescription: "Creating modern, responsive web applications with cutting-edge technologies.",
      fullDescription: `I specialize in creating modern, responsive, and user-friendly web applications. With over 5 years of experience, I build scalable solutions using cutting-edge technologies like React, Next.js, and Node.js.

Key Features:
• Modern, responsive design
• Performance optimization
• SEO best practices
• Cross-browser compatibility
• Mobile-first approach
• Clean, maintainable code

From simple landing pages to complex web applications, I deliver high-quality code that meets your specific needs.`,
      icon: "💻",
      timeline: "2-8 weeks",
      highlight: "Performance-first builds",
      deliverables: ["Responsive UI", "SEO setup", "Core Web Vitals tuning"],
      accent: {
        cardHover: "hover:border-blue-200 hover:-translate-y-1",
        iconBg: "bg-blue-100 text-blue-600",
        badge: "text-blue-700 border-blue-200 bg-blue-50",
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
      timeline: "1-4 weeks",
      highlight: "Confidence in every release",
      deliverables: ["Unit tests", "E2E coverage", "CI pipeline integration"],
      accent: {
        cardHover: "hover:border-yellow-200 hover:-translate-y-1.5",
        iconBg: "bg-yellow-100 text-yellow-700",
        badge: "text-yellow-700 border-yellow-200 bg-yellow-50",
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
      timeline: "1-3 weeks",
      highlight: "Community automation",
      deliverables: ["Custom commands", "Moderation tools", "Role automation"],
      accent: {
        cardHover: "hover:border-purple-200 hover:-translate-y-1 hover:rotate-[0.3deg]",
        iconBg: "bg-purple-100 text-purple-700",
        badge: "text-purple-700 border-purple-200 bg-purple-50",
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
      timeline: "Per event",
      highlight: "Smooth event operations",
      deliverables: ["Bracket setup", "Team coordination", "Results reporting"],
      accent: {
        cardHover: "hover:border-red-200 hover:-translate-y-1 hover:rotate-[-0.3deg]",
        iconBg: "bg-red-100 text-red-600",
        badge: "text-red-700 border-red-200 bg-red-50",
        bullet: "bg-red-500",
        primaryBtn: "bg-rose-500 text-white hover:bg-rose-400",
        secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
    },
  ];

  const processSteps = [
    {
      title: "Discover",
      description:
        "We define goals, scope, and success metrics so the outcome is clear from day one.",
    },
    {
      title: "Build",
      description:
        "I deliver in focused iterations with regular updates and measurable progress.",
    },
    {
      title: "Launch",
      description:
        "We validate quality, performance, and handoff details for a confident release.",
    },
  ];

  const handleReadMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <ContainerBlock
      title="Services | Adam Peleback"
      description="Explore my professional services including web development, test automation, and esports tournament administration."
      keywords="frontend development services, test automation services, esports tournament administration"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Frontend Development and QA Services",
        provider: {
          "@type": "Person",
          name: "Adam Peleback",
          url: siteUrl,
        },
      }}
    >
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
          <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
            Services
          </h1>
        </div>

        <div className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <header className="mb-14">
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
                What I Offer
              </p>
              <div className="grid md:grid-cols-2 gap-8 items-end">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
                  Practical services for shipping quality digital products.
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I help teams and founders with frontend development, testing,
                  automation, and esports operations through clear scopes and reliable
                  delivery.
                </p>
              </div>
            </header>

            <section className="grid md:grid-cols-2 gap-6 mb-16">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  style={{ transitionDelay: `${index * 40}ms` }}
                  className={`group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg transition-all duration-300 ${service.accent.cardHover}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${service.accent.iconBg}`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {service.highlight}
                        </p>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <span
                      className={`text-sm border rounded-full px-3 py-1 ${service.accent.badge}`}
                    >
                      {service.timeline}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${service.accent.bullet}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleReadMore(service)}
                      className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-colors duration-300 ${service.accent.secondaryBtn}`}
                    >
                      Read Details
                    </button>
                    <Link
                      href="/contact"
                      className={`flex-1 rounded-lg px-4 py-3 font-semibold text-center transition-colors duration-300 ${service.accent.primaryBtn}`}
                    >
                      Start a Project
                    </Link>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="uppercase tracking-[0.2em] text-xs text-gray-500 dark:text-gray-400 mb-3">
                    Process
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    How we work together
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-red-300 px-5 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Book a conversation
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F9F9F9] dark:bg-gray-900 p-5"
                  >
                    <p className="text-sm text-red-500 mb-2 font-semibold">0{index + 1}</p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Need something tailored?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                If your project needs a custom setup, we can define a bespoke scope
                around your team, stack, and timeline.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-red-500 text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService?.title}
        content={selectedService?.fullDescription}
      />
    </ContainerBlock>
  );
}