import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";

gsap.registerPlugin(ScrollTrigger);

export const aboutCamera: CameraConfig = {
  fov: 14.5,
  position: [0, 0.9, 7.5],
  zoom: 1.0,
};

export async function loadAboutModel(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): Promise<LoadedModel | null> {
  const loader = createGLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/harshsecond.glb");
    const object = gltf.scene;
    object.scale.setScalar(0.9);

    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    const headBone = object.getObjectByName("Head") || null;
    const mixer = new THREE.AnimationMixer(object);
    let action: THREE.AnimationAction | null = null;
    if (gltf.animations.length > 0) {
      action = mixer.clipAction(gltf.animations[0]);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }

    scene.add(object);

    if (import.meta.env.DEV) {
      const w = window as unknown as Record<string, unknown>;
      w.__about = object;
      w.__aboutCam = camera;
    }

    let repeatTimeout = 0;

    return {
      object,
      mixers: [mixer],
      headBone,
      scrollScene: () => {
        gsap.fromTo(
          ".about-model",
          { yPercent: -15, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      },
      onReady: (h: SectionHandles) => {
        h.lights.turnOnLights();
        if (action) {
          const play = () => {
            if (h.isCancelled() || !action) return;
            action.reset().play();
          };
          mixer.addEventListener("finished", (e) => {
            if ((e as unknown as { action: THREE.AnimationAction }).action !== action)
              return;
            repeatTimeout = window.setTimeout(() => {
              if (h.isCancelled() || !object.visible) return;
              play();
            }, 4500);
          });
          play();
        }
      },
      onDispose: () => {
        window.clearTimeout(repeatTimeout);
        mixer.stopAllAction();
      },
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("harshsecond.glb (about) failed to load", err);
    }
    return null;
  }
}
