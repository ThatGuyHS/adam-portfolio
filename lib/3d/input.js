// Keyboard, pointer-drag and virtual-joystick input, collected into one polled
// object. Movement is polled per frame; "interact" is an edge event, so it goes
// through subscribers instead — otherwise holding E would reopen a dialogue the
// moment you closed it.

export const input = {
  keys: new Set(),
  joystick: { x: 0, y: 0 },
  yawDelta: 0,
  pitchDelta: 0,
  dragging: false,
};

const interactSubscribers = new Set();

export function onInteract(fn) {
  interactSubscribers.add(fn);
  return () => interactSubscribers.delete(fn);
}

export function fireInteract() {
  interactSubscribers.forEach((fn) => fn());
}

const FORWARD_KEYS = ["w", "arrowup"];
const BACK_KEYS = ["s", "arrowdown"];
const LEFT_KEYS = ["a", "arrowleft"];
const RIGHT_KEYS = ["d", "arrowright"];

const held = (list) => list.some((k) => input.keys.has(k));

/** Movement intent in local space: x = strafe, y = forward. Length <= 1. */
export function movementIntent() {
  let x = input.joystick.x;
  let y = input.joystick.y;
  if (held(FORWARD_KEYS)) y += 1;
  if (held(BACK_KEYS)) y -= 1;
  if (held(RIGHT_KEYS)) x += 1;
  if (held(LEFT_KEYS)) x -= 1;
  const len = Math.hypot(x, y);
  if (len > 1) {
    x /= len;
    y /= len;
  }
  return { x, y, running: input.keys.has("shift") };
}

export function consumeLook() {
  const yaw = input.yawDelta;
  const pitch = input.pitchDelta;
  input.yawDelta = 0;
  input.pitchDelta = 0;
  return { yaw, pitch };
}

export function clearKeys() {
  input.keys.clear();
  input.joystick.x = 0;
  input.joystick.y = 0;
}

/**
 * @param {HTMLElement} element surface that captures look-drags
 * @param {() => boolean} isBlocked true while a panel owns the keyboard
 */
export function attachControls(element, isBlocked) {
  const blocked = () => (isBlocked ? isBlocked() : false);

  const onKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (blocked()) return;
    if (key === "e" || key === "enter" || key === " ") {
      e.preventDefault();
      fireInteract();
      return;
    }
    if (
      FORWARD_KEYS.includes(key) ||
      BACK_KEYS.includes(key) ||
      LEFT_KEYS.includes(key) ||
      RIGHT_KEYS.includes(key)
    ) {
      e.preventDefault();
    }
    input.keys.add(key);
  };

  const onKeyUp = (e) => input.keys.delete(e.key.toLowerCase());
  const onBlur = () => clearKeys();

  let pointerId = null;
  let lastX = 0;
  let lastY = 0;

  const onPointerDown = (e) => {
    if (e.target.closest("[data-ui]")) return;
    pointerId = e.pointerId;
    lastX = e.clientX;
    lastY = e.clientY;
    input.dragging = true;
    element.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (pointerId !== e.pointerId) return;
    input.yawDelta -= (e.clientX - lastX) * 0.005;
    input.pitchDelta -= (e.clientY - lastY) * 0.004;
    lastX = e.clientX;
    lastY = e.clientY;
  };

  const endPointer = (e) => {
    if (pointerId !== e.pointerId) return;
    pointerId = null;
    input.dragging = false;
    element.releasePointerCapture?.(e.pointerId);
  };

  const onWheel = (e) => {
    if (blocked()) return;
    input.wheel = (input.wheel || 0) + Math.sign(e.deltaY);
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);
  element.addEventListener("pointerdown", onPointerDown);
  element.addEventListener("pointermove", onPointerMove);
  element.addEventListener("pointerup", endPointer);
  element.addEventListener("pointercancel", endPointer);
  element.addEventListener("wheel", onWheel, { passive: true });

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("pointermove", onPointerMove);
    element.removeEventListener("pointerup", endPointer);
    element.removeEventListener("pointercancel", endPointer);
    element.removeEventListener("wheel", onWheel);
    clearKeys();
  };
}

export function consumeWheel() {
  const w = input.wheel || 0;
  input.wheel = 0;
  return w;
}
