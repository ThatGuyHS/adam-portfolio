import React, { useState } from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import { SITE_URL as siteUrl, CONTACT_FORM_ENDPOINT } from "@constants/site";
import userData from "@constants/data";
import { toProjectSlug } from "@lib/projectSlug";

// Landing page in Swedish targeting "frilansande webbkonsult" — the copy is
// aimed at Swedish businesses looking for help with their website, so
// everything below is intentionally in Swedish while the rest of the site
// stays in English.

const offers = [
  {
    icon: "🧑‍💻",
    title: "Webbutveckling",
    blurb:
      "Nya webbplatser och webbappar i React och Next.js — eller WordPress när det passar bättre. Snabba, responsiva och byggda för att synas i sök från dag ett.",
    points: ["Nya webbplatser", "Webbappar & integrationer", "React/Next.js/WordPress"],
  },
  {
    icon: "⚡",
    title: "Prestanda & teknisk hälsa",
    blurb:
      "Core Web Vitals, tillgänglighet och teknisk SEO. Jag mäter, hittar flaskhalsarna och åtgärdar dem i koden — ingen rapport som stannar i en byrålåda.",
    points: ["Core Web Vitals", "Tillgänglighet", "Teknisk genomlysning"],
  },
  {
    icon: "🔍",
    title: "SEO & synlighet",
    blurb:
      "Sökordsstrategi, innehållsstruktur och optimering för både Google och AI-sök (AI Overviews, ChatGPT, Perplexity). Samma metoder som mina egna guidesajter rankar med.",
    points: ["Sökordsstrategi", "AI-sök (GEO)", "Strukturerad data"],
  },
  {
    icon: "🛠️",
    title: "Förvaltning & vidareutveckling",
    blurb:
      "Löpande support, nya funktioner och kvalitetssäkring av befintliga sajter. Med bakgrund som testare bygger jag inte bara — jag ser till att det håller.",
    points: ["Löpande support", "Nya funktioner", "Testning & QA"],
  },
];

const steps = [
  {
    title: "Behov & genomlysning",
    description:
      "Vi börjar med ett kort samtal om vad ni vill uppnå. Har ni en befintlig sajt går jag igenom den tekniskt: hastighet, struktur, synlighet och vad som håller er tillbaka.",
  },
  {
    title: "Prioriterad plan med fast offert",
    description:
      "Ni får en konkret plan sorterad efter effekt — vad som ger mest först, med tydlig motivering och ett fast pris eller en tydlig timuppskattning. Inga 40-sidiga rapporter.",
  },
  {
    title: "Leverans & uppföljning",
    description:
      "Jag bygger och åtgärdar själv, stämmer av löpande och följer upp efter lansering med mätning — så ni ser vad som faktiskt hände.",
  },
];

const faqs = [
  {
    q: "Vad kostar en frilansande webbkonsult?",
    a: "Frilansande webbkonsulter i Sverige tar normalt 900–1 500 kr/h beroende på erfarenhet och inriktning. Mitt timpris är 900 kr/h exkl. moms. Avgränsade projekt offereras till fast pris — till exempel kostar en teknisk genomlysning med prioriterad åtgärdslista 9 500 kr exkl. moms. Löpande samarbeten prissätts per månad efter omfattning.",
  },
  {
    q: "Vilka tekniker arbetar du med?",
    a: "Främst React, Next.js, TypeScript och Tailwind CSS, med Supabase eller ett headless CMS som Strapi och Contentful i botten när sajten behöver data eller redaktörsflöden. Jag arbetar även med WordPress när det är rätt verktyg för uppgiften.",
  },
  {
    q: "Tar du både nya byggen och befintliga sajter?",
    a: "Ja. Jag bygger nya webbplatser från grunden, men minst lika ofta handlar uppdragen om befintliga sajter: vidareutveckling, prestandaoptimering, tillgänglighet eller bättre synlighet i sök.",
  },
  {
    q: "Hjälper du till med SEO också?",
    a: "Ja, SEO är en av mina specialiteter. Jag driver egna innehållssajter i konkurrensutsatta svenska nischer och arbetar med både klassisk Google-SEO och AI-sök — att synas i AI Overviews och i svaren från ChatGPT och Perplexity. Det arbetet ingår naturligt när jag bygger, eftersom samma person skriver koden.",
  },
  {
    q: "Arbetar du på distans?",
    a: "Ja. Jag utgår från Stockholm och arbetar på distans med kunder i hela Sverige. Fysiska möten går bra i Stockholmsområdet när det behövs.",
  },
  {
    q: "Vad skiljer dig från en webbyrå?",
    a: "Hos en byrå betalar du ofta för projektledning, säljled och juniora utförare. Hos mig pratar du direkt med personen som designar, bygger, testar och optimerar — en utvecklare med bakgrund inom QA och SEO som dessutom driver egna sajter med egna pengar på spel.",
  },
];

