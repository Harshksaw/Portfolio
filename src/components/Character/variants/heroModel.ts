import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";
import { setupFace } from "../utils/faceAnim";
import { setupIdleLife } from "../utils/idleLife";

gsap.registerPlugin(ScrollTrigger);

export const heroCamera: CameraConfig = {
  fov: 14.5,
  position: [0, 1.65, 2.8],
  zoom: 1.1,
};

const HERO_FACE_MORPHS: Record<string, number> = {
  eyeLookUpLeft: 0.19,
  browDownLeft: 0.23,
  browOuterUpLeft: 0.03,
  noseSneerRight: -0.12,
  cheekPuff: -0.68,
  mouthLeft: 0.06,
  mouthRight: 0.11,
  mouthUpperUpLeft: 0.11,
  mouthOpen: -0.21,
  viseme_sil: -0.08,
  mouthClose: 0.07,
  mouthFrownLeft: -0.53,
  mouthFrownRight: -0.44,
  mouthFunnel: 0.1,
  tongueOut: 0.14,
  mouthDimpleLeft: 0.65,
  mouthDimpleRight: 0.62,
  mouthLowerDownRight: -0.16,
  mouthPucker: -0.11,
  mouthRollLower: 0.08,
  mouthShrugUpper: -0.25,
  viseme_aa: 0.36,
};

export async function loadHeroModel(
  scene: THREE.Scene
): Promise<LoadedModel | null> {
  const loader = createGLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/harshfirst.glb");
    const object = gltf.scene;

    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    const headBone = object.getObjectByName("Head") || null;

    for (const clip of gltf.animations) {
      clip.tracks = clip.tracks.filter((tr) => {
        const node = tr.name.split(".")[0];
        if (node === "Head" || node === "Neck") return false;
        if (tr.name.endsWith(".morphTargetInfluences")) return false;
        return true;
      });
    }

    const mixer = new THREE.AnimationMixer(object);
    let action: THREE.AnimationAction | null = null;
    if (gltf.animations.length > 0) {
      action = mixer.clipAction(gltf.animations[0]);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }

    scene.add(object);

    const face = setupFace(object, {
      blinkOnce: true,
      baseMorphs: HERO_FACE_MORPHS,
    });
    const idle = setupIdleLife(object);

    let repeatTimeout = 0;
    let firstPlayTimeout = 0;

    return {
      object,
      mixers: [mixer],
      headBone,
      onFrame: (delta, mouse) => {
        idle.update(delta);
        face.update(delta, mouse);
      },
      scrollScene: () => {
        gsap.to(".hero-model", {
          autoAlpha: 0,
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      },
      onReady: (h: SectionHandles) => {
        h.lights.turnOnLights();

        if (
          import.meta.env.DEV &&
          face.active &&
          new URLSearchParams(window.location.search).has("tune")
        ) {
          import("../utils/devPanel").then((m) =>
            m.mountFaceDevPanel({
              params: face.params,
              root: face.root,
              baseMorphs: face.baseMorphs,
            })
          );
        }

        const play = () => {
          if (h.isCancelled() || !action) return;
          action.reset().play();
        };
        if (action) {
          mixer.addEventListener("finished", (e) => {
            if ((e as unknown as { action: THREE.AnimationAction }).action !== action)
              return;
            repeatTimeout = window.setTimeout(() => {
              if (h.isCancelled() || !object.visible) return;
              play();
            }, 8000);
          });
          firstPlayTimeout = window.setTimeout(() => {
            play();
          }, 450);
        }

        gsap.fromTo(
          h.camera,
          { zoom: 0.85 },
          {
            zoom: heroCamera.zoom ?? 1.1,
            duration: 2.2,
            ease: "power2.out",
            onUpdate() {
              h.camera.updateProjectionMatrix();
            },
          }
        );
      },
      onDispose: () => {
        window.clearTimeout(repeatTimeout);
        window.clearTimeout(firstPlayTimeout);
        mixer.stopAllAction();
      },
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("harshfirst.glb (hero) failed to load", err);
    }
    return null;
  }
}
