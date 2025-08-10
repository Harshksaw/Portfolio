"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import MatrixLoader from "./MatrixLoader";

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
  position = [0, -4.5, -1.5],
  onLoaded
}: {
  avatarPath?: string;
  scale?: number;
  position?: [number, number, number];
  onLoaded?: () => void;
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

  useEffect(() => {
    if (scene && onLoaded) {
      // Give a small delay to ensure everything is loaded
      setTimeout(() => {
        onLoaded();
      }, 100);
    }
  }, [scene, onLoaded]);
  
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
  const [isLoading, setIsLoading] = useState(true);

  const handleAvatarLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full contrast-110 absolute left-0 top-0 z-10 flex h-full items-center justify-center">
      {showTitle && (
        <h1 className="text-white text-center py-4 text-2xl">3D Avatar</h1>
      )}
      
      {/* Matrix Loader Overlay */}
      {isLoading && (
        <MatrixLoader 
          onComplete={handleAvatarLoaded}
          compact={true}
        />
      )}
      
      <div className={className} style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Canvas>
          <PerspectiveCamera 
            makeDefault
            position={cameraPosition}
            fov={fov}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 2, 2]} intensity={0.4} />
          
          <Suspense fallback={null}>
            <AvatarModel 
              avatarPath={avatarPath}
              scale={scale}
              position={position}
              onLoaded={() => {
                // Avatar model is loaded, but we let Matrix loader control timing
              }}
            />
          </Suspense>
          
          <Environment preset={environmentPreset as any} />
        </Canvas>
      </div>
    </div>
  );
}