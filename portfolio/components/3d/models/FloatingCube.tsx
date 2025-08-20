"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface FloatingCubeProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export const FloatingCube: React.FC<FloatingCubeProps> = ({
  position = [0, 0, 0],
  scale = [1, 1, 1]
}) => {
  const groupRef = useRef<Group>(null);
  
  // Load 3D model
  const { scene } = useGLTF('/models/cube.glb');

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
};