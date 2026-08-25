import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PALETTE } from "@constants/worldData";
import {
  BRIDGE,
  PIER,
  WATER_Y,
  bridgeDeckY,
  terrainHeight,
} from "@lib/3d/terrain";
import { boxGeo, coneGeo, cylGeo, gableGeo, mat, sphereGeo } from "@components/3d/materials";
import { Lantern, Piece } from "@components/3d/buildings";

export function Signpost() {
  const arms = [
    { y: 2.5, rot: 0.35, color: PALETTE.wood, width: 2 },
    { y: 1.95, rot: 2.6, color: PALETTE.woodDark, width: 1.7 },
    { y: 1.4, rot: -1.2, color: PALETTE.wood, width: 1.8 },
  ];
  return (
    <group>
      <Piece geometry={cylGeo(0.14, 0.17, 3.2, 6)} color={PALETTE.woodDark} position={[0, 1.6, 0]} />
      {arms.map((arm, i) => (
        <group key={i} rotation={[0, arm.rot, 0]}>
          <Piece geometry={boxGeo(arm.width, 0.4, 0.12)} color={arm.color} position={[arm.width / 2, arm.y, 0]} />
          <Piece geometry={coneGeo(0.22, 0.4, 3)} color={arm.color} position={[arm.width + 0.1, arm.y, 0]} rotation={[0, 0, -Math.PI / 2]} />
        </group>
      ))}
      <Piece geometry={cylGeo(0.5, 0.6, 0.3, 8)} color={PALETTE.stone} position={[0, 0.05, 0]} castShadow={false} />
    </group>
  );
}

export function NoticeBoard() {
  return (
    <group>
      {[-1, 1].map((s) => (
        <Piece key={s} geometry={boxGeo(0.18, 2.6, 0.18)} color={PALETTE.woodDark} position={[s * 0.95, 1.3, 0]} />
      ))}
      <Piece geometry={boxGeo(2.4, 1.7, 0.14)} color={PALETTE.wood} position={[0, 1.9, 0]} />
      <Piece geometry={gableGeo(2.8, 0.5, 0.5)} color={PALETTE.roofGreen} position={[0, 2.78, 0]} rotation={[0, Math.PI / 2, 0]} />
      {[
        [-0.6, 2.2, 0.6, 0.7],
        [0.55, 2.3, 0.7, 0.5],
        [-0.4, 1.5, 0.5, 0.6],
        [0.6, 1.45, 0.55, 0.55],
      ].map(([x, y, w, h], i) => (
        <Piece key={i} geometry={boxGeo(w, h, 0.05)} color="#f6f1e2" position={[x, y, 0.1]} castShadow={false} />
      ))}
    </group>
  );
}

