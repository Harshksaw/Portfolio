
import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
  absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the background blending effect */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
    bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
          Building Scalable, Production-Ready Applications – Let’s Create Something Exceptional!
          </p>

          {/**
     *  Link: https://ui.aceternity.com/components/text-generate-effect
     *
     *  Optimized responsive text sizes
     */}
          <TextGenerateEffect
            words="Transforming Ideas into Scalable & Seamless Experiences"
            className="text-center text-[36px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
          />

          <p className="text-center md:tracking-wider mb-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl relative">
            Hi! I&apos;m <span className="font-bold relative">

              
              <span className="font-bold  text-2xl  bg-gradient-to-r from-blue-400 to-purple-200 bg-clip-text text-transparent animate-pulse">
Harsh Kumar
            </span>
            </span>, a <span className="font-semibold ">
              Full-Stack Developer
            </span> with real-world deployment & production experience.
          </p>
        </div>
      </div>


      <a href="#about">
        <MagicButton
          title="Show my work"
          icon={<FaLocationArrow />}
          position="right"
        />
      </a>
    </div>
  );
};

export default Hero;
