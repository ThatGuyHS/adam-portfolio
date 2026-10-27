import React from "react";
import Link from "next/link";
import userData from "@constants/profile";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./Icons";

const PAGES = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
  { href: "/3d", label: "3D Village" },
];

const SERVICES = [
  { href: "/services", label: "All services" },
  { href: "/webbkonsult", label: "Webbkonsult", lang: "sv" },
  { href: "/testkonsult", label: "Testkonsult", lang: "sv" },
  { href: "/discord-bots", label: "Discord bots" },
];

const SOCIAL = [
  { href: userData.socialLinks.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: userData.socialLinks.github, label: "GitHub", Icon: GitHubIcon },
  { href: userData.socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
];

const linkClass =
  "text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#F1F1F1] dark:border-gray-700 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {userData.name}
            </p>
            <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-300">
              Web developer and software tester in Stockholm, Sweden.
            </p>
            <a
              href={`mailto:${userData.email}`}
              className="mt-4 inline-block font-semibold text-red-700 hover:underline dark:text-red-400"
            >
              {userData.email}
            </a>
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`Adam Peleback on ${label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Pages">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Pages
            </h2>
            <ul className="mt-4 space-y-2">
              {PAGES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {SERVICES.map(({ href, label, lang }) => (
                <li key={href}>
                  <Link href={href} lang={lang} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-gray-300 pt-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Adam Peleback
        </p>
      </div>
    </footer>
  );
}
