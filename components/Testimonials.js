import React from "react";
import userData from "@constants/data";

export default function Testimonials() {
  const testimonials = userData.testimonials || [];
  if (testimonials.length === 0) return null;

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-10 mb-16">
      <div className="mb-8">
        <p className="uppercase tracking-[0.2em] text-xs text-gray-500 dark:text-gray-400 mb-3">
          What people say
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Endorsements from the people I&apos;ve worked with.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={`${t.author}-${t.role}`}
            className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F9F9F9] dark:bg-gray-900 p-6 md:p-8 flex flex-col ${
              t.featured ? "md:col-span-2 lg:col-span-3" : ""
            }`}
          >
            <svg
              className="w-8 h-8 text-red-500 mb-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <blockquote
              className={`text-gray-700 dark:text-gray-200 leading-relaxed mb-6 flex-grow ${
                t.featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
              }`}
            >
              {t.quote}
            </blockquote>
            <figcaption className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <cite className="not-italic block font-semibold text-gray-800 dark:text-white">
                {t.author}
              </cite>
              <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t.role}
              </span>
              {(t.relationship || t.source) && (
                <span className="block text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {[t.relationship, t.source && `Endorsement on ${t.source}`]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
