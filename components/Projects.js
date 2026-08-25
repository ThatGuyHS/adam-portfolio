import React from "react";
import Image from "next/image";
import userData from "@constants/data";
import { normalizeImageSrc } from "@lib/projects";

export default function Projects() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          Projects
        </h1>
      </div>
      {/* Grid starts here */}
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40">
          {userData.projects.map((proj, idx) => (
            <ProjectCard
              key={proj.title}
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
              number={`${idx + 1}`}
              kind={proj.kind}
              stack={proj.stack}
              blurb={proj.blurb}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, imgUrl, number, kind, stack, blurb }) => {
  const normalizedImageSrc = normalizeImageSrc(imgUrl);

  return (
    <div className="w-full shadow-2xl bg-white dark:bg-gray-800">
      <a href={link} className="block">
        <div className="relative overflow-hidden">
          <div className="h-72 object-cover relative">
            <Image
              src={normalizedImageSrc}
              alt={`${title} project screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="transform hover:scale-125 transition duration-2000 ease-out object-cover h-full w-full"
            />
          </div>
          <span className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-10 text-gray-50 font-bold text-xl"
          >
            {number.length === 1 ? "0" + number : number}
          </span>
        </div>
      </a>
      {(kind || blurb || (stack && stack.length > 0)) && (
        <div className="p-6">
          {kind && (
            <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
              {kind}
            </p>
          )}
          {blurb && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{blurb}</p>
          )}
          {stack && stack.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-gray-200 dark:bg-gray-700 px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