export function Mailbox() {
  const flag = useRef();
  useFrame((state) => {
    if (flag.current) {
      flag.current.rotation.z = -0.2 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
    }
  });
  return (
    <group>
      <Piece geometry={boxGeo(0.22, 1.5, 0.22)} color={PALETTE.woodDark} position={[0, 0.75, 0]} />
      <Piece geometry={cylGeo(0.4, 0.4, 1.1, 8)} color={PALETTE.roofBlue} position={[0, 1.65, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Piece geometry={boxGeo(1.12, 0.42, 0.06)} color="#2b3d55" position={[0, 1.65, 0.4]} castShadow={false} />
      <group ref={flag} position={[0.6, 1.75, 0]}>
        <Piece geometry={boxGeo(0.06, 0.7, 0.06)} color={PALETTE.woodDark} position={[0, 0.35, 0]} />
        <Piece geometry={boxGeo(0.4, 0.3, 0.04)} color={PALETTE.roofRed} position={[0.2, 0.6, 0]} castShadow={false} />
      </group>
    </group>
  );
}

export function Well() {
  return (
    <group>
      <Piece geometry={cylGeo(1.05, 1.15, 1, 10)} color={PALETTE.stone} position={[0, 0.5, 0]} />
      <Piece geometry={cylGeo(0.85, 0.85, 0.1, 10)} color="#2c5a72" position={[0, 0.92, 0]} castShadow={false} />
      {[-1, 1].map((s) => (
        <Piece key={s} geometry={boxGeo(0.16, 2.2, 0.16)} color={PALETTE.woodDark} position={[s * 0.85, 2, 0]} />
      ))}
      <Piece geometry={cylGeo(0.12, 0.12, 1.9, 6)} color={PALETTE.wood} position={[0, 2.7, 0]} rotation={[0, 0, Math.PI / 2]} />
      <Piece geometry={gableGeo(2.6, 0.8, 1.9)} color={PALETTE.roofRed} position={[0, 3.1, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Piece geometry={cylGeo(0.28, 0.24, 0.4, 8)} color={PALETTE.wood} position={[0, 1.9, 0]} />
    </group>
  );
}

export function Fountain() {
  const jets = useRef();
  useFrame((state) => {
    if (jets.current) {
      const t = state.clock.elapsedTime;
      jets.current.children.forEach((jet, i) => {
        jet.scale.y = 1 + Math.sin(t * 3 + i * 1.3) * 0.16;
      });
    }
  });
  return (
    <group>
      <Piece geometry={cylGeo(2.5, 2.65, 0.9, 10)} color={PALETTE.stone} position={[0, 0.45, 0]} />
      <Piece geometry={cylGeo(2.2, 2.2, 0.1, 10)} color="#3f86a8" options={{ opacity: 0.85 }} position={[0, 0.82, 0]} castShadow={false} />
      <Piece geometry={cylGeo(0.45, 0.6, 1.6, 8)} color={PALETTE.stoneDark} position={[0, 1.6, 0]} />
      <Piece geometry={cylGeo(1.1, 0.7, 0.35, 10)} color={PALETTE.stone} position={[0, 2.5, 0]} />
      <group ref={jets} position={[0, 2.8, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <Piece
              key={i}
              geometry={cylGeo(0.06, 0.14, 1.1, 6)}
              color="#8fd4ec"
              options={{ opacity: 0.65 }}
              position={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}
              rotation={[Math.cos(angle) * 0.25, 0, -Math.sin(angle) * 0.25]}
              castShadow={false}
            />
          );
        })}
      </group>
    </group>
  );
}

const STRIPES = [PALETTE.roofRed, "#f2ead4"];

export function Stall({ index = 0 }) {
  return (
    <group>
      <Piece geometry={boxGeo(3.4, 1, 1.5)} color={PALETTE.wood} position={[0, 0.5, 0]} />
      <Piece geometry={boxGeo(3.7, 0.16, 1.8)} color={PALETTE.woodDark} position={[0, 1.05, 0]} />
      {[-1.6, 1.6].map((x) =>
        [-0.7, 0.7].map((z) => (
          <Piece key={`${x}:${z}`} geometry={boxGeo(0.14, 2.6, 0.14)} color={PALETTE.woodDark} position={[x, 1.3, z]} />
        ))
      )}
      {/* Striped canopy */}
      {Array.from({ length: 6 }, (_, i) => (
        <Piece
          key={i}
          geometry={boxGeo(0.62, 0.12, 2.3)}
          color={STRIPES[(i + index) % 2]}
          position={[-1.55 + i * 0.62, 2.62, 0]}
          rotation={[0, 0, 0]}
          castShadow={false}
        />
      ))}
      <Piece geometry={boxGeo(3.8, 0.34, 0.12)} color={PALETTE.woodDark} position={[0, 2.42, 1.12]} castShadow={false} />
      {/* Wares on the counter */}
      {[-1.1, -0.3, 0.5, 1.2].map((x, i) => (
        <Piece
          key={x}
          geometry={i % 2 ? boxGeo(0.4, 0.32, 0.4) : sphereGeo(0.22, 8)}
          color={[PALETTE.roofBlue, PALETTE.gold, PALETTE.roofGreen, "#c76fb0"][i]}
          position={[x, i % 2 ? 1.29 : 1.35, -0.1]}
        />
      ))}
    </group>
  );
}

const BRIDGE_SEGMENTS = 22;

export function Bridge() {
  const segments = [];
  const step = (BRIDGE.halfLength * 2) / BRIDGE_SEGMENTS;
  for (let i = 0; i < BRIDGE_SEGMENTS; i++) {
    const z0 = -BRIDGE.halfLength + step * i;
    const z1 = z0 + step;
    const y0 = bridgeDeckY(z0);
    const y1 = bridgeDeckY(z1);
    segments.push({
      z: (z0 + z1) / 2,
      y: (y0 + y1) / 2,
      angle: Math.atan2(y1 - y0, z1 - z0),
    });
  }

  const deckGeo = boxGeo(BRIDGE.halfWidth * 2 + 0.5, 0.22, step * 1.2);
  const railGeo = boxGeo(0.16, 0.16, step * 1.2);

  return (
    <group position={[BRIDGE.x, 0, 0]}>
      {segments.map((seg, i) => (
        <group key={i} position={[0, seg.y, seg.z]} rotation={[-seg.angle, 0, 0]}>
          <Piece geometry={deckGeo} color={PALETTE.wood} />
          {[-1, 1].map((s) => (
            <Piece
              key={s}
              geometry={railGeo}
              color={PALETTE.woodDark}
              position={[s * (BRIDGE.halfWidth + 0.15), 0.95, 0]}
              castShadow={false}
            />
          ))}
          {i % 3 === 0 &&
            [-1, 1].map((s) => (
              <Piece
                key={`post${s}`}
                geometry={boxGeo(0.16, 1, 0.16)}
                color={PALETTE.woodDark}
                position={[s * (BRIDGE.halfWidth + 0.15), 0.5, 0]}
              />
            ))}
        </group>
      ))}

      {/* Stone piers standing in the water. */}
      {[-4.5, 4.5].map((z) => (
        <group key={z} position={[0, 0, z]}>
          <Piece
            geometry={cylGeo(0.8, 1, bridgeDeckY(z) + 3, 8)}
            color={PALETTE.stoneDark}
            position={[0, (bridgeDeckY(z) - 3) / 2, 0]}
          />
        </group>
      ))}

      {/* Lanterns at both landings. */}
      <Lantern position={[BRIDGE.halfWidth + 0.15, 1.6, -BRIDGE.halfLength + 0.6]} />
      <Lantern position={[-BRIDGE.halfWidth - 0.15, 1.6, BRIDGE.halfLength - 0.6]} />
    </group>
  );
}

export function FishingPier() {
  const length = PIER.zFar - PIER.zNear;
  const planks = 12;
  return (
    <group position={[PIER.x, 0, 0]}>
      {Array.from({ length: planks }, (_, i) => (
        <Piece
          key={i}
          geometry={boxGeo(PIER.halfWidth * 2, 0.14, length / planks - 0.06)}
          color={PALETTE.wood}
          position={[0, PIER.y, PIER.zNear + (length / planks) * (i + 0.5)]}
        />
      ))}
      {[PIER.zNear + 0.6, PIER.zFar - 0.6].map((z) =>
        [-1, 1].map((s) => (
          <Piece
            key={`${z}:${s}`}
            geometry={cylGeo(0.16, 0.16, 3.4, 6)}
            color={PALETTE.woodDark}
            position={[s * (PIER.halfWidth - 0.2), PIER.y - 1.7, z]}
          />
        ))
      )}
      <group position={[PIER.halfWidth - 0.1, PIER.y, PIER.zFar - 0.4]}>
        <Piece geometry={cylGeo(0.1, 0.1, 2.2, 6)} color={PALETTE.woodDark} position={[0, 1.1, 0]} />
        <Lantern position={[0, 2.05, 0]} />
      </group>
      <RowBoat position={[-2.6, WATER_Y - 0.1, PIER.zFar - 1.2]} rotation={[0, 0.25, 0]} />
      <Piece geometry={boxGeo(0.7, 0.7, 0.7)} color={PALETTE.woodDark} position={[-0.5, PIER.y + 0.42, PIER.zNear + 0.9]} />
    </group>
  );
}

export function RowBoat(props) {
  return (
    <group {...props}>
      <Piece geometry={cylGeo(0.55, 0.42, 3.2, 7)} color={PALETTE.wood} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} />
      <Piece geometry={boxGeo(0.9, 0.1, 0.5)} color={PALETTE.woodDark} position={[0, 0.5, 0]} castShadow={false} />
      <Piece geometry={boxGeo(0.1, 0.1, 2.2)} color={PALETTE.woodDark} position={[0.55, 0.5, 0.3]} rotation={[0, 0.3, 0]} castShadow={false} />
    </group>
  );
}

/** A campfire near the spawn, so the first thing you see has some life in it. */
export function Campfire({ position }) {
  const flame = useRef();
  useFrame((state) => {
    if (flame.current) {
      const t = state.clock.elapsedTime;
      flame.current.scale.setScalar(1 + Math.sin(t * 7) * 0.1);
      flame.current.rotation.y = t * 1.5;
    }
  });
  return (
    <group position={position}>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <Piece
            key={i}
            geometry={cylGeo(0.09, 0.09, 1.1, 5)}
            color={PALETTE.woodDark}
            position={[Math.cos(angle) * 0.22, 0.35, Math.sin(angle) * 0.22]}
            rotation={[Math.cos(angle) * 0.5, 0, -Math.sin(angle) * 0.5]}
          />
        );
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return (
          <Piece
            key={`s${i}`}
            geometry={sphereGeo(0.2, 6)}
            color={PALETTE.stone}
            position={[Math.cos(angle) * 0.85, 0.06, Math.sin(angle) * 0.85]}
            castShadow={false}
          />
        );
      })}
      <mesh
        ref={flame}
        geometry={coneGeo(0.35, 1, 5)}
        material={mat("#ff9b3d", { emissive: "#ff6a00", emissiveIntensity: 1.6 })}
        dispose={null}
        position={[0, 0.75, 0]}
      />
    </group>
  );
}

