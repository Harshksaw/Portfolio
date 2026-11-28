import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

let sharedEnv: Promise<THREE.Texture> | null = null;
function loadSharedEnv(): Promise<THREE.Texture> {
  if (!sharedEnv) {
    sharedEnv = new RGBELoader()
      .setPath("/models/")
      .loadAsync("char_enviorment.hdr")
      .then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        return texture;
      });
  }
  return sharedEnv;
}

const setLighting = (scene: THREE.Scene, rimSelector?: string) => {
  // Neutral phosphor-balanced studio key light (keeps skin natural while matching Terminal ground)
  const directionalLight = new THREE.DirectionalLight(0xe6f9ea, 0);
  directionalLight.position.set(-1, 2, 2);
  scene.add(directionalLight);

  const fillLight = new THREE.PointLight(0x86efac, 0, 8, 2);
  fillLight.position.set(1.5, 1.0, 1.0);
  scene.add(fillLight);

  let disposed = false;
  loadSharedEnv().then((texture) => {
    if (disposed) return;
    scene.environment = texture;
    scene.environmentIntensity = 0;
    scene.environmentRotation.set(5.76, 85.85, 1);
  });

  function setPointLight(screenMat: THREE.MeshStandardMaterial | null) {
    if (!screenMat) return;
    fillLight.intensity =
      screenMat.opacity > 0.9 ? screenMat.emissiveIntensity * 1.5 : 0;
  }

  function turnOnLights() {
    disposed = false;
    gsap.to(scene, {
      environmentIntensity: 0.62,
      duration: 1.2,
      ease: "power2.out",
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: 1.2,
      ease: "power2.out",
    });
    if (rimSelector) {
      gsap.to(rimSelector, { opacity: 1, duration: 1, ease: "power2.out" });
    }
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
