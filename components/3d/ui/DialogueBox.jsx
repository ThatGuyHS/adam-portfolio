import { useEffect, useMemo, useRef, useState } from "react";
import { DIALOGUES } from "@constants/dialogues";
import { useVillage } from "@lib/3d/store";

const CHARS_PER_TICK = 4;
const TICK_MS = 18;

function useTypewriter(text, enabled) {
  const [shown, setShown] = useState(enabled ? 0 : text.length);
  const timer = useRef();

  useEffect(() => {
    if (!enabled) {
      setShown(text.length);
      return undefined;
    }
    setShown(0);
    timer.current = setInterval(() => {
      setShown((current) => {
        if (current >= text.length) {
          clearInterval(timer.current);
          return current;
        }
        return current + CHARS_PER_TICK;
      });
    }, TICK_MS);
    return () => clearInterval(timer.current);
  }, [text, enabled]);

  return [Math.min(shown, text.length), () => setShown(text.length)];
}

export default function DialogueBox({ npcId, nodeId, reducedMotion }) {
  const setDialogueNode = useVillage((state) => state.setDialogueNode);
  const closeOverlay = useVillage((state) => state.closeOverlay);

  const dialogue = DIALOGUES[npcId];
  const node = dialogue.nodes[nodeId ?? dialogue.start];
  const full = useMemo(() => node.text.join("\n\n"), [node]);
  const [shown, reveal] = useTypewriter(full, !reducedMotion);
  const finished = shown >= full.length;

  const choose = (choice) => {
    if (choice.to) setDialogueNode(choice.to);
    else closeOverlay();
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!finished) reveal();
        else if (node.choices.length === 1) choose(node.choices[0]);
        return;
      }
      const index = Number(event.key) - 1;
      if (finished && index >= 0 && index < node.choices.length) {
        event.preventDefault();
        choose(node.choices[index]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const paragraphs = full.slice(0, shown).split("\n\n");

  return (
    <div
      data-ui
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="w-full max-w-3xl rounded-2xl border border-amber-200/25 bg-[#1c1712]/95 p-4 text-amber-50 shadow-2xl backdrop-blur sm:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
            style={{ backgroundColor: `${dialogue.accent}33`, boxShadow: `inset 0 0 0 2px ${dialogue.accent}` }}
          >
            {dialogue.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-serif text-lg leading-tight text-amber-100">
              {dialogue.name}
              <span className="text-amber-200/60">, {dialogue.title}</span>
            </p>
            <p className="truncate text-xs uppercase tracking-[0.18em] text-amber-200/50">
              {dialogue.place}
            </p>
          </div>
          <button
            type="button"
            onClick={closeOverlay}
            className="ml-auto rounded-lg px-2 py-1 text-sm text-amber-200/70 transition hover:bg-amber-100/10 hover:text-amber-50"
          >
            Close <span className="hidden sm:inline">(Esc)</span>
          </button>
        </div>

        <div
          className="max-h-[34vh] space-y-3 overflow-y-auto pr-1 text-[15px] leading-relaxed text-amber-50/90"
          onClick={() => !finished && reveal()}
        >
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {!finished && <span className="animate-pulse">▌</span>}
        </div>

        {dialogue.roles.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 border-t border-amber-100/10 pt-3">
            {dialogue.roles.map((entry) => (
              <li
                key={`${entry.title}-${entry.company}`}
                className="rounded-full bg-amber-100/10 px-3 py-1 text-[11px] text-amber-100/80"
              >
                <span className="font-semibold">{entry.title}</span>
                <span className="text-amber-200/50"> · {entry.company} · {entry.year}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {node.choices.map((choice, i) => (
            <button
              key={choice.label}
              type="button"
              disabled={!finished}
              onClick={() => choose(choice)}
              className="flex items-center gap-3 rounded-xl border border-amber-200/20 bg-amber-100/5 px-4 py-2.5 text-left text-[15px] text-amber-50 transition enabled:hover:border-amber-200/50 enabled:hover:bg-amber-100/15 disabled:opacity-40"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-amber-200/30 text-[11px] text-amber-200/70">
                {i + 1}
              </span>
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
