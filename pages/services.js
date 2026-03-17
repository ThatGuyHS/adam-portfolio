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
      icon: "💻"
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
      icon: "⚡"
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
      icon: "🤖"
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
      icon: "🎮"
    }
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">My Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.shortDescription}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleReadMore(service)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Read More
                </button>
                <Link
                  href="/contact"
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-center"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          ))}
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