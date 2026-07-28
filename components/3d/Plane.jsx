import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AIRSTRIP, PALETTE } from "@constants/worldData";
import {
  WALK_BOUNDS,
  clamp,
  damp,
  flightGroundY,
  groundY,
  isWater,
} from "@lib/3d/terrain";
import { resolveMove } from "@lib/3d/collisions";
import { boxGeo, coneGeo, cylGeo, sphereGeo } from "@components/3d/materials";
import { Piece } from "@components/3d/buildings";
import { GroundPatch } from "@components/3d/props";
import { consumeLook, consumeWheel, movementIntent } from "@lib/3d/input";
import { camState, flight, player } from "@lib/3d/playerState";
import { useVillage } from "@lib/3d/store";

// The mail plane: press E on the strip to take off, W/S to climb and dive,
// A/D to bank, E again to land wherever there's grass. Arcade rules — the
// plane refuses to hit the ground, the ceiling, or the edge of the world, so
// the worst flight ends in mild embarrassment rather than a crash.
const CRUISE = 16;
const BOOST = 23;
const CLIMB = 6.5;
const TURN_RATE = 1.15;
const CEILING = 40;
const FLOOR_CLEARANCE = 2.4; // metres kept between belly and terrain
// An ellipse over the outlands, sized so the mountain ring stays scenery.
const BOUNDS = { x: 290, z: 230 };
const STILL = { x: 0, y: 0, running: false };

// Landing needs dry ground and enough margin that the pilot steps out inside
// the walkable world rather than pinned against its edge.
const canLand = (x, z) =>
  !isWater(x, z) &&
  Math.abs(x) < WALK_BOUNDS.halfX - 1 &&
  Math.abs(z) < WALK_BOUNDS.halfZ - 1;

/** Turn toward a heading the short way round instead of unwinding full turns. */
function steer(p, targetYaw, rate, dt) {
  let diff = targetYaw - p.yaw;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  p.yaw += diff * Math.min(1, rate * dt);
}

/** Put the pilot back on their feet beside wherever the plane rolled to a stop. */
function dismount(p) {
  flight.active = false;
  useVillage.getState().setFlying(false);

  const sideX = Math.cos(p.yaw);
  const sideZ = -Math.sin(p.yaw);
  const spots = [
    [p.x + sideX * 2, p.z + sideZ * 2],
    [p.x - sideX * 2, p.z - sideZ * 2],
    [p.x - Math.sin(p.yaw) * 2.8, p.z - Math.cos(p.yaw) * 2.8],
  ];
  let [px, pz] = spots.find(([x, z]) => canLand(x, z)) ?? [p.x, p.z];
  [px, pz] = resolveMove(p.x, p.z, px, pz);

  player.position.set(px, groundY(px, pz), pz);
  player.speed = 0;
  player.facing = p.yaw;
  camState.yaw = p.yaw + Math.PI; // walking camera picks up behind the pilot
  camState.pitch = 0.42;
}

/** The strip itself: dirt patches, a windsock and the freight waiting on it. */
function Airstrip({ sock }) {
  const sockX = AIRSTRIP.x + 3.5;
  const sockZ = AIRSTRIP.z - 2.5;
  const sockY = groundY(sockX, sockZ);
  return (
    <group>
      {[-6, 0, 6].map((dx) => (
        <GroundPatch
          key={dx}
          radius={3.4}
          position={[AIRSTRIP.x + dx, 0, AIRSTRIP.z]}
        />
      ))}
      <group position={[sockX, sockY, sockZ]}>
        <Piece geometry={cylGeo(0.06, 0.09, 3.1, 6)} color={PALETTE.woodDark} position={[0, 1.55, 0]} />
        <group ref={sock} position={[0, 2.95, 0]}>
          <Piece
            geometry={coneGeo(0.24, 1.1, 7)}
            color={PALETTE.gold}
            position={[0, 0, -0.55]}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow={false}
          />
        </group>
        <Piece geometry={boxGeo(0.62, 0.62, 0.62)} color={PALETTE.canvas} position={[0.8, 0.31, 0.7]} rotation={[0, 0.4, 0]} />
        <Piece geometry={cylGeo(0.3, 0.3, 0.66, 8)} color={PALETTE.woodDark} position={[-0.6, 0.33, 0.5]} />
      </group>
    </group>
  );
}

