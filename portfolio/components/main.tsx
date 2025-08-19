// components/main.tsx - Updated
import React from "react";
import { HeroSection } from "@/components/heroSection/heroSection";
import { WorkSection } from "./workSection/workSection";

export function Main() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Work Section */}
      <WorkSection />
    </>
  );
}