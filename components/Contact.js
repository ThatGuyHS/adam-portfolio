import React, { useState } from "react";
import Link from "next/link";
import userData from "@constants/profile";
import { CONTACT_FORM_ENDPOINT } from "@constants/site";
import { GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

const inputClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400";

const labelClass = "block text-sm font-semibold text-gray-800 dark:text-gray-100";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        window.location.href = "/thanks";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 md:pt-10 md:pb-24">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Get in touch, let&apos;s talk.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Fill in the form or email me directly. I usually reply within a
              day.
            </p>
            <a
              href={`mailto:${userData.email}`}
              className="mt-6 inline-flex items-center gap-3 font-semibold text-red-700 hover:underline dark:text-red-400"
            >
              <MailIcon className="h-4 w-4" />
              {userData.email}
            </a>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {userData.address}
            </p>
            <ul className="mt-6 flex gap-2">
              {[
                [userData.socialLinks.linkedin, "LinkedIn", LinkedInIcon],
                [userData.socialLinks.github, "GitHub", GitHubIcon],
                [userData.socialLinks.instagram, "Instagram", InstagramIcon],
              ].map(([href, label, Icon]) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`Adam Peleback on ${label}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-[#F1F1F1] p-6 dark:bg-gray-900">
              <p className="font-semibold text-gray-900 dark:text-white">
                Writing about a specific service?
              </p>
              <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  <Link href="/webbkonsult#kontakt" lang="sv" className="hover:underline">
                    Webbkonsult (på svenska) →
                  </Link>
                </li>
                <li>
                  <Link href="/testkonsult#kontakt" lang="sv" className="hover:underline">
                    Testkonsult (på svenska) →
                  </Link>
                </li>
                <li>
                  <Link href="/discord-bots#contact" className="hover:underline">
                    Custom Discord bots →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 bg-[#FAFAFA] p-6 md:p-8 dark:border-gray-700 dark:bg-gray-900"
          >
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                type="text"
                className={inputClass}
                name="name"
                id="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                className={inputClass}
                name="email"
                id="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                rows="6"
                className={inputClass}
                name="message"
                id="message"
                required
                placeholder="What are you building, and what do you need help with?"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm text-red-700 dark:text-red-400">
                Something went wrong. Please try again, or email me at{" "}
                {userData.email}.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
