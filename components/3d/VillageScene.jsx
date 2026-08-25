import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import World from "@components/3d/World";
import HUD from "@components/3d/ui/HUD";
import OverlayRouter from "@components/3d/ui/Panels";
import MobileControls from "@components/3d/ui/MobileControls";
import LoadingScreen from "@components/3d/ui/LoadingScreen";
import { disposeSceneCaches } from "@components/3d/materials";
import { attachControls, onInteract } from "@lib/3d/input";
import { flight, resetPlayer } from "@lib/3d/playerState";
import { useVillage } from "@lib/3d/store";
import { createAmbience } from "@lib/3d/ambience";

const LAND_PROMPT = { action: "Land" };

function detectQuality() {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency || 4;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
  return cores <= 4 || coarsePointer ? "low" : "high";
}

export default function VillageScene({ onExit }) {
  const container = useRef();
  const [ready, setReady] = useState(false);
  const overlay = useVillage((state) => state.overlay);
  const nearest = useVillage((state) => state.nearest);
  const muted = useVillage((state) => state.muted);
  const flying = useVillage((state) => state.flying);

  // Before the first frame runs, not during render — a render-phase call
  // would double-fire under StrictMode and belongs in an effect anyway.
  useLayoutEffect(() => {
    resetPlayer();
  }, []);

  const environment = useMemo(() => {
    return {
      quality: detectQuality(),
      touch:
        typeof window !== "undefined" &&
        window.matchMedia?.("(pointer: coarse)").matches,
      reducedMotion:
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
      tipIndex: Math.floor(Math.random() * 4),
    };
  }, []);

  useEffect(() => () => disposeSceneCaches(), []);

  // resetPlayer above grounds the plane's shared state; the store's mirror of
  // it has to follow suit or the HUD re-enters mid-"flight".
  useEffect(() => {
    useVillage.getState().setFlying(false);
  }, []);

  // The page behind stays mounted for search engines and the no-WebGL path, so
  // it has to be pinned while the world is on top of it.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (!container.current) return undefined;
    return attachControls(
      container.current,
      () => useVillage.getState().overlay !== null
    );
  }, []);

  useEffect(
    () =>
      onInteract(() => {
        const store = useVillage.getState();
        if (store.overlay) return;
        if (flight.active) {
          flight.landRequested = true;
          return;
        }
        const target = store.nearest;
        if (!target) return;
        if (target.kind === "npc") store.openDialogue(target.id);
        else if (target.kind === "stall") store.openPanel("stall", target.id);
        else if (target.kind === "plane") {
          if (flight.phase === "parked") {
            flight.active = true;
            store.setFlying(true);
          }
        } else store.openPanel(target.kind);
      }),
    []
  );

  const ambience = useRef(null);
  useEffect(() => {
    if (muted) {
      ambience.current?.setMuted(true);
      return;
    }
    if (!ambience.current) ambience.current = createAmbience();
    ambience.current?.setMuted(false);
  }, [muted]);
  useEffect(() => () => ambience.current?.dispose(), []);

  // Stable reference: World is memoised, so a changing onReady would drag the
  // whole Canvas tree through reconciliation on every overlay/HUD change.
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !useVillage.getState().overlay) onExit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onExit]);

  return (
    <div
      ref={container}
      className="fixed inset-0 z-50 touch-none select-none overflow-hidden bg-[#3f6470]"
    >
      <World quality={environment.quality} onReady={handleReady} />

      {ready && (
        <>
          <HUD onExit={onExit} touch={environment.touch} />
          {environment.touch && !overlay && (
            <MobileControls prompt={flying ? LAND_PROMPT : nearest} />
          )}
          <OverlayRouter
            overlay={overlay}
            onExit={onExit}
            reducedMotion={environment.reducedMotion}
          />
        </>
      )}

      {!ready && <LoadingScreen tipIndex={environment.tipIndex} />}
    </div>
  );
}
