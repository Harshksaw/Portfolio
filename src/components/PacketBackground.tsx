import { useEffect, useRef, useState } from "react";

interface PacketBackgroundProps {
  paused: boolean;
}

type Point = [number, number];

interface TraceSpec {
  points: Point[];
  speed: number;
  offset: number;
}

const TOPOLOGY_TRACES: TraceSpec[] = [
  { points: [[0.02, 0.14], [0.16, 0.14], [0.16, 0.36], [0.36, 0.36]], speed: 0.18, offset: 0.05 },
  { points: [[0.98, 0.19], [0.83, 0.19], [0.83, 0.44], [0.64, 0.44]], speed: 0.16, offset: 0.31 },
  { points: [[0.03, 0.62], [0.22, 0.62], [0.22, 0.48], [0.4, 0.48]], speed: 0.2, offset: 0.58 },
  { points: [[0.97, 0.67], [0.78, 0.67], [0.78, 0.54], [0.59, 0.54]], speed: 0.17, offset: 0.17 },
  { points: [[0.1, 0.04], [0.1, 0.25], [0.29, 0.25]], speed: 0.22, offset: 0.44 },
  { points: [[0.9, 0.96], [0.9, 0.75], [0.7, 0.75]], speed: 0.19, offset: 0.74 },
  { points: [[0.05, 0.87], [0.28, 0.87], [0.28, 0.74], [0.43, 0.74]], speed: 0.21, offset: 0.25 },
  { points: [[0.95, 0.1], [0.72, 0.1], [0.72, 0.29], [0.56, 0.29]], speed: 0.2, offset: 0.83 },
  { points: [[0.46, 0.03], [0.46, 0.17], [0.54, 0.17], [0.54, 0.31]], speed: 0.15, offset: 0.66 },
  { points: [[0.53, 0.97], [0.53, 0.83], [0.45, 0.83], [0.45, 0.68]], speed: 0.17, offset: 0.12 },
  { points: [[0.02, 0.4], [0.12, 0.4], [0.12, 0.53]], speed: 0.24, offset: 0.51 },
  { points: [[0.98, 0.43], [0.88, 0.43], [0.88, 0.59]], speed: 0.23, offset: 0.92 },
];

function sampleTrace(points: Point[], progress: number): {
  x: number;
  y: number;
  tx: number;
  ty: number;
} {
  let total = 0;
  const segments: number[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const len = Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
    segments.push(len);
    total += len;
  }

  let dist = progress * total;
  for (let i = 0; i < segments.length; i++) {
    const segLen = segments[i];
    if (dist <= segLen || i === segments.length - 1) {
      const u = segLen > 0 ? dist / segLen : 0;
      const dx = points[i + 1][0] - points[i][0];
      const dy = points[i + 1][1] - points[i][1];
      const tailRatio = Math.max(0, u - 0.22);
      return {
        x: points[i][0] + dx * u,
        y: points[i][1] + dy * u,
        tx: points[i][0] + dx * tailRatio,
        ty: points[i][1] + dy * tailRatio,
      };
    }
    dist -= segLen;
  }

  return { x: points[0][0], y: points[0][1], tx: points[0][0], ty: points[0][1] };
}

/**
 * Resolves any CSS color string (including oklch/lab/display-p3) to sRGB 0-255 channels
 * using the browser's own 2D canvas color parser.
 */
function resolveCssColorRgb(
  ctx: CanvasRenderingContext2D,
  cssColor: string,
  fallback: [number, number, number]
): [number, number, number] {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const pctx = probe.getContext("2d");
  if (!pctx || !ctx) return fallback;
  pctx.fillStyle = cssColor;
  pctx.fillRect(0, 0, 1, 1);
  const data = pctx.getImageData(0, 0, 1, 1).data;
  if (data[3] === 0) return fallback;
  return [data[0], data[1], data[2]];
}

export default function PacketBackground({ paused }: PacketBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(wrap);
    const accentRgb = resolveCssColorRgb(ctx, styles.color, [99, 245, 125]);
    const ruleRgb = resolveCssColorRgb(ctx, styles.borderTopColor, [56, 94, 68]);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: -9999, y: -9999, active: false };

    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastDraw = 0;
    let elapsed = 0;
    let prevTs = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const trace of TOPOLOGY_TRACES) {
        const startX = trace.points[0][0] * width;
        const startY = trace.points[0][1] * height;
        const endPt = trace.points[trace.points.length - 1];
        const endX = endPt[0] * width;
        const endY = endPt[1] * height;

        const minCursorDist = pointer.active
          ? Math.min(
              Math.hypot(startX - pointer.x, startY - pointer.y),
              Math.hypot(endX - pointer.x, endY - pointer.y)
            )
          : 9999;
        const nearBoost = Math.max(0, 1 - minCursorDist / 240);

        // Orthogonal routing line (visible phosphor emerald tint, brighter near cursor)
        ctx.strokeStyle =
          nearBoost > 0.08
            ? `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${(0.22 + nearBoost * 0.45).toFixed(3)})`
            : `rgba(${ruleRgb[0]}, ${ruleRgb[1]}, ${ruleRgb[2]}, 0.58)`;
        ctx.lineWidth = nearBoost > 0.25 ? 1.5 : 1;
        ctx.beginPath();
        trace.points.forEach(([nx, ny], i) => {
          const px = Math.round(nx * width) + 0.5;
          const py = Math.round(ny * height) + 0.5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Cluster endpoint nodes (sharp square terminals)
        const nodeAlpha = 0.55 + nearBoost * 0.45;
        ctx.fillStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${nodeAlpha.toFixed(3)})`;
        ctx.fillRect(Math.round(startX) - 2, Math.round(startY) - 2, 5, 5);
        ctx.fillRect(Math.round(endX) - 2, Math.round(endY) - 2, 5, 5);

        // Telemetry packet moving along trace with bright tail + outer pulse box
        const progress = (seconds * trace.speed + trace.offset) % 1;
        const sample = sampleTrace(trace.points, progress);
        const hx = sample.x * width;
        const hy = sample.y * height;
        const tx = sample.tx * width;
        const ty = sample.ty * height;

        ctx.strokeStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.72)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.34)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(hx) - 6 + 0.5, Math.round(hy) - 6 + 0.5, 11, 11);

        ctx.fillStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.96)`;
        ctx.fillRect(Math.round(hx) - 3, Math.round(hy) - 3, 6, 6);
      }
    };

    const tick = (ts: number) => {
      rafId = 0;
      if (paused || reducedMotion || document.visibilityState === "hidden") return;

      if (prevTs === 0) prevTs = ts;
      const delta = ts - prevTs;
      prevTs = ts;

      // Throttle canvas paints to ~30fps to preserve GPU budget alongside 3D scenes
      if (ts - lastDraw >= 32) {
        elapsed += delta * 0.001;
        lastDraw = ts;
        draw(elapsed);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (paused || reducedMotion) draw(elapsed);
    };

    const onPointerLeave = () => {
      pointer.active = false;
      if (paused || reducedMotion) draw(elapsed);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !paused && !reducedMotion && !rafId) {
        prevTs = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      resize();
      draw(elapsed);
    };

    resize();
    draw(elapsed);

    if (!paused && !reducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onPointerLeave);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (finePointer) {
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("mouseleave", onPointerLeave);
      }
    };
  }, [paused, reducedMotion]);

  return (
    <div ref={wrapRef} className="packet-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
