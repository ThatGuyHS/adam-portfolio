import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContainerBlock from "../../components/ContainerBlock";
import userData from "@constants/data";
import { toProjectSlug, findProjectBySlug } from "@lib/projectSlug";

const normalizeImageSrc = (imgUrl) =>
  imgUrl.startsWith("/") ? imgUrl : `/${imgUrl.replace(/^\.\//, "")}`;

const ProjectPage = ({ project }) => {
  return (
    <ContainerBlock
      title={`${project.title} | Adam Peleback`}
      description={project.description || `Learn more about ${project.title}.`}
      image={normalizeImageSrc(project.imgUrl)}
      type="article"
      // These pages are still thin — keep them out of the index until each one
      // has a real write-up.
      robots="noindex, follow"
    >
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Link
          href="/projects"
          className="text-base text-gray-600 dark:text-gray-300"
        >
          &larr; All projects
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mt-8">
          {project.title}
        </h1>

        <div className="relative w-full my-10 shadow-2xl">
          <Image
            src={normalizeImageSrc(project.imgUrl)}
            alt={`${project.title} project screenshot`}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 1152px"
            className="w-full h-auto"
          />
        </div>

        <article className="max-w-2xl text-xl text-gray-700 dark:text-gray-300">
          <p>{project.description || "A write-up of this project is coming soon."}</p>
        </article>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-8 py-4 rounded-md bg-white shadow-lg text-xl font-semibold dark:text-gray-700"
        >
          Visit {project.title} &rarr;
        </a>
      </div>
    </ContainerBlock>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: userData.projects.map((project) => ({
      params: { slug: toProjectSlug(project.title) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const project = findProjectBySlug(userData.projects, params.slug);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};

export default ProjectPage;
