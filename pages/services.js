import ContainerBlock from "../components/ContainerBlock";
import Modal from "../components/Modal";
import { useState } from "react";
import Link from "next/link";
import { SITE_URL as siteUrl } from "@constants/site";
import services from "@constants/services";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const processSteps = [
    {
      title: "Discover",
      description:
        "We agree on what you need, what is out of scope and what it will cost.",
    },
    {
      title: "Build",
      description:
        "I build in short iterations and show you working versions along the way.",
    },
    {
      title: "Launch",
      description:
        "I test everything before launch and hand over the code with documentation, so you aren't tied to me.",
    },
  ];

  const handleReadMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <ContainerBlock
      title="Services | Adam Peleback"
      description="Freelance web development, test automation, Discord bots and esports tournament administration by Adam Peleback in Stockholm."
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
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-10">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
            Services
          </h1>
        </div>

        <div className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <header className="mb-14">
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-700 dark:text-red-400 mb-4 font-semibold">
                What I offer
              </p>
              <div className="grid md:grid-cols-2 gap-8 items-end">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
                  Web, testing, Discord bots and esports.
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  I take freelance work alongside my job as a system tester at
                  Decerno. You get a scope and a price before I start, and you
                  deal with me directly the whole way.
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
                        <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                          {service.highlight}
                        </p>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
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
                      Read details
                    </button>
                    <Link
                      href="/contact"
                      className={`flex-1 rounded-lg px-4 py-3 font-semibold text-center transition-colors duration-300 ${service.accent.primaryBtn}`}
                    >
                      Start a project
                    </Link>
                  </div>
                  {service.page && (
                    <Link
                      href={service.page}
                      className="mt-4 inline-block text-sm font-semibold text-red-700 hover:underline dark:text-red-400"
                    >
                      {service.pageLabel} →
                    </Link>
                  )}
                </article>
              ))}
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="uppercase tracking-[0.2em] text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Process
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    How we work together
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-700 hover:bg-red-50 dark:border-red-400/40 dark:text-red-300 dark:hover:bg-gray-700 transition-colors duration-300"
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
                    <p className="text-sm text-red-700 dark:text-red-400 mb-2 font-semibold">0{index + 1}</p>
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
                Something else in mind?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                If your project doesn&apos;t fit one of these, send me a short
                description and we&apos;ll work out a scope that fits your team,
                stack and timeline.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-red-600 text-white px-6 py-3 font-semibold hover:bg-red-700 transition-colors duration-300"
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