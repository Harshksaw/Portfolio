"use client";
import { Suspense, lazy } from "react";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";
import LazySection from "@/components/LazySection";

import "./index.css";

const ContactSection = lazy(() => 
  import("@/components/contact").then(module => ({ 
    default: module.ContactSection 
  }))
);

const ExperienceTimelineSection = lazy(() => 
  import("@/components/ExperienceTimelineSection")
);

// Enhanced loading fallback component with better UX
const ComponentLoader = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center min-h-[60vh] text-white bg-black/30">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-6"></div>
        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-green-400/30 mx-auto"></div>
      </div>
      <h3 className="text-lg font-mono mb-2">Loading {name}</h3>
      <p className="text-sm opacity-70">Preparing immersive experience...</p>
    </div>
  </div>
);


export default function HomePage({ }) {
  return (
    <>
      <Cursor />
      <HeaderNavigation />

      {/* Fullpage.js sections - ONLY Hero and About with GSAP transitions */}
      <FullpageProvider>
        <Main />
      </FullpageProvider>

      {/* Normal scroll content - Optimized with intersection observer lazy loading */}
      <div className="normal-scroll-content">

        {/* Experience Timeline Section - Lazy loaded with smaller margin */}
        <div className="relative z-20" style={{ marginTop: "5vh" }}>
          <LazySection 
            name="Experience Timeline" 
            rootMargin="150px"
            fallback={<ComponentLoader name="Experience Timeline" />}
          >
            <ExperienceTimelineSection />
          </LazySection>

          {/* Contact Section - Lazy loaded when almost in view */}
          <LazySection 
            name="Contact Form" 
            rootMargin="100px"
            fallback={<ComponentLoader name="Contact Form" />}
          >
            <ContactSection />
          </LazySection>
        </div>
      </div>
    </>
  );
}