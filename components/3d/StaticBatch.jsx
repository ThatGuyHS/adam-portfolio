import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// The village is built from hundreds of small pieces that share a handful of
// materials but are still one draw call each (twice with shadows). After the
// children mount, this merges every static mesh under it into one mesh per
// material and hides the originals, which cuts the draw calls per frame by
// an order of magnitude.
//
// Left alone: anything under an object with userData.dynamic (the parts that
// useFrame animates), transparent materials (merging would change their draw
// order), instanced meshes and multi-material meshes. Pass the values that
// change what the children render as `deps` so the batch is rebuilt.

// Skipped: anything animated (userData.dynamic) or currently hidden, since a
// hidden group (the plane's pilot) may be shown later and must stay its own
// object.
function isDynamic(object, root) {
  for (let o = object; o && o !== root; o = o.parent) {
    if (o.userData?.dynamic || o.visible === false) return true;
  }
  return false;
}

function attributeSignature(geometry) {
  const names = Object.keys(geometry.attributes).sort().join(",");
  return `${names}|${geometry.index ? "indexed" : "flat"}`;
}

export default function StaticBatch({ children, deps = [] }) {
  const root = useRef();

  useLayoutEffect(() => {
    const group = root.current;
    if (!group) return undefined;

    group.updateWorldMatrix(true, true);
    const toLocal = new THREE.Matrix4().copy(group.matrixWorld).invert();
    const buckets = new Map();

    group.traverse((object) => {
      if (
        !object.isMesh ||
        object.isInstancedMesh ||
        object.isSkinnedMesh ||
        !object.visible ||
        Array.isArray(object.material) ||
        object.material.transparent ||
        isDynamic(object, group)
      ) {
        return;
      }
      const key = [
        object.material.uuid,
        object.castShadow,
        object.receiveShadow,
        attributeSignature(object.geometry),
      ].join("|");
      if (!buckets.has(key)) buckets.set(key, { material: object.material, meshes: [] });
      buckets.get(key).meshes.push(object);
    });

    const merged = [];
    const hidden = [];
    for (const { material, meshes } of buckets.values()) {
      if (meshes.length < 2) continue;
      const geometries = meshes.map((mesh) =>
        mesh.geometry.clone().applyMatrix4(
          new THREE.Matrix4().multiplyMatrices(toLocal, mesh.matrixWorld)
        )
      );
      const geometry = mergeGeometries(geometries);
      geometries.forEach((g) => g.dispose());
      if (!geometry) continue;

      const batch = new THREE.Mesh(geometry, material);
      batch.castShadow = meshes[0].castShadow;
      batch.receiveShadow = meshes[0].receiveShadow;
      batch.userData.staticBatch = true;
      group.add(batch);
      merged.push(batch);
      meshes.forEach((mesh) => {
        mesh.visible = false;
        hidden.push(mesh);
      });
    }

    return () => {
      merged.forEach((batch) => {
        group.remove(batch);
        batch.geometry.dispose();
      });
      hidden.forEach((mesh) => {
        mesh.visible = true;
      });
    };
    // deps decide when the children's meshes change; the effect reads refs only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return <group ref={root}>{children}</group>;
}
