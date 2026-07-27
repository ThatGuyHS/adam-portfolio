import Link from "next/link";
import userData from "@constants/data";
import services from "@constants/services";
import { BRIDGE_STORY, DIALOGUES } from "@constants/dialogues";
import { STALLS } from "@constants/worldData";

// The village in plain text. This is what the server renders, what search
// engines index, and what visitors get when WebGL is unavailable or they've
// asked for reduced motion — so it has to carry the whole story on its own,
// not just apologise for the missing canvas.

/** Turn a dialogue tree into questions and answers by using each choice label
 *  that leads to a node as that node's heading. */
function asQuestions(dialogue) {
  const labels = new Map();
  Object.values(dialogue.nodes).forEach((node) => {
    node.choices.forEach((choice) => {
      if (choice.to && !labels.has(choice.to)) labels.set(choice.to, choice.label);
    });
  });

  return Object.entries(dialogue.nodes).map(([id, node]) => ({
    id,
    question: id === dialogue.start ? null : labels.get(id) ?? null,
    paragraphs: node.text,
  }));
}

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function VillageGuide({ onEnter, canEnter, reason }) {
  return (
    <article className="bg-white dark:bg-gray-800">
      <header className="mx-auto max-w-3xl px-4 pt-6 pb-2">
        <p className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold">
          An experiment
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
          The Village by the River
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          My CV, rebuilt as a place you can walk around. Five villagers live
          along a river, and each one tells a chapter of how {userData.name}{" "}
          went from running esports tournaments to writing the software behind
          them. The river runs with the timeline: upstream is 2017, downstream
          is today.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {canEnter && (
            <button
              type="button"
              onClick={onEnter}
              className="rounded-xl bg-gray-800 px-6 py-3 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              🏘 Enter the village
            </button>
          )}
          <Link
            href="/experience"
            className="rounded-xl border border-gray-300 dark:border-gray-600 px-6 py-3 font-medium text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Read the plain CV instead
          </Link>
        </div>

        {reason && (
          <p className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
            {reason}
          </p>
        )}
      </header>

      <Section id="villagers" kicker="Who you'll meet" title="The five villagers">
        <div className="space-y-12">
          {Object.entries(DIALOGUES).map(([id, dialogue]) => (
            <div key={id}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                <span aria-hidden="true" className="mr-2">{dialogue.emoji}</span>
                {dialogue.name}, {dialogue.title}
              </h3>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gray-400">
                {dialogue.place}
              </p>

              {dialogue.roles.length > 0 && (
                <ul className="mt-4 space-y-1 border-l-2 border-red-400 pl-4">
                  {dialogue.roles.map((entry) => (
                    <li
                      key={`${entry.title}-${entry.company}`}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      <strong className="text-gray-800 dark:text-gray-100">
                        {entry.title}
                      </strong>
                      , {entry.company} — {entry.year}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 space-y-5">
                {asQuestions(dialogue).map((entry) => (
                  <div key={entry.id}>
                    {entry.question && (
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                        {entry.question}
                      </h4>
                    )}
                    {entry.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="bridge" kicker="Halfway across" title={BRIDGE_STORY.title}>
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
          {BRIDGE_STORY.body}
        </p>
      </Section>

      <Section id="market" kicker="The market row" title="What's on the stalls">
        <div className="space-y-8">
          {STALLS.map((stall) => (
            <div key={stall.id}>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {stall.sign}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                {stall.blurb}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stall.projects.map((project) => (
                  <li key={project.title}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-gray-200 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-gray-200 transition hover:border-gray-400"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="noticeboard" kicker="Town square" title="The notice board">
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service.title}>
              <h3 className="font-bold text-gray-800 dark:text-white">
                <span aria-hidden="true" className="mr-2">{service.icon}</span>
                {service.title}
              </h3>
              <p className="mt-1 leading-relaxed text-gray-600 dark:text-gray-300">
                {service.shortDescription}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          className="mt-6 inline-block underline underline-offset-4 text-gray-700 dark:text-gray-200"
        >
          Full service details →
        </Link>
      </Section>

      <Section id="post" kicker="The village post" title="Send word">
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
          {userData.name} is in {userData.address}. Reach him at{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${userData.email}`}
          >
            {userData.email}
          </a>
          , on{" "}
          <a
            className="underline underline-offset-4"
            href={userData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          , or through the{" "}
          <Link className="underline underline-offset-4" href="/contact">
            contact form
          </Link>
          .
        </p>
      </Section>
    </article>
  );
}
