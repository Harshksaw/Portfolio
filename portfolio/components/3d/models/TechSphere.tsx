"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';

interface TechSphereProps {
  position?: [number, number, number];
  text?: string;
}

export const TechSphere: React.FC<TechSphereProps> = ({
  position = [0, 0, 0],
  text = "React"
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#1E40AF" 
          transparent 
          opacity={0.7}
          wireframe 
        />
      </mesh>
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.15}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};