// @ts-nocheck
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useGLTF,
  useVideoTexture,
  useAnimations,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
  TiltShift2,
  WaterEffect,
  ToneMapping,
} from "@react-three/postprocessing";

import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect, useRef } from "react";

export default function Modal() {
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to range -0.5 to 0.5
      setMouseX(e.clientX / window.innerWidth - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      gl={{ antialias: false }}
      flat
      shadows
      camera={{ position: [0, 1.2, 3], fov: 35 }} // Updated camera for avatar
    >
      {/* <color attach="background" args={["#222222"]} /> */}
      <ambientLight intensity={3} />
      {/* Replace Scene with AvatarScene */}
      <AvatarScene
        position={[0, -3.5, 0]} // Avatar positioning for upper body
        scale={3.5}             // Good size for avatar
        rotation={[0, 0.6 + mouseX * Math.PI, 0]}
      />
      
      <Postpro />
    </Canvas>
  );
}

function Postpro() {
  return (
    <EffectComposer disableNormalPass>
      {/* <HueSaturation saturation={-1} />
      <BrightnessContrast brightness={0} contrast={0.25} />
      <WaterEffect factor={0.75} />
      <TiltShift2 samples={6} blur={1} />
      <ToneMapping /> */}
      <Bloom mipmapBlur luminanceThreshold={0.1} intensity={2} />
    </EffectComposer>
  );
}

function Cookie(props: any) {
  const texture = useVideoTexture("/video/caustics.mp4");
  return <spotLight decay={0} map={texture} castShadow {...props} />;
}

// REPLACE: Old Suzi function with this Avatar function
function Avatar(props: any) {
  const { scene, animations } = useGLTF("/avatar.glb"); // Your avatar file
  const meshRef = useRef();
  const { actions } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      {...props}
      dispose={null}
    />
  );
}

// REPLACE: Old Scene function with this AvatarScene function
function AvatarScene(props: any) {
  const { scene, animations } = useGLTF("/avatar.glb"); // Your avatar file
  const meshRef = useRef();
  const { actions } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  return (
    <primitive ref={meshRef} object={scene} {...props} />
  );
}