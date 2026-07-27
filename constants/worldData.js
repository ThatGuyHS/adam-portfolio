// The village, as data. Positions here are the single place to move something
// in the world — the components just read this file and render what they find.
//
// The river runs west→east along +X and the career runs with it: upstream
// (negative X) is 2017, downstream (positive X) is today.

import userData from "@constants/data";
import { PIER, mulberry32, terrainHeight } from "@lib/3d/terrain";

export const PALETTE = {
  grass: "#7ea452",
  grassDark: "#628a41",
  sand: "#d8c48d",
  dirt: "#c0a06a",
  stone: "#9d9e94",
  stoneDark: "#7c7d74",
  wood: "#8a5a30",
  woodDark: "#5d3b1e",
  roofRed: "#b04a33",
  roofBlue: "#3d6b9e",
  roofGreen: "#4d7c52",
  canvas: "#e9dcbe",
  plaster: "#efe2c8",
  gold: "#ffcf7a",
  lamp: "#ffd899",
  waterDeep: "#2f6f96",
  waterShallow: "#61a8bf",
};

/** Warm haze for the golden-hour look. The water shader fogs itself by hand,
 *  so these numbers have to be shared rather than left to the scene. */
export const FOG = { color: "#f0cfa2", near: 46, far: 152 };

export const SPAWN = { x: -44, z: -13.5, yaw: -Math.PI / 2 };

/**
 * Villagers. Each one carries a chapter of the career; `experience` lists the
 * roles from constants/data.js they speak for, so the story stays anchored to
 * the same source the 2D site renders.
 */
export const NPCS = [
  {
    id: "organizer",
    name: "Rune",
    title: "The Organizer",
    emoji: "🏕",
    position: [-37, -15],
    faceYaw: 0.4,
    colors: { coat: "#c2553f", trousers: "#4a4a55", skin: "#e0b088", hat: "#f0e0bd" },
  },
  {
    id: "bard",
    name: "Vira",
    title: "The Bard",
    emoji: "🎻",
    position: [-23, -15.5],
    faceYaw: 0.2,
    colors: { coat: "#7a4a9e", trousers: "#3b3550", skin: "#c98f63", hat: "#e2c65a" },
  },
  {
    id: "keeper",
    name: "Alv",
    title: "The Keeper",
    emoji: "🗼",
    position: [-11.5, -13.5],
    faceYaw: -0.6,
    colors: { coat: "#2f6f7a", trousers: "#33405a", skin: "#f0c9a0", hat: "#d8d8d0" },
  },
  {
    id: "builder",
    name: "Sten",
    title: "The Builder",
    emoji: "🔨",
    position: [10, -16],
    faceYaw: 0.1,
    colors: { coat: "#3d6b9e", trousers: "#4b4034", skin: "#8d5a3b", hat: "#c2553f" },
  },
  {
    id: "cartographer",
    name: "Nima",
    title: "The Cartographer",
    emoji: "🧭",
    position: [27, 13],
    faceYaw: Math.PI - 0.4,
    colors: { coat: "#4d7c52", trousers: "#57493a", skin: "#e5b184", hat: "#8a5a30" },
  },
];

/**
 * Market stalls. Projects are matched out of constants/data.js by title, so
 * adding a project to the 2D site restocks a stall here automatically —
 * anything that doesn't match a theme lands in the last stall rather than
 * silently disappearing.
 */
const STALL_THEMES = [
  {
    id: "guides",
    sign: "The Comparison Stall",
    blurb:
      "Buyer's guides that have to earn their traffic — content sites built to rank, load fast and actually help someone choose.",
    titles: [
      "Robotklipparguiden",
      "Robotdammsugarguiden",
      "Luftrenarguiden",
      "Webbdoktorn",
    ],
  },
  {
    id: "esports",
    sign: "The Arena Stall",
    blurb:
      "Where the day job and the hobby overlap: tournament platforms, league sites and the organisations behind them.",
    titles: [
      "Rivals League",
      "Stryda",
      "Phoenix Blue",
      "Svenska Esportförbundet",
      "AoE2 Sverige",
      "Nexus Collegiate",
    ],
  },
  {
    id: "tools",
    sign: "The Workshop Stall",
    blurb:
      "Small tools that do one job well. Most started as something I wanted to exist and couldn't find.",
    titles: [
      "Create Discord Bot",
      "Cookbook generator",
      "Book Report Template",
      "PromptBibliotek",
      "Cryptoskatt",
    ],
  },
  {
    id: "travel",
    sign: "The Wayfarer's Stall",
    blurb:
      "Trip planning and remote-work tools — built while travelling, for people doing the same.",
    titles: ["Weekend in Paris", "Best Travel Route", "Remote Work Radar"],
  },
  {
    id: "studio",
    sign: "The Sign Painter's Stall",
    blurb:
      "Brand and studio work, including the site you were on a moment ago.",
    titles: ["PXB Media", "Adluelno", "Portfolio"],
  },
];

