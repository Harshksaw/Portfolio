"use client";

import { Canvas, useFrame } from "@react-three/fiber";
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

// Optimized Avatar Model with LOD
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
  const meshRef = useRef<any>();
  const { actions } = useAnimations(animations, meshRef);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0 && !isReady) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
      setIsReady(true);
      onLoaded?.();
    }
  }, [actions, isReady, onLoaded]);
  
  // Optimize rendering on mobile
  useFrame(() => {
    if (meshRef.current && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Reduce quality on mobile for performance
        meshRef.current.traverse((child: any) => {
          if (child.isMesh) {
            child.frustumCulled = true;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
      }
    }
  });
  
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
  avatarPath = "/avatar.glb",
  scale = 3.5,
  position = [0, -4.5, -1.5],
  cameraPosition = [0, 1.2, 4],
  fov = 25,
  environmentPreset = "city"
}: Avatar3DProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleAvatarLoaded = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      // Add delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="w-full absolute left-0 top-0 z-10 flex h-full items-center justify-center">
      {/* Matrix Loader with unique instance ID */}
      {isLoading && (
        <MatrixLoader 
          onComplete={handleAvatarLoaded}
          compact={true}
          instanceId="avatar3d"
        />
      )}
      
      <div 
        className={className} 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isLoading ? 'none' : 'auto'
        }}
      >
        <Canvas
          dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 1.5 : 1} // Limit DPR for performance
          performance={{ min: 0.5 }} // Enable performance scaling
        >
          <PerspectiveCamera 
            makeDefault
            position={cameraPosition}
            fov={fov}
          />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <Suspense fallback={null}>
            <AvatarModel 
              avatarPath={avatarPath}
              scale={scale}
              position={position}
              onLoaded={handleAvatarLoaded}
            />
          </Suspense>
          
          <Environment preset={environmentPreset as any} />
        </Canvas>
      </div>
    </div>
  );
}