export default function Plane() {
  const group = useRef();
  const prop = useRef();
  const pilot = useRef();
  const sock = useRef();
  const { camera } = useThree();
  const cam = useRef(null); // smoothed chase-cam position, seeded on boarding
  const pose = useRef({
    x: AIRSTRIP.x,
    z: AIRSTRIP.z,
    y: groundY(AIRSTRIP.x, AIRSTRIP.z),
    yaw: AIRSTRIP.yaw,
    speed: 0,
    vy: 0,
    bank: 0,
    tilt: 0,
    dwell: 0,
  });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = pose.current;
    const paused = useVillage.getState().overlay !== null;

    if (sock.current) {
      sock.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.3 - 0.4;
    }

    if (flight.active && flight.phase === "parked") {
      flight.phase = "takeoff";
      cam.current = camera.position.clone();
    }

    const intent = flight.active && !paused ? movementIntent() : STILL;

    switch (flight.phase) {
      case "takeoff": {
        p.speed = Math.min(p.speed + 7 * dt, CRUISE);
        const ground = groundY(p.x, p.z);
        if (p.speed > CRUISE * 0.72) p.vy = damp(p.vy, CLIMB * 0.9, 3, dt);
        p.y = Math.max(p.y + p.vy * dt, ground);
        if (p.y > ground + 8) flight.phase = "flying";
        break;
      }
      case "flying": {
        p.speed = damp(p.speed, intent.running ? BOOST : CRUISE, 2.5, dt);
        p.yaw -= intent.x * TURN_RATE * dt;
        p.vy = damp(p.vy, intent.y * CLIMB, 4, dt);
        p.y = Math.min(p.y + p.vy * dt, CEILING);
        const floor = flightGroundY(p.x, p.z) + FLOOR_CLEARANCE;
        if (p.y < floor) {
          p.y = damp(p.y, floor, 10, dt);
          if (p.vy < 0) p.vy = 0;
        }
        if (flight.landRequested) {
          flight.landRequested = false;
          if (canLand(p.x, p.z)) flight.phase = "landing";
        }
        break;
      }
      case "landing": {
        const ground = groundY(p.x, p.z);
        p.vy = 0;
        p.speed = damp(p.speed, 5, 1.6, dt);
        p.y = damp(p.y, ground, 2.4, dt);
        if (p.y - ground < 0.15) {
          p.y = ground;
          p.speed = damp(p.speed, 0, 4, dt);
          if (p.speed < 0.7) {
            p.speed = 0;
            p.dwell = 0;
            dismount(p);
            flight.phase = "dwell";
          }
        }
        break;
      }
      case "dwell": {
        // A breather on the ground before the plane heads home by itself.
        p.dwell += dt;
        if (p.dwell > 2.4) flight.phase = "returning";
        break;
      }
      case "returning": {
        const dx = AIRSTRIP.x - p.x;
        const dz = AIRSTRIP.z - p.z;
        const dist = Math.hypot(dx, dz);
        const padY = groundY(AIRSTRIP.x, AIRSTRIP.z);
        if (dist > 3) {
          steer(p, Math.atan2(dx, dz), 1.6, dt);
          p.speed = damp(p.speed, Math.min(CRUISE * 0.8, 4 + dist * 0.5), 1.8, dt);
          const cruiseY = Math.max(flightGroundY(p.x, p.z) + 7, padY + 3);
          p.y = damp(p.y, dist > 16 ? cruiseY : padY + dist * 0.4, 1.7, dt);
        } else {
          p.speed = 0;
          steer(p, AIRSTRIP.yaw, 2.5, dt);
          p.x = damp(p.x, AIRSTRIP.x, 2.5, dt);
          p.z = damp(p.z, AIRSTRIP.z, 2.5, dt);
          p.y = damp(p.y, padY, 2.5, dt);
          if (dist < 0.15 && Math.abs(p.y - padY) < 0.1) {
            p.x = AIRSTRIP.x;
            p.z = AIRSTRIP.z;
            p.y = padY;
            p.yaw = AIRSTRIP.yaw;
            flight.phase = "parked";
          }
        }
        break;
      }
      default:
        break;
    }

    // Forward motion, common to every phase that has any speed on.
    if (p.speed > 0.01) {
      let nx = p.x + Math.sin(p.yaw) * p.speed * dt;
      let nz = p.z + Math.cos(p.yaw) * p.speed * dt;
      const edge = Math.hypot(nx / BOUNDS.x, nz / BOUNDS.z);
      if (edge > 1) {
        nx /= edge;
        nz /= edge;
      }
      if (flight.phase === "landing" && isWater(nx, nz)) {
        p.speed = 0; // rolled out to the waterline — good enough, stop here
      } else {
        p.x = nx;
        p.z = nz;
      }
    }

    // Pose: bank into turns, pitch with the climb.
    p.bank = damp(p.bank, flight.phase === "flying" ? intent.x * 0.5 : 0, 4, dt);
    p.tilt = damp(p.tilt, clamp(-p.vy * 0.05, -0.4, 0.4), 4, dt);

    if (group.current) {
      group.current.position.set(p.x, p.y, p.z);
      group.current.rotation.set(p.tilt, p.yaw, p.bank, "YXZ");
    }
    if (prop.current && flight.phase !== "parked") {
      prop.current.rotation.z += dt * (10 + p.speed * 6);
    }
    if (pilot.current) pilot.current.visible = flight.active;

    // While aboard, the plane drives the player position and the chase camera;
    // Player.jsx sees flight.active and stands aside.
    if (flight.active) {
      player.position.set(p.x, p.y, p.z);
      player.facing = p.yaw;
      player.speed = p.speed;

      consumeLook(); // drags steer nothing up here; don't let them pile up
      camState.distance = clamp(camState.distance + consumeWheel() * 0.9, 5, 20);

      const dist = camState.distance;
      const c = cam.current;
      c.x = damp(c.x, p.x - Math.sin(p.yaw) * dist, 5, dt);
      c.y = damp(c.y, p.y + 2.4 + dist * 0.3, 5, dt);
      c.z = damp(c.z, p.z - Math.cos(p.yaw) * dist, 5, dt);
      camera.position.set(c.x, Math.max(c.y, flightGroundY(c.x, c.z) + 1.2), c.z);
      camera.lookAt(
        p.x + Math.sin(p.yaw) * 4,
        p.y + 1,
        p.z + Math.cos(p.yaw) * 4
      );
    }
  });

  return (
    <group>
      <Airstrip sock={sock} />

      {/* Nose along local +Z, wheels touching local y = 0, same convention as
          the boat: rotation.y = yaw faces it along its own velocity. */}
      <group ref={group}>
        {/* Fuselage, cowl, spinner and propeller. */}
        <Piece
          geometry={cylGeo(0.5, 0.32, 3.4, 8)}
          color={PALETTE.roofRed}
          position={[0, 1.02, 0.1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Piece
          geometry={cylGeo(0.48, 0.51, 0.5, 8)}
          color={PALETTE.stoneDark}
          position={[0, 1.02, 1.95]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <group ref={prop} position={[0, 1.02, 2.24]}>
          <Piece
            geometry={coneGeo(0.15, 0.3, 6)}
            color={PALETTE.gold}
            position={[0, 0, 0.12]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow={false}
          />
          <Piece geometry={boxGeo(0.13, 1.9, 0.07)} color={PALETTE.woodDark} castShadow={false} />
          <Piece
            geometry={boxGeo(0.13, 1.9, 0.07)}
            color={PALETTE.woodDark}
            rotation={[0, 0, Math.PI / 2]}
            castShadow={false}
          />
        </group>

        {/* High wing on struts, red tips so it reads at a distance. */}
        <Piece geometry={boxGeo(7.4, 0.14, 1.6)} color={PALETTE.canvas} position={[0, 1.85, 0.35]} />
        {[-3.55, 3.55].map((x) => (
          <Piece
            key={x}
            geometry={boxGeo(0.5, 0.15, 1.6)}
            color={PALETTE.roofRed}
            position={[x, 1.85, 0.35]}
            castShadow={false}
          />
        ))}
        {[-1, 1].map((s) => (
          <Piece
            key={s}
            geometry={boxGeo(0.09, 0.95, 0.09)}
            color={PALETTE.woodDark}
            position={[s * 1.05, 1.4, 0.55]}
            rotation={[0, 0, s * -0.55]}
          />
        ))}

        {/* Open cockpit: windshield, and the pilot who appears when you do. */}
        <Piece
          geometry={boxGeo(0.72, 0.34, 0.06)}
          color="#cfe8ec"
          options={{ opacity: 0.55, transparent: true }}
          position={[0, 1.52, 0.78]}
          rotation={[-0.35, 0, 0]}
          castShadow={false}
        />
        <group ref={pilot} position={[0, 1.28, 0.15]} visible={false}>
          <Piece geometry={cylGeo(0.24, 0.28, 0.5, 7)} color="#2f7f8f" position={[0, 0.1, 0]} />
          <Piece geometry={sphereGeo(0.22, 8)} color="#e8b98c" position={[0, 0.52, 0]} />
          <Piece geometry={coneGeo(0.28, 0.3, 8)} color="#9c4a3c" position={[0, 0.73, 0]} />
        </group>

        {/* Tail feathers. */}
        <Piece geometry={boxGeo(0.1, 0.88, 0.72)} color={PALETTE.roofRed} position={[0, 1.72, -1.7]} />
        <Piece geometry={boxGeo(2.3, 0.1, 0.78)} color={PALETTE.canvas} position={[0, 1.32, -1.68]} />

        {/* Undercarriage: two wheels and a tail skid. */}
        {[-1, 1].map((s) => (
          <group key={s}>
            <Piece
              geometry={cylGeo(0.3, 0.3, 0.16, 10)}
              color={PALETTE.stoneDark}
              position={[s * 0.78, 0.3, 0.55]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <Piece
              geometry={boxGeo(0.09, 0.6, 0.09)}
              color={PALETTE.woodDark}
              position={[s * 0.6, 0.6, 0.55]}
              rotation={[0, 0, s * 0.35]}
            />
          </group>
        ))}
        <Piece geometry={boxGeo(0.08, 0.34, 0.08)} color={PALETTE.woodDark} position={[0, 0.2, -1.6]} rotation={[0.5, 0, 0]} castShadow={false} />

        {/* The mail itself, lashed behind the cockpit. */}
        <Piece geometry={boxGeo(0.5, 0.36, 0.6)} color={PALETTE.canvas} position={[0, 1.4, -0.7]} rotation={[0, 0.12, 0]} />
      </group>
    </group>
  );
}
