import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import Hero from "../components/Hero";
import { SITE_URL as siteUrl } from "@constants/site";

export default function Home() {
  return (
    <ContainerBlock
      title="Adam Peleback | Frontend Developer and Esports Organizer"
      description="Frontend developer in Stockholm building modern web applications, esports platforms, and digital products with React and Next.js."
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
      <FavouriteProjects />
    </ContainerBlock>
  );
}
