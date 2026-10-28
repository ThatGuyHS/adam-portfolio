import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContainerBlock from "../../components/ContainerBlock";
import ContactBand from "../../components/ContactBand";
import ProjectCard from "../../components/ProjectCard";
import { ExternalIcon } from "../../components/Icons";
import userData from "@constants/data";
import { toProjectSlug, findProjectBySlug } from "@lib/projectSlug";
import { normalizeImageSrc } from "@lib/projects";
import caseStudies from "@constants/caseStudies";
import { SITE_URL as siteUrl } from "@constants/site";

const ProjectPage = ({ project, caseStudy, related }) => {
  const slug = toProjectSlug(project.title);
  const description =
    caseStudy?.intro || project.blurb || `Learn more about ${project.title}.`;

  return (
    <ContainerBlock
      title={`${project.title} | Adam Peleback`}
      description={description}
      image={normalizeImageSrc(project.imgUrl)}
      type="article"
      // Pages with a real case-study write-up are indexed; the rest stay
      // thin and out of the index until they get one.
      robots={caseStudy ? "index, follow" : "noindex, follow"}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Projects", item: `${siteUrl}/projects` },
            { "@type": "ListItem", position: 2, name: project.title, item: `${siteUrl}/project/${slug}` },
          ],
        },
        caseStudy && {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          url: project.link,
          description,
          image: `${siteUrl}${normalizeImageSrc(project.imgUrl)}`,
          creator: { "@type": "Person", name: "Adam Peleback", url: siteUrl },
        },
      ].filter(Boolean)}
    >
      <article className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 pt-6 md:pt-10">
          <Link
            href="/projects"
            className="text-base text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-white"
          >
            &larr; All projects
          </Link>
          {project.kind && (
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
              {project.kind}
            </p>
          )}
          <h1 className="mt-2 text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            {description}
          </p>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-gray-700">
            <Image
              src={normalizeImageSrc(project.imgUrl)}
              alt={`${project.title} project screenshot`}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1152px) 100vw, 1120px"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl">
            {caseStudy ? (
              <>
                {caseStudy.sections.map((section) => (
                  <section key={section.heading} className="mt-10 first:mt-0">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {section.body}
                    </p>
                  </section>
                ))}
                <section className="mt-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Highlights
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {caseStudy.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600 dark:bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                There&apos;s no longer write-up for this project yet. The
                screenshot and the live site show what it is.
              </p>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            {caseStudy?.role && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  My role
                </h2>
                <p className="mt-2 text-gray-900 dark:text-white">{caseStudy.role}</p>
              </div>
            )}
            {project.stack && project.stack.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Tech stack
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Visit {project.title} <ExternalIcon className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              More projects
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {related.map((p) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  hasCaseStudy={p.hasCaseStudy}
                  showStack={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <ContactBand />
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

// Two other projects to read next: same group first, then ones with a case
// study. Ties go to whatever follows this project in data.js, so neighbouring
// pages don't all suggest the same two.
function pickRelated(project) {
  const all = userData.projects;
  const self = all.indexOf(project);
  const score = (p) =>
    (p.group === project.group ? 2 : 0) + (caseStudies[toProjectSlug(p.title)] ? 1 : 0);
  return all
    .map((p, i) => ({ p, s: score(p), d: (i - self + all.length) % all.length }))
    .filter(({ d }) => d !== 0)
    .sort((a, b) => b.s - a.s || a.d - b.d)
    .slice(0, 2)
    .map(({ p }) => ({ ...p, hasCaseStudy: Boolean(caseStudies[toProjectSlug(p.title)]) }));
}

export const getStaticProps = async ({ params }) => {
  const project = findProjectBySlug(userData.projects, params.slug);
  if (!project) {
    return { notFound: true };
  }
  return {
    props: {
      project,
      caseStudy: caseStudies[params.slug] || null,
      related: pickRelated(project),
    },
  };
};

export default ProjectPage;
