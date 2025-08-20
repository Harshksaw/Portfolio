"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface DeveloperAvatarProps {
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const DeveloperAvatar: React.FC<DeveloperAvatarProps> = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const groupRef = useRef<Group>(null);
  
  // Load 3D model
  const { scene } = useGLTF('/models/hacker-room.glb');
  
  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene.clone()} />
    </group>
  );
};