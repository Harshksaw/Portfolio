"use client";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";

import "./index.css";
import { ExperienceTimelineSection,  } from "./experience/page";
import { AboutSection } from "@/components/aboutSection/aboutSection";
export default function HomePage({}) {
  return (
    <>
      <Cursor />
      {/* <Intro /> */}

      <HeaderNavigation />
      <FullpageProvider>
        <Main />
      </FullpageProvider>
      <div className="normal-scroll-content">
        <AboutSection/>

        <ExperienceTimelineSection />
        {/* <WorkSection /> */}
        {/* <SimpleContactSection /> */}
      </div>
    </>
  );
}