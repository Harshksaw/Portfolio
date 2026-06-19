import * as THREE from "three";

// ─── Dev-only live tuner for the desk scene ─────────────────────────────────
//
//  A tiny floating slider panel (no external deps) for dragging the camera,
//  avatar and laptop into place without typing console commands. The "copy
//  values" button dumps the current numbers to the clipboard so they can be
//  pasted straight into deskModel.ts.
//
//  Mounted only when import.meta.env.DEV is true → tree-shaken from prod builds.
// ────────────────────────────────────────────────────────────────────────────

interface DeskRefs {
  camera: THREE.PerspectiveCamera;
  avatar: THREE.Object3D;
  laptop: THREE.Object3D | null;
  lookTarget: THREE.Vector3;
  /** Mutable neck-pose offset re-applied each frame (see deskModel onFrame). */
  neckTurn?: { x: number; y: number; z: number };
}

const PANEL_ID = "desk-dev-panel";
const round = (n: number) => Math.round(n * 1000) / 1000;

type Row = [string, () => number, (v: number) => void, number, number, number];

export function mountDeskDevPanel({ camera, avatar, laptop, lookTarget, neckTurn }: DeskRefs) {
  // Replace any existing panel (HMR / StrictMode double-mount).
  document.getElementById(PANEL_ID)?.remove();

  const PI = Math.PI;
  const panel = document.createElement("div");
  panel.id = PANEL_ID;
  panel.style.cssText = `
    position:fixed; top:12px; right:12px; z-index:99999;
    width:250px; max-height:92vh; overflow:auto; box-sizing:border-box;
    background:rgba(10,14,23,.92); color:#cde; font:11px/1.4 monospace;
    padding:10px 12px; border:1px solid #2a3550; border-radius:8px;
    backdrop-filter:blur(4px);`;

  const title = document.createElement("div");
  title.textContent = "🛠 desk tuner (dev)";
  title.style.cssText = "font-weight:bold;margin-bottom:6px;color:#5eead4;";
  panel.appendChild(title);

  // Freeze the scroll dolly so dragging camera z isn't undone by scrolling.
  const freezeWrap = document.createElement("label");
  freezeWrap.style.cssText = "display:flex;align-items:center;gap:6px;margin:0 0 8px;cursor:pointer;";
  const freeze = document.createElement("input");
  freeze.type = "checkbox";
  freeze.addEventListener("change", () => {
    const w = window as unknown as Record<string, () => void>;
    if (freeze.checked) w.__deskFreeze?.();
    else w.__deskUnfreeze?.();
  });
  freezeWrap.append(freeze, document.createTextNode("freeze scroll dolly"));
  panel.appendChild(freezeWrap);

  const rows: Row[] = [
    ["cam x", () => camera.position.x, (v) => (camera.position.x = v), -8, 8, 0.05],
    ["cam y", () => camera.position.y, (v) => (camera.position.y = v), -3, 5, 0.05],
    ["cam z", () => camera.position.z, (v) => (camera.position.z = v), 2, 15, 0.05],
    ["look x", () => lookTarget.x, (v) => (lookTarget.x = v), -3, 3, 0.05],
    ["look y", () => lookTarget.y, (v) => (lookTarget.y = v), 0, 3, 0.05],
    ["look z", () => lookTarget.z, (v) => (lookTarget.z = v), -3, 3, 0.05],
    ["avatar x", () => avatar.position.x, (v) => (avatar.position.x = v), -3, 3, 0.05],
    ["avatar y", () => avatar.position.y, (v) => (avatar.position.y = v), -2, 2, 0.05],
    ["avatar z", () => avatar.position.z, (v) => (avatar.position.z = v), -3, 3, 0.05],
    ["avatar rX", () => avatar.rotation.x, (v) => (avatar.rotation.x = v), -PI, PI, 0.02],
    ["avatar rY", () => avatar.rotation.y, (v) => (avatar.rotation.y = v), -PI, PI, 0.02],
    ["avatar rZ", () => avatar.rotation.z, (v) => (avatar.rotation.z = v), -PI, PI, 0.02],
  ];
  if (neckTurn) {
    rows.push(
      ["neck tilt", () => neckTurn.x, (v) => (neckTurn.x = v), -1, 1, 0.02],
      ["neck turn", () => neckTurn.y, (v) => (neckTurn.y = v), -1, 1, 0.02],
      ["neck roll", () => neckTurn.z, (v) => (neckTurn.z = v), -1, 1, 0.02]
    );
  }
  if (laptop) {
    rows.push(
      ["laptop x", () => laptop.position.x, (v) => (laptop.position.x = v), -3, 3, 0.05],
      ["laptop y", () => laptop.position.y, (v) => (laptop.position.y = v), -2, 3, 0.05],
      ["laptop z", () => laptop.position.z, (v) => (laptop.position.z = v), -3, 4, 0.05],
      ["laptop rX", () => laptop.rotation.x, (v) => (laptop.rotation.x = v), -PI, PI, 0.02],
      ["laptop rY", () => laptop.rotation.y, (v) => (laptop.rotation.y = v), -PI, PI, 0.02],
      ["laptop rZ", () => laptop.rotation.z, (v) => (laptop.rotation.z = v), -PI, PI, 0.02],
      ["laptop scl", () => laptop.scale.x, (v) => laptop.scale.setScalar(v), 0.1, 3, 0.01]
    );
  }

  for (const [label, get, set, min, max, step] of rows) {
    const wrap = document.createElement("label");
    wrap.style.cssText = "display:flex;align-items:center;gap:6px;margin:3px 0;";
    const name = document.createElement("span");
    name.textContent = label;
    name.style.cssText = "width:64px;flex:none;";
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = String(get());
    slider.style.cssText = "flex:1;min-width:0;";
    const val = document.createElement("span");
    val.textContent = get().toFixed(2);
    val.style.cssText = "width:46px;flex:none;text-align:right;color:#9fb;";
    slider.addEventListener("input", () => {
      const v = parseFloat(slider.value);
      set(v);
      val.textContent = v.toFixed(2);
      camera.updateProjectionMatrix();
    });
    wrap.append(name, slider, val);
    panel.appendChild(wrap);
  }

  // Lid angle — drives the global helper from laptop.ts.
  const lidWrap = document.createElement("label");
  lidWrap.style.cssText = "display:flex;align-items:center;gap:6px;margin:3px 0;";
  const lidName = document.createElement("span");
  lidName.textContent = "lid°";
  lidName.style.cssText = "width:64px;flex:none;";
  const lid = document.createElement("input");
  lid.type = "range";
  lid.min = "60";
  lid.max = "160";
  lid.step = "1";
  lid.value = "130";
  lid.style.cssText = "flex:1;min-width:0;";
  const lidVal = document.createElement("span");
  lidVal.textContent = "130";
  lidVal.style.cssText = "width:46px;flex:none;text-align:right;color:#9fb;";
  lid.addEventListener("input", () => {
    lidVal.textContent = lid.value;
    (window as unknown as Record<string, (d: number) => void>).__laptopOpen?.(
      parseFloat(lid.value)
    );
  });
  lidWrap.append(lidName, lid, lidVal);
  panel.appendChild(lidWrap);

  // Copy current values to clipboard (and console) for baking into the code.
  const btn = document.createElement("button");
  btn.textContent = "📋 copy values";
  btn.style.cssText =
    "margin-top:8px;width:100%;padding:6px;cursor:pointer;background:#14b8a6;color:#04121a;border:none;border-radius:5px;font:bold 11px monospace;";
  btn.addEventListener("click", () => {
    const dump = {
      camPosition: camera.position.toArray().map(round),
      lookAt: lookTarget.toArray().map(round),
      avatarPosition: avatar.position.toArray().map(round),
      avatarRotation: [avatar.rotation.x, avatar.rotation.y, avatar.rotation.z].map(round),
      laptopPosition: laptop ? laptop.position.toArray().map(round) : null,
      laptopRotation: laptop
        ? [laptop.rotation.x, laptop.rotation.y, laptop.rotation.z].map(round)
        : null,
      laptopScale: laptop ? round(laptop.scale.x) : null,
      neckTurn: neckTurn ? [neckTurn.x, neckTurn.y, neckTurn.z].map(round) : null,
      lidDeg: parseFloat(lid.value),
    };
    const text = JSON.stringify(dump, null, 2);
    navigator.clipboard?.writeText(text);
    console.log("📐 desk values:\n" + text);
    btn.textContent = "✓ copied! (also in console)";
    setTimeout(() => (btn.textContent = "📋 copy values"), 1400);
  });
  panel.appendChild(btn);

  document.body.appendChild(panel);
}

