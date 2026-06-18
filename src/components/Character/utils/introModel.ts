import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

// Loads the INTRO avatar (harshfirst.glb) — shown only on the landing/hero.
// Unlike avatar.glb (which is animated by retargeted FBX clips), this one ships
// with its own baked clip ("Flexing_Arm_Clean"), so we just play clip 0 on its
// own mixer. avatar.glb takes over from the about section; GsapScroll swaps the
// two by toggling visibility (they share the same spot + skeleton).
export async function loadIntroAvatar(
  scene: THREE.Scene
): Promise<{
  intro: THREE.Object3D;
  introMixer: THREE.AnimationMixer;
  introHeadBone: THREE.Object3D | null;
  introAction: THREE.AnimationAction | null;
} | null> {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/harshfirst.glb");
    const intro = gltf.scene;

    intro.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    const introHeadBone = intro.getObjectByName("Head") || null;

    const introMixer = new THREE.AnimationMixer(intro);
    let introAction: THREE.AnimationAction | null = null;
    if (gltf.animations.length > 0) {
      introAction = introMixer.clipAction(gltf.animations[0]);
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      // Playback is deferred — caller triggers it after the loading screen clears
      // so the animation is visible rather than playing behind the loading overlay.
      console.log(`🦾 intro avatar clip: "${gltf.animations[0].name}"`);
    } else {
      console.warn("⚠️ harshfirst.glb has no baked animation clip.");
    }

    scene.add(intro);
    return { intro, introMixer, introHeadBone, introAction };
  } catch (err) {
    console.warn("⚠️ harshfirst.glb (intro avatar) failed to load", err);
    return null;
  }
}
