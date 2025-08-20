"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface ComputerProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export const Computer: React.FC<ComputerProps> = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0]
}) => {
  const groupRef = useRef<Group>(null);
  
  // Load 3D model
  const { scene } = useGLTF('/models/react.glb');
  
  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle screen glow effect simulation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.01;
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