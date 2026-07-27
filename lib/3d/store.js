import { create } from "zustand";
import { NPC_COUNT } from "@constants/dialogues";

// Only things the UI needs to re-render on live here. Per-frame state (player
// position, camera yaw) deliberately does not — see lib/3d/playerState.js.

export const useVillage = create((set, get) => ({
  ready: false,
  quality: "high",
  muted: true,
  showHelp: false,

  /** Whatever panel is currently covering the world, or null. */
  overlay: null,
  /** Nearest thing the player could interact with right now, or null. */
  nearest: null,

  visited: {},
  crossedBridge: false,
  celebrated: false,

  tourStop: -1,

  setReady: (ready) => set({ ready }),
  setQuality: (quality) => set({ quality }),
  toggleMuted: () => set((s) => ({ muted: !s.muted })),
  setNearest: (nearest) => {
    const current = get().nearest;
    if (current?.id === nearest?.id) return;
    set({ nearest });
  },

  openDialogue: (npcId) => {
    const visited = { ...get().visited, [npcId]: true };
    const done = Object.keys(visited).length >= NPC_COUNT;
    set({
      overlay: { type: "dialogue", npcId, nodeId: null },
      visited,
      celebrated: get().celebrated || done,
    });
  },
  setDialogueNode: (nodeId) =>
    set((s) =>
      s.overlay?.type === "dialogue"
        ? { overlay: { ...s.overlay, nodeId } }
        : {}
    ),
  openPanel: (type, id = null) => set({ overlay: { type, id } }),
  closeOverlay: () => set({ overlay: null }),

  markBridgeCrossed: () =>
    set((s) =>
      s.crossedBridge
        ? {}
        : { crossedBridge: true, overlay: s.overlay ?? { type: "story" } }
    ),

  startTour: () => set({ tourStop: 0, overlay: null }),
  advanceTour: (index) => set({ tourStop: index }),
  endTour: () => set({ tourStop: -1 }),
}));

export const visitedCount = (visited) => Object.keys(visited).length;
