import { useRef } from "react";
import { fireInteract, input } from "@lib/3d/input";

const RADIUS = 46;

/** Thumbstick for touch. Writes straight into the polled input object. */
export default function MobileControls({ prompt }) {
  const base = useRef();
  const knob = useRef();
  const pointerId = useRef(null);

  const setKnob = (dx, dy) => {
    if (knob.current) {
      knob.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const onPointerDown = (event) => {
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (pointerId.current !== event.pointerId || !base.current) return;
    const rect = base.current.getBoundingClientRect();
    let dx = event.clientX - (rect.left + rect.width / 2);
    let dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance > RADIUS) {
      dx = (dx / distance) * RADIUS;
      dy = (dy / distance) * RADIUS;
    }
    setKnob(dx, dy);
    input.joystick.x = dx / RADIUS;
    input.joystick.y = -dy / RADIUS;
  };

  const release = (event) => {
    if (pointerId.current !== event.pointerId) return;
    pointerId.current = null;
    setKnob(0, 0);
    input.joystick.x = 0;
    input.joystick.y = 0;
  };

  return (
    <div data-ui className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-4 sm:p-6">
      <div
        ref={base}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        className="village-joystick pointer-events-auto"
        aria-hidden="true"
      >
        <span ref={knob} className="village-joystick__knob" />
      </div>

      <button
        type="button"
        onClick={fireInteract}
        disabled={!prompt}
        className="pointer-events-auto flex h-20 w-20 flex-col items-center justify-center rounded-full border border-amber-100/40 bg-[#1c1712]/80 text-xs font-medium text-amber-50 backdrop-blur transition disabled:opacity-30"
      >
        <span className="text-lg">✋</span>
        {prompt ? prompt.action : "—"}
      </button>
    </div>
  );
}
