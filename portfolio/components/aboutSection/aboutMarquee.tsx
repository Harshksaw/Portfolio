import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { cn } from "@/lib/utils";
import NextIcon from "@/public/svg/nextjsIcon.svg";
import TailwindIcon from "@/public/svg/tailwindIcon.svg";
import TypescriptIcon from "@/public/svg/typescriptIcon.svg";
import ReduxIcon from "@/public/svg/reduxIcon.svg";
import NodejsIcon from "@/public/svg/nodejsIcon.svg";
import ReactIcon from "@/public/svg/reactIcon.svg";
import FigmaIcon from "@/public/svg/figmaIcon.svg";
import GitIcon from "@/public/svg/gitIcon.svg";
import Framer from "@/public/svg/framer.svg";
import Webflow from "@/public/svg/webflow.svg";

/**
 * Enhanced AboutMarquee component with creative tech icon flow
 * Features:
 * - Smooth tech icon carousel with enhanced animations
 * - Random glow effects on different icons
 * - Floating particles for visual interest
 * - Scale and rotation effects on hover
 * - Staggered entrance animations
 */
export function AboutMarquee({}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced creative rolling animation
    gsap.fromTo(
      `.rollingText2`,
      {
        xPercent: 0,
      },
      {
        xPercent: -100,
        duration: 25, // Slightly slower for better visibility
        ease: CustomEase.create("custom", "M0,0,C0,0,1,1,1,1"),
        repeat: -1,
      },
    );

    gsap.fromTo(
      `.rollingText3`,
      {
        xPercent: 0,
      },
      {
        xPercent: -100,
        duration: 25,
        ease: CustomEase.create("custom", "M0,0,C0,0,1,1,1,1"),
        repeat: -1,
      },
    );
    
    gsap.set(`.rollingText3`, {
      //@ts-ignore
      left: `${document.querySelector(".rollingText3")?.offsetWidth || 0}`,
    });

    // Add creative icon animations
    const icons = document.querySelectorAll('.img-wrapper');
    
    // Staggered entrance animation
    gsap.fromTo(icons, {
      scale: 0,
      rotation: 180,
      opacity: 0
    }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    // Random glow effects
    const addRandomGlow = () => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      gsap.to(randomIcon, {
        filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))",
        scale: 1.1,
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.set(randomIcon, { filter: "none", scale: 1 });
        }
      });
    };

    // Start random glow effect
    const glowInterval = setInterval(addRandomGlow, 2000);

    // Floating animation for icons
    icons.forEach((icon, index) => {
      gsap.to(icon, {
        y: Math.sin(index) * 3,
        rotation: Math.cos(index) * 2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Container breathing effect
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.01,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      clearInterval(glowInterval);
      gsap.killTweensOf('.img-wrapper');
      gsap.killTweensOf('.rollingText2');
      gsap.killTweensOf('.rollingText3');
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
    };
  }, []);
  return (
    <div
      ref={containerRef}
      id="one"
      className="anime mt-[2em] grow rounded-3xl bg-colorSecondaryHalfLight md:mt-[4em] md:rounded-[3rem] relative overflow-hidden"
    >
      {/* Background gradient for creative flow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse opacity-50"></div>
      
      {/* Floating particles for tech theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.sin(i) * 60}%`,
              animation: `techFloat-${i} ${4 + Math.random() * 3}s infinite ease-in-out`
            }}
          />
        ))}
      </div>
      
      <div className="slider_wip relative z-10">
        <InnerMarquee className="rollingText2" />
        <InnerMarquee className="rollingText3" />
      </div>

      <style jsx>{`
        ${[...Array(8)].map((_, i) => `
          @keyframes techFloat-${i} {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
            50% { transform: translateY(-${10 + i * 2}px) scale(1.2); opacity: 0.8; }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

type InnerMarqueeProps = {
  className?: string;
};

export const InnerMarquee = ({ className }: InnerMarqueeProps) => {
  const handleIconHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget;
    gsap.to(icon, {
      scale: 1.2,
      rotation: 10,
      filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget;
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      filter: "none",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  return (
    <div className={cn("slider-inner slider ", className)}>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <NextIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <TailwindIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <TypescriptIcon className="h-[90%]" />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <ReduxIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <ReactIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <NodejsIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <FigmaIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <GitIcon />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <Webflow />
      </div>
      <div className="img-wrapper cursor-pointer" onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
        <Framer />
      </div>
    </div>
  );
};
