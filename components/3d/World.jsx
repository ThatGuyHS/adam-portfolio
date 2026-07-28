import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor, Sky } from "@react-three/drei";
import { FOG } from "@constants/worldData";
import Village from "@components/3d/Village";
import Player from "@components/3d/Player";
import { flight } from "@lib/3d/playerState";
import { damp } from "@lib/3d/terrain";

// Late afternoon, sun low in the west — the whole village is lit by one warm
// directional light plus a sky-coloured hemisphere fill.
const SUN = [-90, 26, 38];

// On the ground the haze keeps the village cosy; from the plane it would hide
// everything worth flying to, so the fog breathes out on takeoff and back in
// on landing. The river's shader reads these values off the scene every frame.
const FLIGHT_FOG = { near: 130, far: 430 };

function FlightFog() {
  useFrame((state, delta) => {
    const fog = state.scene.fog;
    if (!fog) return;
    const dt = Math.min(delta, 0.05);
    const target = flight.active ? FLIGHT_FOG : FOG;
    fog.near = damp(fog.near, target.near, 0.9, dt);
    fog.far = damp(fog.far, target.far, 0.9, dt);
  });
  return null;
}

function ReadySignal({ onReady }) {
  const frames = useRef(0);
  useFrame(() => {
    if (frames.current > 2) return;
    frames.current += 1;
    if (frames.current === 3) onReady();
  });
  return null;
}

export default function World({ quality, onReady }) {
  const [degraded, setDegraded] = useState(false);
  const shadows = quality === "high" && !degraded;

  useEffect(() => {
    if (quality === "low") setDegraded(true);
  }, [quality]);

  return (
    <Canvas
      shadows={shadows}
      dpr={[1, quality === "low" || degraded ? 1 : 1.75]}
      camera={{ fov: 52, near: 0.4, far: 950, position: [-52, 8, -8] }}
      gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
    >
      <PerformanceMonitor onDecline={() => setDegraded(true)} />

      <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />
      <FlightFog />
      <Sky
        distance={4000}
        sunPosition={SUN}
        turbidity={7}
        rayleigh={2.6}
        mieCoefficient={0.012}
        mieDirectionalG={0.85}
      />

      <hemisphereLight args={["#ffd9a8", "#6a7a48", 0.85]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={SUN}
        intensity={1.45}
        color="#ffdcae"
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.03}
        shadow-camera-near={20}
        shadow-camera-far={260}
        shadow-camera-left={-62}
        shadow-camera-right={62}
        shadow-camera-top={62}
        shadow-camera-bottom={-62}
      />

      <Suspense fallback={null}>
        <Village quality={degraded ? "low" : quality} />
        <Player />
      </Suspense>

      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
