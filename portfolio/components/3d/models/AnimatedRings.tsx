"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface AnimatedRingsProps {
  position?: [number, number, number];
}

export const AnimatedRings: React.FC<AnimatedRingsProps> = ({
  position = [0, 0, 0]
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#8B5CF6" wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" wireframe />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 100]} />
        <meshStandardMaterial color="#F59E0B" wireframe />
      </mesh>
    </group>
  );
};