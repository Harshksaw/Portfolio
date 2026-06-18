import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { loadAnimations, startIdle, startTyping, startWave, updateMixer } from "./utils/animationManager";
import { loadLaptop } from "./utils/laptop";
import { loadIntroAvatar } from "./utils/introModel";
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
import gsap from "gsap";

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
    let introHeadBone: THREE.Object3D | null = null;
    let introMixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let resizeHandler: (() => void) | undefined;
    let ctx: gsap.Context | undefined;

    loadCharacter().then(async (result) => {
      if (cancelled || !result) return;
      const { gltf } = result;

      const character = gltf.scene;
      scene.add(character);
      headBone = character.getObjectByName("Head") || null;

      // Load animations + laptop + intro avatar in parallel
      const [, laptop, introResult] = await Promise.all([
        loadAnimations(character),
        loadLaptop(scene),
        loadIntroAvatar(scene),
      ]);

      if (cancelled) return;

      // Two-model setup: harshfirst.glb (intro) holds the hero on the landing,
      // avatar.glb (character) takes over from the about section onward. They
      // share a spot + skeleton, so GsapScroll just toggles their visibility.
      const intro = introResult?.intro ?? null;
      introMixer = introResult?.introMixer ?? null;
      introHeadBone = introResult?.introHeadBone ?? null;
      const introAction = introResult?.introAction ?? null;
      if (intro) {
        intro.visible = true;
        intro.position.x = 0.1;
      }
      character.visible = false;

      // Idle on load — hand down, simple. On scroll past about-section: typing.
      // On scroll back up: wave (set via scrollCallbacks below).
      startIdle();

      const scrollCallbacks = {
        toTyping: () => { startTyping(); },
        toWave:   () => { startWave();   },
      };

      // Scope every ScrollTrigger/timeline to a gsap.context so cleanup() can
      // kill them. Without this, StrictMode's double-mount and Vite HMR remounts
      // stack duplicate timelines on each reload; the stale ones keep running
      // their old logic (e.g. the career hide-latch) and the model gets stuck.
      ctx = gsap.context(() => {
        setCharTimeline(character, camera, scrollCallbacks, laptop, intro);
        setAllTimeline();
      });

      progress.loaded().then(() => {
        if (cancelled) return;
        setTimeout(() => light.turnOnLights(), 500);

        // Play the flex animation now that the loading screen has cleared,
        // paired with a camera zoom-out→zoom-in so the arm action is visible.
        if (introAction) introAction.play();
        gsap.fromTo(
          camera,
          { zoom: 0.42 },
          {
            zoom: 1.1,
            duration: 5,
            delay: 0.3,
            ease: "power2.inOut",
            onUpdate() { camera.updateProjectionMatrix(); },
          }
        );
      });

      resizeHandler = () => {
        handleResize(renderer, camera, canvasDiv, character, scrollCallbacks, laptop, intro);
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

      if (introHeadBone) {
        handleHeadRotation(
          introHeadBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }
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

      const delta = clock.getDelta();
      updateMixer(delta);
      introMixer?.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelled = true;
      ctx?.revert(); // kill this mount's ScrollTriggers/timelines (no HMR/StrictMode duplicates)
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
