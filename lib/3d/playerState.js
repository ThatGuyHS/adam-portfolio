import * as THREE from "three";
import { SPAWN } from "@constants/worldData";
import { groundY } from "@lib/3d/terrain";

// Mutable per-frame state, kept out of React on purpose: this changes sixty
// times a second and nothing should re-render because of it.

export const player = {
  position: new THREE.Vector3(SPAWN.x, groundY(SPAWN.x, SPAWN.z), SPAWN.z),
  facing: SPAWN.yaw,
  speed: 0,
};

export const camState = {
  yaw: SPAWN.yaw,
  pitch: 0.42,
  distance: 9.5,
};

/** Module state outlives a remount, so re-entering the village starts fresh. */
export function resetPlayer() {
  player.position.set(SPAWN.x, groundY(SPAWN.x, SPAWN.z), SPAWN.z);
  player.facing = SPAWN.yaw;
  player.speed = 0;
  camState.yaw = SPAWN.yaw;
  camState.pitch = 0.42;
  camState.distance = 9.5;
}

export function teleport(x, z) {
  player.position.set(x, groundY(x, z), z);
  player.speed = 0;
}
