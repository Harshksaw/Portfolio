"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface HackerRoomProps {
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const HackerRoom: React.FC<HackerRoomProps> = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const groupRef = useRef<Group>(null);
  
  // Load 3D model
  const { scene } = useGLTF('/models/hacker-room.glb');
  
  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle floating effect for the room
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.005;
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