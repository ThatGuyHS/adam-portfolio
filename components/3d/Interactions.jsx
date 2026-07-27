import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTERACTABLES } from "@constants/worldData";
import { useVillage } from "@lib/3d/store";
import { player } from "@lib/3d/playerState";
import { groundY } from "@lib/3d/terrain";
import { mat } from "@components/3d/materials";

// Works out what the player could interact with. Runs on a timer rather than
// every frame — nobody can walk into range and out again in a tenth of a second.
const SAMPLE_INTERVAL = 0.1;

export function ProximitySensor() {
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current < SAMPLE_INTERVAL) return;
    elapsed.current = 0;

    let best = null;
    let bestDistance = Infinity;
    for (const item of INTERACTABLES) {
      const dx = player.position.x - item.position[0];
      const dz = player.position.z - item.position[1];
      const distance = Math.hypot(dx, dz);
      if (distance <= item.range && distance < bestDistance) {
        best = item;
        bestDistance = distance;
      }
    }
    useVillage.getState().setNearest(best);
  });

  return null;
}

/** Ring of light under whatever you're standing next to. */
export function SelectionRing() {
  const nearest = useVillage((state) => state.nearest);
  const ring = useRef();
  const geometry = useRef(new THREE.RingGeometry(1.05, 1.35, 28));

  useFrame((state) => {
    if (!ring.current || !nearest) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.06;
    ring.current.scale.setScalar(pulse);
  });

  if (!nearest) return null;
  const [x, z] = nearest.position;

  return (
    <mesh
      ref={ring}
      geometry={geometry.current}
      material={mat("#ffd27a", {
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })}
      position={[x, groundY(x, z) + 0.08, z]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
}
