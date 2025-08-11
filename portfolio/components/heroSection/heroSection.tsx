import React, { useRef } from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Bulge } from "@/components/bulge";
import { BackgroundParticles } from "@/components/workSection/components/BackgroundParticles";
import AvatarImage from "@/components/AvatarImage";

import { ModalWrapper } from "./modalWrapper";

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

      {/* Static Avatar Image */}
      <AvatarImage />
    </section>
  );
}
