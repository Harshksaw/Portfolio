"use client";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workSection/workSection"

import "./index.css";

import { ContactSection } from "@/components/contact";
import ExperienceTimelineSection from "@/components/ExperienceTimelineSection";


export default function HomePage({ }) {
  return (
    <>
      <Cursor />
      <HeaderNavigation />

      {/* Fullpage.js sections - ONLY Hero and About with GSAP transitions */}
      <FullpageProvider>
        <Main />
      </FullpageProvider>

      {/* Normal scroll content - Properly spaced sections */}
      <div className="normal-scroll-content">
        {/* Work Section - Full height with proper spacing */}
        <WorkSection />

        {/* Experience Timeline Section - Separated with margin */}
        <div className="relative z-20" style={{ marginTop: "5vh" }}>


          <ExperienceTimelineSection/>

          <ContactSection />
        </div>

      </div>
    </>
  );
}