import { COLLIDERS } from "@constants/worldData";
import { WALK_BOUNDS, clamp, isWater } from "@lib/3d/terrain";

const PLAYER_RADIUS = 0.55;

/** Push a point out of any building or villager it has ended up inside. */
function pushOut(x, z) {
  let px = x;
  let pz = z;
  for (let pass = 0; pass < 3; pass++) {
    let moved = false;
    for (const c of COLLIDERS) {
      const dx = px - c.x;
      const dz = pz - c.z;
      const min = c.r + PLAYER_RADIUS;
      const d2 = dx * dx + dz * dz;
      if (d2 >= min * min) continue;
      const d = Math.sqrt(d2) || 0.0001;
      px = c.x + (dx / d) * min;
      pz = c.z + (dz / d) * min;
      moved = true;
    }
    if (!moved) break;
  }
  return [px, pz];
}

/**
 * Resolve an attempted move. Buildings push you aside; water refuses the axis
 * that would put you in it, so you slide along the shoreline instead of
 * sticking to it.
 */
export function resolveMove(fromX, fromZ, toX, toZ) {
  const attempt = (x, z) => {
    let [px, pz] = pushOut(x, z);
    px = clamp(px, -WALK_BOUNDS.halfX, WALK_BOUNDS.halfX);
    pz = clamp(pz, -WALK_BOUNDS.halfZ, WALK_BOUNDS.halfZ);
    return isWater(px, pz) ? null : [px, pz];
  };

  return (
    attempt(toX, toZ) ??
    attempt(toX, fromZ) ??
    attempt(fromX, toZ) ??
    [fromX, fromZ]
  );
}
