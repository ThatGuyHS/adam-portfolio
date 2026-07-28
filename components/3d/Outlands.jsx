import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@constants/worldData";
import {
  OUTLANDS,
  SHORE_Z,
  WATER_Y,
  beyondIsland,
  clamp,
  mulberry32,
  outlandsHeight,
  smoothstep,
} from "@lib/3d/terrain";
import { boxGeo, coneGeo, cylGeo, gableGeo } from "@components/3d/materials";
import { Piece } from "@components/3d/buildings";
import { Bucket, TREE_VARIANTS, buildBuckets } from "@components/3d/Scatter";

// The countryside the mail plane flies over: one big displaced plane painted
// with farmland, forest and snow in vertex colours, plus instanced woods,
// a few hamlets, a windmill and a ring of mountains on the horizon. All of it
// is generated once from fixed seeds and none of it is walkable.

const SIZE = OUTLANDS.extent * 2;
const SEGMENTS = 116;

/** Clumping noise deciding where the woods grow. Roughly [-1, 1]. */
const forest = (x, z) =>
  (Math.sin(x * 0.031 + 1.1) * Math.cos(z * 0.027 - 0.5) +
    Math.sin(x * 0.013 + z * 0.017)) *
  0.5;

/** Deterministic per-cell hash for the patchwork of fields. */
const cellHash = (i, j) => {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function useOutlandsGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);

    const position = geo.attributes.position;
    const colors = new Float32Array(position.count * 3);

    const grass = new THREE.Color(PALETTE.grass);
    const grassDark = new THREE.Color(PALETTE.grassDark);
    const sand = new THREE.Color(PALETTE.sand);
    const silt = new THREE.Color("#6f6547");
    const wheat = new THREE.Color("#c4a04f");
    const plough = new THREE.Color("#a3814f");
    const wood = new THREE.Color("#4c6e3c");
    const stone = new THREE.Color("#8a8b80");
    const snow = new THREE.Color("#edf1f0");
    const scratch = new THREE.Color();
    const noise = mulberry32(2468);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const y = outlandsHeight(x, z);
      position.setY(i, y);

      const az = Math.abs(z);
      const outside = beyondIsland(x, z);

      if (y < WATER_Y + 0.45) {
        scratch.copy(silt);
      } else if (az < SHORE_Z + 2) {
        scratch.copy(sand).lerp(grass, clamp((az - SHORE_Z + 1) / 3, 0, 1));
      } else {
        scratch.copy(grass).lerp(grassDark, noise() * 0.5);

        // Patchwork farms on the low ground of the near country.
        if (outside > 6 && outside < 200 && y < 5 && az > 11) {
          const cell = cellHash(Math.floor(x / 17), Math.floor(z / 14));
          if (cell < 0.2) scratch.lerp(wheat, 0.8);
          else if (cell < 0.36) scratch.lerp(plough, 0.7);
          else if (cell < 0.58) scratch.lerp(grassDark, 0.6);
        }
        if (forest(x, z) > 0.5) scratch.lerp(wood, 0.5);
        if (y > 9) scratch.lerp(stone, smoothstep((y - 9) / 4));
        if (y > 13.5) scratch.lerp(snow, smoothstep((y - 13.5) / 3));
      }

      colors[i * 3] = scratch.r;
      colors[i * 3 + 1] = scratch.g;
      colors[i * 3 + 2] = scratch.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useForests(quality) {
  return useMemo(() => {
    const rand = mulberry32(31337);
    const items = [];
    const target = quality === "low" ? 340 : 700;
    let guard = 0;
    while (items.length < target && guard++ < 30000) {
      const x = (rand() * 2 - 1) * (OUTLANDS.extent - 40);
      const z = (rand() * 2 - 1) * (OUTLANDS.extent - 40);
      if (beyondIsland(x, z) < 6) continue; // the island has its own trees
      if (Math.abs(z) < 10.5) continue; // not in the river
      const y = outlandsHeight(x, z);
      if (y < 0.1 || y > 11) continue; // no trees underwater or on the peaks
      if (forest(x, z) < 0.15) continue; // clumps, not confetti
      items.push({
        position: [x, y - 0.2, z],
        rotation: rand() * Math.PI * 2,
        scale: 1.3 + rand() * 1.6,
        variant: Math.floor(rand() * TREE_VARIANTS.length),
      });
    }
    return buildBuckets(items, TREE_VARIANTS);
  }, [quality]);
}

const ROOFS = [PALETTE.roofRed, PALETTE.roofBlue, PALETTE.roofGreen];

