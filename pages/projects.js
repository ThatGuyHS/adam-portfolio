import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Projects from "../components/Projects";
import { SITE_URL as siteUrl } from "@constants/site";
import caseStudies from "@constants/caseStudies";

export default function projects({ caseStudySlugs }) {
  return (
    <ContainerBlock
      title="Projects | Adam Peleback"
      description="Web projects by Adam Peleback: client sites, my own comparison and guide sites, web apps and esports platforms."
      keywords="Adam Peleback projects, portfolio projects, Next.js projects"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Adam Peleback Projects",
        url: `${siteUrl}/projects`,
      }}
    >
      <Projects caseStudySlugs={caseStudySlugs} />
    </ContainerBlock>
  );
}

export const getStaticProps = async () => ({
  props: { caseStudySlugs: Object.keys(caseStudies) },
});
