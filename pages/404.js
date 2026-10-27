import React from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <ContainerBlock
      title="Page not found | Adam Peleback"
      description="This page doesn't exist on adampeleback.com."
      robots="noindex, follow"
    >
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 pt-10 pb-24 md:pt-16">
          <p className="font-mono text-sm font-semibold text-red-700 dark:text-red-400">
            404
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            The link may be old, or the project it pointed to has been taken
            down. One of these should get you back on track.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ContainerBlock>
  );
}
