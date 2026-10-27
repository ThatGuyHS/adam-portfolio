import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { annotate, annotationGroup } from "rough-notation";
import userData from "@constants/profile";

const ROLES = [
  "Frontend Developer.",
  "QA Engineer.",
  "Tournament organizer.",
  "Copywriter.",
];

// Light mode marks dark text with bright highlights; dark mode uses deeper
// shades so white text stays readable on top of them.
const COLORS = {
  light: ["#F59E0B", "#84CC16", "#10B981", "#60A5FA"],
  dark: ["#B45309", "#4D7C0F", "#047857", "#1D4ED8"],
};

function HighlightedRoles() {
  const refs = useRef([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const palette = resolvedTheme === "dark" ? COLORS.dark : COLORS.light;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let annotations = [];
    let cancelled = false;
    // Measure after Inter has loaded; with the fallback font the text is
    // narrower and the highlights would stop short of the last letters.
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      if (cancelled) return;
      annotations = refs.current.map((el, i) =>
        annotate(el, {
          type: "highlight",
          color: palette[i],
          multiline: true,
          padding: [2, 10],
          iterations: 1,
          animationDuration: 700,
          animate: !reduceMotion,
        })
      );
      annotationGroup(annotations).show();
    });
    return () => {
      cancelled = true;
      annotations.forEach((a) => a.remove());
    };
  }, [resolvedTheme]);

  return ROLES.map((role, i) => (
    <span key={role} className="block">
      <span
        ref={(el) => (refs.current[i] = el)}
        className="text-gray-900 dark:text-white"
      >
        {role}
      </span>
    </span>
  ));
}

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 md:pt-10 md:pb-24 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={userData.avatarUrl}
              alt=""
              width={330}
              height={330}
              priority
              sizes="64px"
              className="lg:hidden h-16 w-16 rounded-full object-cover object-top"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
              Stockholm · Open to freelance work
            </p>
          </div>
          <h1 className="mt-6 space-y-1 text-[2.5rem] sm:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight">
            <HighlightedRoles />
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            I&apos;m Adam Peleback. I build websites and web apps in React and
            Next.js, test software for a living as a system tester at Decerno,
            and have organized esports tournaments since 2017.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              See my work
            </Link>
          </div>
        </div>
        <figure className="hidden lg:block">
          <Image
            src={userData.avatarUrl}
            alt="Portrait of Adam Peleback"
            width={330}
            height={330}
            priority
            sizes="240px"
            className="h-60 w-60 rounded-2xl object-cover shadow-xl ring-1 ring-black/5"
          />
          <figcaption className="mt-3 font-mono text-sm text-gray-600 dark:text-gray-300">
            ↑ That&apos;s me
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
