import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PATH_POINTS, TOUR_STOPS } from "@constants/worldData";
import { cylGeo, mat } from "@components/3d/materials";
import { player } from "@lib/3d/playerState";
import { useVillage } from "@lib/3d/store";
import { groundY } from "@lib/3d/terrain";

const SPACING = 2.4;
const ARRIVAL_RADIUS = 3.6;

function stonePositions() {
  const points = [];
  let carry = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const [ax, az] = PATH_POINTS[i];
    const [bx, bz] = PATH_POINTS[i + 1];
    const length = Math.hypot(bx - ax, bz - az);
    for (let d = carry; d < length; d += SPACING) {
      const t = d / length;
      const x = ax + (bx - ax) * t;
      const z = az + (bz - az) * t;
      points.push([x, groundY(x, z) + 0.05, z]);
      carry = d + SPACING - length;
    }
  }
  return points;
}

function Stones({ lit }) {
  const ref = useRef();
  const positions = useMemo(stonePositions, []);
  const geometry = cylGeo(0.34, 0.4, 0.12, 7);
  const material = lit
    ? mat("#ffd27a", { emissive: "#ffb038", emissiveIntensity: 1.1 })
    : mat("#b9b3a0");

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    positions.forEach((position, i) => {
      matrix.makeTranslation(position[0], position[1], position[2]);
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [positions]);

  return (
    // dispose={null}: geometry and both lit/unlit materials are shared cache
    // entries, and toggling `lit` rebuilds the mesh around them.
    <instancedMesh
      ref={ref}
      args={[geometry, material, positions.length]}
      dispose={null}
      receiveShadow
      frustumCulled={false}
    />
  );
}

/** Column of light over the next stop while a guided tour is running. */
function Beacon({ stop }) {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.8;
    group.current.position.y =
      groundY(stop.position[0], stop.position[1]) +
      Math.sin(state.clock.elapsedTime * 2) * 0.12;
  });

  const glow = mat("#ffd27a", {
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  return (
    <group
      ref={group}
      position={[stop.position[0], groundY(...stop.position), stop.position[1]]}
    >
      {/* dispose={null}: cached geometry/material must survive the beacon
          unmounting when the tour moves on or ends. */}
      <mesh geometry={cylGeo(1.1, 1.5, 9, 6)} material={glow} dispose={null} position={[0, 4.5, 0]} />
      <mesh
        geometry={cylGeo(1.7, 1.7, 0.05, 22)}
        material={glow}
        dispose={null}
        position={[0, 0.1, 0]}
      />
    </group>
  );
}

export default function TourPath() {
  const tourStop = useVillage((state) => state.tourStop);
  const active = tourStop >= 0 && tourStop < TOUR_STOPS.length;

  useFrame(() => {
    const store = useVillage.getState();
    if (store.tourStop < 0 || store.tourStop >= TOUR_STOPS.length) return;
    const stop = TOUR_STOPS[store.tourStop];
    const distance = Math.hypot(
      player.position.x - stop.position[0],
      player.position.z - stop.position[1]
    );
    if (distance > ARRIVAL_RADIUS) return;
    if (store.tourStop + 1 >= TOUR_STOPS.length) store.endTour();
    else store.advanceTour(store.tourStop + 1);
  });

  return (
    <group>
      <Stones lit={active} />
      {active && <Beacon stop={TOUR_STOPS[tourStop]} />}
    </group>
  );
}
