import React, { Suspense, lazy } from "react";
import { HeroSection } from "@/components/heroSection/heroSection";

// Lazy load WorkSection in main to improve initial load
const WorkSection = lazy(() => import("./workSection/workSection").then(module => ({ default: module.WorkSection })));

// Loading component for main sections
const MainSectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="text-center">
      <div className="animate-pulse rounded-full h-12 w-12 bg-white/20 mx-auto mb-6"></div>
      <p className="text-lg font-mono">Loading section...</p>
    </div>
  </div>
);

export function Main() {
  return (
    <>
      {/* Hero Section - First fullpage section - No lazy loading for immediate visibility */}
      <HeroSection />
      
      {/* Work Section - Lazy loaded to improve initial page load */}
      <Suspense fallback={<MainSectionLoader />}>
        <WorkSection />
      </Suspense>
    </>
  );
}