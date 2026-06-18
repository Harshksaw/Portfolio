# 3D Portfolio — Complete End-to-End Guide

Everything you need to understand how the project works, what every file does,
how the pieces connect, and how to do the Blender work to finish it.

---

## Table of Contents
1. [The Big Picture — How Everything Connects](#1-the-big-picture)
2. [The Data Flow — Step by Step](#2-the-data-flow)
3. [File-by-File Breakdown](#3-file-by-file-breakdown)
4. [The Three.js Mental Model](#4-the-threejs-mental-model)
5. [The GSAP Mental Model](#5-the-gsap-mental-model)
6. [Debug Code — Paste & Run](#6-debug-code)
7. [Blender Guide — Creating portfolio_scene.glb](#7-blender-guide)
8. [After Blender — Verification Checklist](#8-after-blender)

---

## 1. The Big Picture

```
Browser
  │
  ├── React renders a <div id="character-model"> in the DOM
  │
  ├── Three.js creates a <canvas> INSIDE that div
  │     └── WebGLRenderer draws 3D graphics into the canvas every frame (~60fps)
  │
  ├── GSAP watches scroll position
  │     └── As you scroll, it directly mutates Three.js object properties
  │           (camera.position.z, character.rotation.y, etc.)
  │
  └── AnimationMixer plays the typing animation
        └── Every frame, it moves bones → bones deform the mesh → character types
```

The key insight: **React only owns the div wrapper**. Everything inside is pure
Three.js + GSAP. They talk directly to each other, bypassing React's state entirely.
This is intentional — React re-renders are too slow for 60fps 3D.

---

## 2. The Data Flow

### App startup sequence

```
App.tsx
  └── <LoadingProvider>          ← manages loading screen visibility
        └── <MainContainer>      ← all the HTML sections (Landing, About, etc.)
        └── <CharacterModel>     ← lazy-loaded, triggers Scene.tsx
              └── Scene.tsx
                    │
                    ├── 1. Create THREE.WebGLRenderer → append <canvas> to div
                    ├── 2. Create THREE.PerspectiveCamera at (0, 1.65, 2.8)
                    ├── 3. setLighting(scene) → add lights + load HDR environment
                    ├── 4. setProgress() → starts fake loading counter (0→91%)
                    ├── 5. loadCharacter() → fetch portfolio_scene.glb from /models/
                    │         ↓ (async, takes 1-3 seconds)
                    ├── 6. GLB loaded → scene.add(character)
                    ├── 7. AnimationMixer.play() → typing animation starts
                    ├── 8. setCharTimeline() → registers GSAP scroll listeners
                    ├── 9. setAllTimeline() → registers career section scroll
                    ├── 10. progress.loaded() → counter rushes to 100%
                    ├── 11. Loading screen fades out, lights turn on
                    └── 12. requestAnimationFrame loop runs forever
```

### Every frame (60fps)

```
animate() {
  requestAnimationFrame(animate)     ← schedule next frame

  handleHeadRotation(headBone, ...)  ← rotate head toward mouse cursor
  mixer.update(delta)                ← advance typing animation by elapsed time
  renderer.render(scene, camera)     ← draw everything to canvas
}
```

---

## 3. File-by-File Breakdown

### `src/main.tsx`
Entry point. Mounts React. Nothing 3D here.

### `src/App.tsx`
```
LoadingProvider
  └── MainContainer (lazy)
        └── CharacterModel (lazy)   ← this is what loads the 3D scene
```
Both are lazy-loaded so the JS bundle splits — the 3D code only downloads when needed.

### `src/context/LoadingProvider.tsx`
A React context that holds two things:
- `isLoading` (bool) — when true, the Loading screen renders on top of everything
- `setLoading(percent)` — called by Scene.tsx to update the loading bar

The loading screen unmounts completely when `isLoading` becomes false. This is
triggered from `Loading.tsx` after the progress bar hits 100% AND the user
clicks (or auto-clicks after 0.9s).

### `src/components/Loading.tsx`
Two things in one file:

**The visual component** (`<Loading percent={n} />`)
- Shows the HKS logo, marquee text, and a loading button
- When `percent >= 100`, sets `loaded = true` → button shows "Welcome"
- After the user clicks (or auto-clicks), calls `initialFX()` then hides

**`setProgress(setLoading)`** — a fake progress counter (not exported as component)
- Runs an interval that increments from 0→91% randomly
- Stops at 91% and waits for the GLB to actually finish loading
- When `progress.loaded()` is called (GLB done), rushes 91→100% in 2ms steps
- Returns `{ loaded(), percent, clear }`

This fake counter exists because GLB loading progress events are unreliable.

### `src/components/Character/Scene.tsx`
**The heart of the whole system.** Creates and owns the Three.js world.

Key variables inside the `useEffect`:
```
renderer    — WebGLRenderer, draws to canvas
camera      — PerspectiveCamera, FOV 14.5° (telephoto), starts at z=2.8
scene       — THREE.Scene, holds all 3D objects
headBone    — reference to the "Head" bone for mouse tracking
mixer       — AnimationMixer, drives the typing animation
clock       — THREE.Clock, measures time between frames for mixer.update(delta)
```

The `useEffect` cleanup function (`return () => {...}`) is critical.
It runs when React unmounts the component (or in dev mode, before remount).
It cancels the animation frame, stops the mixer, clears the scene, and
disposes the renderer. Without this, you'd get memory leaks and duplicate scenes.

The `cancelled` flag prevents the async GLB load from completing after cleanup:
```ts
let cancelled = false;
loadCharacter().then(result => {
  if (cancelled) return;  // ← the first mount's load arrives after cleanup: ignore it
  // ...
});
return () => { cancelled = true; };
```

### `src/components/Character/utils/character.ts`
Owns the GLB loading logic.

```ts
loader.load("/models/portfolio_scene.glb", async (gltf) => {
  // 1. renderer.compileAsync() — pre-uploads all meshes to GPU
  //    Without this, the first render frame causes a stutter as GPU compiles shaders
  await renderer.compileAsync(character, camera, scene);

  // 2. Set shadow properties on every mesh in the scene graph
  character.traverse(child => {
    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = true;  // GPU skips drawing meshes outside camera view
  });

  // 3. AnimationMixer — plays gltf.animations[0] (the typing clip baked in Blender)
  const mixer = new THREE.AnimationMixer(character);
  mixer.clipAction(gltf.animations[0]).play();

  // 4. Register GSAP scroll timelines (need character + camera to exist first)
  setCharTimeline(character, camera);
  setAllTimeline();
});
```

### `src/components/Character/utils/lighting.ts`
Sets up three light sources:

```
DirectionalLight (cyan, #5eead4)
  position: (-1, 2, 2)             ← top-left-front, like a key light in photography
  intensity: starts at 0           ← turnOnLights() animates it to 1

PointLight (cyan, #22d3ee)
  position: (1.5, 1.0, 1.0)       ← right side at desk height
  intensity: starts at 0

HDR Environment (char_enviorment.hdr)
  environmentIntensity: starts at 0
  ← turnOnLights() animates it to 0.64
  ← Gives realistic reflections on skin/clothing without being a visible background
```

`turnOnLights()` is called 500ms after the GLB loads. It uses GSAP to fade all
three lights up over 2 seconds, giving a smooth "lights come on" reveal.
It also animates `.character-rim` (a CSS gradient div) into position.

### `src/components/Character/utils/mouseUtils.ts`
Four functions:

**`handleMouseMove`** — converts raw pixel coordinates to normalized device
coordinates (-1 to +1 range) used by Three.js:
```
mouseX = (clientX / window.innerWidth) * 2 - 1
mouseY = -(clientY / window.innerHeight) * 2 + 1
         ↑ negated because CSS Y goes down, Three.js Y goes up
```

**`handleHeadRotation`** — called every frame, uses `lerp` for smooth motion:
```
if scrollY < 200 (user is at top of page):
  headBone.rotation.y lerps toward mouseX * 30°   ← look left/right
  headBone.rotation.x lerps toward -mouseY * 30°  ← look up/down

else (user has scrolled down):
  headBone slowly lerps to rotation (-0.4, -0.3)  ← looking down at monitor
```

The `lerp` (linear interpolation) factor (0.1–0.2) controls smoothness.
A value of 0.1 means "move 10% of the remaining distance each frame" → feels
like the head is floating/lagging behind the mouse, which looks natural.

**`handleTouchMove`** / **`handleTouchEnd`** — mobile equivalents.
On touch end, the head slowly drifts back to center over 3 seconds.

### `src/components/utils/GsapScroll.ts`
Three scroll-driven timelines. `scrub: true` means the animation position is
directly tied to scroll position — scrolling forward plays forward, scrolling
back plays in reverse.

```
tl1 — trigger: .landing-section
  Fires as the landing section scrolls UP out of view.
  character.rotation.y: 0 → 0.7      (turns to face left)
  camera.position.z: 2.8 → 2.2       (slight pull back)
  .character-model: x → -25%         (shifts left so text can appear right)
  .landing-container: opacity → 0    (landing text fades)
  .about-me: y: -50% → 0%            (about text slides up from below)

tl2 — trigger: .about-section
  The BIG reveal. Fires as about section comes into view.
  camera.position.z: 2.2 → 8.0       (pulls far back — shows full body)
  camera.position.y: 1.65 → 0.85     (tilts down — shows desk)
  character.rotation.y → 0.92        (turns more, shows desk angle)
  Neck.rotation.x → 0.4             (neck bends down, looks at monitor)
  .character-rim: fades out          (the glow ring disappears)

tl3 — trigger: .whatIDO
  .character-model: y → -100%        (character slides off top of screen)
  .whatIDO: y → 15%                  (section parallaxes upward)
```

`invalidateOnRefresh: true` means if the page is resized, GSAP recalculates
scroll positions so animations stay in sync.

### `src/components/utils/initialFX.ts`
Runs once when the loading screen finishes. Uses GSAP SplitText to animate
the landing page text letter by letter. Nothing 3D — pure CSS animation.

### `src/components/Character/utils/resizeUtils.ts`
Called on `window.resize`. Updates renderer size, camera aspect ratio,
kills all ScrollTriggers, and rebuilds them fresh (because scroll positions
change when the window size changes).

---

## 4. The Three.js Mental Model

```
Scene (a container, like a stage)
  ├── DirectionalLight
  ├── PointLight
  └── character (THREE.Object3D — the root of the GLB scene graph)
        ├── Armature (the skeleton container)
        │     ├── Hips (root bone)
        │     │     ├── Spine → Spine1 → Spine2 → Neck → Head
        │     │     ├── LeftUpLeg → LeftLeg → LeftFoot
        │     │     ├── RightUpLeg → RightLeg → RightFoot
        │     │     ├── LeftArm → LeftForeArm → LeftHand → fingers
        │     │     └── RightArm → RightForeArm → RightHand → fingers
        ├── Body_mesh (SkinnedMesh — the skin that bends with bones)
        ├── Hair_mesh
        ├── Shirt_mesh
        ├── Desk (static mesh — no bones)
        └── Monitor_group
              ├── Frame_mesh
              └── Screen_mesh    ← getObjectByName("Screen") for glow effect
```

**AnimationMixer** sits alongside the scene graph. It holds an array of
AnimationActions, each of which has an AnimationClip. Each clip contains
tracks — arrays of (time, value) keyframes for specific bone properties:

```
AnimationClip "TypingAction"
  ├── Track: "Hips.position"        keyframes: [{t:0, v:(0,0.9,0)}, {t:0.1, v:(0,0.91,0)}, ...]
  ├── Track: "Spine.quaternion"     keyframes: [{t:0, v:(0,0,0,1)}, ...]
  ├── Track: "LeftForeArm.quaternion"
  ├── Track: "RightForeArm.quaternion"
  └── ... (one track per animated bone property)
```

Each `mixer.update(delta)` call advances all tracks by `delta` seconds,
interpolates between keyframes, and writes the result into the bone's
position/rotation/scale. The GPU then uses those bone transforms to deform
the mesh vertices — this is "skeletal animation" / "skinning".

---

## 5. The GSAP Mental Model

GSAP doesn't know or care about Three.js. It just mutates JavaScript object
properties over time. Three.js happens to read those same properties when
rendering each frame.

```
gsap.to(camera.position, { z: 8.0, duration: 6 })

This tells GSAP:
  "Over 6 seconds, change camera.position.z from its current value to 8.0"

GSAP internally does:
  every 16ms: camera.position.z += (8.0 - startZ) / (6000 / 16)

Three.js render loop reads camera.position.z every frame → camera appears to move
```

With `scrub: true`, instead of time, it's driven by scroll position:
```
gsap.to(camera.position, { z: 8.0, scrub: true })

scroll 0% through trigger → camera.position.z = startZ
scroll 50% through trigger → camera.position.z = midpoint
scroll 100% through trigger → camera.position.z = 8.0
```

This is why the camera movement feels physically tied to your scroll — it IS.

---

## 6. Debug Code

Add these temporarily to `character.ts` inside the `loader.load` callback,
right after `await renderer.compileAsync(...)`, to understand what's in your GLB.

### Print every object name in the scene
```ts
console.group("Scene graph");
character.traverse((obj) => {
  const indent = "  ".repeat(obj.name ? 1 : 0);
  console.log(indent + obj.type + " → " + (obj.name || "(unnamed)"));
});
console.groupEnd();
```

### Print all animation clips and their tracks
```ts
console.group("Animations in GLB");
gltf.animations.forEach((clip, i) => {
  console.log(`[${i}] "${clip.name}" — ${clip.duration.toFixed(2)}s, ${clip.tracks.length} tracks`);
  clip.tracks.slice(0, 5).forEach(t => console.log("   track:", t.name));
});
console.groupEnd();
```

### Check the specific bones the code needs
```ts
const requiredBones = ["Head", "Neck", "Spine", "Hips"];
requiredBones.forEach(name => {
  const bone = character.getObjectByName(name);
  console.log(bone
    ? `✅ Found bone: ${name} at (${bone.position.x.toFixed(2)}, ${bone.position.y.toFixed(2)}, ${bone.position.z.toFixed(2)})`
    : `❌ MISSING bone: ${name}`
  );
});
```

### Print all mesh names (useful for finding the screen mesh)
```ts
console.group("Meshes");
character.traverse((obj) => {
  if ((obj as THREE.Mesh).isMesh) {
    console.log("Mesh:", obj.name, "| visible:", obj.visible);
  }
});
console.groupEnd();
```

### Add a visual axes helper (shows XYZ as RGB lines)
```ts
// Add this in Scene.tsx after scene is created:
const axes = new THREE.AxesHelper(2);
scene.add(axes);
// Red = X, Green = Y, Blue = Z
// The character's feet should be near Y=0
// Head should be near Y=1.65
```

### Log the camera position every 2 seconds (to calibrate scroll animations)
```ts
// Add in Scene.tsx animate() loop:
if (Math.floor(clock.getElapsedTime()) % 2 === 0) {
  console.log("Camera:", camera.position.x.toFixed(2), camera.position.y.toFixed(2), camera.position.z.toFixed(2));
}
```

---

## 7. Blender Guide — Creating portfolio_scene.glb

### What you're building
One file that contains:
- Your Avaturn avatar with the Sitting Typing animation baked in
- A desk + monitor positioned perfectly in front of the character
- Everything at the right scale (1 Blender unit = 1 metre)

### Assets to prepare before opening Blender

| Asset | Source | Format |
|---|---|---|
| Your avatar | `/Users/harshsaw/Downloads/model.glb` | GLB |
| Sitting Typing animation | mixamo.com → search "Sitting Typing" → Without Skin, FBX, No keyframe reduction | FBX |
| Desk + monitor | sketchfab.com → search "computer desk" → free download | GLB or FBX |

**Important on Mixamo**: Search specifically for **"Sitting Typing"** not just "Typing".
The sitting variant has the full body in a chair pose. The standing "Typing" variant
only moves the arms and the character will appear to float.

---

### Step-by-Step Blender Instructions

#### SETUP

**1. Open Blender, new General file**
Delete the default cube: `A` (select all) → `Delete`

**2. Set units to Metric**
Scene Properties (camera icon) → Units → Unit System: Metric, Unit Scale: 1.0
This ensures 1 Blender unit = 1 metre, matching Three.js.

---

#### IMPORT AVATAR

**3. Import your Avaturn avatar**
File → Import → glTF 2.0 (.glb/.gltf) → select `model.glb` → Import

Your character appears in T-pose at the world origin. The head should be at
roughly Y=1.65m. If it's at Y=165 (wrong scale), select the armature, press
`S` and type `0.01` to scale it down, then `Ctrl+A → Apply Scale`.

---

#### IMPORT & APPLY ANIMATION

**4. Import the Sitting Typing FBX**
File → Import → FBX (.fbx) → select `Sitting_Typing.fbx` → Import

A second armature appears. In the Outliner you'll see two armatures.
The Mixamo one is named something like "Armature" or "mixamorig".

**5. Check the animation is there**
Select the Mixamo armature → open the Timeline (bottom) → press Space to play.
You should see the character animate. If nothing moves, the FBX imported without
animation — try re-exporting from Mixamo with Keyframe Reduction: None.

**6. Retarget the animation to your avatar**

Since both your avatar AND the Mixamo FBX use identical Mixamo bone names
(Head, Neck, Spine, LeftArm, etc.), retargeting is just copying the action:

Option A — With the **Rokoko Retargeting** addon (easiest, free):
- Download from: github.com/Rokoko/rokoko-studio-live-blender (free)
- Edit → Preferences → Add-ons → Install → select the downloaded zip
- Enable it
- In the 3D Viewport sidebar (press `N`) → Rokoko tab
- Source armature: the Mixamo armature
- Target armature: your Avaturn armature
- Click **Retarget** → done

Option B — Manual bake (no addon):
- Select your **Avaturn armature** → enter Pose Mode (`Ctrl+Tab`)
- Select all bones: `A`
- Object → Animation → **Bake Action**
  - Frame Start: 0, Frame End: (check timeline total frames, usually 100-200)
  - ✅ Only Selected Bones
  - ✅ Visual Keying
  - ✅ Clear Constraints
  - Click **OK**
- This bakes the pose from the Mixamo armature onto your avatar bone by bone

**7. Verify the animation transferred**
- Select your Avaturn armature
- Open the Action Editor (change bottom editor type)
- You should see an action with many keyframes
- Press Space — your avatar should now be sitting and typing

**8. Delete the Mixamo armature**
Select the Mixamo armature in the Outliner → press `Delete`.
You don't need it anymore.

---

#### ADD THE DESK

**9. Import the desk/monitor GLB**
File → Import → glTF 2.0 → select your desk file → Import

**10. Position the desk**
The desk surface (tabletop) should be at approximately Y = 0.74m (standard desk height).
The monitor screen should be roughly 0.4-0.5m in front of where the avatar's hands rest.

Use `G` to grab and move, `S` to scale.
Press `Numpad 1` for front view, `Numpad 3` for side view to check alignment.

**11. Position the avatar**
Your avatar's hips need to be at the right height to sit "in" the chair.
- Select the Avaturn armature → Pose Mode
- Select the Hips bone
- `G` → `Z` → move down until the avatar looks naturally seated

Aim for hands roughly at desk height (Y ≈ 0.75-0.8m) and knees bent.

---

#### PREPARE FOR EXPORT

**12. Push animation to NLA editor**
- Select the Avaturn armature
- Open the **NLA Editor** (change editor type at bottom)
- You'll see the action as a yellow strip
- Click the **Push Down** button (⬇ arrow) to make it a blue NLA strip
- This ensures the animation exports correctly with the GLB

**13. Name the screen mesh (optional)**
Click the monitor screen mesh in Outliner → `F2` or double-click to rename → type `Screen`
This lets Three.js find it: `character.getObjectByName("Screen")`

---

#### EXPORT

**14. Select everything to export**
In Object Mode: `A` to select all (avatar armature, avatar mesh(es), desk, monitor)

**15. Export as GLB**
File → Export → glTF 2.0 (.glb/.gltf)

Settings (right panel in the export dialog):
```
Format:         glTF Binary (.glb)    ← single file, no external textures
Include:        ✅ Selected Objects
Transform:      ✅ Apply
Geometry:       ✅ Apply Modifiers
                ✅ UVs, Normals, Tangents, Vertex Colors
                ✅ Materials
Animation:      ✅ Animations
                ✅ NLA Tracks
                ✅ All Armature Actions  (or just the current one)
                ❌ Export Deformations Only  (uncheck — desk has no bones)
Compression:    ❌ OFF  (Three.js doesn't use Draco by default)
```

Save as: `portfolio_scene.glb`

**16. Copy to the project**
```bash
cp ~/Desktop/portfolio_scene.glb /Volumes/Transcend/Github/Portfolio/public/models/
```

---

## 8. After Blender — Verification Checklist

Run `npm run dev` from the project root. Open browser console.

**Step 1 — Add the debug bone check from Section 6**
Paste the "Check the specific bones" code into `character.ts`.
You should see:
```
✅ Found bone: Head at (0.00, 1.65, 0.05)
✅ Found bone: Neck at (0.00, 1.52, 0.02)
```
If you see ❌, the bone name in your GLB is different. Print all bone names
with the "Print every object name" debug snippet to find the actual names,
then update `getObjectByName("Head")` in Scene.tsx and `getObjectByName("Neck")`
in GsapScroll.ts to match.

**Step 2 — Verify animation plays**
You should see the character sitting, arms moving in a typing motion.
If the character is in T-pose, the NLA strip wasn't exported correctly.
Go back to Blender: make sure you clicked Push Down before exporting.

**Step 3 — Verify scroll animations**
- Scroll slowly past the landing section → character should rotate left
- Keep scrolling → camera should pull back to reveal the full desk
- Neck should tilt down toward the monitor
- Continue scrolling → character slides up off screen

**Step 4 — Check file size**
```bash
ls -lh public/models/portfolio_scene.glb
```
Should be under 15MB. If it's larger, the desk model may have very high
polygon count — find a lower-poly desk on Sketchfab, or use Blender's
Decimate modifier to reduce triangles.

**Step 5 — Remove debug code**
Once everything works, delete all the `console.log` debug blocks from `character.ts`.

---

## Quick Reference — Camera Positions

| State | camera.y | camera.z | What user sees |
|---|---|---|---|
| Initial (headshot) | 1.65 | 2.8 | Face close-up |
| After tl1 scroll | 1.65 | 2.2 | Slight pull-back, char rotated |
| After tl2 scroll | 0.85 | 8.0 | Full body + desk revealed |

## Quick Reference — Key Files

| Question | File to look at |
|---|---|
| How does the GLB load? | `src/components/Character/utils/character.ts` |
| How does the animation loop work? | `src/components/Character/Scene.tsx` (animate function) |
| How do scroll animations work? | `src/components/utils/GsapScroll.ts` |
| How does the head follow the mouse? | `src/components/Character/utils/mouseUtils.ts` |
| How do the lights work? | `src/components/Character/utils/lighting.ts` |
| How does the loading screen work? | `src/components/Loading.tsx` + `src/context/LoadingProvider.tsx` |
| What happens when window resizes? | `src/components/Character/utils/resizeUtils.ts` |