const STALL_X = [-1, 4.5, 10, 15.5, 21];

function buildStalls() {
  const claimed = new Set();
  const stalls = STALL_THEMES.map((theme, i) => {
    const projects = theme.titles
      .map((title) => userData.projects.find((p) => p.title === title))
      .filter(Boolean);
    projects.forEach((p) => claimed.add(p.title));
    return { ...theme, projects, position: [STALL_X[i], -9.2] };
  });

  const leftovers = userData.projects.filter((p) => !claimed.has(p.title));
  if (leftovers.length) {
    const last = stalls[stalls.length - 1];
    last.projects = [...last.projects, ...leftovers];
  }
  return stalls;
}

export const STALLS = buildStalls();

/** Buildings and props with a fixed home in the village. */
export const LANDMARKS = [
  { id: "signpost", kind: "signpost", position: [-44, -11.5], rotation: 0.3, radius: 0.8 },
  { id: "tent", kind: "tent", position: [-37, -19.5], rotation: 0.15, radius: 3.6 },
  { id: "tavern", kind: "tavern", position: [-23, -20.5], rotation: -0.1, radius: 4.2 },
  { id: "lighthouse", kind: "lighthouse", position: [-8, -10.4], rotation: 0, radius: 2.4 },
  { id: "workshop", kind: "workshop", position: [10, -20.5], rotation: 0.08, radius: 4.4 },
  { id: "well", kind: "well", position: [-30, -17], rotation: 0, radius: 1.2 },
  { id: "cottage-a", kind: "cottage", position: [-14, -22], rotation: 0.5, radius: 3, roof: PALETTE.roofBlue },
  { id: "cottage-b", kind: "cottage", position: [1, -22.5], rotation: -0.3, radius: 3, roof: PALETTE.roofGreen },
  { id: "cottage-c", kind: "cottage", position: [19, -21], rotation: 0.25, radius: 3, roof: PALETTE.roofRed },
  { id: "fountain", kind: "fountain", position: [30.5, 16], rotation: 0, radius: 2.6 },
  { id: "noticeboard", kind: "noticeboard", position: [34.5, 12.5], rotation: -0.9, radius: 1.1 },
  { id: "mailbox", kind: "mailbox", position: [33, 19.5], rotation: 0.6, radius: 0.7 },
  { id: "cottage-d", kind: "cottage", position: [23, 19], rotation: 1.1, radius: 3, roof: PALETTE.roofBlue },
  { id: "cottage-e", kind: "cottage", position: [38, 17.5], rotation: -1.4, radius: 3, roof: PALETTE.roofGreen },
];

/** Things you can walk up to and press E on. */
export const INTERACTABLES = [
  ...NPCS.map((npc) => ({
    id: npc.id,
    kind: "npc",
    label: `${npc.name}, ${npc.title}`,
    action: "Talk",
    position: npc.position,
    range: 3.4,
  })),
  ...STALLS.map((stall) => ({
    id: stall.id,
    kind: "stall",
    label: stall.sign,
    action: "Browse",
    position: stall.position,
    range: 3.2,
  })),
  {
    id: "noticeboard",
    kind: "services",
    label: "Village notice board",
    action: "Read",
    position: [34.5, 12.5],
    range: 3.2,
  },
  {
    id: "mailbox",
    kind: "contact",
    label: "The village post",
    action: "Send word",
    position: [33, 19.5],
    range: 3,
  },
  {
    id: "signpost",
    kind: "help",
    label: "Signpost",
    action: "Read",
    position: [-44, -11.5],
    range: 3,
  },
];

/** Order of the glowing stones for visitors who'd rather be shown around. */
export const TOUR_STOPS = [
  { id: "signpost", position: [-44, -11.5], hint: "Start here" },
  { id: "organizer", position: [-37, -15], hint: "Rune, the Organizer" },
  { id: "bard", position: [-23, -15.5], hint: "Vira, the Bard" },
  { id: "keeper", position: [-11.5, -13.5], hint: "Alv, the Keeper" },
  { id: "guides", position: [-1, -9.2], hint: "The market row" },
  { id: "builder", position: [10, -16], hint: "Sten, the Builder" },
  { id: "bridge", position: [26, 0], hint: "Cross the bridge" },
  { id: "cartographer", position: [27, 13], hint: "Nima, the Cartographer" },
  { id: "noticeboard", position: [34.5, 12.5], hint: "The notice board" },
  { id: "mailbox", position: [33, 19.5], hint: "Send word" },
];

