import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";

export default function Home({ repositories }) {
  const siteUrl = "https://adampeleback.com";

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
      <LatestCode repositories={repositories} />
    </ContainerBlock>
  );
}

export const getServerSideProps = async () => {
  let token = process.env.GITHUB_AUTH_TOKEN;

  const repositories = await getLatestRepos(userData, token);
  

  return {
    props: {
      repositories,
    },
  };
};
