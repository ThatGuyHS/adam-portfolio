// Shape of the land. Everything that needs to know "how high is the ground
// here" — the terrain mesh, the player's feet, prop placement — goes through
// these functions, so they can never disagree with each other.

export const WATER_Y = -0.5;
export const SHORE_Z = 8.5; // |z| where dry land ends and the bank starts sloping
export const BED_Z = 5.0; // |z| where the channel has reached full depth
export const CHANNEL_DEPTH = 2.4;

export const WORLD = { halfX: 72, halfZ: 42 };
export const WALK_BOUNDS = { halfX: 58, halfZ: 32 };

export const BRIDGE = { x: 26, halfWidth: 2.6, halfLength: 10, rise: 1.9 };
export const PIER = {
  x: -20,
  zNear: -9.4,
  zFar: -4.0,
  halfWidth: 1.5,
  y: 0.45,
};

export function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

export function smoothstep(t) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function damp(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/** Height of the natural terrain (riverbed included) at a world position. */
export function terrainHeight(x, z) {
  const az = Math.abs(z);
  const intoChannel = clamp((SHORE_Z - az) / (SHORE_Z - BED_Z), 0, 1);
  const depth = -CHANNEL_DEPTH * smoothstep(intoChannel);

  // Gentle rolling ground, fading in as you move away from the water so the
  // banks stay flat and the buildings sit level.
  const away = clamp((az - SHORE_Z) / 14, 0, 1);
  const roll =
    0.42 * Math.sin(x * 0.055) * Math.cos(z * 0.07) * smoothstep(away);

  return depth + roll;
}

export function bridgeDeckY(z) {
  const t = clamp(z / BRIDGE.halfLength, -1, 1);
  return BRIDGE.rise * (1 - t * t);
}

export function onBridge(x, z) {
  return (
    Math.abs(x - BRIDGE.x) <= BRIDGE.halfWidth &&
    Math.abs(z) <= BRIDGE.halfLength
  );
}

export function onPier(x, z) {
  return (
    Math.abs(x - PIER.x) <= PIER.halfWidth &&
    z >= PIER.zNear &&
    z <= PIER.zFar
  );
}

/** Height of the surface you can actually stand on, decking included. */
export function groundY(x, z) {
  if (onBridge(x, z)) return Math.max(terrainHeight(x, z), bridgeDeckY(z));
  if (onPier(x, z)) return PIER.y;
  return terrainHeight(x, z);
}

/** True where the player would be wading. Bridge and pier are exempt. */
export function isWater(x, z) {
  if (onBridge(x, z) || onPier(x, z)) return false;
  return Math.abs(z) < SHORE_Z + 0.4;
}

// --- the outlands ----------------------------------------------------------
// Country beyond the village island, only ever seen from the mail plane. The
// same height function drives the mesh and the flight floor, so the plane can
// never be surprised by a hill it can't see.

export const OUTLANDS = { extent: 440 };

/** Distance outside the island's rectangle; 0 anywhere on the island. */
export function beyondIsland(x, z) {
  const dx = Math.max(0, Math.abs(x) - WORLD.halfX);
  const dz = Math.max(0, Math.abs(z) - WORLD.halfZ);
  return Math.hypot(dx, dz);
}

export function outlandsHeight(x, z) {
  const outside = beyondIsland(x, z);
  const blend = smoothstep(outside / 26);

  // The river valley carries on forever east and west.
  const az = Math.abs(z);
  const channel =
    -CHANNEL_DEPTH * smoothstep(clamp((SHORE_Z - az) / (SHORE_Z - BED_Z), 0, 1));

  // Hills swell with distance, but hug the floodplain near the water.
  const valley = smoothstep((az - SHORE_Z) / 30);
  const amp = 2.2 + 17 * smoothstep((outside - 70) / 190);
  const n =
    Math.sin(x * 0.021 + 1.7) * Math.cos(z * 0.017 - 0.6) +
    0.6 * Math.sin(x * 0.045 - 0.9) * Math.sin(z * 0.038 + 2.2) +
    0.8 * Math.sin(x * 0.009 + z * 0.012 + 0.4);
  const hills = channel + Math.max(0, n * 0.45 + 0.35) * amp * valley;

  // Tucked just below the island's skirt so the two meshes never fight.
  const under = terrainHeight(x, z) - 0.45;
  return under * (1 - blend) + hills * blend;
}

/** Ground height anywhere the plane can fly, water surface included. */
export function flightGroundY(x, z) {
  if (Math.abs(x) <= WORLD.halfX && Math.abs(z) <= WORLD.halfZ) {
    return Math.max(groundY(x, z), WATER_Y);
  }
  return Math.max(outlandsHeight(x, z), WATER_Y);
}

/** Deterministic PRNG so scattered props land in the same place every visit. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
