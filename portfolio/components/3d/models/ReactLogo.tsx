"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface ReactLogoProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export const ReactLogo: React.FC<ReactLogoProps> = ({
  position = [0, 0, 0],
  scale = [1, 1, 1]
}) => {
  const groupRef = useRef<Group>(null);
  
  // Load 3D model
  const { scene } = useGLTF('/models/react.glb');
  
  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      // Rotating React logo
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={position}
    >
      <primitive object={scene.clone()} />
    </group>
  );
};