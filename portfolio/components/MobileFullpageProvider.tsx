"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

interface MobileFullpageProviderProps {
  children: React.ReactNode;
}

const MobileFullpageProvider: React.FC<MobileFullpageProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Enable normal scrolling on mobile
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      return;
    }

    // Desktop fullpage logic
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sectionsRef.current.length - 1, currentSection + direction));

      if (nextSection !== currentSection) {
        setCurrentSection(nextSection);
        
        // Smooth scroll to section
        const targetSection = sectionsRef.current[nextSection];
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [isMobile, currentSection]);

  if (isMobile) {
    // Mobile: Normal scrolling
    return <div className="mobile-scroll-container">{children}</div>;
  }

  // Desktop: Fullpage behavior
  return (
    <div className="fullpage-container">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className="section h-screen"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default MobileFullpageProvider;
