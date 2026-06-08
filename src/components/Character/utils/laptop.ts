import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export async function loadLaptop(scene: THREE.Scene): Promise<THREE.Object3D | null> {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/macbook.glb");
    const laptop = gltf.scene;

    laptop.scale.setScalar(0.01);

    laptop.position.set(0.4, 0.74, 0.4);
    laptop.rotation.y = Math.PI + 0.3;
    laptop.rotation.x = 0.05;

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
    console.warn("⚠️ macbook.glb not found");
    return null;
  }
}
