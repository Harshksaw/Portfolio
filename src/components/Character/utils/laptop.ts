import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export async function loadLaptop(scene: THREE.Scene): Promise<THREE.Object3D | null> {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/laptop.glb");
    const laptop = gltf.scene;

    // Sketchfab models are often in cm (1 unit = 1cm), so 0.01 = 1 metre scale
    laptop.scale.setScalar(0.01);

    // Position: in front of avatar's hands when sitting
    // Y=0.74 = desk height, Z=-0.3 = in front, adjust as needed
    laptop.position.set(0, 0.74, -0.3);

    // Face the laptop screen toward the camera
    laptop.rotation.y = Math.PI;

    // Visible for tuning — set back to false once position is correct
    laptop.visible = true;

    laptop.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(laptop);
    // Expose to browser console for live tuning: window.__laptop.position.set(x,y,z)
    (window as any).__laptop = laptop;
    console.log("✅ Laptop loaded — tune live: window.__laptop.position / scale / rotation");
    return laptop;
  } catch {
    console.warn("⚠️ laptop.glb not found");
    return null;
  }
}
