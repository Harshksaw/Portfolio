import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Item = { shortTitle: string };
type Props = {
  projects: Item[];
  /** Which item should be centered initially (default 2 for middle item) */
  initialIndex?: number;
  /** Left-arc radius in px (auto-resizes if omitted) */
  radius?: number;
  /** Called when selection changes (after snap or click) */
  onChange?: (index: number) => void;
  /** Optional: container className */
  className?: string;
};

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}
/** keep angle on LEFT semicircle [90°, 270°] so the layout never flips */
function foldToLeft(angle: number) {
  while (angle < 90) angle += 180;
  while (angle > 270) angle -= 180;
  return angle;
}

export default function SemiCircularDial({
  projects,
  initialIndex = 2, // Default to middle item (3rd item, index 2)
  radius: radiusProp,
  onChange,
  className = "",
}: Props) {
  const N = Math.max(1, projects.length);
  // spacing: true left-semicircle distribution
  const step = N > 1 ? 180 / (N - 1) : 180;
  const FOCUS = 180; // center of left arc

  // offset: which index is currently centered (continuous; integers = exact index)
  const [offset, setOffset] = useState<number>(initialIndex);
  const offsetRef = useRef(offset);
  offsetRef.current = offset;

  // active index (use state, not ref in deps)
  const activeIndex = useMemo(() => mod(Math.round(offset), N), [N, offset]);

  // keep offset in sync if initialIndex prop changes
  useEffect(() => { setOffset(initialIndex); }, [initialIndex]);

  // radius (responsive if not provided)
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number>(radiusProp ?? 180);
  useEffect(() => {
    if (radiusProp) {
      setRadius(radiusProp);
      return;
    }
    const el = wrapRef.current?.parentElement ?? wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = el.clientHeight || window.innerHeight;
      setRadius(clamp(Math.round(h * 0.35), 120, 240));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [radiusProp]);

  // simple RAF tween for snapping/keyboard/click
  const rafRef = useRef<number | null>(null);
  const animateToOffset = useCallback((target: number, ms = 260) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = offsetRef.current;
    const delta = target - from;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const tick = (now: number) => {
      const t = clamp((now - start) / ms, 0, 1);
      setOffset(from + delta * ease(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const snapToNearest = useCallback(() => {
    const nearest = Math.round(offsetRef.current);
    animateToOffset(nearest);
    onChange?.(mod(nearest, N));
  }, [animateToOffset, onChange, N]);

  // wheel rotate (debounced snap)
  const wheelTimer = useRef<number | null>(null);
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      // tweak sensitivity; positive deltaY rotates "downwards"
      setOffset((prev) => prev + e.deltaY * 0.01);
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => snapToNearest(), 140);
    },
    [snapToNearest]
  );

  // drag rotate (vertical)
  const drag = useRef<{ y0: number; start: number; dragging: boolean }>({
    y0: 0,
    start: 0,
    dragging: false,
  });
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { y0: e.clientY, start: offsetRef.current, dragging: true };
  }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    const dy = e.clientY - drag.current.y0; // drag down moves forward
    setOffset(drag.current.start + dy / 40); // sensitivity
  }, []);
  const onPointerUp = useCallback(() => {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    snapToNearest();
  }, [snapToNearest]);

  // keyboard
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        animateToOffset(Math.round(offsetRef.current) - 1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        animateToOffset(Math.round(offsetRef.current) + 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange?.(activeIndex);
      }
    },
    [animateToOffset, onChange, activeIndex]
  );

  const cx = radius;
  const cy = radius;

  // Adjusting layout to move items more to the right and ensure the middle one is selected
  return (
    <div className={`flex items-center ${className} absolute -right-10 top-30`}>
      {/* LEFT ARC */}
      <div
        ref={wrapRef}
        role="listbox"
        aria-activedescendant={`dial-opt-${activeIndex}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative select-none outline-none"
        style={{
          width: `${radius}px`,
          height: `${radius * 2}px`, // container should be a full left semicircle in height
          marginLeft: "10px", // Move items more to the right
        }}
      >
        {/* optional guide line for center */}
        <div
          aria-hidden
          className="absolute inset-0 border-l border-dashed border-neutral-300"
          style={{ left: cx }}
        />

        {projects.map((proj, idx) => {
          // angle formula: center on FOCUS (not 90°)
          const rawAngle = FOCUS + (idx - offset) * step;
          const angle = foldToLeft(rawAngle);
          const rad = deg2rad(angle);
          const x = cx + radius * Math.cos(rad);
          const y = cy + radius * Math.sin(rad);

          const isActive = idx === activeIndex;

          const scale = isActive ? 1.2 : 1; // Emphasize the middle one
          const opacity = isActive ? 1 : 0.8; // Highlight the middle one
          const zIndex = isActive ? 200 : 100; // Ensure the middle one is on top

          return (
            <button
              key={idx}
              id={`dial-opt-${idx}`}
              role="option"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                animateToOffset(idx);
                onChange?.(idx);
              }}
              className="absolute w-40 lg:w-48 text-left"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <div
                className={[
                  "rounded-full flex items-start gap-3 transition-all p-3 duration-300 cursor-pointer",
                  isActive ? "bg-neutral-200" : "bg-white",
                  "shadow-sm",
                ].join(" ")}
              >
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-black text-white">
                  {idx + 1}
                </div>
                <p className="font-semibold text-sm">{proj.shortTitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}