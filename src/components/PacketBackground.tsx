import { useEffect, useRef, useState } from "react";

type Point = [number, number];

interface TraceSpec {
  points: Point[];
  speed: number;
  offset: number;
}

const PACKET_TRACES: TraceSpec[] = [
  { points: [[0.03, 0.16], [0.18, 0.16], [0.18, 0.38], [0.36, 0.38]], speed: 0.16, offset: 0.06 },
  { points: [[0.97, 0.21], [0.82, 0.21], [0.82, 0.45], [0.64, 0.45]], speed: 0.14, offset: 0.32 },
  { points: [[0.04, 0.68], [0.22, 0.68], [0.22, 0.52], [0.4, 0.52]], speed: 0.18, offset: 0.58 },
  { points: [[0.96, 0.72], [0.78, 0.72], [0.78, 0.56], [0.59, 0.56]], speed: 0.15, offset: 0.2 },
  { points: [[0.12, 0.05], [0.12, 0.27], [0.3, 0.27]], speed: 0.19, offset: 0.47 },
  { points: [[0.88, 0.94], [0.88, 0.75], [0.7, 0.75]], speed: 0.17, offset: 0.79 },
];

function sampleTrace(points: Point[], progress: number): [number, number] {
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
      return [
        points[i][0] + (points[i + 1][0] - points[i][0]) * u,
        points[i][1] + (points[i + 1][1] - points[i][1]) * u,
      ];
    }
    dist -= segLen;
  }

  return points[0];
}

function resolveCssColorRgb(
  cssColor: string,
  fallback: [number, number, number]
): [number, number, number] {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const pctx = probe.getContext("2d");
  if (!pctx) return fallback;
  pctx.fillStyle = cssColor;
  pctx.fillRect(0, 0, 1, 1);
  const data = pctx.getImageData(0, 0, 1, 1).data;
  if (data[3] === 0) return fallback;
  return [data[0], data[1], data[2]];
}

export default function PacketBackground() {
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
    const accentRgb = resolveCssColorRgb(styles.color, [99, 245, 125]);
    const ruleRgb = resolveCssColorRgb(styles.borderTopColor, [56, 94, 68]);

    // Precompute cached single-color phosphor styles once (zero per-frame allocations)
    const traceColor = `rgba(${ruleRgb[0]}, ${ruleRgb[1]}, ${ruleRgb[2]}, 0.55)`;
    const nodeColor = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.55)`;
    const packetColor = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.96)`;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let elapsed = 0;
    let prevTs = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    };

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = traceColor;
      ctx.lineWidth = 1;
      for (const trace of PACKET_TRACES) {
        ctx.beginPath();
        trace.points.forEach(([nx, ny], i) => {
          const px = Math.round(nx * width) + 0.5;
          const py = Math.round(ny * height) + 0.5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      ctx.fillStyle = nodeColor;
      for (const trace of PACKET_TRACES) {
        const start = trace.points[0];
        const end = trace.points[trace.points.length - 1];
        ctx.fillRect(Math.round(start[0] * width) - 2, Math.round(start[1] * height) - 2, 5, 5);
        ctx.fillRect(Math.round(end[0] * width) - 2, Math.round(end[1] * height) - 2, 5, 5);
      }

      ctx.fillStyle = packetColor;
      for (const trace of PACKET_TRACES) {
        const progress = (seconds * trace.speed + trace.offset) % 1;
        const [px, py] = sampleTrace(trace.points, progress);
        ctx.fillRect(Math.round(px * width) - 3, Math.round(py * height) - 3, 6, 6);
      }
    };

    const tick = (ts: number) => {
      rafId = 0;
      if (reducedMotion || document.visibilityState === "hidden") return;

      if (prevTs === 0) prevTs = ts;
      const delta = Math.min(ts - prevTs, 50);
      prevTs = ts;
      elapsed += delta * 0.001;

      draw(elapsed);
      rafId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !reducedMotion && !rafId) {
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

    if (!reducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="packet-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
