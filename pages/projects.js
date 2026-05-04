import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Projects from "../components/Projects";
import userData from "@constants/data";

export default function projects() {
  const siteUrl = "https://adampeleback.com";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Adam Peleback",
    url: `${siteUrl}/projects`,
    itemListElement: userData.projects
      .filter((p) => p.link && /^https?:\/\//.test(p.link))
      .map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: p.title,
        url: p.link,
      })),
  };

  return (
    <ContainerBlock
      title="Projects | Adam Peleback"
      description="Browse selected web projects built by Adam Peleback, including SaaS products, portfolios, and esports platforms."
      keywords="Adam Peleback projects, portfolio projects, Next.js projects"
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Adam Peleback Projects",
          url: `${siteUrl}/projects`,
          mainEntity: { "@id": `${siteUrl}/projects#projects-list` },
        },
        { ...itemList, "@id": `${siteUrl}/projects#projects-list` },
      ]}
    >
      <Projects />
    </ContainerBlock>
  );
}