function SwedishContactForm() {
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
          message: `[Webbkonsult] ${form.message.value}`,
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
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:border-red-500 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Namn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ditt namn"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          E-post
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="du@foretaget.se"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Meddelande
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Berätta kort om er sajt eller idé och vad ni vill uppnå"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-red-500 text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors duration-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Skickar…" : "Skicka"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          Meddelandet gick inte fram. Försök igen, eller mejla mig direkt på{" "}
          {userData.email}.
        </p>
      )}
    </form>
  );
}

const PROOF_TITLES = [
  "Svenska Esportförbundet",
  "Adluelno",
  "PXB Media",
  "Robotklipparguiden",
];

export default function Webbkonsult() {
  const proofSites = PROOF_TITLES.map((title) =>
    userData.projects.find((p) => p.title === title)
  ).filter(Boolean);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/webbkonsult#service`,
      name: "Adam Peleback — Frilansande webbkonsult",
      url: `${siteUrl}/webbkonsult`,
      image: `${siteUrl}/adam.png`,
      email: userData.email,
      priceRange: "900-1500 SEK/h",
      areaServed: "SE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Stockholm",
        addressCountry: "SE",
      },
      knowsAbout: [
        "Webbutveckling",
        "React",
        "Next.js",
        "WordPress",
        "Core Web Vitals",
        "Teknisk SEO",
        "AI-sök (GEO)",
        "Testautomatisering",
      ],
      inLanguage: "sv-SE",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/webbkonsult#faq`,
      inLanguage: "sv-SE",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <ContainerBlock
      title="Frilansande webbkonsult i Stockholm — webbutveckling, prestanda & SEO | Adam Peleback"
      description="Frilansande webbkonsult i Stockholm. Bygger snabba webbplatser i React och Next.js, optimerar prestanda och synlighet i Google och AI-sök — en utvecklare som gör hela jobbet, på distans i hela Sverige."
      ogLocale="sv_SE"
      structuredData={structuredData}
    >
      <div lang="sv">
        {/* Hero */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Stockholm & distans i hela Sverige
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 dark:text-white max-w-3xl">
              Frilansande webbkonsult — från idé till snabb, synlig webbplats
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Jag heter Adam Peleback och hjälper svenska företag med hela
              webben: nya webbplatser, vidareutveckling, prestanda och
              synlighet i Google och AI-sök. Skillnaden mot en byrå? Du pratar
              direkt med personen som designar, bygger, testar och optimerar —
              och som driver egna sajter med egna pengar på spel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-lg bg-red-500 text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors duration-300"
              >
                Boka kostnadsfritt samtal
              </a>
              <a
                href="#bevis"
                className="rounded-lg border border-red-300 px-6 py-3 font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Se ett urval av projekt ↓
              </a>
            </div>
          </div>
        </section>

        {/* Proof: selected projects */}
        <section id="bevis" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Beviset först
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Sajter jag byggt — åt kunder och åt mig själv
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Kundprojekt som Svenska Esportförbundet och Adluelno, och egna
              sajter i konkurrensutsatta svenska nischer. Samma hantverk i
              båda: snabb kod, tydlig struktur och synlighet i sök.
            </p>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {proofSites.map((p) => (
                <li key={p.title}>
                  <Link
                    href={`/project/${toProjectSlug(p.title)}`}
                    className="block h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {p.title} →
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {p.blurb}
                    </p>
                  </Link>
                  <p className="mt-3">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-red-500 hover:underline"
                    >
                      Besök live-sajten ↗
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What I do */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Vad jag gör
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Hela webben — från analys till färdig kod
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((o) => (
                <article
                  key={o.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-red-50 dark:bg-gray-900 flex items-center justify-center text-2xl">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
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
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Så går det till
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Tre steg, inga 40-sidiga rapporter
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
                >
                  <p className="text-sm text-red-500 mb-2 font-semibold">
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
                900 kr/h
                <span className="ml-2 text-sm font-normal text-gray-300">
                  exkl. moms
                </span>
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                Fast pris per projekt
                <span className="ml-2 text-sm font-normal text-gray-300">
                  offert efter ett kort samtal — t.ex. teknisk genomlysning
                  9 500 kr
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Vanliga frågor
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Frågor och svar
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-lg font-bold text-gray-800 dark:text-white">
                    <span className="mr-2 inline-block text-red-500 transition-transform duration-200 group-open:rotate-90">
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
        <section id="kontakt" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
                Säg hej
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
                Har du ett webbprojekt — stort eller litet?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md">
                Berätta kort om er sajt eller idé så återkommer jag inom en dag
                med en första bedömning — kostnadsfritt och utan förpliktelser.
              </p>
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-red-500 font-semibold hover:underline"
                  >
                    {userData.email}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Stockholm · distans i hela Sverige
                </p>
                <p className="pt-2">
                  <Link
                    href="/projects"
                    className="text-gray-600 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Se hela portfolion →
                  </Link>
                </p>
              </div>
            </div>
            <SwedishContactForm />
          </div>
        </section>
      </div>
    </ContainerBlock>
  );
}
