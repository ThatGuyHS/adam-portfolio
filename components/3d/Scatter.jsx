import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { REEDS, ROCKS, TREES } from "@constants/worldData";
import { cylGeo, boxGeo, coneGeo, mat, sphereGeo } from "@components/3d/materials";

// Trees, rocks and reeds add up to well over a thousand little meshes, which is
// a thousand draw calls the phone can't afford. Each distinct part is collected
// into one InstancedMesh instead, taking the whole ground cover down to about a
// dozen draws.

const TREE_VARIANTS = [
  [
    { id: "trunk", geometry: () => cylGeo(0.2, 0.3, 2.2, 6), color: "#6b4a2a", position: [0, 1.1, 0] },
    { id: "pineLower", geometry: () => coneGeo(1.5, 3, 7), color: "#4f7a3d", position: [0, 3, 0] },
    { id: "pineUpper", geometry: () => coneGeo(1.15, 2.4, 7), color: "#5c8a45", position: [0, 4.1, 0] },
  ],
  [
    { id: "trunk", geometry: () => cylGeo(0.2, 0.3, 2.2, 6), color: "#6b4a2a", position: [0, 1.1, 0] },
    { id: "canopy", geometry: () => sphereGeo(1.5, 7), color: "#5d8b3f", position: [0, 3.1, 0], scale: [1, 0.85, 1] },
    { id: "canopySmall", geometry: () => sphereGeo(1, 7), color: "#6d9b4a", position: [0.7, 3.8, 0.3] },
  ],
  [
    { id: "trunk", geometry: () => cylGeo(0.2, 0.3, 2.2, 6), color: "#6b4a2a", position: [0, 1.1, 0] },
    { id: "spire", geometry: () => coneGeo(1.7, 4.2, 6), color: "#41693a", position: [0, 3.5, 0] },
  ],
];

const ROCK_VARIANTS = [
  [
    { id: "boulder", geometry: () => sphereGeo(0.7, 6), color: "#9d9e94", position: [0, 0.3, 0], scale: [1, 0.65, 0.85] },
  ],
  [
    { id: "slab", geometry: () => boxGeo(1, 0.7, 0.9), color: "#7c7d74", position: [0, 0.3, 0], rotation: [0.1, 0.4, 0.15] },
    { id: "pebble", geometry: () => sphereGeo(0.4, 6), color: "#9d9e94", position: [0.5, 0.4, 0.2] },
  ],
];

const REED_VARIANTS = [
  [0, 1, 2].map((i) => ({
    id: `reed${i}`,
    geometry: () => boxGeo(0.07, 1.4, 0.07),
    color: "#7d9b4a",
    position: [(i - 1) * 0.14, 0.7, i * 0.06],
    rotation: [0, 0, (i - 1) * 0.16],
  })),
];

function buildBuckets(items, variants) {
  const buckets = new Map();
  const itemQuat = new THREE.Quaternion();
  const partQuat = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const offset = new THREE.Vector3();
  const scale = new THREE.Vector3();

  for (const item of items) {
    const parts = variants[item.variant % variants.length];
    itemQuat.setFromEuler(euler.set(0, item.rotation, 0));

    for (const part of parts) {
      let bucket = buckets.get(part.id);
      if (!bucket) {
        bucket = { id: part.id, geometry: part.geometry(), color: part.color, matrices: [] };
        buckets.set(part.id, bucket);
      }
      offset
        .set(...(part.position ?? [0, 0, 0]))
        .multiplyScalar(item.scale)
        .applyQuaternion(itemQuat)
        .add(new THREE.Vector3(...item.position));

      partQuat.setFromEuler(euler.set(...(part.rotation ?? [0, 0, 0])));
      const rotation = itemQuat.clone().multiply(partQuat);
      const [sx, sy, sz] = part.scale ?? [1, 1, 1];
      scale.set(sx * item.scale, sy * item.scale, sz * item.scale);

      bucket.matrices.push(
        new THREE.Matrix4().compose(offset.clone(), rotation, scale.clone())
      );
    }
  }
  return [...buckets.values()];
}

function Bucket({ geometry, color, matrices, castShadow = true }) {
  const ref = useRef();
  const material = useMemo(() => mat(color), [color]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [matrices]);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, matrices.length]}
      castShadow={castShadow}
      receiveShadow
      frustumCulled={false}
    />
  );
}

export default function Scatter({ quality = "high" }) {
  const trees = useMemo(
    () => buildBuckets(quality === "low" ? TREES.filter((_, i) => i % 2 === 0) : TREES, TREE_VARIANTS),
    [quality]
  );
  const rocks = useMemo(() => buildBuckets(ROCKS, ROCK_VARIANTS), []);
  const reeds = useMemo(() => buildBuckets(REEDS, REED_VARIANTS), []);

  return (
    <group>
      {trees.map((bucket) => (
        <Bucket key={`tree-${bucket.id}`} {...bucket} castShadow={quality === "high"} />
      ))}
      {rocks.map((bucket) => (
        <Bucket key={`rock-${bucket.id}`} {...bucket} castShadow={false} />
      ))}
      {reeds.map((bucket) => (
        <Bucket key={`reed-${bucket.id}`} {...bucket} castShadow={false} />
      ))}
    </group>
  );
}
