import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";
import { setupFace } from "../utils/faceAnim";
import { setupIdleLife } from "../utils/idleLife";

gsap.registerPlugin(ScrollTrigger); // idempotent

// HERO model (harshfirst.glb) — the landing/hero avatar.
// Ships with its own baked clip ("Flexing_Arm_Clean"); we play clip 0 once on
// load and repeat it on a long interval. Tight telephoto framing on the face;
// a slow zoom-in plays once after the loading screen clears.

export const heroCamera: CameraConfig = {
  fov: 14.5,
  position: [0, 1.65, 2.8], // telephoto face shot
  zoom: 1.1,
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

    // Face left at its original proportions — scaling the head bone distorts the
    // T2 rig's separate teeth/tongue/lip meshes, so no slimming is applied.

    // The Avaturn clip animates Head/Neck rotations and face blendshape weights,
    // which would fight our procedural head-look, eye-tracking, blink and smile.
    // Strip those tracks so the clip only poses the BODY; we own everything
    // facial (Head/Neck via head-look + idle, morphs + eyes via setupFace).
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
      console.log(`🦾 hero clip: "${gltf.animations[0].name}"`);
    } else {
      console.warn("⚠️ harshfirst.glb has no baked animation clip.");
    }

    scene.add(object);

    // Subtle smile + eye-tracking, plus a single blink shortly after load.
    // Only activates if the GLB ships ARKit facial morphs / eye bones.
    const face = setupFace(object, { blinkOnce: true });
    // Subtle breathing + head drift so the static avatar isn't frozen.
    const idle = setupIdleLife(object);

    return {
      object,
      mixers: [mixer],
      headBone,
      onFrame: (delta, mouse) => {
        idle.update(delta);
        face.update(delta, mouse);
      },
      scrollScene: () => {
        // Cross-dissolve OUT: as the landing scrolls away, the hero fades and
        // sinks down — the mirror of the About model fading + dropping in. The
        // two overlap at the section boundary so it reads as one blending into
        // the other rather than a hard cut.
        gsap.to(".hero-model", {
          autoAlpha: 0,
          yPercent: 35, // sink down while fading ("fade as it goes down")
          ease: "none",
          scrollTrigger: {
            trigger: ".landing-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      },
      onReady: (h: SectionHandles) => {
        // Lights up (with the .character-rim backlight glow) once visible.
        setTimeout(() => h.lights.turnOnLights(), 500);

        // Flex once on load, then repeat on a long idle interval.
        const play = () => {
          if (h.isCancelled() || !action) return;
          action.reset().play();
        };
        if (action) {
          mixer.addEventListener("finished", (e) => {
            if ((e as unknown as { action: THREE.AnimationAction }).action !== action) return;
            setTimeout(() => {
              if (h.isCancelled() || !object.visible) return;
              play();
            }, 8000);
          });
          setTimeout(play, 1200);
        }

        // Self-contained intro reveal: slow zoom-in (tween zoom, not position,
        // so it never conflicts with anything else).
        gsap.fromTo(
          h.camera,
          { zoom: 0.42 },
          {
            zoom: heroCamera.zoom ?? 1.1,
            duration: 5,
            delay: 0.3,
            ease: "power2.inOut",
            onUpdate() {
              h.camera.updateProjectionMatrix();
            },
          }
        );
      },
    };
  } catch (err) {
    console.warn("⚠️ harshfirst.glb (hero) failed to load", err);
    return null;
  }
}
