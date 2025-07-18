"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";

function AvatarTest() {
  const { scene, animations } = useGLTF("/avatar.glb");
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
      scale={3.5}
      position={[0, -4.5, -1.5]}
      rotation={[0, 0, 0]}
    />
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function TestPage() {
  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-white text-center py-4 text-2xl">Upper Body Avatar Test</h1>
      
      <div className="w-full h-[80vh]">
        <Canvas>
          <PerspectiveCamera 
            makeDefault
            position={[0, 1.2, 3]}
            fov={35}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <Suspense fallback={<Loader />}>
            <AvatarTest />
          </Suspense>
          
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}