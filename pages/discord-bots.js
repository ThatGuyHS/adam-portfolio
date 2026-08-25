import React, { useState } from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import { SITE_URL as siteUrl, CONTACT_FORM_ENDPOINT } from "@constants/site";
import userData from "@constants/data";
import caseStudies from "@constants/caseStudies";
import { toProjectSlug } from "@lib/projectSlug";

// Landing page for custom Discord bot development. Unlike /webbkonsult
// (which targets Swedish businesses, in Swedish) this page is in English —
// Discord communities and the Create Discord Bot service are international.

const offers = [
  {
    icon: "🛡️",
    title: "Moderation & community",
    blurb:
      "Auto-moderation, role management, welcome flows and custom commands that keep a growing server healthy without a mod team working around the clock.",
    points: ["Auto-moderation", "Role & onboarding automation", "Custom commands"],
  },
  {
    icon: "🏆",
    title: "Esports & tournament bots",
    blurb:
      "Match check-ins, bracket updates, results reporting and announcements — built by someone who has run tournaments professionally and built the match-ops bot behind Rivals League.",
    points: ["Match operations", "Bracket & results flows", "Scheduled announcements"],
  },
  {
    icon: "🔌",
    title: "Integrations & automation",
    blurb:
      "Connect Discord to the rest of your stack: your website, database, CMS, payment flow or third-party APIs. Notifications in, slash commands out.",
    points: ["Website & API integrations", "Webhooks & notifications", "Slash commands"],
  },
  {
    icon: "🚀",
    title: "Hosting, upkeep & support",
    blurb:
      "Deployment, monitoring and updates so the bot keeps working when Discord changes. With a QA background, I test what I ship — and keep it shipped.",
    points: ["Deployment & hosting setup", "Monitoring & updates", "Ongoing support"],
  },
];

const steps = [
  {
    title: "Scope call",
    description:
      "A short call about your server or product: what should the bot do, who uses it, and what does success look like? You get a clear feature list back.",
  },
  {
    title: "Fixed quote & build",
    description:
      "You get a fixed price or a clear hourly estimate before anything is built. Then I build in short iterations, and you test the bot on a staging server as features land.",
  },
  {
    title: "Launch & support",
    description:
      "The bot goes live on your server with hosting sorted. I stay available for tweaks, new features and the occasional Discord API surprise.",
  },
];

const faqs = [
  {
    q: "What does a custom Discord bot cost?",
    a: "Small utility bots — a few commands, a welcome flow, some automation — are usually a fixed quote after a short call. Larger bots with integrations, databases or tournament logic are priced per project or at my hourly rate of 900 SEK/hour (approx. €80, excl. VAT). You always know the price before I start building.",
  },
  {
    q: "What can a Discord bot actually do?",
    a: "Almost anything you can describe as a rule or a flow: moderate content, assign roles, welcome members, run giveaways, post match results, sync data with your website or database, respond to slash commands, send scheduled announcements, or connect to external APIs. If your community does it manually today, a bot can probably do it automatically.",
  },
  {
    q: "What do you build bots with?",
    a: "Node.js and TypeScript with discord.js — the same stack behind the match-operations bot I built for the Rivals League tournament platform. For bots that need data I typically use Supabase or PostgreSQL, and I integrate with services like Stripe when payments are involved.",
  },
  {
    q: "Do you host the bot too?",
    a: "Yes. I set up hosting, monitoring and automatic restarts so the bot stays online, and I can either run it for you as part of an ongoing arrangement or hand everything over with documentation so your team owns it fully.",
  },
  {
    q: "Can you take over or extend an existing bot?",
    a: "Usually, yes. I start with a code review to see what shape it's in, then give you an honest recommendation: extend it, refactor it, or rebuild it. You get that assessment before committing to anything.",
  },
  {
    q: "How long does a bot take to build?",
    a: "A focused utility bot is typically live within one to two weeks. Multi-feature bots with integrations and admin flows usually take a few weeks, depending on scope. The scope call gives you a concrete timeline for your case.",
  },
];

function BotContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: `[Discord bots] ${form.message.value}`,
        }),
      });
      if (res.ok) {
        window.location.href = "/thanks";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yourcommunity.gg"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your server or product and what the bot should do"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-indigo-500 text-white px-6 py-3 font-semibold hover:bg-indigo-600 transition-colors duration-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          The message didn&apos;t go through. Try again, or email me directly
          at {userData.email}.
        </p>
      )}
    </form>
  );
}

