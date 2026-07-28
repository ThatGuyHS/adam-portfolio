import { useMemo } from "react";
import * as THREE from "three";
import { PALETTE, distanceToPath } from "@constants/worldData";
import { SHORE_Z, WORLD, mulberry32, terrainHeight } from "@lib/3d/terrain";

// One displaced plane carries the whole island. Grass, sand and the dirt road
// are painted into vertex colours rather than textures — no image to download,
// and the facets read as deliberate rather than low-res.

const SEG_X = 132;
const SEG_Z = 78;

function useTerrainGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      WORLD.halfX * 2,
      WORLD.halfZ * 2,
      SEG_X,
      SEG_Z
    );
    geo.rotateX(-Math.PI / 2);

    const position = geo.attributes.position;
    const colors = new Float32Array(position.count * 3);

    const grass = new THREE.Color(PALETTE.grass);
    const grassDark = new THREE.Color(PALETTE.grassDark);
    const sand = new THREE.Color(PALETTE.sand);
    const silt = new THREE.Color("#6f6547");
    const dirt = new THREE.Color(PALETTE.dirt);
    const scratch = new THREE.Color();
    const noise = mulberry32(1337);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const y = terrainHeight(x, z);
      position.setY(i, y);

      const az = Math.abs(z);
      if (az < SHORE_Z - 1.6) {
        scratch.copy(silt).lerp(sand, THREE.MathUtils.clamp((az - 3) / 4, 0, 1));
      } else if (az < SHORE_Z + 1.4) {
        scratch
          .copy(sand)
          .lerp(grass, THREE.MathUtils.clamp((az - SHORE_Z + 1.4) / 2.8, 0, 1));
      } else {
        scratch.copy(grass).lerp(grassDark, noise() * 0.55);
      }

      const road = distanceToPath(x, z);
      if (road < 3.4 && az > SHORE_Z - 1) {
        scratch.lerp(dirt, THREE.MathUtils.clamp(1 - (road - 1.6) / 1.8, 0, 1));
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

export default function Terrain() {
  const geometry = useTerrainGeometry();
  // The land past the island's edge is Outlands.jsx — a whole procedural
  // countryside now that the mail plane can go and look at it.
  return (
    <mesh geometry={geometry} receiveShadow>
      <meshLambertMaterial vertexColors flatShading />
    </mesh>
  );
}
