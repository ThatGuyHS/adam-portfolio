import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor, Sky } from "@react-three/drei";
import { FOG } from "@constants/worldData";
import Village from "@components/3d/Village";
import Player from "@components/3d/Player";

// Late afternoon, sun low in the west — the whole village is lit by one warm
// directional light plus a sky-coloured hemisphere fill.
const SUN = [-90, 26, 38];

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
      camera={{ fov: 52, near: 0.4, far: 280, position: [-52, 8, -8] }}
      gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
    >
      <PerformanceMonitor onDecline={() => setDegraded(true)} />

      <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />
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
