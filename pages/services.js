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
        cardHover: "hover:border-cyan-300/70 hover:-translate-y-1",
        iconBg: "bg-cyan-400/15",
        badge: "text-cyan-200 border-cyan-300/40 bg-cyan-400/10",
        bullet: "bg-cyan-300",
        primaryBtn: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
        secondaryBtn: "bg-white/10 text-white hover:bg-white/20",
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
        cardHover: "hover:border-amber-300/70 hover:-translate-y-1.5",
        iconBg: "bg-amber-400/15",
        badge: "text-amber-200 border-amber-300/40 bg-amber-400/10",
        bullet: "bg-amber-300",
        primaryBtn: "bg-amber-400 text-slate-950 hover:bg-amber-300",
        secondaryBtn: "bg-white/10 text-white hover:bg-white/20",
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
        cardHover: "hover:border-violet-300/70 hover:-translate-y-1 hover:rotate-[0.3deg]",
        iconBg: "bg-violet-400/15",
        badge: "text-violet-200 border-violet-300/40 bg-violet-400/10",
        bullet: "bg-violet-300",
        primaryBtn: "bg-violet-400 text-slate-950 hover:bg-violet-300",
        secondaryBtn: "bg-white/10 text-white hover:bg-white/20",
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
        cardHover: "hover:border-rose-300/70 hover:-translate-y-1 hover:rotate-[-0.3deg]",
        iconBg: "bg-rose-400/15",
        badge: "text-rose-200 border-rose-300/40 bg-rose-400/10",
        bullet: "bg-rose-300",
        primaryBtn: "bg-rose-500 text-white hover:bg-rose-400",
        secondaryBtn: "bg-white/10 text-white hover:bg-white/20",
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
      <div className="relative overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-red-500 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <header className="mb-16">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cyan-200 mb-6">
              Services
            </p>
            <div className="grid md:grid-cols-2 gap-10 items-end">
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Design, build, and launch digital products with confidence.
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                I help teams and founders ship high-quality experiences across web
                development, quality assurance, automation, and esports operations.
                Engagements are structured, collaborative, and focused on outcomes.
              </p>
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-6 mb-20">
            {services.map((service, index) => (
              <article
                key={service.title}
                style={{ transitionDelay: `${index * 40}ms` }}
                className={`group rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl transition-all duration-300 ${service.accent.cardHover}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${service.accent.iconBg}`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-300">
                        {service.highlight}
                      </p>
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                    </div>
                  </div>
                  <span
                    className={`text-sm border rounded-full px-3 py-1 ${service.accent.badge}`}
                  >
                    {service.timeline}
                  </span>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {service.shortDescription}
                </p>

                <ul className="space-y-2 mb-8">
                  {service.deliverables.map((item) => (
                    <li key={item} className="text-sm text-slate-200 flex items-center gap-2">
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

          <section className="rounded-2xl border border-white/20 bg-slate-900/60 p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="uppercase tracking-[0.2em] text-xs text-slate-300 mb-3">
                  Process
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">How we work together</h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-cyan-300/60 px-5 py-3 text-cyan-200 hover:bg-cyan-300/10 transition-colors duration-300"
              >
                Book a conversation
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm text-cyan-200 mb-2">0{index + 1}</p>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="bg-slate-950 px-4 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl border border-white/15 bg-gradient-to-r from-red-500/20 via-transparent to-cyan-500/20 p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need something tailored?
              </h2>
              <p className="text-slate-300 max-w-2xl">
                If your project needs a custom setup, we can define a bespoke scope
                around your team, stack, and timeline.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-white text-slate-950 px-6 py-3 font-semibold hover:bg-slate-200 transition-colors duration-300"
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