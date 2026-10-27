import userData from "@constants/data";
import React from "react";

export default function Experience() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-10">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
          Experience
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          Esports since 2017, QA since 2018 and frontend development since
          2022. The full version is in my{" "}
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
      <div className="bg-[#F1F1F1] dark:bg-gray-900">
        <ol className="max-w-3xl mx-auto px-4 py-16 md:py-20">
          {userData.experience.map((exp, idx) => (
            <li
              key={`${exp.title}-${exp.company}`}
              className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0"
            >
              {/* Timeline rail and dot */}
              <span
                aria-hidden="true"
                className={`absolute left-[7px] top-2 w-0.5 bg-gray-300 dark:bg-gray-700 md:left-[calc(14.25rem_-_1px)] ${
                  idx === userData.experience.length - 1 ? "h-0" : "h-full"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-[#F1F1F1] dark:border-gray-900 md:left-[13.75rem] ${
                  idx === 0 ? "bg-emerald-500" : "bg-gray-400 dark:bg-gray-500"
                }`}
              />
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 md:pt-1 md:text-right">
                {exp.year}
              </p>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:ml-10 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {exp.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  {exp.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
