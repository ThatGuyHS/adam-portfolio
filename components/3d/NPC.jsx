import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { boxGeo, coneGeo, cylGeo, sphereGeo } from "@components/3d/materials";
import { Piece } from "@components/3d/buildings";
import { damp, terrainHeight } from "@lib/3d/terrain";
import { player } from "@lib/3d/playerState";

// Villagers are built from the same box-and-cone kit as the buildings. They
// breathe, they sway, and they turn to face you when you come close enough to
// talk — which is the entire budget of "life" this scene needs.

const NOTICE_RANGE = 7;

export default function NPC({ npc, visited }) {
  const group = useRef();
  const torso = useRef();
  const leftArm = useRef();
  const rightArm = useRef();

  const [x, z] = npc.position;
  const y = terrainHeight(x, z);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime + x;
    if (torso.current) {
      torso.current.position.y = 0.92 + Math.sin(t * 1.6) * 0.025;
    }
    if (leftArm.current && rightArm.current) {
      const swing = Math.sin(t * 1.6) * 0.08;
      leftArm.current.rotation.x = swing;
      rightArm.current.rotation.x = -swing;
    }
    if (group.current) {
      const dx = player.position.x - x;
      const dz = player.position.z - z;
      const distance = Math.hypot(dx, dz);
      const target =
        distance < NOTICE_RANGE ? Math.atan2(dx, dz) : npc.faceYaw;

      // Shortest way round, so nobody spins 350 degrees to say hello.
      let diff = target - group.current.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      group.current.rotation.y = damp(
        group.current.rotation.y,
        group.current.rotation.y + diff,
        4,
        Math.min(delta, 0.1)
      );
    }
  });

  const { coat, trousers, skin, hat } = npc.colors;

  return (
    <group ref={group} position={[x, y, z]} rotation={[0, npc.faceYaw, 0]}>
      {[-0.16, 0.16].map((offset) => (
        <Piece key={offset} geometry={boxGeo(0.24, 0.72, 0.26)} color={trousers} position={[offset, 0.36, 0]} />
      ))}
      <group ref={torso} position={[0, 0.92, 0]}>
        <Piece geometry={cylGeo(0.32, 0.38, 0.8, 7)} color={coat} />
        <Piece geometry={boxGeo(0.5, 0.14, 0.5)} color={trousers} position={[0, -0.34, 0]} castShadow={false} />
        <group ref={leftArm} position={[-0.36, 0.28, 0]}>
          <Piece geometry={boxGeo(0.16, 0.62, 0.18)} color={coat} position={[0, -0.31, 0]} />
          <Piece geometry={sphereGeo(0.1, 6)} color={skin} position={[0, -0.66, 0]} castShadow={false} />
        </group>
        <group ref={rightArm} position={[0.36, 0.28, 0]}>
          <Piece geometry={boxGeo(0.16, 0.62, 0.18)} color={coat} position={[0, -0.31, 0]} />
          <Piece geometry={sphereGeo(0.1, 6)} color={skin} position={[0, -0.66, 0]} castShadow={false} />
        </group>
        <Piece geometry={sphereGeo(0.27, 8)} color={skin} position={[0, 0.62, 0]} />
        <Piece geometry={cylGeo(0.42, 0.42, 0.05, 9)} color={hat} position={[0, 0.78, 0]} castShadow={false} />
        <Piece geometry={coneGeo(0.27, 0.34, 8)} color={hat} position={[0, 0.94, 0]} />
        {/* Eyes, so they read as facing you. */}
        {[-0.1, 0.1].map((offset) => (
          <Piece key={offset} geometry={sphereGeo(0.045, 5)} color="#2b2b33" position={[offset, 0.66, 0.24]} castShadow={false} />
        ))}
      </group>

      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={16}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="village-tag">
          <span className="village-tag__name">{npc.name}</span>
          <span className="village-tag__title">{npc.title}</span>
          {visited && <span className="village-tag__done">✓</span>}
        </div>
      </Html>
    </group>
  );
}
