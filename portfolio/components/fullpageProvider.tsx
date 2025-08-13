"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

import SplitType from "split-type";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveSlide } from "@/redux/states/fullpageSlice";
import { splineSceneVisibility } from "@/redux/states/splineSlice";

// Extend Window interface to include fullpage_api
declare global {
  interface Window {
    fullpage_api?: {
      destroy: (type?: string) => void;
      moveTo: (section: number, slide?: number) => void;
      moveSlideLeft: () => void;
      moveSlideRight: () => void;
      setAutoScrolling: (active: boolean) => void;
      setFitToSection: (active: boolean) => void;
      setScrollingSpeed: (speed: number) => void;
      fitToSection: () => void;
      reBuild: () => void;
    };
  }
}

const opts = {
  autoScrolling: true,
  scrollOverflow: false,
  scrollHorizontally: false,
  navigation: false,
  navigationPosition: "left",
  scrollingSpeed: 1300,
  easingcss3: "cubic-bezier(.70,0,.30,1)",
  anchors: ["first", "second"], // Hero and Work sections only
  licenseKey: "gplv3-license",
  credits: { enabled: false },
  // Disable continuous vertical to prevent loop
  continuousVertical: false,
  // Allow normal scrolling elements
  normalScrollElements: '.normal-scroll-content',
};

const FullpageProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const about = useRef<gsap.core.Timeline | null>(null);
  const work_heading = useRef<gsap.core.Tween | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const hasTransitioned = useRef(false);

  // Mobile touch handling
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isTransitioning = useRef(false);

  const dispatch = useAppDispatch();

  // Proper mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      
      if (mobile) {
        // Destroy fullpage on mobile
        if (window.fullpage_api) {
          window.fullpage_api.destroy('all');
        }
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Cleanup on unmount
      if (window.fullpage_api) {
        window.fullpage_api.destroy('all');
      }
    };
  }, []);

  // Enable normal scrolling on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.height = 'auto';
    }
  }, [isMobile]);

  const onLeave = (origin: any, destination?: any, direction?: any) => {
    // Only handle logic for sections that actually exist
    if (!destination || !destination.anchor) return;

    dispatch(setActiveSlide([destination.anchor, direction]));

    // Handle body class changes for existing sections
    if (destination.anchor === "second") {
      document.body.classList.add("darkGradient");
    } else if (destination.anchor === "first") {
      document.body.classList.remove("darkGradient");
    }

    // Spline visibility logic
    if (destination.anchor === "first") {
      dispatch(splineSceneVisibility(true));
    } else {
      dispatch(splineSceneVisibility(false));
    }

    // Hero section logic
    if (destination.anchor === "first") {
      if (direction === "up") {
        about.current?.seek(0.3);
        console.log("Seeked to hero");
      }
    }

    // Work section logic (now second section)
    if (destination.anchor === "second") {
      if (direction === "down") {
        work_heading.current?.restart(true);
      } else {
        work_heading.current?.restart();
      }
      
      // Video logic for work section
      if (videoElement.current) {
        videoElement.current.currentTime = 1.6;
        videoElement.current.play();
      }
    }

    // Removed problematic GSAP animations that interfere with scrolling
    // Keep only essential transition logic without visual animations
  };

  // Enhanced transition function that handles both desktop and mobile
  const transitionToNormalScroll = () => {
    if (hasTransitioned.current || isTransitioning.current) return;
    
    isTransitioning.current = true;
    hasTransitioned.current = true;
    
    console.log("Transitioning to normal scroll...");
    
    // Add a visual indicator for mobile users
    const indicator = document.createElement('div');

    indicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      z-index: 10000;
      font-size: 14px;
      pointer-events: none;
    `;
    document.body.appendChild(indicator);
    
    // Remove indicator after 1.5 seconds
    setTimeout(() => {
      try {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      } catch (error) {
        console.warn('Failed to remove indicator element:', error);
      }
    }, 1500);
    
    // Destroy fullpage.js and enable normal scrolling
    setTimeout(() => {
      if (window.fullpage_api) {
        window.fullpage_api.destroy('all');
      }
      
      // Enable normal scrolling
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      
      // Scroll to normal content
      const normalContent = document.querySelector('.normal-scroll-content') as HTMLElement;
      if (normalContent) {
        window.scrollTo({
          top: normalContent.offsetTop,
          behavior: 'smooth'
        });
      }
      
      isTransitioning.current = false;
    }, 100);
  };

  // Handle transition from Work section to normal scroll
  const afterLoad = (_origin: any, destination: any, _direction: any) => {
    // If we're on the Work section (second) - transition to normal scroll
    if (destination.anchor === "second") {
      
      // Handle desktop wheel events
      const handleScrollDown = (e: WheelEvent) => {
        if (hasTransitioned.current || isTransitioning.current) return;
        
        // Only on downward scroll
        if (e.deltaY > 0) {
          e.preventDefault();
          transitionToNormalScroll();
          document.removeEventListener('wheel', handleScrollDown);
        }
      };

      // Handle mobile touch events
      const handleTouchStart = (e: TouchEvent) => {
        if (hasTransitioned.current || isTransitioning.current) return;
        touchStartY.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (hasTransitioned.current || isTransitioning.current) return;
        e.preventDefault(); // Prevent default scrolling during touch
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (hasTransitioned.current || isTransitioning.current) return;
        
        touchEndY.current = e.changedTouches[0].clientY;
        const touchDiff = touchStartY.current - touchEndY.current;
        
        // If swipe down is greater than 50px, transition to normal scroll
        if (touchDiff > 50) {
          transitionToNormalScroll();
          document.removeEventListener('touchstart', handleTouchStart);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        }
      };
      
      // Add listeners after a delay to ensure fullpage animation is complete
      setTimeout(() => {
        // Desktop listeners
        document.addEventListener('wheel', handleScrollDown, { passive: false });
        
        // Mobile listeners
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Cleanup function for mobile
        const cleanup = () => {
          document.removeEventListener('wheel', handleScrollDown);
          document.removeEventListener('touchstart', handleTouchStart);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
        
        // Store cleanup function for later use
        (window as any).cleanupScrollListeners = cleanup;
      }, 1500);
    }
  };

  useEffect(() => {
    const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
    
    // Keep your original hero section animation
    about.current = gsap
      .timeline({ defaults: { ease: "none" }, repeat: -1 })
      .fromTo(
        ".left .animate__this1",
        {
          y: "0%",
          opacity: 1,
        },
        {
          y: "-140%",
          opacity: 0,
          duration: 0.9,
          delay: 1.7,
          ease,
        },
      )
      .fromTo(
        ".left .animate__this2",
        {
          y: "140%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease,
        },
        "-=0.9",
      )
      .fromTo(
        ".left .animate__this2",
        {
          y: "0%",
          opacity: 1,
        },
        {
          y: "-140%",
          opacity: 0,
          delay: 1.7,
          duration: 0.9,
          ease,
        },
      )
      .fromTo(
        ".left .animate__this1",
        {
          y: "140%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease,
        },
        "-=0.9",
      );

    // Note: About section text animation removed since AboutSection is no longer used

    // Keep your original work heading animation
    const workHeadingElement = document.querySelector(".work_heading");
    if (workHeadingElement) {
      work_heading.current = gsap.fromTo(
        ".work_heading",
        {
          rotate: 15,
          scaleY: 1.5,
        },
        {
          rotate: 0,
          scaleY: 1,
          opacity: 1,
          delay: 0.7,
          duration: 1.3,
          ease: CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1"),
        },
      );
    }

    // Video element
    videoElement.current = document.querySelector("#video") as HTMLVideoElement;

    // Cleanup function
    return () => {
      about.current?.kill();
      work_heading.current?.kill();
      
      // Clean up scroll listeners
      if ((window as any).cleanupScrollListeners) {
        (window as any).cleanupScrollListeners();
      }
    };
  }, []);

  // Mobile: Render children directly without fullpage
  if (isMobile) {
    return (
      <div className="mobile-container">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="mobile-section">
            {child}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Use fullpage.js
  return (
    <ReactFullpage
      {...opts}
      onLeave={onLeave}
      afterLoad={afterLoad}
      render={() => {
        return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
      }}
    />
  );
};

export default FullpageProvider;