import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

interface ScrollCallbacks {
  toTyping: () => void;
  toWave: () => void;
}

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement | null>,
  character: THREE.Object3D,
  onScroll?: ScrollCallbacks,
  laptop?: THREE.Object3D | null
) {
  if (!canvasDiv.current) return;
  const { width, height } = canvasDiv.current.getBoundingClientRect();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Kill all scroll triggers and rebuild (monitor refs are not needed on resize
  // since GSAP already has references to the material objects)
  ScrollTrigger.getAll().forEach((t) => t.kill());
  setCharTimeline(character, camera, onScroll, laptop);
  setAllTimeline();
}
