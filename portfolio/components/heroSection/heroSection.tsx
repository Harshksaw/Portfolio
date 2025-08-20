import React, { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Bulge } from "@/components/bulge";
import { BackgroundParticles } from "@/components/workSection/components/BackgroundParticles";

// Dynamically import 3D scene to prevent SSR issues
const Hero3DScene = dynamic(
  () => import("@/components/heroSection/Hero3DScene").then((mod) => ({ default: mod.Hero3DScene })),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="matrix-loader">
        <div className="matrix-text">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="matrix-column" style={{ animationDelay: `${i * 0.1}s` }}>
              {Array.from({ length: 15 }, (_, j) => (
                <span key={j} className="matrix-char" style={{ animationDelay: `${(i * 0.1) + (j * 0.05)}s` }}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="loading-text">LOADING 3D SCENE...</div>
        <style jsx>{`
          .matrix-loader {
            position: relative;
            width: 400px;
            height: 300px;
            overflow: hidden;
          }
          .matrix-text {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .matrix-column {
            display: flex;
            flex-direction: column;
            flex: 1;
            animation: matrixRain 2s linear infinite;
          }
          .matrix-char {
            color: #00ff41;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1;
            opacity: 0;
            animation: charFade 0.1s ease-in-out infinite alternate;
          }
          .loading-text {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #00ff41;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            font-size: 14px;
            text-shadow: 0 0 10px #00ff41;
            animation: pulse 1.5s ease-in-out infinite;
          }
          @keyframes matrixRain {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes charFade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  }
);

export function HeroSection({}) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section__1 min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black first relative z-0 px-paddingX text-colorLight overflow-hidden"
    >
      {/* Animated starlight background particles */}
      <BackgroundParticles count={40} />
      
      <Bulge type="Light" />
      
      {/* 3D Scene replacing Avatar Image */}
      <Hero3DScene isMobile={isMobile} />
      
      <HeroWrapper />

    </section>
  );
}
