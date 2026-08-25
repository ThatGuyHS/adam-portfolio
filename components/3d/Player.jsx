import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { boxGeo, coneGeo, cylGeo, sphereGeo } from "@components/3d/materials";
import { Piece } from "@components/3d/buildings";
import { resolveMove } from "@lib/3d/collisions";
import { consumeLook, consumeWheel, movementIntent } from "@lib/3d/input";
import { camState, flight, player } from "@lib/3d/playerState";
import { useVillage } from "@lib/3d/store";
import { BRIDGE, clamp, damp, groundY } from "@lib/3d/terrain";

const WALK_SPEED = 5.4;
const RUN_SPEED = 9.2;
const CAMERA_TARGET_HEIGHT = 1.45;

export default function Player() {
  const root = useRef();
  const legs = useRef([]);
  const arms = useRef([]);
  const { camera } = useThree();
  const smoothed = useRef(new THREE.Vector3());
  const initialised = useRef(false);
  const wasFlying = useRef(false);
  const wasOnBridge = useRef(false);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const store = useVillage.getState();
    const paused = store.overlay !== null;

    // Aboard the mail plane, Plane.jsx owns position, camera and input; the
    // walker just hides. On dismount the camera hands over from wherever the
    // chase camera left it rather than lurching back to a stale spot.
    if (flight.active) {
      if (root.current) root.current.visible = false;
      wasFlying.current = true;
      return;
    }
    if (wasFlying.current) {
      wasFlying.current = false;
      smoothed.current.copy(camera.position);
      if (root.current) root.current.visible = true;
    }

    // --- camera orbit -------------------------------------------------
    const look = consumeLook();
    camState.yaw += look.yaw;
    camState.pitch = clamp(camState.pitch + look.pitch, 0.06, 1.15);
    camState.distance = clamp(camState.distance + consumeWheel() * 0.9, 5, 20);

    // --- movement -----------------------------------------------------
    const intent = paused ? { x: 0, y: 0, running: false } : movementIntent();
    const magnitude = Math.hypot(intent.x, intent.y);
    const speed = intent.running ? RUN_SPEED : WALK_SPEED;

    const forwardX = -Math.sin(camState.yaw);
    const forwardZ = -Math.cos(camState.yaw);
    const rightX = Math.cos(camState.yaw);
    const rightZ = -Math.sin(camState.yaw);

    let moveX = forwardX * intent.y + rightX * intent.x;
    let moveZ = forwardZ * intent.y + rightZ * intent.x;

    if (magnitude > 0.02) {
      const target = Math.atan2(moveX, moveZ);
      let diff = target - player.facing;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      player.facing += diff * Math.min(1, dt * 12);

      const [nx, nz] = resolveMove(
        player.position.x,
        player.position.z,
        player.position.x + moveX * speed * dt,
        player.position.z + moveZ * speed * dt
      );
      player.position.x = nx;
      player.position.z = nz;
    }

    player.speed = damp(player.speed, magnitude * speed, 10, dt);
    player.position.y = damp(
      player.position.y,
      groundY(player.position.x, player.position.z),
      14,
      dt
    );

    // Fire once on stepping onto the bridge, not every frame spent on it.
    const onBridge =
      Math.abs(player.position.x - BRIDGE.x) < BRIDGE.halfWidth &&
      Math.abs(player.position.z) < 1.6;
    if (onBridge && !wasOnBridge.current) store.markBridgeCrossed();
    wasOnBridge.current = onBridge;

    // --- pose ---------------------------------------------------------
    if (root.current) {
      root.current.position.copy(player.position);
      root.current.rotation.y = player.facing;
    }
    const stride = player.speed * 0.42;
    const phase = performance.now() * 0.006 * Math.max(1, player.speed * 0.6);
    legs.current.forEach((leg, i) => {
      if (leg) leg.rotation.x = Math.sin(phase + i * Math.PI) * stride * 0.16;
    });
    arms.current.forEach((arm, i) => {
      if (arm) arm.rotation.x = Math.sin(phase + i * Math.PI) * stride * -0.13;
    });

    // --- camera follow ------------------------------------------------
    const horizontal = Math.cos(camState.pitch) * camState.distance;
    const desiredX = player.position.x + Math.sin(camState.yaw) * horizontal;
    const desiredZ = player.position.z + Math.cos(camState.yaw) * horizontal;
    const desiredY =
      player.position.y + Math.sin(camState.pitch) * camState.distance + 0.8;

    if (!initialised.current) {
      smoothed.current.set(desiredX, desiredY, desiredZ);
      initialised.current = true;
    } else {
      smoothed.current.x = damp(smoothed.current.x, desiredX, 7, dt);
      smoothed.current.y = damp(smoothed.current.y, desiredY, 7, dt);
      smoothed.current.z = damp(smoothed.current.z, desiredZ, 7, dt);
    }

    const floor = groundY(smoothed.current.x, smoothed.current.z) + 1.3;
    camera.position.set(
      smoothed.current.x,
      Math.max(smoothed.current.y, floor),
      smoothed.current.z
    );
    camera.lookAt(
      player.position.x,
      player.position.y + CAMERA_TARGET_HEIGHT,
      player.position.z
    );
  });

  return (
    <group ref={root}>
      {[-0.17, 0.17].map((offset, i) => (
        <group
          key={offset}
          ref={(el) => (legs.current[i] = el)}
          position={[offset, 0.74, 0]}
        >
          <Piece geometry={boxGeo(0.25, 0.74, 0.27)} color="#3c4763" position={[0, -0.37, 0]} />
          <Piece geometry={boxGeo(0.27, 0.16, 0.4)} color="#4a3423" position={[0, -0.72, 0.06]} castShadow={false} />
        </group>
      ))}
      <group position={[0, 0.95, 0]}>
        <Piece geometry={cylGeo(0.33, 0.4, 0.84, 7)} color="#2f7f8f" />
        <Piece geometry={boxGeo(0.54, 0.14, 0.54)} color="#c9a227" position={[0, -0.36, 0]} castShadow={false} />
        {[-0.38, 0.38].map((offset, i) => (
          <group
            key={offset}
            ref={(el) => (arms.current[i] = el)}
            position={[offset, 0.3, 0]}
          >
            <Piece geometry={boxGeo(0.17, 0.64, 0.19)} color="#2f7f8f" position={[0, -0.32, 0]} />
            <Piece geometry={sphereGeo(0.11, 6)} color="#e8b98c" position={[0, -0.68, 0]} castShadow={false} />
          </group>
        ))}
        <Piece geometry={sphereGeo(0.28, 8)} color="#e8b98c" position={[0, 0.64, 0]} />
        <Piece geometry={coneGeo(0.34, 0.36, 8)} color="#9c4a3c" position={[0, 0.9, 0]} />
        <Piece geometry={cylGeo(0.46, 0.46, 0.05, 9)} color="#9c4a3c" position={[0, 0.79, 0]} castShadow={false} />
        {/* Satchel — every traveller carries one. */}
        <Piece geometry={boxGeo(0.36, 0.34, 0.2)} color="#6b4a2a" position={[0, -0.1, -0.32]} />
      </group>
    </group>
  );
}
