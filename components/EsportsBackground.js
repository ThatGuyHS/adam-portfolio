import React from "react";
import Link from "next/link";

const stats = [
  { value: "8+", label: "Years in esports operations" },
  { value: "100s", label: "Tournaments run" },
  { value: "AoE2 + PUBG", label: "Primary titles" },
];

export default function EsportsBackground() {
  return (
    <section className="bg-white dark:bg-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <p className="uppercase tracking-[0.25em] text-xs text-red-500 mb-4 font-semibold">
              Esports operations
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              From bracket admin to tournament platforms.
            </h2>
          </div>

          <div className="md:col-span-2 space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I started in esports in 2017 as a tournament administrator at
              G-Loot, running PUBG events on the Global Loot League platform
              before moving into QA and frontend engineering on the same product.
              That double track — operations and engineering — is what most of my
              esports work has looked like ever since.
            </p>
            <p>
              On the operations side I now run{" "}
              <a
                href="https://www.aoe2sverige.se/"
                className="font-semibold text-gray-900 dark:text-white underline decoration-red-500 underline-offset-4"
              >
                AoE2 Sverige
              </a>
              , the Swedish tournament platform for Age of Empires 2, and serve
              on the board of{" "}
              <a
                href="https://pxb.gg"
                className="font-semibold text-gray-900 dark:text-white underline decoration-red-500 underline-offset-4"
              >
                Phoenix Blue
              </a>
              , a non-profit competitive gaming organisation. On the engineering
              side I&apos;ve built the public site for{" "}
              <a
                href="https://svenskesport.se"
                className="font-semibold text-gray-900 dark:text-white underline decoration-red-500 underline-offset-4"
              >
                Svenska E-sportförbundet
              </a>{" "}
              (the Swedish Esports Federation) and contributed frontend work to
              Stryda at G-Loot.
            </p>
            <p>
              If you&apos;re organising an Age of Empires 2 event, building an
              esports product, or need a developer who understands both the stack
              and the community, I&apos;m a good fit.
            </p>

            <dl className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
              >
                Talk about an esports project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
