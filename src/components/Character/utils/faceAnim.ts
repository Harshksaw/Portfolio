import * as THREE from "three";

// ─── Face liveliness: blinking, a subtle smile, and eye-tracking ────────────
//
//  Drives ARKit-style facial blendshapes (morph targets) and eye bones if the
//  loaded model has them. Avaturn (with Blendshapes enabled on export) and
//  Ready Player Me (`?morphTargets=ARKit`) both produce these names.
//
//  Fully defensive: if the model ships without facial morphs / eye bones
//  (e.g. a plain Avaturn body export), setupFace() returns an inert controller
//  whose update() does nothing — so it's always safe to wire in.
// ────────────────────────────────────────────────────────────────────────────

interface MorphRef {
  influences: number[];
  index: number;
}

type MousePos = { x: number; y: number };

// ARKit names first; a couple of common fallbacks after.
const BLINK_CANDIDATES = [
  ["eyeBlinkLeft", "eyeBlinkRight"],
  ["eyeBlink_L", "eyeBlink_R"],
];
const SMILE_CANDIDATES = [
  ["mouthSmileLeft", "mouthSmileRight"],
  ["mouthSmile_L", "mouthSmile_R"],
];
const EYE_BONE_CANDIDATES = [
  ["LeftEye", "RightEye"],
  ["eyeLeft", "eyeRight"],
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = THREE.MathUtils.lerp;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Collect every mesh slot that exposes a morph target with the given name. */
function collectMorph(root: THREE.Object3D, name: string): MorphRef[] {
  const refs: MorphRef[] = [];
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    const dict = mesh.morphTargetDictionary;
    const inf = mesh.morphTargetInfluences;
    if (mesh.isMesh && dict && inf && name in dict) {
      refs.push({ influences: inf, index: dict[name] });
    }
  });
  return refs;
}

/** First candidate name-pair where BOTH sides resolve to at least one morph. */
function resolveMorphPair(
  root: THREE.Object3D,
  candidates: string[][]
): [MorphRef[], MorphRef[]] | null {
  for (const [l, r] of candidates) {
    const left = collectMorph(root, l);
    const right = collectMorph(root, r);
    if (left.length && right.length) return [left, right];
  }
  return null;
}

function setMorph(refs: MorphRef[], v: number) {
  for (const r of refs) r.influences[r.index] = v;
}

function findEyeBones(root: THREE.Object3D): THREE.Object3D[] {
  for (const [l, r] of EYE_BONE_CANDIDATES) {
    const left = root.getObjectByName(l);
    const right = root.getObjectByName(r);
    if (left && right) return [left, right];
  }
  return [];
}

export interface FaceController {
  /** True when at least one facial feature was found and is being driven. */
  active: boolean;
  /** Call every visible frame. `mouse` (range -1..1) drives eye-tracking. */
  update: (delta: number, mouse?: MousePos) => void;
}

export interface FaceOptions {
  /** Blink a single time shortly after load, then keep the eyes open. */
  blinkOnce?: boolean;
}

export function setupFace(root: THREE.Object3D, opts: FaceOptions = {}): FaceController {
  const blinkOnce = opts.blinkOnce ?? false;
  const blink = resolveMorphPair(root, BLINK_CANDIDATES);
  const smile = resolveMorphPair(root, SMILE_CANDIDATES);
  const eyes = findEyeBones(root);

  const active = !!(blink || smile || eyes.length);

  if (import.meta.env.DEV) {
    console.log(
      `🙂 face rig — blink:${!!blink} smile:${!!smile} eyeBones:${eyes.length}`
    );
  }

  if (!active) {
    return { active: false, update: () => {} };
  }

  // Blink state: idle countdown, then a quick close→open sweep.
  // blinkOnce → fire a single blink ~0.8s after load, then stop.
  let nextBlinkIn = blinkOnce ? 0.8 : rand(2, 5);
  let blinkPhase = -1; // -1 = idle; 0..1 = mid-blink
  let blinksLeft = blinkOnce ? 1 : Infinity;
  const BLINK_DURATION = 0.16; // seconds for a full close+open

  let smileTime = 0;

  return {
    active: true,
    update: (delta, mouse) => {
      // ── Blink ──────────────────────────────────────────────────────────
      if (blink && blinksLeft > 0) {
        if (blinkPhase < 0) {
          nextBlinkIn -= delta;
          if (nextBlinkIn <= 0) blinkPhase = 0;
        } else {
          blinkPhase += delta / BLINK_DURATION;
          // triangle 0→1→0
          const v = clamp01(blinkPhase < 0.5 ? blinkPhase * 2 : (1 - blinkPhase) * 2);
          setMorph(blink[0], v);
          setMorph(blink[1], v);
          if (blinkPhase >= 1) {
            blinkPhase = -1;
            blinksLeft -= 1;
            nextBlinkIn = rand(2, 6);
            setMorph(blink[0], 0);
            setMorph(blink[1], 0);
          }
        }
      }

      // ── Clear, gently breathing smile ───────────────────────────────────
      if (smile) {
        smileTime += delta;
        const s = 0.32 + 0.05 * Math.sin(smileTime * 0.6);
        setMorph(smile[0], s);
        setMorph(smile[1], s);
      }

      // ── Eye-tracking toward the cursor (eyes lead, head follows) ─────────
      if (eyes.length && mouse) {
        const maxYaw = 0.26; // radians left/right
        const maxPitch = 0.16; // radians up/down
        const ty = mouse.x * maxYaw;
        const tx = -mouse.y * maxPitch;
        for (const eye of eyes) {
          eye.rotation.y = lerp(eye.rotation.y, ty, 0.18);
          eye.rotation.x = lerp(eye.rotation.x, tx, 0.18);
        }
      }
    },
  };
}
