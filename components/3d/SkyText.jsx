import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import userData from "@constants/data";
import { damp } from "@lib/3d/terrain";
import { sphereGeo } from "@components/3d/materials";
import { Piece } from "@components/3d/buildings";
import { flight } from "@lib/3d/playerState";

// Skywriting: the CV, told to whoever takes the mail plane up. Each banner is
// a line of giant text riding a bank of clouds. They only exist while someone
// is airborne — from the ground the sky stays empty and the village stays cosy.

// Tenor Sans parses in the browser but troika's font engine maps every glyph
// to .notdef — the sky filled with tofu boxes. Poppins is known-good.
const FONT = "/fonts/Poppins-Bold.ttf";

const BANNERS = [
  {
    text: "ADAM PELEBACK",
    sub: userData.designation,
    position: [12, 30, 4],
  },
  {
    text: "BUILDING FOR THE WEB SINCE 2017",
    sub: "upstream is where it started",
    position: [-85, 26, -35],
  },
  {
    text: `${userData.projects.length} PROJECTS SHIPPED`,
    sub: "browse them at the market stalls below",
    position: [90, 26, -30],
  },
  {
    text: "TYPESCRIPT · REACT · NEXT.JS",
    sub: "the daily toolkit",
    position: [-70, 25, 60],
  },
  {
    text: `BASED IN ${userData.address.toUpperCase()}`,
    sub: "by rather colder water than this",
    position: [75, 25, 65],
  },
  {
    text: "SAY HEJ",
    sub: userData.email,
    position: [0, 28, 110],
  },
  {
    text: "ESPORTS · QA · FRONTEND",
    sub: "the road so far, in order",
    position: [0, 27, -110],
  },
];

// Smooth-shaded and self-lit, or the Lambert sun turns the puffs into
// boulders — that beige-rock look is exactly what this avoids.
const CLOUD = {
  opacity: 0.92,
  transparent: true,
  flatShading: false,
  emissive: "#f7ead2",
  emissiveIntensity: 0.6,
};

function CloudBank({ width }) {
  const rand = (i, k) =>
    Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
  const puffs = Math.max(4, Math.round(width / 7));
  return (
    <group position={[0, -0.4, -2.2]}>
      {Array.from({ length: puffs }, (_, i) => {
        const t = puffs === 1 ? 0.5 : i / (puffs - 1);
        const radius = 2.6 + rand(i, 1) * 2.2;
        return (
          <Piece
            key={i}
            geometry={sphereGeo(1, 10)}
            color="#fbf7ee"
            options={CLOUD}
            scale={[radius, radius * 0.62, radius * 0.8]}
            position={[
              (t - 0.5) * width,
              (rand(i, 2) - 0.5) * 1.6,
              -rand(i, 3) * 1.5,
            ]}
            castShadow={false}
            receiveShadow={false}
          />
        );
      })}
    </group>
  );
}

function Banner({ banner, index, register }) {
  // Rough width of the cloud bank from the headline length.
  const width = Math.max(14, banner.text.length * 2.1);
  return (
    <Billboard position={banner.position} follow>
      <group ref={(el) => register(index, el)}>
        <Text
          font={FONT}
          fontSize={3.2}
          letterSpacing={0.08}
          color="#fffbe8"
          outlineWidth={0.14}
          outlineColor="#4a3a20"
          anchorX="center"
          anchorY="middle"
        >
          {banner.text}
        </Text>
        {banner.sub && (
          <Text
            font={FONT}
            fontSize={1.35}
            letterSpacing={0.12}
            color="#ffe3ae"
            outlineWidth={0.07}
            outlineColor="#4a3a20"
            anchorX="center"
            anchorY="middle"
            position={[0, -2.6, 0]}
          >
            {banner.sub}
          </Text>
        )}
        <CloudBank width={width} />
      </group>
    </Billboard>
  );
}

export default function SkyText() {
  const root = useRef();
  const inner = useRef([]);
  const fade = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    fade.current = damp(fade.current, flight.active ? 1 : 0, 2, dt);
    if (root.current) root.current.visible = fade.current > 0.02;
    if (!root.current?.visible) return;

    const t = state.clock.elapsedTime;
    inner.current.forEach((group, i) => {
      if (!group) return;
      group.scale.setScalar(0.75 + 0.25 * fade.current);
      group.position.y = Math.sin(t * 0.4 + i * 1.9) * 0.9;
    });
  });

  return (
    <group ref={root} visible={false}>
      {BANNERS.map((banner, i) => (
        <Banner
          key={banner.text}
          banner={banner}
          index={i}
          register={(index, el) => {
            inner.current[index] = el;
          }}
        />
      ))}
    </group>
  );
}
