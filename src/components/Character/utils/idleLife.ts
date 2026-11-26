import * as THREE from "three";

// ─── Idle "life": breathing + gentle head drift ────────────────────────────
//
//  Keeps a static (non-facial-rigged) avatar from looking frozen. Works on any
//  standard humanoid rig — drives the Spine (breathing) and Neck (slow drift)
//  bones with low-amplitude sine motion, layered on TOP of whatever the clip /
//  cursor head-look is doing:
//    - Spine offset reads as a chest rise/fall + faint sway.
//    - Neck offset gently moves the whole head; the cursor head-look still
//      rides on top because that drives the separate Head bone.
//
//  Fully defensive: bones that don't exist are simply skipped.
// ────────────────────────────────────────────────────────────────────────────

export interface IdleLife {
  /** Call every visible frame, AFTER the mixer/clip update. */
  update: (delta: number) => void;
}

export function setupIdleLife(root: THREE.Object3D): IdleLife {
  const spine =
    root.getObjectByName("Spine1") ||
    root.getObjectByName("Spine2") ||
    root.getObjectByName("Spine") ||
    null;
  const neck = root.getObjectByName("Neck") || null;

  // Capture rest pose so we apply offsets relative to it (never accumulate).
  const spineRest = spine ? spine.rotation.clone() : null;
  const neckRest = neck ? neck.rotation.clone() : null;

  let t = Math.random() * 10; // random phase so it doesn't start dead-centre

  return {
    update: (delta) => {
      t += delta;

      if (spine && spineRest) {
        // Breathing: chest rises/falls on a ~5.7s cycle (also nods the head,
        // since everything above the spine rides along), with a slower sway.
        spine.rotation.x = spineRest.x + Math.sin(t * 1.1) * 0.035;
        spine.rotation.z = spineRest.z + Math.sin(t * 0.37) * 0.02;
      }

      if (neck && neckRest) {
        // Slow head drift so it never looks frozen between cursor moves. This
        // is the most visible part in the tight face framing — keep it gentle
        // but clearly alive.
        neck.rotation.y = neckRest.y + Math.sin(t * 0.5) * 0.07;
        neck.rotation.x = neckRest.x + Math.sin(t * 0.83) * 0.04;
      }
    },
  };
}
