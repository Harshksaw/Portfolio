"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, ReactNode } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

interface HeroCameraProps {
  children: ReactNode;
  isMobile?: boolean;
}

export const HeroCamera: React.FC<HeroCameraProps> = ({ 
  children, 
  isMobile = false 
}) => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth camera movement based on pointer position
      const pointer = state.pointer;
      
      // Camera rotation based on pointer movement
      const targetX = isMobile ? 0 : pointer.x * 0.1;
      const targetY = isMobile ? 0 : pointer.y * 0.1;
      
      // Smooth interpolation
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 2, 0.02);
      
      // Look at the scene center
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};