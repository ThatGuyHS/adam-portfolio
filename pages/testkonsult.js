import React, { useState } from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import { SITE_URL as siteUrl, CONTACT_FORM_ENDPOINT } from "@constants/site";
import userData from "@constants/data";

// Landing page in Swedish targeting "testkonsult" / "testautomatisering" —
// aimed at Swedish teams that need QA help, so the copy is in Swedish while
// the rest of the site stays in English. Amber accent to set it apart from
// /webbkonsult (red) and /discord-bots (indigo).

const offers = [
  {
    icon: "🤖",
    title: "Testautomatisering",
    blurb:
      "Automatiserade tester som fångar regressioner innan kunderna gör det: enhetstester, integrationstester och end-to-end-flöden, byggda med verktyg som passar er stack.",
    points: ["End-to-end-tester", "Enhets- & integrationstester", "Testtäckning där det gör nytta"],
  },
  {
    icon: "🔁",
    title: "CI/CD & kvalitetsgrindar",
    blurb:
      "Testerna gör mest nytta när de körs på varje ändring. Jag sätter upp testkörningar i er CI-pipeline med tydliga kvalitetsgrindar — så att en röd bygge stoppar felet, inte releasen efteråt.",
    points: ["Tester i CI-pipelinen", "Kvalitetsgrindar före release", "Snabb återkoppling till utvecklare"],
  },
  {
    icon: "🔍",
    title: "Manuell & utforskande testning",
    blurb:
      "Allt kan inte automatiseras. Jag testar era kritiska användarflöden på riktigt — betalningar, registrering, det som inte får gå sönder — och rapporterar buggar utvecklare förstår.",
    points: ["Kritiska användarflöden", "Utforskande testning", "Tydliga buggrapporter"],
  },
  {
    icon: "🧭",
    title: "Teststrategi & rådgivning",
    blurb:
      "Vad ska automatiseras först? Vad ska inte testas alls? Jag har varit rådgivare åt utvecklingsteam i testfrågor och hjälper er lägga en strategi som teamet faktiskt följer.",
    points: ["Teststrategi", "Rådgivning till utvecklingsteam", "Prioritering efter risk"],
  },
];

const roles = [
  {
    role: "Systemtestare — Decerno",
    period: "2025–",
    text: "Systemtestning och mjukvarutestning av verksamhetssystem, som anställd testare i pågående utvecklingsprojekt.",
  },
  {
    role: "QA Developer — G-Loot",
    period: "2021–2022",
    text: "Testautomatisering och manuell testning av kritiska användarflöden på en esportplattform med riktiga pengar i omlopp, plus rådgivning till utvecklingsteamen i testfrågor.",
  },
  {
    role: "QA Tester — G-Loot Esports",
    period: "2018–2021",
    text: "Kvalitetssäkring av Global Loot League-plattformen genom turneringar och releaser, i tätt samarbete med tech-teamet.",
  },
];

const steps = [
  {
    title: "Nulägesgenomgång",
    description:
      "Vi går igenom hur ni testar i dag: vad som är automatiserat, var buggarna brukar slinka igenom och var en timmes testarbete gör mest nytta.",
  },
  {
    title: "Prioriterad testplan",
    description:
      "Ni får en konkret plan sorterad efter risk: vilka flöden som automatiseras först, vad som testas manuellt och hur det kopplas in i er pipeline — med fast pris eller tydlig timuppskattning.",
  },
  {
    title: "Genomförande & överlämning",
    description:
      "Jag skriver testerna, sätter upp körningarna i CI och lämnar över så att ert team kan äga och bygga vidare på dem — dokumenterat och utan konsultberoende.",
  },
];

