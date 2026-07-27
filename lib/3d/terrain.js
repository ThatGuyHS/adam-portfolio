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
