import { useEffect } from "react";
import Link from "next/link";
import userData from "@constants/data";
import services from "@constants/services";
import { STALLS } from "@constants/worldData";
import { BRIDGE_STORY } from "@constants/dialogues";
import { useVillage } from "@lib/3d/store";
import DialogueBox from "@components/3d/ui/DialogueBox";

function Panel({ kicker, title, onClose, children, footer }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      data-ui
      className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-amber-200/25 bg-[#1c1712]/97 text-amber-50 shadow-2xl"
      >
        <header className="flex items-start gap-4 border-b border-amber-100/10 px-5 py-4">
          <div className="min-w-0">
            {kicker && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/50">
                {kicker}
              </p>
            )}
            <h2 className="font-serif text-xl text-amber-100">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto shrink-0 rounded-lg px-2 py-1 text-sm text-amber-200/70 transition hover:bg-amber-100/10 hover:text-amber-50"
          >
            Close <span className="hidden sm:inline">(Esc)</span>
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
        {footer && (
          <footer className="border-t border-amber-100/10 px-5 py-3 text-sm text-amber-200/70">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

const normaliseImage = (src) => (src || "").replace(/^\.\//, "/");

function StallPanel({ stallId, onClose }) {
  const stall = STALLS.find((item) => item.id === stallId);
  if (!stall) return null;

  return (
    <Panel
      kicker="Market row"
      title={stall.sign}
      onClose={onClose}
      footer={
        <Link href="/projects" className="underline underline-offset-4 hover:text-amber-100">
          See every project on the classic site →
        </Link>
      }
    >
      <p className="mb-5 text-[15px] leading-relaxed text-amber-50/80">{stall.blurb}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {stall.projects.map((project) => (
          <li key={project.title}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3 rounded-xl border border-amber-200/15 bg-amber-100/5 p-3 transition hover:border-amber-200/40 hover:bg-amber-100/10"
            >
              <img
                src={normaliseImage(project.imgUrl)}
                alt=""
                loading="lazy"
                className="h-16 w-24 shrink-0 rounded-lg object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate font-medium text-amber-50">
                  {project.title}
                </span>
                <span className="block truncate text-xs text-amber-200/50">
                  {project.link.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <span className="mt-1 inline-block text-xs text-amber-200/70 opacity-0 transition group-hover:opacity-100">
                  Visit →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ServicesPanel({ onClose }) {
  return (
    <Panel
      kicker="Town square"
      title="Village notice board"
      onClose={onClose}
      footer={
        <Link href="/services" className="underline underline-offset-4 hover:text-amber-100">
          Full details on the services page →
        </Link>
      }
    >
      <p className="mb-5 text-[15px] leading-relaxed text-amber-50/80">
        Work Adam takes on. Each notice is pinned here the same way it appears on
        the classic site.
      </p>
      <ul className="space-y-3">
        {services.map((service) => (
          <li
            key={service.title}
            className="rounded-xl border border-amber-200/15 bg-amber-100/5 p-4"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl">{service.icon}</span>
              <div>
                <h3 className="font-medium text-amber-50">{service.title}</h3>
                <p className="text-[11px] uppercase tracking-[0.16em] text-amber-200/50">
                  {service.highlight}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-amber-50/75">
              {service.shortDescription}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-amber-100/10 px-3 py-1 text-[11px] text-amber-100/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ContactPanel({ onClose }) {
  return (
    <Panel kicker="The village post" title="Send word" onClose={onClose}>
      <p className="mb-5 text-[15px] leading-relaxed text-amber-50/80">
        The post rider leaves at dusk. Or, less romantically, any of these reach
        Adam directly.
      </p>
      <ul className="space-y-2 text-[15px]">
        <li>
          <a
            className="block rounded-xl border border-amber-200/15 bg-amber-100/5 px-4 py-3 transition hover:border-amber-200/40"
            href={`mailto:${userData.email}`}
          >
            ✉️ {userData.email}
          </a>
        </li>
        <li>
          <a
            className="block rounded-xl border border-amber-200/15 bg-amber-100/5 px-4 py-3 transition hover:border-amber-200/40"
            href={userData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 LinkedIn
          </a>
        </li>
        <li>
          <a
            className="block rounded-xl border border-amber-200/15 bg-amber-100/5 px-4 py-3 transition hover:border-amber-200/40"
            href={userData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            🐙 GitHub — {userData.githubUsername}
          </a>
        </li>
        <li>
          <Link
            className="block rounded-xl border border-amber-200/15 bg-amber-100/5 px-4 py-3 transition hover:border-amber-200/40"
            href="/contact"
          >
            📝 Contact form on the classic site
          </Link>
        </li>
      </ul>
      <p className="mt-5 text-sm text-amber-200/60">
        Based in {userData.address}.
      </p>
    </Panel>
  );
}

function HelpPanel({ onClose, onExit }) {
  const startTour = useVillage((state) => state.startTour);

  const controls = [
    ["Move", "W A S D or the arrow keys"],
    ["Look", "Drag anywhere in the world"],
    ["Zoom", "Scroll wheel"],
    ["Run", "Hold Shift"],
    ["Interact", "E, Enter or Space when a prompt appears"],
    ["Fly", "Board the mail plane on the strip east of the bridge"],
    ["Close a panel", "Esc"],
  ];

  return (
    <Panel kicker="Signpost" title="Finding your way" onClose={onClose}>
      <p className="mb-5 text-[15px] leading-relaxed text-amber-50/80">
        Five villagers each tell one chapter of Adam's career. The river runs
        with the timeline: upstream is 2017, downstream is today.
      </p>
      <dl className="mb-6 grid gap-2 sm:grid-cols-2">
        {controls.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-amber-200/15 bg-amber-100/5 px-4 py-2.5"
          >
            <dt className="text-[11px] uppercase tracking-[0.16em] text-amber-200/50">
              {label}
            </dt>
            <dd className="text-sm text-amber-50/85">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={startTour}
          className="flex-1 rounded-xl border border-amber-200/40 bg-amber-200/15 px-4 py-3 font-medium text-amber-50 transition hover:bg-amber-200/25"
        >
          ✨ Show me around
        </button>
        <button
          type="button"
          onClick={onExit}
          className="flex-1 rounded-xl border border-amber-200/20 px-4 py-3 text-amber-100/80 transition hover:bg-amber-100/10"
        >
          Prefer to read? Leave the village
        </button>
      </div>
    </Panel>
  );
}

function StoryPanel({ onClose }) {
  return (
    <Panel kicker="Halfway across" title={BRIDGE_STORY.title} onClose={onClose}>
      <p className="text-[15px] leading-relaxed text-amber-50/85">
        {BRIDGE_STORY.body}
      </p>
    </Panel>
  );
}

export default function OverlayRouter({ overlay, onExit, reducedMotion }) {
  const closeOverlay = useVillage((state) => state.closeOverlay);
  if (!overlay) return null;

  switch (overlay.type) {
    case "dialogue":
      return (
        <DialogueBox
          npcId={overlay.npcId}
          nodeId={overlay.nodeId}
          reducedMotion={reducedMotion}
        />
      );
    case "stall":
      return <StallPanel stallId={overlay.id} onClose={closeOverlay} />;
    case "services":
      return <ServicesPanel onClose={closeOverlay} />;
    case "contact":
      return <ContactPanel onClose={closeOverlay} />;
    case "help":
      return <HelpPanel onClose={closeOverlay} onExit={onExit} />;
    case "story":
      return <StoryPanel onClose={closeOverlay} />;
    default:
      return null;
  }
}
