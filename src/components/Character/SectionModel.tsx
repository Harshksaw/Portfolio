import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import setLighting from "./utils/lighting";
import {
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
  handleHeadRotation,
} from "./utils/mouseUtils";

export interface SectionHandles {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  section: HTMLElement | null;
  lights: ReturnType<typeof setLighting>;
  isCancelled: () => boolean;
}

export interface LoadedModel {
  object: THREE.Object3D;
  mixers?: THREE.AnimationMixer[];
  headBone?: THREE.Object3D | null;
  onFrame?: (delta: number, mouse: { x: number; y: number }) => void;
  onReady?: (h: SectionHandles) => void;
  scrollScene?: (h: SectionHandles) => void;
  onDispose?: () => void;
}

export interface CameraConfig {
  fov?: number;
  position?: [number, number, number];
  zoom?: number;
  lookAt?: [number, number, number];
}

export interface SectionModelProps extends PropsWithChildren {
  className?: string;
  sectionSelector: string;
  camera?: CameraConfig;
  rimSelector?: string;
  load: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) => Promise<LoadedModel | null>;
}

const SectionModel = ({
  className = "",
  sectionSelector,
  camera: cameraConfig,
  rimSelector,
  load,
  children,
}: SectionModelProps) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;

    let cancelled = false;
    const rect = container.getBoundingClientRect();
    const aspect = (rect.width || 1) / (rect.height || 1);
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width || 1, rect.height || 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      cameraConfig?.fov ?? 14.5,
      aspect,
      0.01,
      100
    );
    const [px, py, pz] = cameraConfig?.position ?? [0, 1.65, 2.8];
    camera.position.set(px, py, pz);
    camera.zoom = cameraConfig?.zoom ?? 1.1;
    camera.updateProjectionMatrix();
    if (cameraConfig?.lookAt) {
      const [lx, ly, lz] = cameraConfig.lookAt;
      camera.lookAt(lx, ly, lz);
    }

    const lights = setLighting(scene, rimSelector);
    const clock = new THREE.Clock();
    const section = document.querySelector<HTMLElement>(sectionSelector);

    let headBone: THREE.Object3D | null = null;
    let mixers: THREE.AnimationMixer[] = [];
    let onFrame: ((delta: number, mouse: { x: number; y: number }) => void) | null =
      null;
    let onDispose: (() => void) | undefined;
    let ctx: gsap.Context | undefined;

    const handles: SectionHandles = {
      scene,
      camera,
      renderer,
      section,
      lights,
      isCancelled: () => cancelled,
    };

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    const onMouseMove = (event: MouseEvent) =>
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    const onTouchMove = (event: TouchEvent) =>
      handleTouchMove(event, (x, y) => (mouse = { x, y }));
    const onTouchEnd = () =>
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    let animFrameId = 0;
    let inViewport = true;

    const tick = () => {
      if (cancelled || !inViewport || document.hidden) {
        animFrameId = 0;
        return;
      }
      animFrameId = requestAnimationFrame(tick);

      const delta = Math.min(clock.getDelta(), 0.05);
      if (container.style.visibility === "hidden") return;

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
          true
        );
      }
      for (const m of mixers) m.update(delta);
      onFrame?.(delta, mouse);
      renderer.render(scene, camera);
    };

    const syncLoop = () => {
      const shouldRun = !cancelled && inViewport && !document.hidden;
      if (shouldRun && !animFrameId) {
        clock.getDelta();
        animFrameId = requestAnimationFrame(tick);
      } else if (!shouldRun && animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      }
    };

    load(scene, camera).then(async (result) => {
      if (cancelled) {
        if (result?.object) scene.remove(result.object);
        result?.onDispose?.();
        return;
      }
      if (result) {
        headBone = result.headBone ?? null;
        mixers = result.mixers ?? [];
        onFrame = result.onFrame ?? null;
        onDispose = result.onDispose;

        const maybeCompile = (
          renderer as THREE.WebGLRenderer & {
            compileAsync?: (
              obj: THREE.Object3D,
              cam: THREE.Camera,
              sc: THREE.Scene
            ) => Promise<void>;
          }
        ).compileAsync;

        if (typeof maybeCompile === "function") {
          try {
            await maybeCompile.call(renderer, result.object, camera, scene);
          } catch {
            // Non-fatal fallback: compile lazily on first render
          }
        }
        if (cancelled) {
          scene.remove(result.object);
          onDispose?.();
          return;
        }
      }

      if (result?.scrollScene) {
        ctx = gsap.context(() => result.scrollScene!(handles));
      }

      result?.onReady?.(handles);
      setModelReady(true);
      syncLoop();
    });

    let observer: IntersectionObserver | undefined;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inViewport = entry.isIntersecting;
          syncLoop();
        },
        { rootMargin: "220px" }
      );
      observer.observe(section);
    }

    const onVisibilityChange = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onResize = () => {
      const r = container.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      observer?.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      ctx?.revert();
      onDispose?.();
      gsap.killTweensOf(camera);
      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${className} ${modelReady ? "is-model-ready" : ""}`.trim()}
      ref={canvasDiv}
    >
      {children}
    </div>
  );
};

export default SectionModel;