/** Rough ground cover: instanced-friendly single meshes for trees and rocks. */
export function Tree({ variant = 0 }) {
  const trunk = <Piece geometry={cylGeo(0.2, 0.3, 2.2, 6)} color="#6b4a2a" position={[0, 1.1, 0]} />;
  if (variant === 0) {
    return (
      <group>
        {trunk}
        <Piece geometry={coneGeo(1.5, 3, 7)} color="#4f7a3d" position={[0, 3, 0]} />
        <Piece geometry={coneGeo(1.15, 2.4, 7)} color="#5c8a45" position={[0, 4.1, 0]} />
      </group>
    );
  }
  if (variant === 1) {
    return (
      <group>
        {trunk}
        <Piece geometry={sphereGeo(1.5, 7)} color="#5d8b3f" position={[0, 3.1, 0]} scale={[1, 0.85, 1]} />
        <Piece geometry={sphereGeo(1, 7)} color="#6d9b4a" position={[0.7, 3.8, 0.3]} />
      </group>
    );
  }
  return (
    <group>
      {trunk}
      <Piece geometry={coneGeo(1.7, 4.2, 6)} color="#41693a" position={[0, 3.5, 0]} />
    </group>
  );
}

export function Rock({ variant = 0 }) {
  return variant === 0 ? (
    <Piece geometry={sphereGeo(0.7, 6)} color={PALETTE.stone} scale={[1, 0.65, 0.85]} position={[0, 0.3, 0]} />
  ) : (
    <group>
      <Piece geometry={boxGeo(1, 0.7, 0.9)} color={PALETTE.stoneDark} position={[0, 0.3, 0]} rotation={[0.1, 0.4, 0.15]} />
      <Piece geometry={sphereGeo(0.4, 6)} color={PALETTE.stone} position={[0.5, 0.4, 0.2]} />
    </group>
  );
}

export function Reed() {
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <Piece
          key={i}
          geometry={boxGeo(0.07, 1.4, 0.07)}
          color="#7d9b4a"
          position={[(i - 1) * 0.14, 0.7, i * 0.06]}
          rotation={[0, 0, (i - 1) * 0.16]}
          castShadow={false}
        />
      ))}
    </group>
  );
}

/** Ground shim so buildings on a slight slope don't show daylight underneath. */
export function GroundPatch({ radius = 3, position = [0, 0, 0] }) {
  const y = terrainHeight(position[0], position[2]);
  return (
    <Piece
      geometry={cylGeo(radius, radius, 0.6, 10)}
      color={PALETTE.dirt}
      position={[position[0], y - 0.3, position[2]]}
      castShadow={false}
    />
  );
}
