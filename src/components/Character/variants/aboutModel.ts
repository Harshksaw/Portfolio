import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";

gsap.registerPlugin(ScrollTrigger); // idempotent — ensures scrollTrigger config works

// ABOUT model (harshsecond.glb) — lives in the About section's LEFT column
// (the about-me text sits on the right at ≥1025px). Plays its baked clip 0 once
// when scrolled into view and tracks the cursor.
//
// Framing/placement are best dialled in live from the devtools console:
//   __about.position.set(x, y, z)        // move the model in the scene
//   __aboutCam.position.set(x, y, z)     // move the camera
//   __aboutCam.zoom = 1.2; __aboutCam.updateProjectionMatrix()

export const aboutCamera: CameraConfig = {
  fov: 14.5,
  position: [0, 0.9, 7.5], // pulled back to frame the FULL body (head→feet)
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
    object.scale.setScalar(0.90); // 5% smaller than the hero/desk avatars

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
      console.log(`🧍 about clip: "${gltf.animations[0].name}"`);
    } else {
      console.warn("⚠️ harshsecond.glb has no baked animation clip.");
    }

    scene.add(object);

    // Live tuning helpers (devtools console).
    const w = window as unknown as Record<string, unknown>;
    w.__about = object;
    w.__aboutCam = camera;

    return {
      object,
      mixers: [mixer],
      headBone,
      scrollScene: () => {
        // Soften the Landing → About border: the model drops in from above and
        // fades up as the About section scrolls into view (scrubbed to scroll).
        gsap.fromTo(
          ".about-model",
          { yPercent: -30, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-section",
              start: "top bottom",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      },
      onReady: (h: SectionHandles) => {
        // Lights without the landing-only backlight rim (no .character-rim here).
        h.lights.turnOnLights();
        // Play once. The loop is paused while the section is offscreen, so the
        // clip effectively starts when the user scrolls About into view.
        if (action) {
          const play = () => {
            if (h.isCancelled() || !action) return;
            action.reset().play();
          };
          mixer.addEventListener("finished", (e) => {
            if ((e as unknown as { action: THREE.AnimationAction }).action !== action) return;
            setTimeout(() => {
              if (h.isCancelled() || !object.visible) return;
              play();
            }, 4500); // repeat the clip every ~4.5s while in view
          });
          play();
        }
      },
    };
  } catch (err) {
    console.warn("⚠️ harshsecond.glb (about) failed to load", err);
    return null;
  }
}
