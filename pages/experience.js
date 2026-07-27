import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Experience from "../components/Experience";
import { SITE_URL as siteUrl } from "@constants/site";

export default function experience() {
  return (
    <ContainerBlock
      title="Experience | Adam Peleback"
      description="Professional experience in frontend development, QA engineering, and esports operations."
      keywords="Adam Peleback experience, frontend engineer, QA developer, esports"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: "Adam Peleback Experience",
        url: `${siteUrl}/experience`,
      }}
    >
      <Experience />
    </ContainerBlock>
  );
}
