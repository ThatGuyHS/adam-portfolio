import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import AboutMe from "../components/AboutMe";
import { SITE_URL as siteUrl } from "@constants/site";

export default function about() {
  return (
    <ContainerBlock
      title="About Adam Peleback | Frontend Developer in Stockholm"
      description="Learn about Adam Peleback, a frontend developer in Stockholm with experience in React, Next.js, QA, and esports operations."
      keywords="Adam Peleback, frontend developer, Next.js developer, React developer, Stockholm"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Adam Peleback",
        url: `${siteUrl}/about`,
      }}
    >
      <AboutMe />
    </ContainerBlock>
  );
}