/** A handful of neighbouring hamlets, so the country reads as lived-in. */
function useHamlets() {
  return useMemo(() => {
    const rand = mulberry32(555);
    const centers = [];
    let guard = 0;
    while (centers.length < 6 && guard++ < 4000) {
      const x = (rand() * 2 - 1) * 300;
      const z = (rand() * 2 - 1) * 300;
      if (beyondIsland(x, z) < 40) continue;
      if (Math.abs(z) < 14) continue;
      const y = outlandsHeight(x, z);
      if (y < 0.5 || y > 4.5) continue; // farms keep to the low ground
      if (centers.some((c) => Math.hypot(c.x - x, c.z - z) < 70)) continue;
      centers.push({ x, z });
    }

    const houses = [];
    centers.forEach((center) => {
      const count = 3 + Math.floor(rand() * 3);
      const spin = rand() * Math.PI * 2;
      for (let i = 0; i < count; i++) {
        const angle = spin + (i / count) * Math.PI * 2 + rand() * 0.5;
        const distance = 4 + rand() * 5;
        const x = center.x + Math.cos(angle) * distance;
        const z = center.z + Math.sin(angle) * distance;
        houses.push({
          position: [x, outlandsHeight(x, z) - 0.15, z],
          rotation: rand() * Math.PI * 2,
          roof: ROOFS[Math.floor(rand() * ROOFS.length)],
          scale: 0.85 + rand() * 0.4,
        });
      }
    });
    return houses;
  }, []);
}

/** Snow-capped peaks ringing the far horizon, clear of the river's line. */
function useMountains() {
  return useMemo(() => {
    const rand = mulberry32(777);
    const peaks = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + rand() * 0.3;
      const radius = 320 + rand() * 80;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (Math.abs(z) < 40) continue; // the river escapes through the plains
      const height = 26 + rand() * 22;
      peaks.push({
        x,
        z,
        y: outlandsHeight(x, z) - 2,
        height,
        base: height * (0.9 + rand() * 0.4),
      });
    }
    return peaks;
  }, []);
}

function Windmill({ x, z }) {
  const sails = useRef();
  const y = outlandsHeight(x, z);
  useFrame((_, delta) => {
    if (sails.current) sails.current.rotation.z += delta * 0.55;
  });
  return (
    <group position={[x, y, z]} rotation={[0, Math.atan2(-x, -z), 0]}>
      <Piece geometry={cylGeo(1.1, 1.8, 7, 8)} color={PALETTE.plaster} position={[0, 3.5, 0]} />
      <Piece geometry={coneGeo(1.5, 2, 8)} color={PALETTE.roofRed} position={[0, 8, 0]} />
      <group ref={sails} position={[0, 7, 1.5]}>
        <Piece geometry={boxGeo(0.5, 9, 0.14)} color={PALETTE.canvas} castShadow={false} />
        <Piece
          geometry={boxGeo(0.5, 9, 0.14)}
          color={PALETTE.canvas}
          rotation={[0, 0, Math.PI / 2]}
          castShadow={false}
        />
      </group>
    </group>
  );
}

export default function Outlands({ quality }) {
  const geometry = useOutlandsGeometry();
  const forests = useForests(quality);
  const hamlets = useHamlets();
  const mountains = useMountains();

  return (
    <group>
      <mesh geometry={geometry} receiveShadow={false}>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* The river carrying on past the island in both directions. The strips
          start where the shader river ends, so the two never overlap. */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * 272.5, WATER_Y - 0.04, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow={false}
        >
          <planeGeometry args={[335, 19]} />
          <meshLambertMaterial color={PALETTE.waterDeep} />
        </mesh>
      ))}

      {forests.map((bucket) => (
        <Bucket key={`outland-${bucket.id}`} {...bucket} castShadow={false} />
      ))}

      {hamlets.map((house, i) => (
        <group
          key={i}
          position={house.position}
          rotation={[0, house.rotation, 0]}
          scale={house.scale}
        >
          <Piece geometry={boxGeo(2.4, 1.7, 2)} color={PALETTE.plaster} position={[0, 0.85, 0]} castShadow={false} />
          <Piece geometry={gableGeo(2.7, 1.3, 2.3)} color={house.roof} position={[0, 1.7, 0]} castShadow={false} />
          <Piece geometry={boxGeo(0.4, 0.9, 0.4)} color={PALETTE.stoneDark} position={[0.7, 2.2, 0]} castShadow={false} />
        </group>
      ))}

      <Windmill x={120} z={62} />
      <Windmill x={-150} z={-80} />

      {mountains.map((peak, i) => (
        <group key={i} position={[peak.x, peak.y, peak.z]}>
          <Piece
            geometry={coneGeo(1, 1, 7)}
            color="#7d8078"
            scale={[peak.base, peak.height, peak.base]}
            position={[0, peak.height / 2, 0]}
            castShadow={false}
            receiveShadow={false}
          />
          <Piece
            geometry={coneGeo(1, 1, 7)}
            color="#e8ecec"
            scale={[peak.base * 0.34, peak.height * 0.34, peak.base * 0.34]}
            position={[0, peak.height * 0.66 + peak.height * 0.17, 0]}
            castShadow={false}
            receiveShadow={false}
          />
        </group>
      ))}
    </group>
  );
}
