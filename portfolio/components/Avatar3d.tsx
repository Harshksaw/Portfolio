"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";

interface Avatar3DProps {
  className?: string;
  showTitle?: boolean;
  avatarPath?: string;
  scale?: number;
  position?: [number, number, number];
  cameraPosition?: [number, number, number];
  fov?: number;
  environmentPreset?: string;
}

function AvatarModel({ 
  avatarPath = "/avatar.glb", 
  scale = 3.5, 
  position = [0, -4.5, -1.5] 
}: {
  avatarPath?: string;
  scale?: number;
  position?: [number, number, number];
}) {
  const { scene, animations } = useGLTF(avatarPath);
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
      scale={scale}
      position={position}
      rotation={[0, 0, 0]}
    />
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" wireframe />
    </mesh>
  );
}

export default function Avatar3D({
  className = "w-full h-[400px]",
  showTitle = false,
  avatarPath = "/avatar.glb",
  scale = 3.5,
  position = [0, -4.5, -1.5],
  cameraPosition = [0, 1.2, 4],
  fov = 25,
  environmentPreset = "city"
}: Avatar3DProps) {
  return (
    <div className="w-full contrast-110 absolute left-0 top-0 z-10 flex h-full  items-center justify-center ">
      {showTitle && (
        <h1 className="text-white text-center py-4 text-2xl">3D Avatar</h1>
      )}
      
      <div className={className}>
        <Canvas>
          <PerspectiveCamera 
            makeDefault
            position={cameraPosition}
            fov={fov}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 2, 2]} intensity={0.4} />
          
          <Suspense fallback={<Loader />}>
            <AvatarModel 
              avatarPath={avatarPath}
              scale={scale}
              position={position}
            />
          </Suspense>
          
          <Environment preset={environmentPreset as any} />
        </Canvas>
      </div>
    </div>
  );
}