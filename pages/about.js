import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import AboutMe from "../components/AboutMe";
import { SITE_URL as siteUrl } from "@constants/site";

export default function about() {
  return (
    <ContainerBlock
      title="About Adam Peleback | Frontend Developer in Stockholm"
      description="Adam Peleback is a frontend developer and software tester in Stockholm with a background in React, Next.js, QA and esports."
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
