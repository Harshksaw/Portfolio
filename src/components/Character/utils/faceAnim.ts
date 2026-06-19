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

/** Live-tunable face parameters (driven by the update loop each frame). */
export interface FaceParams {
  /** Base smile-morph influence (mouthSmile L/R). 0 = neutral mouth. */
  smile: number;
}

export interface FaceController {
  /** True when at least one facial feature was found and is being driven. */
  active: boolean;
  /** Mutable params read every frame — adjust live (e.g. from the dev panel). */
  params: FaceParams;
  /** The model root, so a dev panel can enumerate its morph targets. */
  root: THREE.Object3D;
  /**
   * Persistent corrective-expression map (morphName → influence), re-applied
   * every frame so the baked animation can't undo it. The dev panel edits this.
   */
  baseMorphs: Record<string, number>;
  /** Call every visible frame. `mouse` (range -1..1) drives eye-tracking. */
  update: (delta: number, mouse?: MousePos) => void;
}

export interface FaceOptions {
  /** Blink a single time shortly after load, then keep the eyes open. */
  blinkOnce?: boolean;
  /** Corrective neutral expression applied every frame (morphName → influence). */
  baseMorphs?: Record<string, number>;
}

export function setupFace(root: THREE.Object3D, opts: FaceOptions = {}): FaceController {
  const blinkOnce = opts.blinkOnce ?? false;
  const blink = resolveMorphPair(root, BLINK_CANDIDATES);
  const smile = resolveMorphPair(root, SMILE_CANDIDATES);
  const eyes = findEyeBones(root);

  const active = !!(blink || smile || eyes.length);

  // Live-tunable; lowered default (0.32 read as an awkward forced smile).
  const params: FaceParams = { smile: 0.18 };

  // Corrective expression, applied every frame. Mutable so the dev panel tunes it.
  const baseMorphs: Record<string, number> = { ...(opts.baseMorphs ?? {}) };

  // Resolve EVERY morph name → its mesh slots once, so applying baseMorphs each
  // frame (and the dev panel) never has to traverse the tree again.
  const allMorphs = new Map<string, MorphRef[]>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    const dict = mesh.morphTargetDictionary;
    const inf = mesh.morphTargetInfluences;
    if (mesh.isMesh && dict && inf) {
      for (const name in dict) {
        if (!allMorphs.has(name)) allMorphs.set(name, []);
        allMorphs.get(name)!.push({ influences: inf, index: dict[name] });
      }
    }
  });
  const applyBaseMorphs = () => {
    for (const name in baseMorphs) {
      const refs = allMorphs.get(name);
      if (refs) setMorph(refs, baseMorphs[name]);
    }
  };

  if (import.meta.env.DEV) {
    console.log(
      `🙂 face rig — blink:${!!blink} smile:${!!smile} eyeBones:${eyes.length} morphs:${allMorphs.size}`
    );
  }

  if (!active) {
    // Even with no blink/smile/eyes, still apply the corrective expression.
    return {
      active: false,
      params,
      root,
      baseMorphs,
      update: () => applyBaseMorphs(),
    };
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
    params,
    root,
    baseMorphs,
    update: (delta, mouse) => {
      // ── Corrective neutral expression (re-applied so the clip can't undo it) ──
      applyBaseMorphs();

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

      // ── Gently breathing smile (amount is live-tunable via params.smile) ──
      if (smile) {
        smileTime += delta;
        const s = Math.max(0, params.smile + 0.05 * Math.sin(smileTime * 0.6));
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
