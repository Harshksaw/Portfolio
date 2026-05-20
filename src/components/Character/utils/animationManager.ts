import * as THREE from "three";
import { FBXLoader } from "three-stdlib";

type AnimName = "idle" | "typing" | "wave";

let mixer: THREE.AnimationMixer | null = null;
let current: AnimName | null = null;
const actions: Partial<Record<AnimName, THREE.AnimationAction>> = {};

// Mixamo FBX tracks are named "mixamorigHips.quaternion"
// Avaturn skeleton uses "Hips.quaternion" — strip the prefix
function remapClip(clip: THREE.AnimationClip): THREE.AnimationClip {
  const tracks = clip.tracks.map((track) => {
    const newName = track.name.replace(/^mixamorig/, "");
    return new (track.constructor as typeof THREE.KeyframeTrack)(
      newName,
      track.times,
      track.values,
      track.getInterpolation()
    );
  });
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

export async function loadAnimations(avatar: THREE.Object3D): Promise<void> {
  mixer = new THREE.AnimationMixer(avatar);
  const loader = new FBXLoader();

  const files: [AnimName, string][] = [
    ["idle",   "/models/Idle.fbx"],
    ["typing", "/models/Typing.fbx"],
    ["wave",   "/models/Wave.fbx"],
  ];

  await Promise.all(
    files.map(async ([name, path]) => {
      try {
        const fbx = await loader.loadAsync(path);
        if (!fbx.animations.length) return;
        const clip = remapClip(fbx.animations[0]);
        const action = mixer!.clipAction(clip);
        if (name === "wave") {
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
        } else {
          action.setLoop(THREE.LoopRepeat, Infinity);
        }
        actions[name] = action;
        console.log(`✅ Animation loaded: ${name}`);
      } catch {
        console.warn(`⚠️ Animation not found: ${path}`);
      }
    })
  );

  // After wave finishes, return to idle
  mixer.addEventListener("finished", (e) => {
    if (e.action === actions["wave"]) {
      current = null;
      switchAnimation("idle", 0.4);
    }
  });
}

export function switchAnimation(name: AnimName, fade = 0.5): void {
  if (!actions[name]) {
    console.warn(`⚠️ switchAnimation: "${name}" not loaded`);
    return;
  }
  if (current === name) return;
  console.log(`🎬 ${current ?? "none"} → ${name}`);
  if (current && actions[current]) actions[current].fadeOut(fade);
  actions[name]!.reset().fadeIn(fade).play();
  current = name;
}

export function startIdle(): void {
  switchAnimation("idle", 0.5);
}

export function startTyping(): void {
  switchAnimation("typing", 0.8);
}

export function startWave(): void {
  switchAnimation("wave", 0.3);
}

export function updateMixer(delta: number): void {
  mixer?.update(delta);
}
