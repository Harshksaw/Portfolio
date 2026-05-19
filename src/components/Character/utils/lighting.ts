import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

// Lighting tuned for Avaturn human scale (1 unit = 1 metre, head at Y≈1.65)
const setLighting = (scene: THREE.Scene) => {
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

  // HDRI environment — reuse the same file (lighting, not visible as background)
  new RGBELoader().setPath("/models/").load("char_enviorment.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
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
    gsap.to(".character-rim", { y: "55%", opacity: 1, delay: 0.2, duration: 2 });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
