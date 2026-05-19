import * as THREE from "three";
import { GLTFLoader, GLTF } from "three-stdlib";

const MODEL_PATH = "/models/avatar.glb";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();

  const loadCharacter = (): Promise<{ gltf: GLTF; mixer: THREE.AnimationMixer } | null> => {
    return new Promise((resolve, reject) => {
      loader.load(
        MODEL_PATH,
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          character.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              (child as THREE.Mesh).frustumCulled = true;
            }
          });

          // Debug: print all bone names to verify skeleton for retargeting
          character.traverse((obj) => {
            if ((obj as THREE.Bone).isBone) console.log("BONE:", obj.name);
          });

          const mixer = new THREE.AnimationMixer(character);
          resolve({ gltf, mixer });
        },
        undefined,
        (error) => {
          console.error(`Failed to load character model at ${MODEL_PATH}`, error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
