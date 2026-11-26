import { useEffect, useState } from "react";

interface NetworkInformationLike {
  saveData?: boolean;
}

export function canStream3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  if (conn?.saveData) return false;
  return true;
}

/**
 * Defers Hero 3D loading until after Stage 0 (HTML + headline + CTAs) has
 * painted, keeping initial FCP/LCP free of Three.js & GLB contention.
 */
export function useHero3DReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canStream3D()) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;
      const win = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof win.requestIdleCallback === "function") {
        idleId = win.requestIdleCallback(() => {
          if (!cancelled) setReady(true);
        }, { timeout: 250 });
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setReady(true);
        }, 60);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (idleId !== undefined) {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return ready;
}

/**
 * Tracks desktop viewport eligibility (>= 1025px) and mounts below-the-fold
 * 3D section scenes only when scrolled within `preloadPx` of the viewport.
 */
export function useSection3D(sectionId: string, preloadPx = 750): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1025 : false
  );
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktop || inRange || !canStream3D()) return;
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInRange(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${preloadPx}px 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isDesktop, inRange, sectionId, preloadPx]);

  return isDesktop && inRange;
}
