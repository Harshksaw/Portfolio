import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

// Load + decode the HDRI environment ONCE and share the GPU texture across all
// three section scenes (was loaded + decoded 3×, wasting memory and bandwidth).
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

// Lighting tuned for Avaturn human scale (1 unit = 1 metre, head at Y≈1.65).
// rimSelector is the backlight-glow element to fade in with the lights; only
// the hero section has one (".character-rim"). Other sections omit it so they
// don't reach across the DOM and animate the hero's rim.
const setLighting = (scene: THREE.Scene, rimSelector?: string) => {
  // Key light — cyan tint to match the portfolio colour scheme
  const directionalLight = new THREE.DirectionalLight(0x5eead4, 0);
  directionalLight.position.set(-1, 2, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 20;
  scene.add(directionalLight);

  // Fill light from below-right — subtle warmth
  const fillLight = new THREE.PointLight(0x22d3ee, 0, 8, 2);
  fillLight.position.set(1.5, 1.0, 1.0);
  scene.add(fillLight);

  // HDRI environment — shared singleton texture (lighting only, not a background)
  loadSharedEnv().then((texture) => {
    scene.environment = texture;
    scene.environmentIntensity = 0;
    scene.environmentRotation.set(5.76, 85.85, 1);
  });

  // Called each frame — driven by monitor screen material opacity
  function setPointLight(screenMat: THREE.MeshStandardMaterial | null) {
    if (!screenMat) return;
    if (screenMat.opacity > 0.9) {
      fillLight.intensity = screenMat.emissiveIntensity * 1.5;
    } else {
      fillLight.intensity = 0;
    }
  }

  function turnOnLights() {
    gsap.to(scene, { environmentIntensity: 0.64, duration: 2, ease: "power2.inOut" });
    gsap.to(directionalLight, { intensity: 1, duration: 2, ease: "power2.inOut" });
    if (rimSelector) {
      gsap.to(rimSelector, { y: "55%", opacity: 1, delay: 0.2, duration: 2 });
    }
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
