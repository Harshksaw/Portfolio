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
  position: [0, 0.85, DESK_Z],
  zoom: 1.0,
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

    // Retargeted FBX clips (Idle / Typing) onto the avatar skeleton.
    await loadAnimations(avatar);
    startIdle();

    // Desk laptop — loadLaptop adds it to the scene and exposes __laptop* helpers.
    await loadLaptop(scene);

    const w = window as unknown as Record<string, unknown>;
    w.__deskCam = camera;
    w.__avatar = avatar;

    return {
      object: avatar,
      headBone,
      onFrame: updateMixer, // animationManager owns the mixer
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
        gsap.fromTo(
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
      },
    };
  } catch (err) {
    console.warn("⚠️ avatar.glb / macbook.glb (desk) failed to load", err);
    return null;
  }
}
