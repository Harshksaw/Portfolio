import React, { useRef, Suspense, lazy } from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Bulge } from "@/components/bulge";
import { BackgroundParticles } from "@/components/workSection/components/BackgroundParticles";
import MatrixLoader from "@/components/MatrixLoader";

import { ModalWrapper } from "./modalWrapper";

// Lazy load heavy 3D component for better initial performance
const Avatar3D = lazy(() => import("../Avatar3d"));

// Matrix loader for 3D avatar - positioned in bottom right corner
const Avatar3DLoader = () => (
  <div className="fixed bottom-8 right-8 w-64 h-64 rounded-lg overflow-hidden">
    <MatrixLoader compact={true} />
  </div>
);

export function HeroSection({}) {
  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="section section__1 min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black first relative z-0 px-paddingX text-colorLight overflow-hidden"
    >
      {/* Animated starlight background particles */}
      <BackgroundParticles count={40} />
      
      <Bulge type="Light" />
      <HeroWrapper />

      {/* Lazy load 3D Avatar for better performance */}
      <Suspense fallback={<Avatar3DLoader />}>
        <Avatar3D />
      </Suspense>
    </section>
  );
}
