import React from "react";
import Link from "next/link";
import userData from "@constants/profile";

// Closing call to action at the bottom of the home and project pages.
export default function ContactBand() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col gap-6 rounded-3xl bg-gray-900 p-8 md:flex-row md:items-center md:justify-between md:p-12 dark:bg-black">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Got a project in mind?
            </h2>
            <p className="mt-3 max-w-xl text-lg text-gray-300">
              Tell me what you&apos;re building and I&apos;ll get back to you
              within a day. You can also email me at{" "}
              <a
                href={`mailto:${userData.email}`}
                className="font-semibold text-white underline decoration-red-400 underline-offset-4 hover:decoration-2"
              >
                {userData.email}
              </a>
              .
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 self-start rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700 md:self-auto"
          >
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}
