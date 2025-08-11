import React, { useEffect, useRef } from "react";
import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";

export function HeroWrapper({ }) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating badge animation - Mobile optimized
    if (badgeRef.current) {
      const badge = badgeRef.current;
      const isMobile = window.innerWidth < 768;
      let angle = 0;
      let animationId: number;

      const animate = () => {
        angle += isMobile ? 0.015 : 0.02; // Slower on mobile for battery
        const translateY = Math.sin(angle) * (isMobile ? 2 : 3); // Smaller movement on mobile
        const rotate = Math.sin(angle * 0.5) * (isMobile ? 1 : 2); // Less rotation on mobile

        badge.style.transform = `translate(-50%, 0) translateY(${translateY}px) rotate(${rotate}deg)`;

        // Use throttled animation on mobile
        if (isMobile) {
          setTimeout(() => {
            animationId = requestAnimationFrame(animate);
          }, 16); // ~60fps instead of native refresh rate
        } else {
          animationId = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, []);

  return (
    <main className="section1__wrapper relative max-w-maxWidth grow">
      {/* Premium dark blue background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/10 via-indigo-800/10 to-purple-800/10 animate-pulse"></div>

      {/* Floating achievement badges - Mobile Optimized */}
      <div className="absolute top-12  left-60 md:left-1/2 transform -translate-x-1/2 z-30 px-2 sm:px-0">
        <div
          ref={badgeRef}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
               px-3 py-2 sm:px-6 sm:py-3 
               rounded-full font-bold 
               text-sm sm:text-lg 
               shadow-lg border border-blue-400/30
               max-w-[calc(100vw-2rem)] sm:max-w-none
               text-center whitespace-nowrap"
          style={{
            filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.2))",
            animation: "glow 2s ease-in-out infinite alternate"
          }}
        >
          🏆 In Top 2% on Freelancer.com
        </div>
      </div>






      {/* <HeroButton /> */}

      <h2 className="left mask pointer-events-none z-20 md:pt-20 pt-10">
        <div className="free anime relative hidden md:block">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 bg-clip-text text-transparent">
            Software Developer
          </span>


        </div>
        <div className="animation__wrapper anime hidden md:block">
          <span className="animate__this animate__this1 left-0 animated-line">
            Full Stack Dev<span className="violet__it animate-dot">.</span>
            <br />
          </span>
          <span className="animate__this animate__this2 left-0 animated-line">
            Gen AI Dev<span className="violet__it animate-dot">.</span>
            <br />
          </span>

          <span className="animate__this animate__this5 left-0 animated-line">
            Cloud Architect<span className="violet__it animate-dot">.</span>
            <br />
          </span>

          <span className="animate__this animate__this8 left-0 animated-line">
            DevOps Engineer<span className="violet__it animate-dot">.</span>
            <br />
          </span>
          <span>&nbsp;</span>
        </div>
      </h2>

      <HeroMarquee />

      <style jsx>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)); }
          100% { filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.8)); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        .skill-orbit {
          position: absolute;
          font-size: 24px;
          animation: orbit 10s linear infinite;
        }

        .skill-orbit-1 {
          top: 20%;
          left: 30%;
          animation-delay: 0s;
          animation-duration: 8s;
        }

        .skill-orbit-2 {
          top: 40%;
          right: 25%;
          animation-delay: -2s;
          animation-duration: 12s;
        }

        .skill-orbit-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: -4s;
          animation-duration: 10s;
        }

        .skill-orbit-4 {
          top: 60%;
          right: 40%;
          animation-delay: -6s;
          animation-duration: 9s;
        }

        .skill-orbit-5 {
          bottom: 20%;
          right: 30%;
          animation-delay: -8s;
          animation-duration: 11s;
        }

        @media (max-width: 768px) {
          .skill-orbit {
            display: none;
          }
          
          .absolute.bottom-20.right-10 {
            position: relative;
            bottom: auto;
            right: auto;
            margin-top: 20px;
          }

          .section1__wrapper {
            padding-top: 2rem;
          }
        }
      `}</style>
    </main>
  );
}