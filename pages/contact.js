import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Contact from "../components/Contact";

export default function contact() {
  const siteUrl = "https://adampeleback.com";

  return (
    <ContainerBlock
      title="Contact Adam Peleback | Frontend Developer"
      description="Get in touch with Adam Peleback for frontend development, test automation, and esports project collaborations."
      keywords="contact Adam Peleback, frontend developer contact, web development services"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Adam Peleback",
        url: `${siteUrl}/contact`,
      }}
    >
      <Contact />
    </ContainerBlock>
  );
}
