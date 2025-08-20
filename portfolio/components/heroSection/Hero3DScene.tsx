"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PerspectiveCamera } from '@react-three/drei';

// Import 3D components
import { 
  HackerRoom,
  DeveloperAvatar, 
  ReactLogo,
  Computer,
  FloatingCube, 
  AnimatedRings, 
  TechSphere,
  HeroCamera,
  CanvasLoader 
} from '@/components/3d';
interface Hero3DSceneProps {
  isMobile: boolean;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isMobile }) => {

  return (
    <div className="w-full h-full absolute  z-1 mb-10">
      <Canvas 
        className="w-full h-full absolute mb-10"
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-blue-400">
              <div className="mb-4">WebGL not supported</div>
              <div className="text-sm">Please use a modern browser to view the 3D scene</div>
            </div>
          </div>
        }
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Camera Setup */}
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />

          {/* Animated Camera Group */}
          <HeroCamera isMobile={isMobile}>
            {/* Main Hacker Room Scene */}
            <HackerRoom 
              scale={isMobile ? [0.05, 0.05, 0.05] : [0.07, 0.07, 0.07]} 
              position={isMobile ? [0.5, -3.0, 0] : [0.25, -4.5, 0]} 
              rotation={[0.1, -Math.PI, 0]}
            />
          </HeroCamera>

    

          {/* Lighting Setup */}
          <ambientLight intensity={0.8} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={1}
            castShadow
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.5}
            color="#3B82F6"
          />
        </Suspense>
      </Canvas>

      {/* CSS for canvas loader */}
      <style jsx global>{`
        .canvas-loader {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3B82F6;
          animation: loading 1.4s infinite ease-in-out both;
        }

        .canvas-loader:before,
        .canvas-loader:after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3B82F6;
          animation: loading 1.4s infinite ease-in-out both;
          position: absolute;
          top: 0;
        }

        .canvas-loader:before {
          left: -15px;
          animation-delay: -0.32s;
        }

        .canvas-loader:after {
          left: 15px;
          animation-delay: 0.32s;
        }

        @keyframes loading {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};