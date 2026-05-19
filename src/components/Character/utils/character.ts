import * as THREE from "three";
import { GLTFLoader, GLTF } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();

  const loadCharacter = (): Promise<{ gltf: GLTF; mixer: THREE.AnimationMixer } | null> => {
    return new Promise((resolve, reject) => {
      loader.load(
        "/models/portfolio_scene.glb",
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

          const mixer = new THREE.AnimationMixer(character);
          if (gltf.animations.length > 0) {
            const action = mixer.clipAction(gltf.animations[0]);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
          }

          setCharTimeline(character, camera);
          setAllTimeline();

          resolve({ gltf, mixer });
        },
        undefined,
        reject
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
