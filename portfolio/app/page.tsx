"use client";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";

import "./index.css";
import { ExperienceTimelineSection } from "./experience/page";

export default function HomePage({}) {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      
      {/* Fullpage.js sections - ONLY Hero and About with GSAP transitions */}
      <FullpageProvider>
        <Main />
      </FullpageProvider>
      
      {/* Normal scroll content - Everything after About section */}
      <div className="normal-scroll-content">
        <ExperienceTimelineSection />
        {/* Add more sections here that you want to scroll normally */}
        {/* <ProjectsSection /> */}
        {/* <ContactSection /> */}
      </div>
    </>
  );
}