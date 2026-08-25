import React from "react";
import Link from "next/link";
import Image from "next/image";
import userData from "@constants/data";
import { toProjectSlug } from "@lib/projectSlug";
import { normalizeImageSrc, getFeaturedProjects } from "@lib/projects";

// Repeating visual rhythm of the grid: three full-width cards, a 2/3 + 1/3
// row, a 1/3 + 2/3 row, then full-width again. Badge accents follow the
// same positions.
const CARD_LAYOUTS = [
  {
    anchor: "col-span-3 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 768px) 100vw, 1152px",
    badge: "bg-teal-700 text-white",
  },
  {
    anchor: "col-span-3 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 768px) 100vw, 1152px",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 768px) 100vw, 1152px",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 sm:col-span-2 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 640px) 100vw, 66vw",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 sm:col-span-1",
    inner: "shadow-2xl",
    image: "object-cover shadow-2xl",
    width: 900,
    height: 900,
    sizes: "(max-width: 640px) 100vw, 33vw",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 sm:col-span-1",
    inner: "shadow-2xl",
    image: "object-cover shadow-2xl",
    width: 900,
    height: 900,
    sizes: "(max-width: 640px) 100vw, 33vw",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 sm:col-span-2 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 640px) 100vw, 66vw",
    badge: "bg-red-500 text-gray-50",
  },
  {
    anchor: "col-span-3 shadow-2xl",
    inner: "",
    image: "",
    width: 1600,
    height: 900,
    sizes: "(max-width: 768px) 100vw, 1152px",
    badge: "bg-blue-500 text-gray-50",
  },
];

export default function FavouriteProjects() {
  const featured = getFeaturedProjects(userData.projects);

  return (
    <div className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center pt-40 mx-10 md:my-20 lg:my-0">
          <h2 className="text-6xl lg:text-9xl max-w-lg font-bold text-black my-20 md:my-0 dark:text-white text-center pb-3">
            Favourite Projects
          </h2>
          <Link
            href="/projects"
            className="mb-20 md:mb-0 px-8 py-4 rounded-md bg-white shadow-lg text-xl font-semibold flex flex-row space-x-4 items-center dark:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-right-square"
              stroke="4"
              strokeWidth="4"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
              />
            </svg>
            <p>View all</p>
          </Link>
        </header>

        {/* Grid starts here */}
        <div className="grid md:grid-cols-3 gap-8 pb-40">
          {featured.map((project, index) => {
            const layout = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
            return (
              <Link
                key={project.title}
                href={`/project/${toProjectSlug(project.title)}`}
                className={`w-full block ${layout.anchor}`}
              >
                <div className={`relative overflow-hidden ${layout.inner}`}>
                  <Image
                    src={normalizeImageSrc(project.imgUrl)}
                    alt={`${project.title} project screenshot`}
                    width={layout.width}
                    height={layout.height}
                    sizes={layout.sizes}
                    className={`transform hover:scale-125 transition duration-2000 ease-out ${layout.image}`}
                  />
                  <span
                    className={`absolute top-10 left-10 font-bold text-xl rounded-md px-2 ${layout.badge}`}
                  >
                    {project.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-10 left-10 dark:text-white text-black font-bold text-xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
