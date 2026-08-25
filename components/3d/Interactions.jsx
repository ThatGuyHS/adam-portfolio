import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTERACTABLES } from "@constants/worldData";
import { useVillage } from "@lib/3d/store";
import { flight, player } from "@lib/3d/playerState";
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

    if (flight.active) {
      useVillage.getState().setNearest(null);
      return;
    }

    let best = null;
    let bestDistance = Infinity;
    for (const item of INTERACTABLES) {
      // No prompt at an empty airstrip while the plane is out.
      if (item.kind === "plane" && flight.phase !== "parked") continue;
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
  const geometry = useMemo(() => new THREE.RingGeometry(1.05, 1.35, 28), []);

  useFrame((state) => {
    if (!ring.current || !nearest) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.06;
    ring.current.scale.setScalar(pulse);
  });

  if (!nearest) return null;
  const [x, z] = nearest.position;

  return (
    // dispose={null}: the geometry has to outlive the mesh (it unmounts every
    // time you step out of range) and the material is a shared cache entry.
    <mesh
      ref={ring}
      dispose={null}
      geometry={geometry}
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
