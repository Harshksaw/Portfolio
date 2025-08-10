import React from "react";
import { Bulge } from "@/components/bulge";
import { AboutWrapper } from "@/components/aboutSection/aboutWrapper";

export function AboutSection({}) {
  return (
    <section className="section section__2 second lightGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark relative">
      <Bulge type="Dark" />
      {/* <AboutWrapper /> */}
   
      
      {/* Scroll down hint - appears after GSAP animations complete */}
      <div className="scroll-down-hint">
        <div className="scroll-text">Scroll down to explore more</div>
        <div className="scroll-arrow">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M7 13l3 3 7-7" />
            <path d="M12 3v9" />
            <path d="M7 13l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}