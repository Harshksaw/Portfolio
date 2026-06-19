import * as THREE from "three";
import { createGLTFLoader } from "../utils/gltf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  loadAnimations,
  startIdle,
  startTyping,
  updateMixer,
} from "../utils/animationManager";
import { loadLaptop } from "../utils/laptop";
import type { CameraConfig, LoadedModel, SectionHandles } from "../SectionModel";

// DESK model (avatar.glb + macbook.glb) — lives in the WhatIDo section.
// Wide full-body framing at a desk. Idles by default, switches to Typing when
// the section scrolls into view, with a gentle self-contained dolly-in.
//
// Tune live from the console:
//   __deskCam.position.set(x, y, z); __deskCam.updateProjectionMatrix()
//   __laptop.position.set(x, y, z) / __laptop.scale.setScalar(s) / __laptopOpen(deg)

const DESK_Z = 6.9; // tuned camera distance (full body + desk, from the left)

export const deskCamera: CameraConfig = {
  fov: 14.5,
  position: [-3.25, -1.45, DESK_Z], // camera placed to the LEFT + low
  zoom: 1.0,
  lookAt: [0, 0.95, -0.05],         // aim at the avatar's chest so it stays framed
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
    avatar.position.set(-0.6, -0.05, 0.15);     // ← position: x (left/right), y (up/down), z (forward/back)
    avatar.rotation.set(0.178, 0.458, 0.138);   // ← turn: y turns the body left/right (radians)

    // Turn the neck slightly toward the camera (which sits to the left). Applied
    // every frame AFTER the animation (see onFrame) so the idle/typing clip can't
    // overwrite it. Tune via the dev panel or __neckTurn.
    const neckBone = avatar.getObjectByName("Neck") ?? null;
    const neckTurn = { x: 0, y: -0.25, z: 0 }; // ← neck pose (radians); flip y sign to turn the other way

    // Retargeted FBX clips (Idle / Typing) onto the avatar skeleton.
    await loadAnimations(avatar);
    startIdle();

    // Desk laptop — loadLaptop adds it to the scene and exposes __laptop* helpers.
    const laptop = await loadLaptop(scene);
    if (laptop) {
      laptop.position.set(-0.65, 0.35, 1.6);          // ← laptop position: x (left/right), y (up/down), z (forward/back)
      laptop.rotation.set(-1.962, 2.558, -0.462);     // ← laptop rotation (radians)
      laptop.scale.setScalar(1.15);                   // ← laptop size
    }

    // Camera aim point, re-applied every frame so the scroll dolly never knocks
    // the angle off.
    const lookTarget = new THREE.Vector3(...(deskCamera.lookAt ?? [0, 0.9, 0]));

    // Dev-only live-tuning handles on window (stripped from production builds).
    //   __deskCam / __avatar / __neckTurn / __deskLook
    const w = window as unknown as Record<string, unknown>;
    if (import.meta.env.DEV) {
      w.__deskCam = camera;
      w.__avatar = avatar;
      w.__neckTurn = neckTurn; // tune live: __neckTurn.y = -0.3
      w.__deskLook = lookTarget;
    }

    return {
      object: avatar,
      headBone,
      onFrame: (delta: number) => {
        updateMixer(delta); // advance idle/typing animation
        // Re-apply the neck pose AFTER the animation so the clip can't undo it.
        if (neckBone) neckBone.rotation.set(neckTurn.x, neckTurn.y, neckTurn.z);
        camera.lookAt(lookTarget); // keep the camera aimed at the avatar
      },
      onReady: (h: SectionHandles) => {
        h.lights.turnOnLights();
        // Dev-only live tuner (sliders for camera/avatar/laptop). Dynamic import
        // gated on DEV so it's stripped from production builds.
        if (import.meta.env.DEV) {
          import("../utils/devPanel").then((m) =>
            m.mountDeskDevPanel({ camera, avatar, laptop, lookTarget, neckTurn })
          );
        }
      },
      scrollScene: (h: SectionHandles) => {
        if (!h.section) return;

        // Typing while the section is in view; idle again when scrolling away.
        ScrollTrigger.create({
          trigger: h.section,
          start: "top 70%",
          end: "bottom top",
          onEnter: () => startTyping(),
          onEnterBack: () => startTyping(),
          onLeaveBack: () => startIdle(),
        });

        // Self-contained dolly-in driven by this section's own scroll.
        const dolly = gsap.fromTo(
          h.camera.position,
          { z: DESK_Z },
          {
            z: DESK_Z - 0.6, // subtle push-in (kept small so it preserves the tuned framing)
            ease: "none",
            scrollTrigger: {
              trigger: h.section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Dev-only live-tuning helpers (devtools console):
        //   __deskFreeze()  → stop the scroll dolly so you can set camera z freely
        //   __deskUnfreeze() → restore the scroll-driven dolly
        if (import.meta.env.DEV) {
          w.__deskFreeze = () => dolly.scrollTrigger?.disable(false);
          w.__deskUnfreeze = () => dolly.scrollTrigger?.enable();
        }
      },
    };
  } catch (err) {
    console.warn("⚠️ avatar.glb / macbook.glb (desk) failed to load", err);
    return null;
  }
}
