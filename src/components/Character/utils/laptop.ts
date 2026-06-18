import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

// ─── WHAT THIS FILE DOES (plain English) ───────────────────────────────────
//
//  1. Loads /models/macbook.glb into the three.js scene.
//  2. Tries to find the "lid" node inside the model and rotates it open
//     (most macbook GLBs ship with the lid closed at rotation.x = 0).
//  3. Sets a sensible default position/rotation/scale near the character's
//     lap area. Character head is at Y≈1.65, so the desk plane sits ~Y=0.7.
//  4. Exposes `window.__laptop` plus helpers so you can TUNE IT LIVE from
//     the browser devtools console without rebuilding:
//
//       __laptop.position.set(0.4, 0.74, 0.4)   // move it
//       __laptop.rotation.y = Math.PI + 0.3      // turn it
//       __laptop.scale.setScalar(0.012)          // resize it
//       __laptopOpen(110)                        // open lid to 110°
//       __laptopDump()                           // print all child names
//
// ────────────────────────────────────────────────────────────────────────────

// Names that almost certainly identify ONLY the lid hinge node.
// We deliberately exclude generic words like "top"/"cover" because they
// frequently match the laptop's root group and rotating that tips the
// entire model out of camera view.
const LID_NAME_HINTS = ["lid", "screen", "display"];

// Skip nodes that look like the whole laptop or the base/keyboard half.
const LID_NAME_BLOCKLIST = ["base", "keyboard", "body", "chassis", "macbook", "laptop", "scene", "root"];

function findLid(root: THREE.Object3D): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((child) => {
    if (found) return;
    const name = (child.name || "").toLowerCase();
    if (!name) return;
    if (LID_NAME_BLOCKLIST.some((b) => name.includes(b))) return;
    if (LID_NAME_HINTS.some((hint) => name.includes(hint))) {
      found = child;
    }
  });
  return found;
}

export async function loadLaptop(scene: THREE.Scene): Promise<THREE.Object3D | null> {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/macbook.glb");
    const laptop = gltf.scene;

    // Position / rotation / scale are set by the caller (deskModel.ts) so all
    // desk placement lives in one file. Live tuning: __laptop.position.set(...)
    laptop.visible = true;

    // Auto-frame: compute the model's bounding box so we know it actually has
    // geometry and roughly how big it is in scene units. Helps catch the case
    // where the GLB loads but is empty / mis-scaled by 1000x.
    const box = new THREE.Box3().setFromObject(laptop);
    const size = box.getSize(new THREE.Vector3());
    console.log(`📦 Laptop bounding size (scene units): x=${size.x.toFixed(3)} y=${size.y.toFixed(3)} z=${size.z.toFixed(3)}`);

    // ── Shadow + log every node so we can see what the model contains ────
    const nodeNames: string[] = [];
    laptop.traverse((child) => {
      if (child.name) nodeNames.push(`${child.type}: ${child.name}`);
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    console.log("🖥️  macbook.glb nodes:\n" + nodeNames.join("\n"));

    // ── Open the lid ──────────────────────────────────────────────────────
    // This Sketchfab macbook has two child nodes: PROD-34805_1 (base) and
    // PROD-34805_2 (lid). Confirmed by hand-testing in devtools: rotating
    // PROD-34805_2 by -110° on X opens the screen with the Apple logo facing
    // camera (= person typing view).
    const LID_NODE_NAME = "PROD-34805_2";
    const LID_OPEN_DEG  = 108;
    const lid = laptop.getObjectByName(LID_NODE_NAME);
    if (lid) {
      lid.rotation.x = THREE.MathUtils.degToRad(-LID_OPEN_DEG);
      console.log(`✅ Lid "${LID_NODE_NAME}" opened to ${LID_OPEN_DEG}°.`);
    } else {
      console.warn(`⚠️ Lid node "${LID_NODE_NAME}" not found — model may have changed.`);
    }

    scene.add(laptop);

    // ── Live tuning helpers (devtools console) ────────────────────────────
    const w = window as any;
    w.__laptop = laptop;
    w.__laptopDump = () => {
      const names: string[] = [];
      laptop.traverse((c) => names.push(`${c.type}: ${c.name || "(unnamed)"}`));
      console.log(names.join("\n"));
      return names;
    };
    w.__laptopOpen = (degrees = 110) => {
      const l = findLid(laptop);
      if (!l) return console.warn("No lid node found. Try __laptopOpenByName.");
      l.rotation.x = THREE.MathUtils.degToRad(-degrees);
      console.log(`lid "${l.name}" → ${degrees}°`);
    };
    w.__laptopOpenByName = (name: string, degrees = 110) => {
      const l = laptop.getObjectByName(name);
      if (!l) return console.warn(`No node named "${name}".`);
      l.rotation.x = THREE.MathUtils.degToRad(-degrees);
      console.log(`lid "${name}" → ${degrees}°`);
    };

    console.log(
      "💡 Tune live in console:\n" +
      "   __laptop.position.set(x, y, z)\n" +
      "   __laptop.rotation.y = Math.PI + 0.3\n" +
      "   __laptop.scale.setScalar(0.01)\n" +
      "   __laptopOpen(110)        // change angle\n" +
      "   __laptopDump()           // list all node names"
    );

    return laptop;
  } catch (err) {
    console.warn("⚠️ macbook.glb failed to load", err);
    return null;
  }
}
