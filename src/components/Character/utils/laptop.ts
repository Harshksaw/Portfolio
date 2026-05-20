import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export async function loadLaptop(scene: THREE.Scene): Promise<THREE.Object3D | null> {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync("/models/laptop.glb");
    const laptop = gltf.scene;

    laptop.scale.setScalar(0.01);

    // Angled slightly to the right, screen tilted open toward camera
    // Tune live in console: __laptop.position.set(x,y,z) / __laptop.rotation.y = val
    laptop.position.set(0.1, 0.74, -0.35);
    laptop.rotation.y = Math.PI + 0.3;  // facing camera + slight angle
    laptop.rotation.x = 0.05;           // very slight forward tilt

    laptop.visible = false;

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
