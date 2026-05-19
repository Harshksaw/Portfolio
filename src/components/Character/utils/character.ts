import * as THREE from "three";
import { GLTFLoader, GLTF, FBXLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { createMonitor, MonitorRefs } from "./monitor";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const gltfLoader = new GLTFLoader();
  const fbxLoader = new FBXLoader();

  const loadCharacter = (): Promise<{ gltf: GLTF; typingClip: THREE.AnimationClip; monitor: MonitorRefs } | null> => {
    return new Promise((resolve, reject) => {
      // Load avatar GLB and Typing FBX in parallel
      const gltfPromise = new Promise<GLTF>((res, rej) =>
        gltfLoader.load("/models/avatar.glb", res, undefined, rej)
      );
      const fbxPromise = new Promise<THREE.Group>((res, rej) =>
        fbxLoader.load("/models/Typing.fbx", res, undefined, rej)
      );

      Promise.all([gltfPromise, fbxPromise])
        .then(async ([gltf, fbx]) => {
          const character = gltf.scene;

          // Scale Avaturn model to a comfortable size in the scene
          character.scale.setScalar(1);

          await renderer.compileAsync(character, camera, scene);

          character.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              (child as THREE.Mesh).frustumCulled = true;
            }
          });

          // Build the procedural monitor and add it to the scene
          const monitor = createMonitor(scene);

          // Set up scroll-driven GSAP timelines, passing monitor refs
          setCharTimeline(character, camera, monitor);
          setAllTimeline();

          // Extract the Typing AnimationClip from the FBX
          // Mixamo exports with the clip in fbx.animations[0]
          const typingClip = fbx.animations[0];
          if (!typingClip) {
            console.warn("No animation found in Typing.fbx");
          }

          // Dispose FBX group — only the AnimationClip is needed, never add to scene
          fbx.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              const mat = mesh.material;
              if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
              else (mat as THREE.Material).dispose();
            }
          });

          resolve({ gltf, typingClip, monitor });
        })
        .catch((err) => {
          console.error("Error loading character assets:", err);
          reject(err);
        });
    });
  };

  return { loadCharacter };
};

export default setCharacter;
