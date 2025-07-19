// @ts-nocheck
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useGLTF,
  useVideoTexture,
  useAnimations,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
  TiltShift2,
  WaterEffect,
  ToneMapping,
} from "@react-three/postprocessing";

import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect, useRef } from "react";

export default function Modal() {
  const [mouseX, setMouseX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to range -0.5 to 0.5
      setMouseX(e.clientX / window.innerWidth - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          color: 'white',
          fontSize: '18px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid #444',
              borderTop: '3px solid #fff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading 3D Model...
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
      
      <Canvas
        gl={{ antialias: false }}
        flat
        shadows
        camera={{ position: [0, 1.2, 3], fov: 35 }}
      >
        <ambientLight intensity={3} />
        <AvatarScene
          position={[0, -3.5, 0]}
          scale={5.5}
          rotation={[0, 0.6 + mouseX * Math.PI, 0]}
          onLoaded={() => setIsLoaded(true)}
        />
        
        <Postpro />
      </Canvas>
    </div>
  );
}

function Postpro() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom mipmapBlur luminanceThreshold={0.1} intensity={2} />
    </EffectComposer>
  );
}

function Cookie(props: any) {
  const texture = useVideoTexture("/video/caustics.mp4");
  return <spotLight decay={0} map={texture} castShadow {...props} />;
}

function Avatar(props: any) {
  const { scene, animations } = useGLTF("/avatar.glb");
  const meshRef = useRef();
  const { actions } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      {...props}
      dispose={null}
    />
  );
}

function AvatarScene({ onLoaded, ...props }: any) {
  const { scene, animations } = useGLTF("/avatar.glb");
  const meshRef = useRef();
  const { actions } = useAnimations(animations, meshRef);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  useEffect(() => {
    if (scene && onLoaded) {
      // Small delay to ensure rendering is complete
      setTimeout(() => {
        onLoaded();
      }, 100);
    }
  }, [scene, onLoaded]);

  return (
    <primitive ref={meshRef} object={scene} {...props} />
  );
}