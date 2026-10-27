import React from "react";
import Image from "next/image";
import Link from "next/link";
import userData from "@constants/data";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./Icons";

const STACK = [
  { name: "JavaScript", logo: "/logos/javascript.png" },
  { name: "TypeScript", logo: "/logos/typescript.png" },
  { name: "React", logo: "/logos/react.png" },
  { name: "Next.js", logo: "/logos/nextjs.png" },
  { name: "Tailwind CSS", logo: "/logos/tailwind.png" },
  { name: "HTML", logo: "/logos/html.png" },
  { name: "CSS", logo: "/logos/css.png" },
  { name: "Git", logo: "/logos/git.png" },
];

// Tools that show up across the projects on this site.
const ALSO_USED = [
  "Supabase",
  "Strapi",
  "Contentful",
  "Stripe",
  "Express",
  "discord.js",
  "Python",
  "Three.js",
  "Angular",
  "Nest.js",
];

const SOCIAL = [
  { href: userData.socialLinks.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: userData.socialLinks.github, label: "GitHub", Icon: GitHubIcon },
  { href: userData.socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
];

export default function AboutMe() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-10">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
          About Me.
        </h1>
        <p className="mt-8 max-w-4xl text-2xl md:text-4xl font-semibold leading-snug text-gray-900 dark:text-white">
          {userData.about.title}.
        </p>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid gap-12 md:grid-cols-3 md:gap-16">
          <aside className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
                For any sort of help or enquiry, shoot a{" "}
                <a
                  href={`mailto:${userData.email}`}
                  className="font-semibold text-gray-900 underline decoration-2 underline-offset-4 dark:text-white"
                >
                  mail
                </a>{" "}
                and I&apos;ll get back. I swear.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Freelance work
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
                Alongside my job I take freelance web development, testing and
                SEO work. See the{" "}
                <Link
                  href="/services"
                  className="font-semibold text-gray-900 underline decoration-2 underline-offset-4 dark:text-white"
                >
                  services
                </Link>{" "}
                or download my{" "}
                <a
                  href="/Adam_Peleback_CV.pdf"
                  download
                  className="font-semibold text-gray-900 underline decoration-2 underline-offset-4 dark:text-white"
                >
                  resume (PDF)
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Elsewhere
              </h2>
              <ul className="mt-3 space-y-1">
                {SOCIAL.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="inline-flex items-center gap-3 py-1.5 text-lg text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="md:col-span-2">
            <div className="space-y-5 text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-300">
              {userData.about.description?.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-bold text-gray-900 dark:text-white">
              Tech stack
            </h2>
            <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4">
              {STACK.map(({ name, logo }) => (
                <li
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center dark:bg-gray-800"
                >
                  <Image src={logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Also in my projects
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ALSO_USED.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