// ─── Dev-only FACE morph tuner ──────────────────────────────────────────────
//
//  Lists every morph target (blendshape) on the model with a slider, plus a
//  dedicated "smile" slider (the only morph the face rig drives continuously)
//  and a name filter. Morph sliders range -1..1 so you can apply an INVERSE
//  correction — e.g. shrink an oversized lower lip by pushing a lip morph
//  negative. "copy" dumps every non-zero morph + smile for baking into code.
// ────────────────────────────────────────────────────────────────────────────

interface FaceRefs {
  params: { smile: number };
  root: THREE.Object3D;
  /** Mutable corrective-morph map the face rig applies every frame. */
  baseMorphs: Record<string, number>;
}

const FACE_PANEL_ID = "face-dev-panel";

export function mountFaceDevPanel({ params, root, baseMorphs }: FaceRefs) {
  document.getElementById(FACE_PANEL_ID)?.remove();

  // Collect morph targets by name → every mesh slot that exposes it.
  const byName = new Map<string, { inf: number[]; idx: number }[]>();
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && m.morphTargetDictionary && m.morphTargetInfluences) {
      for (const name in m.morphTargetDictionary) {
        const idx = m.morphTargetDictionary[name];
        if (!byName.has(name)) byName.set(name, []);
        byName.get(name)!.push({ inf: m.morphTargetInfluences, idx });
      }
    }
  });

  const panel = document.createElement("div");
  panel.id = FACE_PANEL_ID;
  panel.style.cssText = `
    position:fixed; top:12px; left:12px; z-index:99999;
    width:270px; max-height:92vh; overflow:auto; box-sizing:border-box;
    background:rgba(10,14,23,.92); color:#cde; font:11px/1.4 monospace;
    padding:10px 12px; border:1px solid #2a3550; border-radius:8px;
    backdrop-filter:blur(4px);`;

  const title = document.createElement("div");
  title.textContent = `🙂 face morphs (${byName.size})`;
  title.style.cssText = "font-weight:bold;margin-bottom:6px;color:#5eead4;";
  panel.appendChild(title);

  const sliderRow = (
    label: string,
    get: () => number,
    set: (v: number) => void,
    min: number,
    max: number
  ) => {
    const wrap = document.createElement("label");
    wrap.style.cssText = "display:flex;align-items:center;gap:6px;margin:2px 0;";
    const name = document.createElement("span");
    name.textContent = label;
    name.title = label;
    name.style.cssText = "width:96px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.step = "0.01";
    slider.value = String(get());
    slider.style.cssText = "flex:1;min-width:0;";
    const val = document.createElement("span");
    val.textContent = get().toFixed(2);
    val.style.cssText = "width:38px;flex:none;text-align:right;color:#9fb;";
    slider.addEventListener("input", () => {
      const v = parseFloat(slider.value);
      set(v);
      val.textContent = v.toFixed(2);
    });
    wrap.append(name, slider, val);
    return wrap;
  };

  // Smile — the one continuously-driven morph (lower default already applied).
  panel.appendChild(
    sliderRow("smile", () => params.smile, (v) => (params.smile = v), 0, 0.6)
  );

  const hr = document.createElement("div");
  hr.style.cssText = "border-top:1px solid #2a3550;margin:6px 0;";
  panel.appendChild(hr);

  // Filter box — type "lip", "mouth", "jaw" to narrow the list.
  const filter = document.createElement("input");
  filter.type = "text";
  filter.placeholder = "filter… e.g. lip / mouth / jaw";
  filter.style.cssText =
    "width:100%;box-sizing:border-box;margin-bottom:6px;background:#0a0e17;color:#cde;border:1px solid #2a3550;border-radius:4px;padding:3px 6px;font:11px monospace;";
  panel.appendChild(filter);

  // One row per morph. Smile/blink are auto-driven, so skip them here (use the
  // smile slider above). Range -1..1 to allow inverse corrections. Each slider
  // writes the corrective map (baseMorphs), which the face rig applies every
  // frame — so values persist and survive the baked clip.
  const rows: { name: string; el: HTMLElement }[] = [];
  for (const [name] of [...byName.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (/smile|blink/i.test(name)) continue;
    const row = sliderRow(
      name,
      () => baseMorphs[name] ?? 0,
      (v) => (baseMorphs[name] = v),
      -1,
      1
    );
    rows.push({ name, el: row });
    panel.appendChild(row);
  }

  filter.addEventListener("input", () => {
    const q = filter.value.toLowerCase();
    for (const r of rows) r.el.style.display = r.name.toLowerCase().includes(q) ? "" : "none";
  });

  const btn = document.createElement("button");
  btn.textContent = "📋 copy non-zero morphs";
  btn.style.cssText =
    "margin-top:8px;width:100%;padding:6px;cursor:pointer;background:#14b8a6;color:#04121a;border:none;border-radius:5px;font:bold 11px monospace;";
  btn.addEventListener("click", () => {
    const nonZero: Record<string, number> = {};
    for (const name in baseMorphs) {
      const v = baseMorphs[name];
      if (Math.abs(v) > 0.005) nonZero[name] = Math.round(v * 1000) / 1000;
    }
    const dump = { smile: Math.round(params.smile * 1000) / 1000, morphs: nonZero };
    const text = JSON.stringify(dump, null, 2);
    navigator.clipboard?.writeText(text);
    console.log("🙂 face values:\n" + text);
    btn.textContent = "✓ copied!";
    setTimeout(() => (btn.textContent = "📋 copy non-zero morphs"), 1400);
  });
  panel.appendChild(btn);

  document.body.appendChild(panel);
}
