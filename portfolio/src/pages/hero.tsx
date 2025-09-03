'use client'

import { motion, } from "motion/react";
import { useEffect, useState } from "react";

import Orb from "../components/common/bolb";
import { sectionVariant } from "../variants/common_variants";


export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Custom variant for mobile optimization
    const mobileSectionVariant = {
        hidden: {
            y: "100vh",
        },
        show: {
            y: 0,
            transition: {
                delay: 2.2, // Adjusted to let text animation complete first on mobile
                duration: 1.0, // Slightly faster animation on mobile
                ease: [0.22, 1, 0.36, 1], 
            },
        },
    };



    return (
        <div className="pt-16 md:pt-20 px-4 md:px-14 pb-8 h-full w-full z-100">
            <motion.section
                variants={isMobile ? mobileSectionVariant as any : sectionVariant as any}
                initial="hidden"
                animate="show"
                className="bg-black h-full w-full flex flex-col justify-center pb-8 px-4 md:px-0 md:items-center rounded-[32px] relative"
                style={{
                  willChange: 'transform', // Optimize for transform animations
                  backfaceVisibility: 'hidden', // Prevent flickering
                  transform: 'translateZ(0)', // Force hardware acceleration
                  ...(isMobile && {
                    // Additional mobile optimizations
                    contain: 'layout style paint',
                    isolation: 'isolate',
                  })
                }}
            >
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={4}
                    forceHoverState={false}
                />
                <div className="hidden md:flex items-center flex-col absolute left-[50%] -translate-x-1/2 -bottom-6  space-y-16 ">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>


                {/* <motion.img
                variants={fromTVariant}
                initial='hidden'
                animate="show"
                src="/Vecto.svg" className="hidden absolute lg:block  -top-0.5 right-20 h-40" />
              <motion.img
                variants={fromBVariant}
                initial='hidden'
                animate="show" src="/Vecto.svg" className="hidden lg:block absolute -bottom-0.5 rotate-180 right-20 h-40" /> */}

                <div className="flex flex-col ">
                    <h3 className="border border-neutral-400/60 text-white text-sm text-center bg-white/5 w-fit mx-auto px-4 py-1 mb-4 rounded-full">Hey! I&apos;m Harsh Kumar Saw</h3>
                    <h3 className="text-white text-center text-[24px] md:text-[44px] md:leading-13 font-light max-w-[880px] font-bitcount">Full-Stack & AI/DevOps Engineer who ships <p className="text-black w-fit inline-block -rotate-6 mr-1 md:mr-0 md:-translate-y-4 bg-white px-4 md:py-1 rounded-full">production-grade </p>systems end-to-end</h3>
                </div>
                <section className=" w-[90%] md:w-fit  absolute bottom-8  right-1/2 translate-x-1/2 md:translate-x-0 md:right-9">

                    <div className=" flex flex-col md:flex-row gap-4 md:gap-3  min-w-60 text-white">
                        <div className="px-3 py-2 rounded-3xl bg-neutral-800/60 ">AI/LLM Systems</div>
                        <div className="flex gap-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 ${!isMobile ? 'animate-spin' : ''}`}>
                                <path fillRule="evenodd" d="M11.622 1.602a.75.75 0 0 1 .756 0l2.25 1.313a.75.75 0 0 1-.756 1.295L12 3.118 10.128 4.21a.75.75 0 1 1-.756-1.295l2.25-1.313ZM5.898 5.81a.75.75 0 0 1-.27 1.025l-1.14.665 1.14.665a.75.75 0 1 1-.756 1.295L3.75 8.806v.944a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .372-.648l2.25-1.312a.75.75 0 0 1 1.026.27Zm12.204 0a.75.75 0 0 1 1.026-.27l2.25 1.312a.75.75 0 0 1 .372.648v2.25a.75.75 0 0 1-1.5 0v-.944l-1.122.654a.75.75 0 1 1-.756-1.295l1.14-.665-1.14-.665a.75.75 0 0 1-.27-1.025Zm-9 5.25a.75.75 0 0 1 1.026-.27L12 11.882l1.872-1.092a.75.75 0 1 1 .756 1.295l-1.878 1.096V15a.75.75 0 0 1-1.5 0v-1.82l-1.878-1.095a.75.75 0 0 1-.27-1.025ZM3 13.5a.75.75 0 0 1 .75.75v1.82l1.878 1.095a.75.75 0 1 1-.756 1.295l-2.25-1.312a.75.75 0 0 1-.372-.648v-2.25A.75.75 0 0 1 3 13.5Zm18 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.372.648l-2.25 1.312a.75.75 0 1 1-.756-1.295l1.878-1.096V14.25a.75.75 0 0 1 .75-.75Zm-9 5.25a.75.75 0 0 1 .75.75v.944l1.122-.654a.75.75 0 1 1 .756 1.295l-2.25 1.313a.75.75 0 0 1-.756 0l-2.25-1.313a.75.75 0 1 1 .756-1.295l1.122.654V19.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <div className="px-3 py-2 rounded-3xl w-full bg-neutral-800/60 flex">
                                DevOps/Cloud</div>
                        </div>
                        <div className="px-3 py-2 rounded-3xl bg-neutral-800/60 ">Microservices</div>
                    </div>
                </section>
            </motion.section>
        </div>
    )
}
