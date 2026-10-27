import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

// The three things people hire me for, each pointing at its own landing page.
// The web and testing pages are in Swedish because those clients are.
const OFFERS = [
  {
    title: "Websites and web apps",
    text: "New sites, performance work and technical SEO in React and Next.js, for companies in Sweden.",
    href: "/webbkonsult",
    cta: "Webbkonsult",
    note: "på svenska",
    lang: "sv",
  },
  {
    title: "Testing and QA",
    text: "Test automation, tests in your CI pipeline and manual testing, from someone who has worked in QA since 2018.",
    href: "/testkonsult",
    cta: "Testkonsult",
    note: "på svenska",
    lang: "sv",
  },
  {
    title: "Discord bots",
    text: "Moderation, onboarding and league bots built with discord.js. I've made Discord bots since 2019.",
    href: "/discord-bots",
    cta: "Custom Discord bots",
  },
];

export default function HomeServices() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
              Freelance
            </p>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              What I can help with
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline dark:text-white"
          >
            All services <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <li key={offer.href}>
              <Link
                href={offer.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-[#FAFAFA] p-6 transition-all hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {offer.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-gray-700 dark:text-gray-300">
                  {offer.text}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                  <span lang={offer.lang}>{offer.cta}</span>
                  {offer.note && (
                    <span lang="sv" className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      ({offer.note})
                    </span>
                  )}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
