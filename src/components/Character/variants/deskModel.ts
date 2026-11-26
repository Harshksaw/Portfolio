import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  disposeAnimations,
  loadAnimations,
  startIdle,
  startTyping,
  updateMixer,
} from "../utils/animationManager";
import { loadLaptop } from "../utils/laptop";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";

gsap.registerPlugin(ScrollTrigger);

const DESK_Z = 6.9;

export const deskCamera: CameraConfig = {
  fov: 14.5,
  position: [-3.25, -1.45, DESK_Z],
  zoom: 1.0,
  lookAt: [0, 0.95, -0.05],
};

export async function loadDeskModel(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): Promise<LoadedModel | null> {
  const loader = createGLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/avatar.glb");
    const avatar = gltf.scene;

    avatar.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    const headBone = avatar.getObjectByName("Head") || null;
    scene.add(avatar);
    avatar.position.set(-0.6, -0.05, 0.15);
    avatar.rotation.set(0.178, 0.458, 0.138);

    const neckBone = avatar.getObjectByName("Neck") ?? null;
    const neckTurn = { x: 0, y: -0.25, z: 0 };

    await loadAnimations(avatar);
    startIdle();

    const laptop = await loadLaptop(scene);
    if (laptop) {
      laptop.position.set(-0.65, 0.35, 1.6);
      laptop.rotation.set(-1.962, 2.558, -0.462);
      laptop.scale.setScalar(1.15);
    }

    const lookTarget = new THREE.Vector3(...(deskCamera.lookAt ?? [0, 0.9, 0]));

    const w = window as unknown as Record<string, unknown>;
    if (import.meta.env.DEV) {
      w.__deskCam = camera;
      w.__avatar = avatar;
      w.__neckTurn = neckTurn;
      w.__deskLook = lookTarget;
    }

    return {
      object: avatar,
      headBone,
      onFrame: (delta: number) => {
        updateMixer(delta);
        if (neckBone) neckBone.rotation.set(neckTurn.x, neckTurn.y, neckTurn.z);
        camera.lookAt(lookTarget);
      },
      onReady: (h: SectionHandles) => {
        h.lights.turnOnLights();
        if (
          import.meta.env.DEV &&
          new URLSearchParams(window.location.search).has("tune")
        ) {
          import("../utils/devPanel").then((m) =>
            m.mountDeskDevPanel({ camera, avatar, laptop, lookTarget, neckTurn })
          );
        }
      },
      scrollScene: (h: SectionHandles) => {
        if (!h.section) return;

        ScrollTrigger.create({
          trigger: h.section,
          start: "top 75%",
          end: "bottom top",
          onEnter: () => startTyping(),
          onEnterBack: () => startTyping(),
          onLeaveBack: () => startIdle(),
        });

        const dolly = gsap.fromTo(
          h.camera.position,
          { z: DESK_Z },
          {
            z: DESK_Z - 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: h.section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        if (import.meta.env.DEV) {
          w.__deskFreeze = () => dolly.scrollTrigger?.disable(false);
          w.__deskUnfreeze = () => dolly.scrollTrigger?.enable();
        }
      },
      onDispose: () => {
        disposeAnimations();
      },
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("avatar.glb / macbook.glb (desk) failed to load", err);
    }
    return null;
  }
}
