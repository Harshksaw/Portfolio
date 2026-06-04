import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { loadAnimations, startIdle, startTyping, startWave, updateMixer } from "./utils/animationManager";
import { loadLaptop } from "./utils/laptop";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;
    let cancelled = false;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    // ── Camera ────────────────────────────────────────────────────────────────
    // FOV 14.5° telephoto — at Z=2.8 tightly frames the face.
    // GsapScroll animates Z out to 8.0 + Y down to 0.85 to reveal full body + laptop.
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.01, 100);
    camera.position.set(0, 1.65, 2.8);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let resizeHandler: (() => void) | undefined;

    loadCharacter().then(async (result) => {
      if (cancelled || !result) return;
      const { gltf } = result;

      const character = gltf.scene;
      scene.add(character);
      headBone = character.getObjectByName("Head") || null;

      // Load animations + laptop in parallel
      const [, laptop] = await Promise.all([
        loadAnimations(character),
        loadLaptop(scene),
      ]);

      if (cancelled) return;

      // Idle on load — laptop hidden. On scroll: typing starts + laptop appears.
      startIdle();

      const scrollCallbacks = {
        toTyping: () => { startTyping(); if (laptop) laptop.visible = true; },
        toWave:   () => { startWave();   if (laptop) laptop.visible = false; },
      };

      setCharTimeline(character, camera, scrollCallbacks, laptop);
      setAllTimeline();

      progress.loaded().then(() => {
        setTimeout(() => light.turnOnLights(), 500);
      });

      resizeHandler = () => {
        handleResize(renderer, camera, canvasDiv, character, scrollCallbacks, laptop);
      };
      window.addEventListener("resize", resizeHandler);
    });

    // ── Mouse / touch ─────────────────────────────────────────────────────────
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };
    const onTouchEnd = () => {
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    // ── Render loop ───────────────────────────────────────────────────────────
    let animFrameId: number;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }

      updateMixer(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      clearTimeout(debounce);
      cancelAnimationFrame(animFrameId);
      scene.clear();
      renderer.dispose();
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      if (canvasDiv.current && renderer.domElement.parentNode === canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim" />
        <div className="character-hover" ref={hoverDivRef} />
      </div>
    </div>
  );
};

export default Scene;