const PROOF_TITLES = ["Rivals League", "Create Discord Bot"];

export default function DiscordBots() {
  const proofProjects = PROOF_TITLES.map((title) =>
    userData.projects.find((p) => p.title === title)
  ).filter(Boolean);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}/discord-bots#service`,
      serviceType: "Custom Discord bot development",
      name: "Adam Peleback — Custom Discord Bot Development",
      url: `${siteUrl}/discord-bots`,
      provider: {
        "@type": "Person",
        name: userData.name,
        url: siteUrl,
        email: userData.email,
      },
      areaServed: "Worldwide",
      description:
        "Custom Discord bots for communities, esports organizations and products: moderation, tournament operations, integrations and hosting.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/discord-bots#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <ContainerBlock
      title="Custom Discord Bot Development | Adam Peleback"
      description="Custom Discord bots for communities, esports organizations and products — moderation, tournament operations, integrations and hosting. Built with discord.js by the developer behind Rivals League's match-ops bot."
      structuredData={structuredData}
    >
      <div>
        {/* Hero */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
              Communities · Esports · Products
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 dark:text-white max-w-3xl">
              Custom Discord bots that run your server for you
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              I&apos;m Adam Peleback — a developer and former esports
              tournament admin. I build Discord bots that moderate communities,
              run tournaments and connect Discord to the rest of your stack,
              from a few custom commands to the match-operations bot behind an
              entire tournament platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-indigo-500 text-white px-6 py-3 font-semibold hover:bg-indigo-600 transition-colors duration-300"
              >
                Get a free scope call
              </a>
              <a
                href="#proof"
                className="rounded-lg border border-indigo-300 px-6 py-3 font-semibold text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                See bots in production ↓
              </a>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
              Proof first
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Bots doing real work in production
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              The Rivals League tournament platform runs its match operations
              through a Discord bot I built, and Create Discord Bot is my
              productized service for custom bot builds.
            </p>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {proofProjects.map((p) => (
                <li key={p.title}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {p.title} ↗
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {p.blurb}
                    </p>
                  </a>
                  {caseStudies[toProjectSlug(p.title)] && (
                    <p className="mt-3">
                      <Link
                        href={`/project/${toProjectSlug(p.title)}`}
                        className="text-sm font-semibold text-indigo-500 hover:underline"
                      >
                        Read the case study →
                      </Link>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What I build */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
              What I build
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              From first command to full match operations
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((o) => (
                <article
                  key={o.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-gray-900 flex items-center justify-center text-2xl">
                      {o.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {o.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {o.blurb}
                  </p>
                  <ul className="space-y-2">
                    {o.points.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process + pricing */}
        <section className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
              How it works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Three steps from idea to bot online
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
                >
                  <p className="text-sm text-indigo-500 mb-2 font-semibold">
                    0{index + 1}
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-gray-800 dark:bg-black p-6 md:p-8 flex flex-wrap items-baseline gap-x-10 gap-y-3">
              <p className="text-2xl md:text-3xl font-bold text-white">
                Fixed quote per bot
                <span className="ml-2 text-sm font-normal text-gray-300">
                  agreed before the build starts
                </span>
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                900 SEK/h
                <span className="ml-2 text-sm font-normal text-gray-300">
                  approx. €80 · excl. VAT · for ongoing work
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
              Common questions
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Questions & answers
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-lg font-bold text-gray-800 dark:text-white">
                    <span className="mr-2 inline-block text-indigo-500 transition-transform duration-200 group-open:rotate-90">
                      ›
                    </span>
                    {f.q}
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-indigo-500 mb-4 font-semibold">
                Say hi
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
                Got a server that deserves a better bot?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md">
                Tell me what your community or product needs and I&apos;ll get
                back within a day with a first assessment — free, no strings
                attached.
              </p>
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-indigo-500 font-semibold hover:underline"
                  >
                    {userData.email}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Stockholm, Sweden · working remotely worldwide
                </p>
                <p className="pt-2">
                  <Link
                    href="/projects"
                    className="text-gray-600 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    See the full portfolio →
                  </Link>
                </p>
              </div>
            </div>
            <BotContactForm />
          </div>
        </section>
      </div>
    </ContainerBlock>
  );
}