const faqs = [
  {
    q: "Vad kostar en testkonsult?",
    a: "Mitt timpris är 900 kr/h exkl. moms. Avgränsade insatser — till exempel en genomgång av ert nuvarande testarbete med en prioriterad plan, eller ett första automatiserat testpaket för era viktigaste flöden — offereras till fast pris efter ett kort samtal.",
  },
  {
    q: "Behöver vi verkligen testautomatisering?",
    a: "Om ni släpper ofta och testar manuellt inför varje release: förmodligen. Automatisering lönar sig snabbast för flöden som testas om och om igen — inloggning, betalning, registrering. Men allt ska inte automatiseras, och en del av mitt jobb är att säga var det inte är värt det.",
  },
  {
    q: "Vilka verktyg och ramverk använder du?",
    a: "Jag väljer verktyg efter er stack i stället för tvärtom — för webben handlar det typiskt om moderna ramverk som Playwright eller Cypress för end-to-end-tester, kompletterat med enhetstester i det ramverk ni redan använder, och testkörningar i er befintliga CI-miljö som GitHub Actions eller GitLab CI.",
  },
  {
    q: "Kan du förstärka vårt befintliga team?",
    a: "Ja. Uppdragen kan se ut på två sätt: en avgränsad insats där jag bygger upp testningen och lämnar över, eller löpande förstärkning där jag arbetar i ert team som testare. Jag är utvecklare också, så jag läser er kod och pratar med era utvecklare på deras villkor.",
  },
  {
    q: "Arbetar du på distans?",
    a: "Ja. Jag utgår från Stockholm och arbetar på distans med team i hela Sverige. Fysiska möten går bra i Stockholmsområdet när det behövs.",
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
          message: `[Testkonsult] ${form.message.value}`,
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
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:border-amber-600 focus:outline-none";

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
          placeholder="Berätta kort om er produkt och hur ni testar i dag"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-amber-700 text-white px-6 py-3 font-semibold hover:bg-amber-800 transition-colors duration-300 disabled:opacity-60"
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

export default function Testkonsult() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/testkonsult#service`,
      name: "Adam Peleback — Testkonsult & testautomatisering",
      url: `${siteUrl}/testkonsult`,
      image: `${siteUrl}/adam.png`,
      email: userData.email,
      priceRange: "900 SEK/h",
      areaServed: "SE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Stockholm",
        addressCountry: "SE",
      },
      knowsAbout: [
        "Testautomatisering",
        "Systemtestning",
        "Manuell testning",
        "Teststrategi",
        "CI/CD",
        "Kvalitetssäkring",
      ],
      inLanguage: "sv-SE",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/testkonsult#faq`,
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
      title="Testkonsult & testautomatisering i Stockholm | Adam Peleback"
      description="Testkonsult i Stockholm med bakgrund som QA-utvecklare och systemtestare. Testautomatisering, CI/CD-integration, manuell testning och teststrategi — på distans i hela Sverige."
      ogLocale="sv_SE"
      structuredData={structuredData}
    >
      <div lang="sv">
        {/* Hero */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
              Stockholm & distans i hela Sverige
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 dark:text-white max-w-3xl">
              Testkonsult — automatisera testningen, släpp med gott samvete
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Jag heter Adam Peleback och har testat mjukvara professionellt
              sedan 2018 — som QA-testare och QA-utvecklare på G-Loot och i dag
              som systemtestare på Decerno. Jag är dessutom utvecklare, så jag
              skriver testautomatiseringen själv, kopplar in den i er pipeline
              och pratar med era utvecklare på deras villkor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-lg bg-amber-700 text-white px-6 py-3 font-semibold hover:bg-amber-800 transition-colors duration-300"
              >
                Boka kostnadsfritt samtal
              </a>
              <a
                href="#bakgrund"
                className="rounded-lg border border-amber-600 px-6 py-3 font-semibold text-amber-700 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Se min QA-bakgrund ↓
              </a>
            </div>
          </div>
        </section>

        {/* Proof: QA background */}
        <section id="bakgrund" className="bg-[#F1F1F1] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
              Bakgrund
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Sju år av testning — som anställd, inte bara som konsult
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Min QA-erfarenhet kommer från riktiga roller i riktiga team: en
              esportplattform med pengar i omlopp och verksamhetssystem där
              fel kostar på riktigt.
            </p>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {roles.map((r) => (
                <li
                  key={r.role}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg"
                >
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-500">
                    {r.period}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-gray-800 dark:text-white">
                    {r.role}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What I do */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
              Vad jag gör
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Kvalitet från strategi till körande tester
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((o) => (
                <article
                  key={o.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-gray-900 flex items-center justify-center text-2xl">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
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
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
              Så går det till
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
              Tre steg till tester ni litar på
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
                >
                  <p className="text-sm text-amber-700 dark:text-amber-500 mb-2 font-semibold">
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
                Fast pris på avgränsade insatser
                <span className="ml-2 text-sm font-normal text-gray-300">
                  offert efter ett kort samtal
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-14 md:py-20">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
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
                    <span className="mr-2 inline-block text-amber-700 dark:text-amber-500 transition-transform duration-200 group-open:rotate-90">
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
              <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-amber-700 dark:text-amber-500 mb-4 font-semibold">
                Säg hej
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
                Testas era releaser för hand? Låt oss ändra på det.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md">
                Berätta kort om er produkt och hur ni testar i dag, så
                återkommer jag inom en dag med en första bedömning —
                kostnadsfritt och utan förpliktelser.
              </p>
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-amber-700 dark:text-amber-500 font-semibold hover:underline"
                  >
                    {userData.email}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Stockholm · distans i hela Sverige
                </p>
                <p className="pt-2">
                  <Link
                    href="/webbkonsult"
                    className="text-gray-600 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Behöver ni även webbutveckling? →
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
