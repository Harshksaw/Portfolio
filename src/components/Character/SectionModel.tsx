import { PropsWithChildren, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import setLighting from "./utils/lighting";
import {
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
  handleHeadRotation,
} from "./utils/mouseUtils";
import { setProgress } from "../Loading";
import { useLoading } from "../../context/LoadingProvider";

// ─── SectionModel ───────────────────────────────────────────────────────────
//
//  ONE self-contained 3D model living INSIDE a single page section. Each
//  instance owns its own WebGLRenderer / Scene / Camera / render loop and is
//  mounted in its section's DOM, so it scrolls naturally with that section.
//  No shared canvas, no cross-section GSAP juggling, no visibility-swap races.
//
//  A "variant" supplies only what differs between sections: which model to
//  load, the camera framing, and what to do once it's ready (play a clip, run
//  a self-contained zoom, etc.). Everything mechanical (renderer, lights,
//  loop, mouse-look, resize, offscreen-pause, teardown) lives here, once.
// ────────────────────────────────────────────────────────────────────────────

/** Handles exposed to the variant after the scene is built. */
export interface SectionHandles {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  /** The section element this model belongs to (scroll trigger / observer target). */
  section: HTMLElement | null;
  lights: ReturnType<typeof setLighting>;
  /** True if the unmount/cancel has fired — long-running callbacks should bail. */
  isCancelled: () => boolean;
}

/** What a variant's loader returns. */
export interface LoadedModel {
  object: THREE.Object3D;
  /** Mixers updated every frame. */
  mixers?: THREE.AnimationMixer[];
  /** Bone driven by mouse-look (head/eyes follow cursor). */
  headBone?: THREE.Object3D | null;
  /**
   * Per-frame hook (visible frames only). For models whose mixer isn't in the
   * `mixers` array — e.g. the desk uses animationManager's module-level mixer
   * via updateMixer(delta).
   */
  onFrame?: (delta: number) => void;
  /**
   * Called once the model is in the scene and (for the loading owner) the
   * loading screen has cleared. Kick off clips, lights, self-contained zooms.
   */
  onReady?: (h: SectionHandles) => void;
  /**
   * Set up scroll-driven effects (camera zoom, typing-on-enter) scoped to THIS
   * section's own trigger. Runs inside a gsap.context that the engine reverts
   * on unmount, so nothing leaks across HMR / StrictMode remounts.
   */
  scrollScene?: (h: SectionHandles) => void;
}

export interface CameraConfig {
  fov?: number;
  position?: [number, number, number];
  zoom?: number;
  /** Point the camera at this scene coordinate (e.g. the model's chest). Lets a
   *  camera placed off to the side still aim at the model for a 3/4 angle. */
  lookAt?: [number, number, number];
}

export interface SectionModelProps extends PropsWithChildren {
  /** CSS class on the canvas container div. */
  className?: string;
  /** Selector of the owning section — used for the offscreen-pause observer. */
  sectionSelector: string;
  camera?: CameraConfig;
  /** Hero only: this instance drives the cosmetic loading screen to 100%. */
  drivesLoading?: boolean;
  /** Backlight-glow element to fade in with the lights (hero only). */
  rimSelector?: string;
  /** Loads the model(s) into the scene and returns frame/ready hooks. */
  load: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) => Promise<LoadedModel | null>;
}

const SectionModel = ({
  className,
  sectionSelector,
  camera: cameraConfig,
  drivesLoading = false,
  rimSelector,
  load,
  children,
}: SectionModelProps) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;
    let cancelled = false;
    const container = canvasDiv.current;

    const rect = container.getBoundingClientRect();
    const aspect = (rect.width || 1) / (rect.height || 1);
    const scene = new THREE.Scene();

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    // ── Camera ────────────────────────────────────────────────────────────────
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
    let onFrame: ((delta: number) => void) | null = null;
    let ctx: gsap.Context | undefined;

    // Cosmetic loading screen — only the owner (hero) drives it.
    const progress = drivesLoading ? setProgress(setLoading) : null;

    const handles: SectionHandles = {
      scene,
      camera,
      renderer,
      section,
      lights,
      isCancelled: () => cancelled,
    };

    load(scene, camera).then((result) => {
      if (cancelled) {
        result?.object && scene.remove(result.object);
        return;
      }
      if (result) {
        headBone = result.headBone ?? null;
        mixers = result.mixers ?? [];
        onFrame = result.onFrame ?? null;
      }

      // Scroll-driven effects, scoped to this section's own trigger and to a
      // gsap.context the cleanup reverts (no cross-section / HMR leakage).
      if (result?.scrollScene) {
        ctx = gsap.context(() => result.scrollScene!(handles));
      }

      const ready = () => {
        if (cancelled) return;
        result?.onReady?.(handles);
      };

      // Hero waits for the loading screen to clear so its intro is seen;
      // other sections are offscreen at load, so they reveal immediately.
      if (progress) {
        progress.loaded().then(ready);
      } else {
        ready();
      }
    });

    // ── Mouse / touch (head-look) ─────────────────────────────────────────────
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
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    // ── Render loop (paused while the section is well offscreen) ──────────────
    let animFrameId = 0;
    let visible = true;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      // Always consume delta so it stays ~frame-sized. If we skipped this while
      // offscreen, the first visible frame would get a huge accumulated delta
      // and snap any playing clip to its end.
      const delta = clock.getDelta();
      if (!visible) return; // section offscreen → skip the expensive render
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
          true // always track while this section is in view
        );
      }
      for (const m of mixers) m.update(delta);
      onFrame?.(delta);
      renderer.render(scene, camera);
    };
    animate();

    // Pause the loop when the section is far offscreen (cheap with 3 contexts).
    let observer: IntersectionObserver | undefined;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => (visible = entry.isIntersecting),
        { rootMargin: "200px" }
      );
      observer.observe(section);
    }

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const r = container.getBoundingClientRect();
      if (!r.width || !r.height) return;
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      cancelAnimationFrame(animFrameId);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      progress?.clear();
      ctx?.revert();
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
    <div className={className} ref={canvasDiv}>
      {children}
    </div>
  );
};

export default SectionModel;
