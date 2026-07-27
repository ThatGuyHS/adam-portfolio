import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@constants/worldData";
import {
  boxGeo,
  coneGeo,
  cylGeo,
  gableGeo,
  mat,
  pyramidGeo,
  sphereGeo,
} from "@components/3d/materials";

// Everything here is built from boxes, cones and cylinders. No models are
// downloaded, which keeps the payload tiny and guarantees the whole village
// shares one visual language.

export function Piece({ geometry, color, options, ...props }) {
  return (
    <mesh
      geometry={geometry}
      material={mat(color, options)}
      castShadow
      receiveShadow
      {...props}
    />
  );
}

const WINDOW = { emissive: PALETTE.lamp, emissiveIntensity: 0.9 };

function Foundation({ radius = 3, color = PALETTE.stoneDark }) {
  return (
    <Piece
      geometry={cylGeo(radius, radius * 1.05, 0.5, 9)}
      color={color}
      position={[0, -0.15, 0]}
      castShadow={false}
    />
  );
}

function Chimney({ position, glow = false }) {
  return (
    <group position={position}>
      <Piece geometry={boxGeo(0.7, 2.2, 0.7)} color={PALETTE.stone} />
      <Piece
        geometry={boxGeo(0.9, 0.25, 0.9)}
        color={PALETTE.stoneDark}
        position={[0, 1.15, 0]}
      />
      {glow && (
        <Piece
          geometry={boxGeo(0.4, 0.12, 0.4)}
          color="#ff9d4d"
          options={{ emissive: "#ff7a1a", emissiveIntensity: 1.4 }}
          position={[0, 1.22, 0]}
          castShadow={false}
        />
      )}
    </group>
  );
}

export function Cottage({ roof = PALETTE.roofRed }) {
  return (
    <group>
      <Foundation radius={3.1} />
      <Piece geometry={boxGeo(5, 3, 4.2)} color={PALETTE.plaster} position={[0, 1.5, 0]} />
      {/* Half-timbering */}
      <Piece geometry={boxGeo(5.06, 0.22, 4.26)} color={PALETTE.woodDark} position={[0, 1.6, 0]} />
      <Piece geometry={boxGeo(0.22, 3.02, 4.26)} color={PALETTE.woodDark} position={[-2.2, 1.5, 0]} />
      <Piece geometry={boxGeo(0.22, 3.02, 4.26)} color={PALETTE.woodDark} position={[2.2, 1.5, 0]} />
      <Piece geometry={pyramidGeo(6.2, 2.4)} color={roof} position={[0, 4.2, 0]} />
      <Piece geometry={boxGeo(1.1, 1.9, 0.16)} color={PALETTE.woodDark} position={[0, 0.95, 2.13]} />
      <Piece geometry={boxGeo(0.85, 0.85, 0.14)} color="#ffe6b0" options={WINDOW} position={[-1.5, 1.9, 2.13]} castShadow={false} />
      <Piece geometry={boxGeo(0.85, 0.85, 0.14)} color="#ffe6b0" options={WINDOW} position={[1.5, 1.9, 2.13]} castShadow={false} />
      <Chimney position={[1.7, 4.4, -1.1]} />
    </group>
  );
}

export function TournamentTent() {
  const flag = useRef();
  useFrame((state) => {
    if (flag.current) {
      flag.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 2.2) * 0.14 - 0.05;
    }
  });

  return (
    <group>
      <Foundation radius={4} color={PALETTE.dirt} />
      {/* Canvas roof, with a striped valance around the eaves. */}
      <Piece geometry={pyramidGeo(9, 3.4)} color={PALETTE.canvas} position={[0, 3.6, 0]} />
      <Piece geometry={cylGeo(4.55, 4.55, 0.42, 4)} color={PALETTE.roofRed} position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]} />
      {[
        [-3.4, -3.4],
        [3.4, -3.4],
        [-3.4, 3.4],
        [3.4, 3.4],
      ].map(([x, z], i) => (
        <Piece key={i} geometry={cylGeo(0.14, 0.16, 4, 6)} color={PALETTE.woodDark} position={[x, 2, z]} />
      ))}

      {/* The bracket board: what this whole place is actually about. */}
      <group position={[0, 0, -1.6]}>
        <Piece geometry={boxGeo(3.6, 2.2, 0.16)} color={PALETTE.woodDark} position={[0, 1.7, 0]} />
        {[0, 1, 2, 3].map((row) => (
          <Piece
            key={row}
            geometry={boxGeo(1.4, 0.22, 0.06)}
            color="#f3ecd8"
            position={[row % 2 ? 0.75 : -0.75, 2.35 - row * 0.42, 0.1]}
            castShadow={false}
          />
        ))}
      </group>

      {/* Crate desk with a laptop balanced on it. */}
      <group position={[2.2, 0, 1.4]} rotation={[0, -0.5, 0]}>
        <Piece geometry={boxGeo(1.3, 1, 1.1)} color={PALETTE.wood} position={[0, 0.5, 0]} />
        <Piece geometry={boxGeo(0.9, 0.06, 0.6)} color="#4a4a55" position={[0, 1.03, 0]} />
        <Piece geometry={boxGeo(0.9, 0.55, 0.06)} color="#5c6070" options={{ emissive: "#8fd0ff", emissiveIntensity: 0.35 }} position={[0, 1.3, -0.28]} rotation={[-0.28, 0, 0]} />
      </group>

      {/* Banner pole */}
      <group position={[-4.6, 0, 2.4]}>
        <Piece geometry={cylGeo(0.1, 0.12, 5.4, 6)} color={PALETTE.woodDark} position={[0, 2.7, 0]} />
        <group ref={flag} position={[0, 4.9, 0]}>
          <Piece geometry={boxGeo(1.6, 0.9, 0.06)} color={PALETTE.roofRed} position={[0.8, -0.2, 0]} castShadow={false} />
        </group>
      </group>
    </group>
  );
}

