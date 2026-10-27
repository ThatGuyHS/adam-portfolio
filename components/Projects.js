import React from "react";
import userData from "@constants/data";
import { toProjectSlug } from "@lib/projectSlug";
import ProjectCard from "./ProjectCard";

const GROUPS = [
  {
    id: "client",
    title: "Client work",
    intro: "Websites I've built for organizations and companies.",
  },
  {
    id: "product",
    title: "Products and web apps",
    intro: "Platforms and tools I've designed and built myself, most of them with payments.",
  },
  {
    id: "own-site",
    title: "My own comparison and content sites",
    intro: "Sites I run with my own money, mostly in Swedish. They're where most of my SEO experience comes from.",
  },
  {
    id: "work",
    title: "Employers and community",
    intro: "Platforms I worked on as an employee, and the esports community I'm part of.",
  },
];

// Featured projects lead their group, the rest keep their order in data.js.
const byFeatured = (a, b) => (a.featured || 99) - (b.featured || 99);

export default function Projects({ caseStudySlugs = [] }) {
  let first = true;

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-10 md:pt-10">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {userData.projects.length} things I&apos;ve built or worked on, from
          client websites to my own comparison sites. The ones marked case
          study have a longer write-up.
        </p>
        <nav aria-label="Project groups" className="mt-8 flex flex-wrap gap-2">
          {GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {group.title}
            </a>
          ))}
        </nav>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
          {GROUPS.map((group) => {
            const projects = userData.projects
              .filter((p) => p.group === group.id)
              .sort(byFeatured);
            if (projects.length === 0) return null;
            return (
              <section key={group.id} id={group.id} className="scroll-mt-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {group.title}
                </h2>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                  {group.intro}
                </p>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  {projects.map((project) => {
                    // Only the first screenshot on the page is above the fold.
                    const priority = first;
                    first = false;
                    return (
                      <ProjectCard
                        key={project.title}
                        project={project}
                        hasCaseStudy={caseStudySlugs.includes(toProjectSlug(project.title))}
                        priority={priority}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
