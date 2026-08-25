import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Fired once, when the last villager has been spoken to. A fixed pool of points
// recycled between bursts — no allocation while it runs.

const POOL = 260;
const BURST = 65;
const GRAVITY = 5.5;
const SHOW_LENGTH = 14; // seconds of new bursts before the show winds down
const COLORS = ["#ffd27a", "#ff8f6b", "#8fd4ec", "#e2a3ff", "#b9f2a1"];
const ORIGINS = [
  [22, 14, 2],
  [30, 16, -3],
  [16, 12, 4],
];

export default function Fireworks({ active }) {
  const points = useRef();
  const timer = useRef(0);
  const nextSlot = useRef(0);
  const elapsed = useRef(0);
  const [done, setDone] = useState(false);

  const state = useMemo(() => {
    const positions = new Float32Array(POOL * 3).fill(-999);
    const colors = new Float32Array(POOL * 3);
    return {
      positions,
      colors,
      velocities: new Float32Array(POOL * 3),
      life: new Float32Array(POOL),
      geometry: (() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return geometry;
      })(),
    };
  }, []);

  const launch = () => {
    const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
    const color = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]);
    for (let i = 0; i < BURST; i++) {
      const index = nextSlot.current;
      nextSlot.current = (nextSlot.current + 1) % POOL;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 3.5 + Math.random() * 4;

      state.positions[index * 3] = origin[0];
      state.positions[index * 3 + 1] = origin[1];
      state.positions[index * 3 + 2] = origin[2];
      state.velocities[index * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      state.velocities[index * 3 + 1] = Math.cos(phi) * speed;
      state.velocities[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;
      state.life[index] = 1.6 + Math.random() * 0.8;
      state.colors[index * 3] = color.r;
      state.colors[index * 3 + 1] = color.g;
      state.colors[index * 3 + 2] = color.b;
    }
    state.geometry.attributes.color.needsUpdate = true;
  };

  useFrame((_, delta) => {
    if (!active || done) return;
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    timer.current -= dt;

    if (timer.current <= 0 && elapsed.current < SHOW_LENGTH) {
      timer.current = 1 + Math.random();
      launch();
    }

    let anyAlive = false;
    for (let i = 0; i < POOL; i++) {
      if (state.life[i] <= 0) continue;
      anyAlive = true;
      state.life[i] -= dt;
      state.velocities[i * 3 + 1] -= GRAVITY * dt;
      state.positions[i * 3] += state.velocities[i * 3] * dt;
      state.positions[i * 3 + 1] += state.velocities[i * 3 + 1] * dt;
      state.positions[i * 3 + 2] += state.velocities[i * 3 + 2] * dt;
      if (state.life[i] <= 0) state.positions[i * 3 + 1] = -999;
    }
    if (anyAlive) state.geometry.attributes.position.needsUpdate = true;
    // Show's over and the last spark is out: stop simulating and drawing.
    else if (elapsed.current >= SHOW_LENGTH) setDone(true);
  });

  if (!active || done) return null;

  return (
    <points ref={points} geometry={state.geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.42}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
