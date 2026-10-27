import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import HomeServices from "../components/HomeServices";
import SelectedWork from "../components/SelectedWork";
import ContactBand from "../components/ContactBand";
import { SITE_URL as siteUrl } from "@constants/site";
import caseStudies from "@constants/caseStudies";

export default function Home({ caseStudySlugs }) {
  return (
    <ContainerBlock
      title="Adam Peleback | Frontend Developer and Esports Organizer"
      description="Frontend developer and software tester in Stockholm. I build websites, web apps and esports platforms in React and Next.js."
      keywords="Adam Peleback, frontend developer, React developer, Next.js developer, esports"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Adam Peleback",
        url: siteUrl,
        inLanguage: "en",
      }}
    >
      <Hero />
      <SelectedWork caseStudySlugs={caseStudySlugs} />
      <HomeServices />
      <ContactBand />
    </ContainerBlock>
  );
}

export const getStaticProps = async () => ({
  props: { caseStudySlugs: Object.keys(caseStudies) },
});
