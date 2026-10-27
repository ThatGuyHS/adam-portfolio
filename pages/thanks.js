import React from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";

const ThanksPage = () => {
  return (
    <ContainerBlock
      title="Thanks for reaching out | Adam Peleback"
      description="Thank you for your message. Adam will get back to you shortly."
      robots="noindex, nofollow"
    >
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 pt-10 pb-24 md:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Message sent
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Thank you!
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Your message has been sent and I&apos;ll get back to you within a
            day. <span lang="sv">Tack, jag hör av mig inom en dag.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Browse my projects
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              Back to the start page
            </Link>
          </div>
        </div>
      </section>
    </ContainerBlock>
  );
};

export default ThanksPage;
