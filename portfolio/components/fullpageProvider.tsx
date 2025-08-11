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
  anchors: ["first", "second"], // ONLY Hero and About
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
  const textAnim__section2__down = useRef<gsap.core.Tween | null>(null);
  const work_heading = useRef<gsap.core.Tween | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const hasTransitioned = useRef(false);

  // Mobile touch handling
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isTransitioning = useRef(false);

  const dispatch = useAppDispatch();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(isMobileDevice || isSmallScreen || hasTouchScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

    // Only handle body class changes for existing sections
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

    // About section logic
    if (destination.anchor === "second") {
      if (direction === "down") {
        textAnim__section2__down.current?.restart(true);
        work_heading.current?.restart(true);
      } else {
        textAnim__section2__down.current?.restart();
      }
      
      // Video logic
      if (videoElement.current) {
        videoElement.current.currentTime = 1.6;
        videoElement.current.play();
      }
    }

    // Keep your original GSAP animation logic - only for existing sections
    const flex = screen.width > 540 ? 17 : 5;
    
    if (direction === "down") {
      gsap
        .timeline()
        .from(`.${destination.anchor} .rounded__div__down`, {
          duration: 0.1,
        })
        .fromTo(
          `.${destination.anchor} .rounded__div__down`,
          {
            height: `${flex}vh`,
          },
          {
            height: "0vh",
            duration: 1.2,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );

      gsap
        .timeline()
        .from(`.${destination.anchor} .anime`, {
          duration: 0.3,
        })
        .fromTo(
          `.${destination.anchor} .anime`,
          {
            y: "30vh",
          },
          {
            y: "0vh",
            duration: 1.1,
            stagger: 0.1,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    } else if (direction === "up") {
      gsap
        .timeline()
        .from(`.${destination.anchor} .rounded__div__up`, {
          duration: 0.1,
        })
        .fromTo(
          `.${destination.anchor} .rounded__div__up`,
          {
            height: `${flex}vh`,
          },
          {
            height: "0vh",
            duration: 1.2,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );

      gsap
        .timeline()
        .from(`.${destination.anchor} .anime`, {
          duration: 0.3,
        })
        .fromTo(
          `.${destination.anchor} .anime`,
          {
            y: "-30vh",
          },
          {
            y: "0vh",
            duration: 1.1,
            stagger: -0.08,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    }
  };

  // Enhanced transition function that handles both desktop and mobile
  const transitionToNormalScroll = () => {
    if (hasTransitioned.current || isTransitioning.current) return;
    
    isTransitioning.current = true;
    hasTransitioned.current = true;
    
    console.log("Transitioning to normal scroll...");
    
    // Add a visual indicator for mobile users
    const indicator = document.createElement('div');
    indicator.innerHTML = '⬇️ Scrolling enabled';
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
      if (document.body.contains(indicator)) {
        document.body.removeChild(indicator);
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

  // Handle transition from About section to normal scroll
  const afterLoad = (origin: any, destination: any, direction: any) => {
    // If we're on the About section (second)
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

    // Keep your original about section text animation
    try {
      const myText = new SplitType("#my-text", { types: "lines" });
      const myText2 = new SplitType("#my-text .line", {
        types: "lines",
        lineClass: "innnerLine",
      });

      textAnim__section2__down.current = gsap.from(
        "#my-text .line .innnerLine",
        {
          y: "200%",
          opacity: 0,
          skewX: -10,
          paused: true,
          delay: 0.25,
          stagger: 0.12,
          duration: 1.5,
          ease: CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1"),
        },
      );
    } catch (error) {
      console.log("SplitType not available or element not found");
    }

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
      textAnim__section2__down.current?.kill();
      work_heading.current?.kill();
      
      // Clean up scroll listeners
      if ((window as any).cleanupScrollListeners) {
        (window as any).cleanupScrollListeners();
      }
    };
  }, []);

  return (
    <>
      {isMobile ? (
        // Mobile: Normal scrolling
        <div className="mobile-scroll-container">
          {children}
        </div>
      ) : (
        // Desktop: Fullpage.js
        <ReactFullpage
          {...opts}
          onLeave={onLeave}
          afterLoad={afterLoad}
          render={() => {
            return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
          }}
        />
      )}
    </>
  );
};

export default FullpageProvider;