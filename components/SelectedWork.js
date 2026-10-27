import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import { getFeaturedProjects } from "@lib/projects";
import { toProjectSlug } from "@lib/projectSlug";
import ProjectCard from "./ProjectCard";
import { ArrowRightIcon } from "./Icons";

export default function SelectedWork({ caseStudySlugs = [] }) {
  const featured = getFeaturedProjects(userData.projects);

  return (
    <section className="bg-[#F1F1F1] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
              Selected work
            </p>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Favourite projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline dark:text-white"
          >
            All {userData.projects.length} projects <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              hasCaseStudy={caseStudySlugs.includes(toProjectSlug(project.title))}
              showStack={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
