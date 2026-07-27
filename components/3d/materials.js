import * as THREE from "three";

// A few hundred little boxes make up the village. Left alone, that would be a
// few hundred materials and geometries, each with its own shader compile. These
// caches collapse them down to the handful of distinct ones actually used.

const materialCache = new Map();
const geometryCache = new Map();

export function mat(color, options = {}) {
  const {
    emissive = null,
    emissiveIntensity = 1,
    opacity = 1,
    transparent = false,
    side = THREE.FrontSide,
    flatShading = true,
    blending = THREE.NormalBlending,
    depthWrite = true,
  } = options;

  const key = [
    color,
    emissive,
    emissiveIntensity,
    opacity,
    transparent,
    side,
    flatShading,
    blending,
    depthWrite,
  ].join("|");

  let material = materialCache.get(key);
  if (!material) {
    material = new THREE.MeshLambertMaterial({
      color,
      flatShading,
      side,
      transparent: transparent || opacity < 1,
      opacity,
      blending,
      depthWrite,
    });
    if (emissive) {
      material.emissive = new THREE.Color(emissive);
      material.emissiveIntensity = emissiveIntensity;
    }
    materialCache.set(key, material);
  }
  return material;
}

function cachedGeometry(key, build) {
  let geometry = geometryCache.get(key);
  if (!geometry) {
    geometry = build();
    geometryCache.set(key, geometry);
  }
  return geometry;
}

export function boxGeo(w, h, d) {
  return cachedGeometry(`box:${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d));
}

export function cylGeo(rTop, rBottom, h, segments = 8) {
  return cachedGeometry(
    `cyl:${rTop},${rBottom},${h},${segments}`,
    () => new THREE.CylinderGeometry(rTop, rBottom, h, segments)
  );
}

export function coneGeo(r, h, segments = 6) {
  return cachedGeometry(
    `cone:${r},${h},${segments}`,
    () => new THREE.ConeGeometry(r, h, segments)
  );
}

export function sphereGeo(r, segments = 10) {
  return cachedGeometry(
    `sphere:${r},${segments}`,
    () => new THREE.SphereGeometry(r, segments, Math.max(4, segments / 2))
  );
}

/** Triangular prism: a gable roof of width w, height h, running d deep. */
export function gableGeo(w, h, d) {
  return cachedGeometry(`gable:${w},${h},${d}`, () => {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, 0);
    shape.lineTo(w / 2, 0);
    shape.lineTo(0, h);
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: false,
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  });
}

/** Square pyramid sized by footprint rather than by cone radius. */
export function pyramidGeo(width, height) {
  return cachedGeometry(`pyr:${width},${height}`, () => {
    const geometry = new THREE.ConeGeometry(
      (width / 2) * Math.SQRT2,
      height,
      4
    );
    geometry.rotateY(Math.PI / 4);
    return geometry;
  });
}

/** Called when the village unmounts — these caches outlive the React tree. */
export function disposeSceneCaches() {
  materialCache.forEach((m) => m.dispose());
  geometryCache.forEach((g) => g.dispose());
  materialCache.clear();
  geometryCache.clear();
}
