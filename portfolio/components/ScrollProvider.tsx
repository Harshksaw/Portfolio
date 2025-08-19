"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current || !contentRef.current) return;

    // Declare scroll variables once at the top of the effect
    let scrollPos = 0;
    let targetPos = 0;
    const ease = 0.1;

    const ctx = gsap.context(() => {
      // Smooth scrolling for desktop only
      const smoother = ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          if (arguments.length) {
            // No-op: we control scroll manually
            scrollPos = value as number;
          }
          return scrollPos;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      });

      // Set up smooth scroll behavior
      const updateScroll = () => {
        scrollPos += (targetPos - scrollPos) * ease;
        if (contentRef.current) {
          gsap.set(contentRef.current, { y: -scrollPos });
        }
        requestAnimationFrame(updateScroll);
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        targetPos += e.deltaY * 0.8; // Smooth scroll multiplier
        targetPos = Math.max(0, Math.min(targetPos, contentRef.current!.offsetHeight - window.innerHeight));
      };

      containerRef.current!.addEventListener('wheel', handleWheel, { passive: false });
      updateScroll();

      // Section animations
      gsap.utils.toArray('.section').forEach((section: any, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scroller: containerRef.current,
          onEnter: () => {
            gsap.fromTo(section.querySelectorAll('.anime'), {
              y: 50,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out"
            });
          }
        });
      });

      return () => {
        containerRef.current?.removeEventListener('wheel', handleWheel);
        ScrollTrigger.killAll();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    // Mobile: Use native scrolling
    return (
      <div className="mobile-scroll-container">
        {children}
      </div>
    );
  }

  // Desktop: Use smooth scrolling
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div 
        ref={contentRef}
        className="will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};