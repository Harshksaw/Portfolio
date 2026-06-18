import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
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

const DESK_Z = 8.0; // wide enough to frame the full body + desk

export const deskCamera: CameraConfig = {
  fov: 14.5,
  position: [-2.5, 1.0, DESK_Z], // camera placed to the LEFT (negative x)
  zoom: 1.0,
  lookAt: [0, 0.9, 0],           // aim at the avatar's chest so it stays framed
};

export async function loadDeskModel(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): Promise<LoadedModel | null> {
  const loader = new GLTFLoader();
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
    avatar.position.set(-0.5, 0, 0);    // ← position: x (left/right), y (up/down), z (forward/back)
    avatar.rotation.set(0.2, 0.4 ,  0); // ← turn: y turns the body left/right (radians; flip sign to turn the other way)

    // Retargeted FBX clips (Idle / Typing) onto the avatar skeleton.
    await loadAnimations(avatar);
    startIdle();

    // Desk laptop — loadLaptop adds it to the scene and exposes __laptop* helpers.
    const laptop = await loadLaptop(scene);
    if (laptop) {
      laptop.position.set(-0.5, 0.65, 1.75);              // ← laptop position: x (left/right), y (up/down), z (forward/back)
      laptop.rotation.set(-2, Math.PI - Math.PI / 4, -0.6); // ← laptop rotation (radians)
      laptop.scale.setScalar(0.9);                       // ← laptop size
    }

    const w = window as unknown as Record<string, unknown>;
    w.__deskCam = camera;
    w.__avatar = avatar;

    // Camera aim point, re-applied every frame so the scroll dolly never knocks
    // the angle off. Tune live: __deskLook.set(x, y, z)
    const lookTarget = new THREE.Vector3(...(deskCamera.lookAt ?? [0, 0.9, 0]));
    w.__deskLook = lookTarget;

    return {
      object: avatar,
      headBone,
      onFrame: (delta: number) => {
        updateMixer(delta);        // advance idle/typing animation
        camera.lookAt(lookTarget); // keep the camera aimed at the avatar
      },
      onReady: (h: SectionHandles) => {
        h.lights.turnOnLights();
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
            z: DESK_Z - 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: h.section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Live-tuning helpers (devtools console):
        //   __deskFreeze()  → stop the scroll dolly so you can set camera z freely
        //   __deskUnfreeze() → restore the scroll-driven dolly
        w.__deskFreeze = () => dolly.scrollTrigger?.disable(false);
        w.__deskUnfreeze = () => dolly.scrollTrigger?.enable();
      },
    };
  } catch (err) {
    console.warn("⚠️ avatar.glb / macbook.glb (desk) failed to load", err);
    return null;
  }
}
