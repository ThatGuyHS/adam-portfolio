import React from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeImageSrc } from "@lib/projects";
import { toProjectSlug } from "@lib/projectSlug";
import { ExternalIcon } from "./Icons";

// One project tile: screenshot and write-up link to /project/[slug]; the live
// site gets its own link below so the two never nest. `hasCaseStudy` comes
// from getStaticProps so the case-study texts stay out of the client bundle.
export default function ProjectCard({
  project,
  hasCaseStudy = false,
  priority = false,
  showStack = true,
}) {
  const slug = toProjectSlug(project.title);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/project/${slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
          <Image
            src={normalizeImageSrc(project.imgUrl)}
            alt={`${project.title} project screenshot`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {hasCaseStudy && (
            <span className="absolute left-4 top-4 rounded-md bg-gray-900/85 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Case study
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {project.kind && (
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
              {project.kind}
            </p>
          )}
          <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:underline dark:text-white">
            {project.title}
          </h3>
          {project.blurb && (
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
              {project.blurb}
            </p>
          )}
          {showStack && project.stack && project.stack.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
      {project.link && (
        <div className="px-6 pb-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline dark:text-red-400"
          >
            Visit live site <ExternalIcon className="h-4 w-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      )}
    </article>
  );
}
