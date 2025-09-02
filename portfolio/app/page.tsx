'use client'

import { motion } from "motion/react";
import { container, charVariant } from "@/variants/stagger";
import Navbar from "@/components/common/navbar";
import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import ExperienceSection from "@/components/shared/experience-section";
import Projects from "@/components/sections/projects";
import TechArsenal from "@/components/sections/tech-arsenal";
import Hero from "@/page-components/hero";
import TechArsenalMobile from "@/components/sections/tech-arsenal-mobile";
import Cta from "@/page-components/cta";

function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay to ensure fonts/images/layout are ready before animation
    const id = setTimeout(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    }, 1000); // Back to original delay for consistent experience

    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  useEffect(() => {
    // Hide the default cursor
    document.documentElement.style.cursor = "none";

    return () => {
      // Optional: restore cursor when app is unmounted (e.g., during testing/hot reload)
      document.documentElement.style.cursor = "auto";
    };
  }, []);

  const name = "Harsh Kumar Saw".split("");

  // Mobile-optimized text animation variants
  const mobileContainer = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.3, // Faster start on mobile
        staggerChildren: 0.03, // Faster stagger on mobile
      },
    },
  };

  const mobileCharVariant = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Faster on mobile
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!mounted) return null;

  return (
    <>
      <ReactLenis root options={{
        gestureOrientation: 'vertical',
      }}>
        <Navbar />
        <div className="relative h-svh min-h-svh max-h-svh w-full overflow-hidden" style={{ transform: 'translateZ(0)' }}>

          <div className="w-fit h-fit overflow-hidden absolute top-1/2 -z-2  -translate-y-1/2 left-1/2 -translate-x-1/2 ">
            <motion.h2
              className="font-extrabold text-3xl md:text-7xl whitespace-nowrap"
              variants={isMobile ? mobileContainer : container}
              initial="hidden"
              animate="show"
              style={{
                willChange: 'transform', // Optimize for transform animations
                backfaceVisibility: 'hidden', // Prevent flickering
              }}
            >
              {name.map((word, i) => (
                <motion.span
                  key={i}
                  variants={isMobile ? mobileCharVariant : charVariant}
                  className="inline-block mr-0.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </div>
          <Hero/>
        </div>

        <div className="md:pt-12 px-4 md:px-14 overflow-hidden pb-8 h-full bg w-full space-y-32 md:space-y-48 z-100">
          {/* Projects */}
          <section
            className="bg-transparent h-full w-full flex flex-col justify-end  rounded-[32px] relative mb-0"
          >
            <h2 className="text-3xl md:text-6xl block  tracking-[0.12em] md:tracking-[0.2em]  font-bold text-neutral-900 ">Featured Projects</h2>
            <Projects />
          </section>

          {/* Careers */}
          <section
            className="bg-transparent h-full w-full flex flex-col justify-end  rounded-[32px] relative"
          >
            <h2 className="text-3xl md:text-6xl  block leading-32 mb-12 md:mb-0 md:leading-48  tracking-[0.12em] md:tracking-[0.2em] font-bold text-neutral-900 ">Work Experience</h2>
            <ExperienceSection />
          </section>

          {/* Skills  */}
          <section
            className="hidden md:flex bg-transparent h-full w-full  flex-col justify-end  rounded-[32px] relative"
          >
            <h2 className="text-3xl md:text-6xl  block  leading-48  tracking-[0.12em] md:tracking-[0.2em] font-bold text-neutral-900 ">Tech Arsenal</h2>
            <TechArsenal />
          </section>
          <section
            className="flex md:hidden bg-transparent h-full w-full flex-col justify-end  rounded-[32px] relative"
          >
            <h2 className="text-3xl md:text-6xl  block leading-32 mt-8 md:mt-0 md:leading-48  tracking-[0.12em] md:tracking-[0.2em] font-bold text-neutral-900 ">Tech Arsenal</h2>
            <TechArsenalMobile />
          </section>
          <Cta/>

        </div>

      </ReactLenis>
    </>
  )
}

export default HomePage