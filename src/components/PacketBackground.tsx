import { useEffect, useRef, useState } from "react";

type Point = [number, number];

interface TraceSpec {
  points: Point[];
  speed: number;
  offset: number;
  baseHue: number;
}

// Sci-fi spectral hues rotating smoothly across emerald phosphor, cyan, violet, magenta, and solar gold
const TOPOLOGY_TRACES: TraceSpec[] = [
  { points: [[0.02, 0.14], [0.16, 0.14], [0.16, 0.36], [0.36, 0.36]], speed: 0.18, offset: 0.05, baseHue: 142 },
  { points: [[0.98, 0.19], [0.83, 0.19], [0.83, 0.44], [0.64, 0.44]], speed: 0.16, offset: 0.31, baseHue: 186 },
  { points: [[0.03, 0.62], [0.22, 0.62], [0.22, 0.48], [0.4, 0.48]], speed: 0.2, offset: 0.58, baseHue: 278 },
  { points: [[0.97, 0.67], [0.78, 0.67], [0.78, 0.54], [0.59, 0.54]], speed: 0.17, offset: 0.17, baseHue: 318 },
  { points: [[0.1, 0.04], [0.1, 0.25], [0.29, 0.25]], speed: 0.22, offset: 0.44, baseHue: 168 },
  { points: [[0.9, 0.96], [0.9, 0.75], [0.7, 0.75]], speed: 0.19, offset: 0.74, baseHue: 46 },
  { points: [[0.05, 0.87], [0.28, 0.87], [0.28, 0.74], [0.43, 0.74]], speed: 0.21, offset: 0.25, baseHue: 196 },
  { points: [[0.95, 0.1], [0.72, 0.1], [0.72, 0.29], [0.56, 0.29]], speed: 0.2, offset: 0.83, baseHue: 292 },
  { points: [[0.46, 0.03], [0.46, 0.17], [0.54, 0.17], [0.54, 0.31]], speed: 0.15, offset: 0.66, baseHue: 154 },
  { points: [[0.53, 0.97], [0.53, 0.83], [0.45, 0.83], [0.45, 0.68]], speed: 0.17, offset: 0.12, baseHue: 205 },
  { points: [[0.02, 0.4], [0.12, 0.4], [0.12, 0.53]], speed: 0.24, offset: 0.51, baseHue: 264 },
  { points: [[0.98, 0.43], [0.88, 0.43], [0.88, 0.59]], speed: 0.23, offset: 0.92, baseHue: 132 },
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
      const tailRatio = Math.max(0, u - 0.24);
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
    const ruleRgb = resolveCssColorRgb(styles.borderTopColor, [56, 94, 68]);

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

        const progress = (seconds * trace.speed + trace.offset) % 1;
        // Continuous sci-fi hue drift across trace phase and time
        const hue = Math.round((trace.baseHue + seconds * 36 + progress * 90) % 360);
        const tailHue = Math.round((hue + 320) % 360);

        // Orthogonal routing line, catching spectral tint near packets/cursor
        ctx.strokeStyle =
          nearBoost > 0.08
            ? `hsla(${hue}, 92%, 68%, ${(0.24 + nearBoost * 0.5).toFixed(3)})`
            : `rgba(${ruleRgb[0]}, ${ruleRgb[1]}, ${ruleRgb[2]}, 0.55)`;
        ctx.lineWidth = nearBoost > 0.25 ? 1.5 : 1;
        ctx.beginPath();
        trace.points.forEach(([nx, ny], i) => {
          const px = Math.round(nx * width) + 0.5;
          const py = Math.round(ny * height) + 0.5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Cluster endpoint pads catching active sci-fi hue
        const nodeAlpha = 0.55 + nearBoost * 0.45;
        ctx.fillStyle = `hsla(${hue}, 92%, 68%, ${nodeAlpha.toFixed(3)})`;
        ctx.fillRect(Math.round(startX) - 2, Math.round(startY) - 2, 5, 5);
        ctx.fillRect(Math.round(endX) - 2, Math.round(endY) - 2, 5, 5);

        // Sci-fi spectral moving telemetry packet dot + trailing beam + targeting reticle
        const sample = sampleTrace(trace.points, progress);
        const hx = sample.x * width;
        const hy = sample.y * height;
        const tx = sample.tx * width;
        const ty = sample.ty * height;

        const beamGrad = ctx.createLinearGradient(tx, ty, hx, hy);
        beamGrad.addColorStop(0, `hsla(${tailHue}, 95%, 64%, 0)`);
        beamGrad.addColorStop(1, `hsla(${hue}, 95%, 70%, 0.85)`);

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // Outer square targeting reticle + subtle aura glow
        ctx.strokeStyle = `hsla(${hue}, 95%, 70%, 0.42)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(hx) - 6 + 0.5, Math.round(hy) - 6 + 0.5, 11, 11);

        // Core packet dot shifting smoothly across hues
        ctx.fillStyle = `hsla(${hue}, 98%, 74%, 0.98)`;
        ctx.fillRect(Math.round(hx) - 3, Math.round(hy) - 3, 6, 6);
      }
    };

    const tick = (ts: number) => {
      rafId = 0;
      if (reducedMotion || document.visibilityState === "hidden") return;

      if (prevTs === 0) prevTs = ts;
      const delta = ts - prevTs;
      prevTs = ts;

      // Throttle to ~30fps so GPU headroom remains dedicated to hero/section 3D scenes
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
      if (reducedMotion) draw(elapsed);
    };

    const onPointerLeave = () => {
      pointer.active = false;
      if (reducedMotion) draw(elapsed);
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
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="packet-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
