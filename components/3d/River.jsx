import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FOG, PALETTE } from "@constants/worldData";
import { WATER_Y } from "@lib/3d/terrain";

// The river is one long plane with a hand-written shader: rolling waves in the
// vertex stage, and depth, foam and low-sun glitter in the fragment stage. It
// fogs itself, because a raw ShaderMaterial doesn't get the scene's fog for
// free and the far end would otherwise cut off in mid-air.

const RIVER_LENGTH = 210;
const RIVER_WIDTH = 19;

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying float vDepth;

  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(p.x * 0.55 + uTime * 1.5) * 0.05
         + sin(p.y * 1.6 - uTime * 1.05) * 0.035
         + sin((p.x * 0.21 + p.y * 0.44) + uTime * 0.65) * 0.055;

    vec4 world = modelMatrix * vec4(p, 1.0);
    vec4 view = viewMatrix * world;
    vWorld = world.xyz;
    vDepth = -view.z;
    gl_Position = projectionMatrix * view;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uSky;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;

  varying vec2 vUv;
  varying vec3 vWorld;
  varying float vDepth;

  void main() {
    float edge = clamp(abs(vUv.y - 0.5) * 2.0, 0.0, 1.0);

    vec3 color = mix(uDeep, uShallow, pow(edge, 1.6));

    // Foam where the water meets the bank, wobbled so the line isn't straight.
    float shoreWave = 0.05 * sin(vWorld.x * 1.7 + uTime * 1.3)
                    + 0.03 * sin(vWorld.x * 0.6 - uTime * 0.8);
    float foam = smoothstep(0.87, 0.99, edge + shoreWave);
    color = mix(color, vec3(0.93, 0.95, 0.95), foam * 0.75);

    // Glitter running downstream, low and warm like a late sun.
    float streak = sin(vWorld.x * 0.42 - uTime * 1.6
                     + sin(vWorld.z * 0.85 + uTime * 0.55) * 1.6);
    float sparkle = smoothstep(0.93, 1.0, streak) * (1.0 - edge * 0.6);
    color += vec3(1.0, 0.82, 0.52) * sparkle * 0.5;

    // Grazing angles pick up the sky, steep ones look into the water.
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 3.0);
    color = mix(color, uSky, fresnel * 0.55);

    float alpha = mix(0.94, 0.72, edge);

    float fogAmount = smoothstep(uFogNear, uFogFar, vDepth);
    color = mix(color, uFogColor, fogAmount);
    alpha = mix(alpha, 1.0, fogAmount);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function River() {
  const material = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(PALETTE.waterDeep) },
      uShallow: { value: new THREE.Color(PALETTE.waterShallow) },
      uSky: { value: new THREE.Color("#ffd9a8") },
      uFogColor: { value: new THREE.Color(FOG.color) },
      uFogNear: { value: FOG.near },
      uFogFar: { value: FOG.far },
    }),
    []
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    // Follow the scene fog, which breathes out while the mail plane is up.
    if (state.scene.fog) {
      m.uniforms.uFogNear.value = state.scene.fog.near;
      m.uniforms.uFogFar.value = state.scene.fog.far;
    }
  });

  return (
    <mesh position={[0, WATER_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[RIVER_LENGTH, RIVER_WIDTH, 180, 16]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}
