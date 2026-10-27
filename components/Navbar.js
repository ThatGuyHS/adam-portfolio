import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "@constants/profile";
import {
  CloseIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "./Icons";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
  { href: "/3d", label: "3D Village" },
];

// /project/[slug] pages belong to the Projects section.
const isActive = (pathname, href) =>
  pathname === href || (href === "/projects" && pathname.startsWith("/project/"));

export default function Navbar() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" className="group shrink-0">
          <span className="block font-semibold text-xl text-gray-900 dark:text-gray-100">
            {userData.name}
          </span>
          <span className="block text-sm text-gray-600 dark:text-gray-300">
            {userData.designation}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(router.pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-base transition-colors ${
                      active
                        ? "font-semibold text-gray-900 dark:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-red-600 dark:after:bg-red-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={userData.socialLinks.linkedin}
            aria-label="Adam Peleback on LinkedIn"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <LinkedInIcon />
          </a>
          <a
            href={userData.socialLinks.github}
            aria-label="Adam Peleback on GitHub"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <GitHubIcon />
          </a>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-amber-700 hover:bg-gray-100 dark:text-amber-400 dark:hover:bg-gray-700"
          >
            {/* Render nothing until mounted: the server can't know the theme. */}
            {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="lg:hidden mt-4">
          <ul className="grid gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(router.pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base ${
                      active
                        ? "bg-red-50 font-semibold text-red-700 dark:bg-gray-700 dark:text-red-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="flex gap-2 border-t border-gray-200 px-2 pt-2 mt-1 sm:hidden dark:border-gray-700">
              <a
                href={userData.socialLinks.linkedin}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={userData.socialLinks.github}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