/** Dirt path the tour stones sit on, as a polyline through the village. */
export const PATH_POINTS = [
  [-48, -12.5],
  [-37, -12.8],
  [-23, -12.5],
  [-12, -12.2],
  [-1, -11.6],
  [10, -11.8],
  [21, -11.6],
  [26, -11],
  [26, 11],
  [30.5, 13],
  [34, 17],
  [40, 20],
];

/** Solid things the player bumps into, as circles on the XZ plane. */
export const COLLIDERS = [
  ...LANDMARKS.filter((l) => l.kind !== "signpost" && l.kind !== "mailbox").map(
    (l) => ({ x: l.position[0], z: l.position[1], r: l.radius })
  ),
  ...NPCS.map((n) => ({ x: n.position[0], z: n.position[1], r: 0.85 })),
  ...STALLS.map((s) => ({ x: s.position[0], z: s.position[1], r: 1.5 })),
];

/** Shortest distance from a point to the dirt road, used for both the path
 *  texture on the terrain and for keeping scattered trees off the road. */
export function distanceToPath(x, z) {
  let best = Infinity;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const [ax, az] = PATH_POINTS[i];
    const [bx, bz] = PATH_POINTS[i + 1];
    const dx = bx - ax;
    const dz = bz - az;
    const len2 = dx * dx + dz * dz || 1;
    let t = ((x - ax) * dx + (z - az) * dz) / len2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const d2 = (x - (ax + dx * t)) ** 2 + (z - (az + dz * t)) ** 2;
    if (d2 < best) best = d2;
  }
  return Math.sqrt(best);
}

function nearPath(x, z, margin) {
  return distanceToPath(x, z) < margin;
}

function blocked(x, z, margin) {
  if (Math.abs(z) < 11) return true; // river, banks and the riverside road
  if (nearPath(x, z, margin + 1.5)) return true;
  for (const c of COLLIDERS) {
    if ((x - c.x) ** 2 + (z - c.z) ** 2 < (c.r + margin) ** 2) return true;
  }
  return false;
}

/** Trees and rocks, scattered once from a fixed seed and reused every visit. */
function scatter({ seed, count, margin, minZ, maxZ, halfX, variants }) {
  const rand = mulberry32(seed);
  const out = [];
  let attempts = 0;
  while (out.length < count && attempts < count * 40) {
    attempts++;
    const x = (rand() * 2 - 1) * halfX;
    const side = rand() < 0.55 ? -1 : 1;
    const z = side * (minZ + rand() * (maxZ - minZ));
    if (blocked(x, z, margin)) continue;
    out.push({
      position: [x, terrainHeight(x, z), z],
      rotation: rand() * Math.PI * 2,
      scale: 0.7 + rand() * 0.7,
      variant: Math.floor(rand() * variants),
    });
  }
  return out;
}

export const TREES = scatter({
  seed: 20240817,
  count: 130,
  margin: 2.6,
  minZ: 12,
  maxZ: 33,
  halfX: 56,
  variants: 3,
});

export const ROCKS = scatter({
  seed: 771,
  count: 55,
  margin: 1.6,
  minZ: 11,
  maxZ: 32,
  halfX: 56,
  variants: 2,
});

/** Reeds hug the waterline, so they get their own pass along the shore. */
export const REEDS = (() => {
  const rand = mulberry32(4242);
  const out = [];
  for (let i = 0; i < 150; i++) {
    const x = (rand() * 2 - 1) * 58;
    const side = rand() < 0.5 ? -1 : 1;
    const z = side * (8.2 + rand() * 1.6);
    if (Math.abs(x - 26) < 4) continue; // keep the bridge landing clear
    if (Math.abs(x - PIER.x) < 2.5) continue;
    out.push({
      position: [x, terrainHeight(x, z) - 0.1, z],
      rotation: rand() * Math.PI,
      scale: 0.6 + rand() * 0.8,
      variant: 0,
    });
  }
  return out;
})();

/** Low hills on the horizon so the world doesn't end in a hard edge. */
export const HILLS = (() => {
  const rand = mulberry32(9091);
  const out = [];
  for (let i = 0; i < 26; i++) {
    const angle = (i / 26) * Math.PI * 2 + rand() * 0.15;
    const radius = 80 + rand() * 20;
    out.push({
      position: [Math.cos(angle) * radius * 1.3, -3, Math.sin(angle) * radius],
      scale: [14 + rand() * 16, 7 + rand() * 11, 14 + rand() * 16],
      rotation: rand() * Math.PI,
    });
  }
  return out;
})();
