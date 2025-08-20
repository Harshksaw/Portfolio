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
    loading: () => <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center">
      <div className="text-blue-400">Loading 3D Scene...</div>
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
