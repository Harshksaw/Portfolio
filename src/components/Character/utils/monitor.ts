import * as THREE from "three";

export interface MonitorRefs {
  group: THREE.Group;
  screenMat: THREE.MeshStandardMaterial;
  frameMat: THREE.MeshStandardMaterial;
  screenLight: THREE.PointLight;
}

export function createMonitor(scene: THREE.Scene): MonitorRefs {
  const group = new THREE.Group();

  // Monitor frame (dark housing)
  const frameMat = new THREE.MeshStandardMaterial({
    color: "#1a1a2e",
    transparent: true,
    opacity: 0,
    roughness: 0.8,
    metalness: 0.3,
  });
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.44, 0.04),
    frameMat
  );

  // Screen face — emissive cyan, same colour as original screenlight
  const screenMat = new THREE.MeshStandardMaterial({
    color: "#B0F5EA",
    emissive: "#B0F5EA",
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0,
    roughness: 0.1,
  });
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.58, 0.36),
    screenMat
  );
  screen.position.z = 0.022; // sits flush on front face of frame

  // Stand neck (thin vertical bar)
  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.22, 0.03),
    frameMat
  );
  stand.position.y = -0.33;

  // Stand base (flat foot)
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.03, 0.12),
    frameMat
  );
  base.position.y = -0.45;

  group.add(frame, screen, stand, base);

  // Position: in front of avatar at desk height, angled slightly
  group.position.set(0.18, 1.08, -0.38);
  group.rotation.y = -0.08;

  // Start hidden (GSAP will reveal via opacity)
  group.visible = true;
  scene.add(group);

  // Point light driven by screen emissive — starts off
  const screenLight = new THREE.PointLight(0x22d3ee, 0, 3, 2);
  screenLight.position.set(0.18, 1.08, 0);
  scene.add(screenLight);

  return { group, screenMat, frameMat, screenLight };
}

// Called every frame in the animate loop — syncs point light to screen glow
export function updateScreenLight(
  screenMat: THREE.MeshStandardMaterial,
  screenLight: THREE.PointLight
) {
  if (screenMat.opacity > 0.9) {
    screenLight.intensity = screenMat.emissiveIntensity * 2;
  } else {
    screenLight.intensity = 0;
  }
}
