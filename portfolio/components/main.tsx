import React from "react";
import { HeroSection } from "@/components/heroSection/heroSection";
import { WorkSection } from "./workSection/workSection";

export function Main() {
  return (
    <>
      {/* Hero Section - First fullpage section */}
      <HeroSection />
      
      {/* Work Section - Second fullpage section */}
      <WorkSection />
    </>
  );
}