"use client";

import React, { useEffect, useRef } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

import SplitType from "split-type";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveSlide } from "@/redux/states/fullpageSlice";
import { splineSceneVisibility } from "@/redux/states/splineSlice";

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
  // Add this to allow scrolling after the last section
  continuousVertical: false,
  normalScrollElements: '.normal-scroll-content',
};

const FullpageProvider = ({ children }: { children: React.ReactNode }) => {
  const about = useRef<gsap.core.Timeline | null>(null);
  const textAnim__section2__down = useRef<gsap.core.Tween | null>(null);
  const work_heading = useRef<gsap.core.Tween | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const dispatch = useAppDispatch();

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

    // Animation logic - only for existing sections
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

  // Add afterLoad callback to handle transition to normal scroll
  const afterLoad = (origin: any, destination: any, direction: any) => {
    // If we're on the last section (About - "second"), enable normal scrolling
    if (destination.anchor === "second") {
      // Add a small delay to ensure fullpage animations are complete
      setTimeout(() => {
        // Check if user tries to scroll down from the last section
        const handleWheel = (e: WheelEvent) => {
          if (e.deltaY > 0) { // Scrolling down
            // Disable fullpage.js temporarily
            if (window.fullpage_api) {
              window.fullpage_api.setAutoScrolling(false);
              window.fullpage_api.setFitToSection(false);
            }
            
            // Enable normal scrolling
            document.body.style.overflow = 'auto';
            
            // Scroll to the normal content
            const normalContent = document.querySelector('.normal-scroll-content');
            if (normalContent) {
              normalContent.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Remove the wheel listener
            document.removeEventListener('wheel', handleWheel);
          }
        };
        
        document.addEventListener('wheel', handleWheel, { passive: false });
      }, 1000);
    }
  };

  useEffect(() => {
    const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
    
    // Hero section animation
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

    // About section text animation
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

    // Work heading animation (if exists)
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

    // Cleanup
    return () => {
      about.current?.kill();
      textAnim__section2__down.current?.kill();
      work_heading.current?.kill();
    };
  }, []);

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