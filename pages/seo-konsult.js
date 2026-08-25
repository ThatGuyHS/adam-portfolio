import React, { useState } from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import { SITE_URL as siteUrl, CONTACT_FORM_ENDPOINT } from "@constants/site";
import userData from "@constants/data";

// Landing page in Swedish targeting "frilansande SEO-konsult" — the copy is
// aimed at Swedish businesses searching for SEO help, so everything below is
// intentionally in Swedish while the rest of the site stays in English.

const offers = [
  {
    icon: "🔧",
    title: "Teknisk SEO",
    blurb:
      'Crawlbarhet, indexering, Core Web Vitals, strukturerad data och renderingsproblem. Jag är utvecklare — jag lämnar ingen rapport till "er tekniker", jag åtgärdar själv.',
    points: ["Teknisk genomlysning", "Core Web Vitals", "Strukturerad data"],
  },
  {
    icon: "📝",
    title: "Innehåll & programmatisk SEO",
    blurb:
      "Sökordsanalys, innehållsstruktur och sidor som byggs i skala från data — utan att trilla i tunt-innehåll-fällan. Samma metod som mina egna guidesajter bygger på.",
    points: ["Sökordsstrategi", "Innehållsarkitektur", "Programmatiska sidmallar"],
  },
  {
    icon: "🤖",
    title: "AI-sök (GEO)",
    blurb:
      "Allt fler svar levereras av AI Overviews, ChatGPT och Perplexity i stället för tio blå länkar. Jag optimerar för att din sajt ska citeras där — inte bara ranka i klassiska Google.",
    points: ["AI Overviews", "Citerbarhet & llms.txt", "AI-crawlertillgänglighet"],
  },
  {
    icon: "⚡",
    title: "SEO + utveckling i samma person",
    blurb:
      "Ingen väntan mellan rekommendation och implementation. Åtgärdslistan blir genomförd kod i React, Next.js eller WordPress — ofta samma vecka.",
    points: ["Implementation ingår", "React/Next.js/WordPress", "Mätbar uppföljning"],
  },
];

const steps = [
  {
    title: "Genomlysning",
    description:
      "Jag går igenom sajten tekniskt och innehållsmässigt: indexering, hastighet, struktur, sökordsläge och hur ni syns i AI-sök i dag.",
  },
  {
    title: "Prioriterad åtgärdslista",
    description:
      "Ni får en konkret lista sorterad efter effekt per timme — vad som ger mest synlighet först, med tydlig motivering. Inga 40-sidiga rapporter.",
  },
  {
    title: "Implementation & uppföljning",
    description:
      "Jag genomför åtgärderna själv och följer upp i Search Console månad för månad, så ni ser vad som faktiskt hände.",
  },
];

const faqs = [
  {
    q: "Vad kostar en frilansande SEO-konsult?",
    a: "Frilansande SEO-konsulter i Sverige tar normalt 1 200–2 000 kr/h beroende på erfarenhet. Mitt timpris är 1 200 kr/h exkl. moms, och en fast prissatt SEO-genomlysning med åtgärdslista kostar 9 500 kr exkl. moms. Löpande samarbeten prissätts per månad efter omfattning.",
  },
  {
    q: "Vad är AI-sök och varför spelar det roll för SEO?",
    a: "AI-sök är samlingsnamnet för svar som genereras av AI i stället för klassiska sökresultat: Googles AI Overviews, ChatGPT med webbsökning och Perplexity. En växande andel av sökningarna besvaras där, och de källor som citeras får trafiken. Att optimera för AI-sök (ofta kallat GEO) handlar om citerbart innehåll, tillgänglighet för AI-crawlers och tydlig struktur — det ingår i alla mina uppdrag.",
  },
  {
    q: "Hur snabbt ser man resultat av SEO?",
    a: "Tekniska åtgärder kan ge effekt inom några veckor, medan innehålls- och auktoritetsarbete normalt tar tre till sex månader innan det syns tydligt i trafiken. Jag sätter upp mätning från dag ett så att ni ser utvecklingen löpande i stället för att vänta på en slutrapport.",
  },
  {
    q: "Arbetar du på distans?",
    a: "Ja. Jag utgår från Stockholm och arbetar på distans med kunder i hela Sverige. Fysiska möten går bra i Stockholmsområdet när det behövs.",
  },
  {
    q: "Vad skiljer dig från en SEO-byrå?",
    a: "Hos en byrå betalar du ofta för projektledning, säljled och juniora utförare. Hos mig pratar du direkt med personen som både analyserar och implementerar — och som driver egna sajter med egna pengar på spel, så metoderna är testade på riktigt innan de används hos dig.",
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
          message: `[SEO-konsult] ${form.message.value}`,
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
          placeholder="Berätta kort om er sajt och vad ni vill uppnå"
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

export default function SeoKonsult() {
  const proofSites = userData.projects.filter(
    (p) => p.kind === "Affiliate content site"
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/seo-konsult#service`,
      name: "Adam Peleback — Frilansande SEO-konsult",
      url: `${siteUrl}/seo-konsult`,
      image: `${siteUrl}/adam.png`,
      email: userData.email,
      priceRange: "1200-2000 SEK/h",
      areaServed: "SE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Stockholm",
        addressCountry: "SE",
      },
      knowsAbout: [
        "Teknisk SEO",
        "Programmatisk SEO",
        "AI-sök (GEO)",
        "Core Web Vitals",
        "Next.js",
        "React",
      ],
      inLanguage: "sv-SE",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/seo-konsult#faq`,
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
      title="Frilansande SEO-konsult — synlig i Google och i AI-sök | Adam Peleback"
      description="Frilansande SEO-konsult i Stockholm som rankar sina egna sajter. Teknisk SEO, innehåll och AI-sök (AI Overviews, ChatGPT, Perplexity) — utfört av en utvecklare, på distans i hela Sverige."
      keywords="frilansande SEO-konsult, SEO-konsult Stockholm, AI-sök, GEO, teknisk SEO, programmatisk SEO"
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
              Frilansande SEO-konsult — för Google och för AI-sök
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Jag heter Adam Peleback och hjälper svenska företag att synas där
              kunderna faktiskt letar: i Google, i AI Overviews och i svaren
              från ChatGPT och Perplexity. Skillnaden mot de flesta konsulter?
              Jag är utvecklare och rankar mina egna sajter — så jag säljer
              metoder jag själv lever på, och implementerar åtgärderna själv.
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
                Se sajterna jag rankar ↓
              </a>
            </div>
          </div>
        </section>

        {/* Proof: my own ranking sites */}
        <section id="bevis" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-4 font-semibold">
              Beviset först
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Jag rankar mina egna sajter — med egna pengar på spel
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              De här sajterna driver jag själv, i konkurrensutsatta svenska
              nischer. De byggs, optimeras och tjänar pengar med exakt de
              metoder jag använder i kunduppdrag.
            </p>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {proofSites.map((p) => (
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
              SEO från analys till färdig kod
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
                1 200 kr/h
                <span className="ml-2 text-sm font-normal text-gray-300">
                  exkl. moms
                </span>
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                9 500 kr
                <span className="ml-2 text-sm font-normal text-gray-300">
                  fast pris — SEO-genomlysning med åtgärdslista
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
                Vill du synas bättre — i Google och i AI-svaren?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md">
                Berätta kort om er sajt så återkommer jag inom en dag med en
                första bedömning — kostnadsfritt och utan förpliktelser.
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
