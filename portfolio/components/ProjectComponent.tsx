"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import Image from "next/image";

// Load the 3D mobile model
const MobileModel = ({ children }: { children?: React.ReactNode }) => {
  const { scene } = useGLTF("/models/phone.glb"); // Make sure your phone model is placed here
  const modelRef = useRef<any>();

  // Rotate the phone slowly for animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={modelRef} scale={2} position={[0, -1, 0]}>
      <primitive object={scene} />
      {children} {/* This will allow you to insert screens inside */}
    </group>
  );
};

// Component to Display Screens inside the Phone
const ScreenContent = () => {
  return (
    <Html position={[0, 0.8, 0.05]} transform occlude>
      <div className="w-[200px] h-[400px] bg-black rounded-xl flex items-center justify-center">
        <Image src="/ss.png" className="w-full h-full object-cover rounded-xl" alt="App Screen" />
      </div>
    </Html>
  );
};

const MobileShowcase = () => {
  return (
    <div className="h-[500px] w-full flex justify-center items-center bg-gray-900">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
        
        {/* Render the 3D Mobile with a screen inside */}
        <MobileModel>
          <ScreenContent />
        </MobileModel>
      </Canvas>
    </div>
  );
};

export default MobileShowcase;
