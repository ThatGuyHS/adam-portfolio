import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PALETTE } from "@constants/worldData";
import { WATER_Y, damp } from "@lib/3d/terrain";
import { boxGeo, coneGeo, cylGeo, gableGeo } from "@components/3d/materials";
import { Lantern, Piece } from "@components/3d/buildings";

// A little sailing barge working the river. It runs the reach between the
// fishing pier and the bridge and comes about at each end, so it never has to
// duck a mast under the bridge deck and never teleports back in plain sight.
const ROUTE = {
  centerX: 2,
  reach: 16,
  z: 0.4,
  period: 52, // seconds for one full there-and-back
};

// The hull runs along local +Z, bow first, so a yaw of +/- PI/2 points it
// up- or downriver. The water is only ~0.9 opaque, so anything below the
// surface still shows through: she has to sit deep enough to actually read as
// floating rather than as a toy resting on the skin of the river.
const HULL_LENGTH = 5;
const DRAUGHT = 0.32;
const DECK_Y = 0.62;

/** Foam trailing off the stern. Sits on the water rather than on the hull, so
 *  it stays flat while the boat rolls, and stretches with how fast she's going. */
function Wake() {
  const foam = { opacity: 0.45, depthWrite: false };
  return (
    <group renderOrder={2}>
      {[-1, 1].map((s) => (
        <Piece
          key={s}
          geometry={boxGeo(0.45, 0.04, 7)}
          color="#e6f0f0"
          options={foam}
          position={[s * 0.95, 0, -5.4]}
          rotation={[0, s * 0.13, 0]}
          castShadow={false}
          receiveShadow={false}
        />
      ))}
      <Piece
        geometry={boxGeo(1.4, 0.04, 4)}
        color="#eef5f4"
        options={foam}
        position={[0, 0, -4.2]}
        castShadow={false}
        receiveShadow={false}
      />
    </group>
  );
}

export default function Boat() {
  const boat = useRef();
  const wake = useRef();
  const pennant = useRef();
  const yaw = useRef(Math.PI / 2);

  useFrame((state, delta) => {
    if (!boat.current || !wake.current) return;
    const t = state.clock.elapsedTime;

    // A sine along the reach: she eases off at both ends instead of stopping
    // dead, and cos gives the along-river velocity for free.
    const phase = (t / ROUTE.period) * Math.PI * 2;
    const x = ROUTE.centerX + Math.sin(phase) * ROUTE.reach;
    const drift = Math.cos(phase);
    const z = ROUTE.z + Math.sin(t * 0.21) * 1.1;

    // Swing the bow round rather than snapping it at the turn.
    yaw.current = damp(yaw.current, (Math.PI / 2) * Math.sign(drift || 1), 1.1, delta);

    const bob = Math.sin(t * 1.5 + x * 0.22) * 0.07 + Math.sin(t * 0.9) * 0.04;

    boat.current.position.set(x, WATER_Y - DRAUGHT + bob, z);
    boat.current.rotation.y = yaw.current;
    boat.current.rotation.z = Math.sin(t * 1.15) * 0.05;
    boat.current.rotation.x = Math.sin(t * 1.9 + 0.7) * 0.03;

    wake.current.position.set(x, WATER_Y + 0.05, z);
    wake.current.rotation.y = yaw.current;
    const speed = Math.abs(drift);
    wake.current.scale.set(0.6 + speed * 0.4, 1, 0.2 + speed * 0.8);

    if (pennant.current) {
      pennant.current.rotation.y = Math.sin(t * 4.2) * 0.35;
    }
  });

  return (
    <group>
      <group ref={boat}>
        {/* Hull: a tapered barrel, capped with a cone for the bow. */}
        <Piece
          geometry={cylGeo(0.5, 0.74, HULL_LENGTH, 7)}
          color={PALETTE.wood}
          position={[0, 0.4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Piece
          geometry={coneGeo(0.56, 1.1, 7)}
          color={PALETTE.wood}
          position={[0, 0.4, HULL_LENGTH / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Piece
          geometry={boxGeo(1.34, 0.62, 0.16)}
          color={PALETTE.woodDark}
          position={[0, 0.5, -HULL_LENGTH / 2]}
        />

        {/* Decking and gunwales. */}
        <Piece
          geometry={boxGeo(1.35, 0.12, 4.3)}
          color={PALETTE.woodDark}
          position={[0, DECK_Y, 0]}
        />
        {/* Rails sit inboard of the widest point of the hull, or they hang in
            the air over the tapered bow. */}
        {[-1, 1].map((s) => (
          <Piece
            key={s}
            geometry={boxGeo(0.13, 0.3, 4.4)}
            color={PALETTE.roofRed}
            position={[s * 0.48, DECK_Y + 0.1, 0]}
          />
        ))}
        {[-1.4, 0.9].map((z) => (
          <Piece
            key={z}
            geometry={boxGeo(1.3, 0.1, 0.3)}
            color={PALETTE.wood}
            position={[0, DECK_Y + 0.2, z]}
            castShadow={false}
          />
        ))}

        {/* Mast, boom and a single square sail. */}
        <Piece
          geometry={cylGeo(0.08, 0.11, 4.4, 6)}
          color={PALETTE.woodDark}
          position={[0, DECK_Y + 2.2, 0.3]}
        />
        <Piece
          geometry={boxGeo(0.09, 0.09, 3.3)}
          color={PALETTE.woodDark}
          position={[0, DECK_Y + 0.32, 0.3]}
        />
        <Piece
          geometry={gableGeo(3.1, 2.9, 0.08)}
          color={PALETTE.canvas}
          position={[0.14, DECK_Y + 0.36, 0.3]}
          rotation={[0, Math.PI / 2 + 0.15, 0]}
        />
        <group ref={pennant} position={[0, DECK_Y + 4.3, 0.3]}>
          <Piece
            geometry={boxGeo(0.05, 0.26, 0.7)}
            color={PALETTE.roofRed}
            position={[0, 0, -0.35]}
            castShadow={false}
          />
        </group>

        {/* Cargo, a lantern at the stern, and an oar shipped along the rail. */}
        <Piece
          geometry={boxGeo(0.62, 0.62, 0.62)}
          color={PALETTE.canvas}
          position={[-0.28, DECK_Y + 0.37, -0.95]}
          rotation={[0, 0.3, 0]}
        />
        <Piece
          geometry={cylGeo(0.32, 0.32, 0.72, 8)}
          color={PALETTE.woodDark}
          position={[0.3, DECK_Y + 0.42, -1.6]}
        />
        <Piece
          geometry={boxGeo(0.09, 0.09, 2.4)}
          color={PALETTE.wood}
          position={[-0.6, DECK_Y + 0.36, 1.2]}
          rotation={[0, 0.06, 0.12]}
          castShadow={false}
        />
        <Piece
          geometry={cylGeo(0.07, 0.07, 1.5, 6)}
          color={PALETTE.woodDark}
          position={[0, DECK_Y + 0.85, -2]}
        />
        <Lantern position={[0, DECK_Y + 1.75, -2]} />
      </group>

      <group ref={wake}>
        <Wake />
      </group>
    </group>
  );
}