export function Tavern() {
  return (
    <group>
      <Foundation radius={4.4} />
      <Piece geometry={boxGeo(9, 3.8, 6)} color={PALETTE.plaster} position={[0, 1.9, 0]} />
      <Piece geometry={boxGeo(9.08, 0.26, 6.08)} color={PALETTE.woodDark} position={[0, 2.4, 0]} />
      <Piece geometry={boxGeo(9.08, 0.26, 6.08)} color={PALETTE.woodDark} position={[0, 0.5, 0]} />
      {[-3.6, -1.2, 1.2, 3.6].map((x) => (
        <Piece key={x} geometry={boxGeo(0.24, 3.84, 6.1)} color={PALETTE.woodDark} position={[x, 1.9, 0]} />
      ))}
      <Piece geometry={gableGeo(10.2, 2.6, 7)} color={PALETTE.roofRed} position={[0, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Chimney position={[3.2, 5, -1.6]} glow />

      <Piece geometry={boxGeo(1.6, 2.4, 0.2)} color={PALETTE.woodDark} position={[0, 1.2, 3.05]} />
      {[-2.6, 2.6].map((x) => (
        <Piece key={x} geometry={boxGeo(1.3, 1.2, 0.16)} color="#ffe6b0" options={WINDOW} position={[x, 2.3, 3.05]} castShadow={false} />
      ))}

      {/* Hanging sign */}
      <group position={[2.2, 3.1, 3.2]}>
        <Piece geometry={boxGeo(1.5, 0.16, 0.16)} color={PALETTE.woodDark} position={[-0.55, 0, 0]} />
        <Piece geometry={boxGeo(0.06, 0.5, 0.06)} color={PALETTE.woodDark} position={[0.1, -0.32, 0]} />
        <Piece geometry={boxGeo(1.3, 0.9, 0.1)} color={PALETTE.wood} position={[0.1, -0.98, 0]} />
      </group>

      <Barrel position={[-4.2, 0, 2.6]} />
      <Barrel position={[-3.4, 0, 3.3]} rotation={[0, 0.6, 0]} />
      <Lantern position={[-1.2, 2.9, 3.2]} />
      <Lantern position={[1.2, 2.9, 3.2]} />
    </group>
  );
}

export function Lighthouse() {
  const beam = useRef();
  const lamp = useRef();

  useFrame((state, delta) => {
    if (beam.current) beam.current.rotation.y += delta * 0.55;
    if (lamp.current) {
      lamp.current.material.emissiveIntensity =
        1.6 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    }
  });

  const bands = [
    { y: 1.6, color: "#f2efe6" },
    { y: 3.2, color: PALETTE.roofRed },
    { y: 4.8, color: "#f2efe6" },
    { y: 6.4, color: PALETTE.roofRed },
    { y: 8.0, color: "#f2efe6" },
  ];

  return (
    <group>
      <Piece geometry={cylGeo(2.3, 2.7, 1.2, 9)} color={PALETTE.stoneDark} position={[0, 0.4, 0]} />
      {bands.map((band, i) => (
        <Piece
          key={band.y}
          geometry={cylGeo(1.75 - i * 0.16, 1.9 - i * 0.16, 1.62, 9)}
          color={band.color}
          position={[0, band.y, 0]}
        />
      ))}
      <Piece geometry={cylGeo(1.55, 1.55, 0.22, 10)} color={PALETTE.stoneDark} position={[0, 8.9, 0]} />
      <Piece geometry={cylGeo(1.5, 1.5, 0.5, 10)} color={PALETTE.stoneDark} position={[0, 9.2, 0]} options={{ opacity: 0.9 }} />
      <mesh
        ref={lamp}
        geometry={cylGeo(1, 1, 1.5, 10)}
        material={mat("#fff0c4", { emissive: "#ffcf6b", emissiveIntensity: 1.6 })}
        position={[0, 10.1, 0]}
      />
      <Piece geometry={coneGeo(1.5, 1.3, 10)} color={PALETTE.roofRed} position={[0, 11.5, 0]} />
      <Piece geometry={sphereGeo(0.22, 8)} color={PALETTE.gold} position={[0, 12.3, 0]} />

      {/* The sweep of light. Additive, so it reads as glow rather than glass. */}
      <group ref={beam} position={[0, 10.1, 0]}>
        <mesh
          geometry={coneGeo(2.6, 16, 4)}
          material={mat("#ffd68a", {
            transparent: true,
            opacity: 0.13,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          })}
          position={[8, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>

      <Piece geometry={boxGeo(1, 1.7, 0.16)} color={PALETTE.woodDark} position={[0, 0.85, 2.28]} />
    </group>
  );
}

export function Workshop() {
  const wheel = useRef();
  useFrame((_, delta) => {
    if (wheel.current) wheel.current.rotation.z += delta * 0.9;
  });

  return (
    <group>
      <Foundation radius={4.6} />
      <Piece geometry={boxGeo(9.5, 3.6, 6.5)} color={PALETTE.wood} position={[0, 1.8, 0]} />
      <Piece geometry={gableGeo(10.8, 2.8, 7.4)} color={PALETTE.roofBlue} position={[0, 3.6, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Chimney position={[-3.6, 4.7, -1.8]} glow />

      {/* Open workshop front, with the forge glowing inside. */}
      <Piece geometry={boxGeo(4.4, 2.9, 0.3)} color="#2b2118" position={[0.6, 1.45, 3.3]} />
      <Piece geometry={boxGeo(1.4, 0.9, 0.2)} color="#ff8c3a" options={{ emissive: "#ff6a00", emissiveIntensity: 1.5 }} position={[-0.6, 0.9, 3.25]} castShadow={false} />

      {/* Workbench and lumber */}
      <group position={[3.4, 0, 3.6]} rotation={[0, -0.3, 0]}>
        <Piece geometry={boxGeo(2.6, 0.2, 1.1)} color={PALETTE.woodDark} position={[0, 1, 0]} />
        {[-1.1, 1.1].map((x) => (
          <Piece key={x} geometry={boxGeo(0.2, 1, 0.2)} color={PALETTE.woodDark} position={[x, 0.5, 0]} />
        ))}
        <Piece geometry={boxGeo(0.7, 0.5, 0.5)} color={PALETTE.stone} position={[-0.6, 1.35, 0]} />
        <Piece geometry={boxGeo(0.12, 0.7, 0.12)} color="#8a8f99" position={[0.7, 1.45, 0]} rotation={[0, 0, 0.4]} />
      </group>

      <group position={[-4.2, 0, 2.8]}>
        {[0, 1, 2].map((i) => (
          <Piece key={i} geometry={boxGeo(3, 0.24, 0.6)} color={PALETTE.woodDark} position={[0, 0.15 + i * 0.26, i * 0.05]} />
        ))}
      </group>

      {/* Water wheel on the river side, because a workshop by a river should. */}
      <group ref={wheel} position={[5.1, 1.7, 0]} rotation={[0, 0, 0]}>
        <Piece geometry={cylGeo(1.6, 1.6, 0.18, 10)} color={PALETTE.woodDark} rotation={[0, 0, Math.PI / 2]} />
        {Array.from({ length: 8 }, (_, i) => (
          <Piece
            key={i}
            geometry={boxGeo(0.16, 3.1, 0.7)}
            color={PALETTE.wood}
            rotation={[0, 0, (i / 8) * Math.PI]}
          />
        ))}
      </group>
      <Lantern position={[2.8, 2.9, 3.4]} />
    </group>
  );
}

export function Barrel(props) {
  return (
    <group {...props}>
      <Piece geometry={cylGeo(0.42, 0.36, 1, 9)} color={PALETTE.wood} position={[0, 0.5, 0]} />
      <Piece geometry={cylGeo(0.44, 0.44, 0.1, 9)} color={PALETTE.woodDark} position={[0, 0.72, 0]} castShadow={false} />
      <Piece geometry={cylGeo(0.44, 0.44, 0.1, 9)} color={PALETTE.woodDark} position={[0, 0.28, 0]} castShadow={false} />
    </group>
  );
}

export function Lantern({ position }) {
  const glow = useRef();
  useFrame((state) => {
    if (glow.current) {
      glow.current.material.emissiveIntensity =
        1.1 + Math.sin(state.clock.elapsedTime * 3.1 + position[0]) * 0.18;
    }
  });
  return (
    <group position={position}>
      <Piece geometry={boxGeo(0.34, 0.08, 0.34)} color={PALETTE.woodDark} position={[0, 0.26, 0]} castShadow={false} />
      <mesh
        ref={glow}
        geometry={boxGeo(0.24, 0.34, 0.24)}
        material={mat("#ffe1a0", { emissive: PALETTE.lamp, emissiveIntensity: 1.1 })}
      />
      <Piece geometry={boxGeo(0.34, 0.08, 0.34)} color={PALETTE.woodDark} position={[0, -0.2, 0]} castShadow={false} />
    </group>
  );
}
