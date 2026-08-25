import { useEffect, useState } from "react";
import { NPC_COUNT } from "@constants/dialogues";
import { TOUR_STOPS } from "@constants/worldData";
import { useVillage, visitedCount } from "@lib/3d/store";

function IconButton({ label, onClick, children, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur transition ${
        active
          ? "border-amber-200/60 bg-amber-200/25 text-amber-50"
          : "border-amber-100/25 bg-[#1c1712]/70 text-amber-100/80 hover:bg-[#1c1712]/90"
      }`}
    >
      {children}
    </button>
  );
}

export default function HUD({ onExit, touch }) {
  const nearest = useVillage((state) => state.nearest);
  const overlay = useVillage((state) => state.overlay);
  const flying = useVillage((state) => state.flying);
  const visited = useVillage((state) => state.visited);
  const muted = useVillage((state) => state.muted);
  const celebrated = useVillage((state) => state.celebrated);
  const tourStop = useVillage((state) => state.tourStop);
  const openPanel = useVillage((state) => state.openPanel);
  const toggleMuted = useVillage((state) => state.toggleMuted);
  const endTour = useVillage((state) => state.endTour);

  const [showCelebration, setShowCelebration] = useState(false);
  const heard = visitedCount(visited);

  useEffect(() => {
    if (!celebrated) return undefined;
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 12000);
    return () => clearTimeout(timer);
  }, [celebrated]);

  const showPrompt = nearest && !overlay;
  const tour = tourStop >= 0 ? TOUR_STOPS[tourStop] : null;

  return (
    <>
      <div data-ui className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-6">
        <div className="pointer-events-auto rounded-2xl border border-amber-100/20 bg-[#1c1712]/70 px-4 py-2.5 text-amber-50 backdrop-blur">
          <p className="font-serif text-sm leading-tight sm:text-base">
            The Village by the River
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-amber-200/60">
            Stories heard {heard}/{NPC_COUNT}
          </p>
          <div className="mt-1.5 flex gap-1">
            {Array.from({ length: NPC_COUNT }, (_, i) => (
              <span
                key={i}
                className={`h-1 w-6 rounded-full ${
                  i < heard ? "bg-amber-300" : "bg-amber-100/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-auto flex gap-2">
          <IconButton label="How to play" onClick={() => openPanel("help")}>
            ?
          </IconButton>
          <IconButton
            label={muted ? "Unmute ambience" : "Mute ambience"}
            onClick={toggleMuted}
            active={!muted}
          >
            {muted ? "🔇" : "🔊"}
          </IconButton>
          <IconButton label="Leave the village" onClick={onExit}>
            ✕
          </IconButton>
        </div>
      </div>

      {tour && (
        <div data-ui className="pointer-events-none absolute inset-x-0 top-24 z-20 flex justify-center px-4 sm:top-28">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-amber-200/30 bg-[#1c1712]/80 py-2 pl-4 pr-2 text-sm text-amber-50 backdrop-blur">
            <span className="text-amber-200/70">Follow the lights to</span>
            <span className="font-medium">{tour.hint}</span>
            <button
              type="button"
              onClick={endTour}
              className="rounded-full px-3 py-1 text-xs text-amber-200/70 transition hover:bg-amber-100/10"
            >
              End tour
            </button>
          </div>
        </div>
      )}

      {flying && !overlay && (
        <div
          data-ui
          className={`pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4 ${
            touch ? "bottom-32" : "bottom-8"
          }`}
        >
          <div className="rounded-full border border-amber-200/30 bg-[#1c1712]/80 px-5 py-2.5 text-sm text-amber-50 backdrop-blur">
            {touch
              ? "Steer with the stick · ✋ lands on village grass"
              : "W/S climb & dive · A/D turn · Shift boost · E lands on village grass"}
          </div>
        </div>
      )}

      {showPrompt && !touch && (
        <div
          data-ui
          aria-live="polite"
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-4"
        >
          <div className="rounded-full border border-amber-200/30 bg-[#1c1712]/80 px-5 py-2.5 text-sm text-amber-50 backdrop-blur">
            <kbd className="mr-2 rounded border border-amber-200/40 px-1.5 py-0.5 text-xs">
              E
            </kbd>
            {nearest.action} · <span className="text-amber-200/70">{nearest.label}</span>
          </div>
        </div>
      )}

      {showCelebration && (
        <div data-ui className="pointer-events-none absolute inset-x-0 bottom-28 z-20 flex justify-center px-4">
          <div className="pointer-events-auto max-w-sm rounded-2xl border border-amber-200/40 bg-[#1c1712]/90 p-4 text-center text-amber-50 backdrop-blur">
            <p className="font-serif text-lg">🎆 That's the whole story.</p>
            <p className="mt-1 text-sm text-amber-100/75">
              You've met every villager. There's a post box across the bridge if
              you'd like to say hello.
            </p>
            <button
              type="button"
              onClick={() => openPanel("contact")}
              className="mt-3 rounded-xl border border-amber-200/40 bg-amber-200/15 px-4 py-2 text-sm transition hover:bg-amber-200/25"
            >
              Send word
            </button>
          </div>
        </div>
      )}
    </>
  );
}
