import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Projects from "../components/Projects";
import { SITE_URL as siteUrl } from "@constants/site";

export default function projects() {
  return (
    <ContainerBlock
      title="Projects | Adam Peleback"
      description="Browse selected web projects built by Adam Peleback, including SaaS products, portfolios, and esports platforms."
      keywords="Adam Peleback projects, portfolio projects, Next.js projects"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Adam Peleback Projects",
        url: `${siteUrl}/projects`,
      }}
    >
      <Projects />
    </ContainerBlock>
  );
}
