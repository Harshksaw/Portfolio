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
       className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg border border-blue-400/30 max-w-[calc(100vw-2rem)] sm:max-w-none text-center whitespace-nowrap"
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
            Software Dev
          </span>


        </div>
        <div className="animation__wrapper anime hidden md:block">
          <div className="flip-container">
            <div className="flip-text">Full Stack Dev<span className="violet__it">.</span></div>
            <div className="flip-text">Gen AI Dev<span className="violet__it">.</span></div>
            <div className="flip-text">Cloud Architect<span className="violet__it">.</span></div>
            <div className="flip-text">DevOps Engineer<span className="violet__it">.</span></div>
          </div>
        </div>
      </h2>

      <HeroMarquee />

      <style jsx>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)); }
          100% { filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.8)); }
        }

        @keyframes flipIn {
          0% { transform: rotateX(-90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }

        @keyframes flipOut {
          0% { transform: rotateX(0deg); opacity: 1; }
          100% { transform: rotateX(90deg); opacity: 0; }
        }

        .animation__wrapper {
          position: relative;
          height: 60px;
          overflow: hidden;
        }

        .flip-container {
          position: relative;
          height: 100%;
        }

        .flip-text {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          opacity: 0;
          transform: rotateX(-90deg);
          transform-origin: 50% 50%;
          animation: flipIn 0.6s ease-out forwards, flipOut 0.6s ease-out 3s forwards;
        }

        .flip-text:nth-child(1) { animation-delay: 0s, 3s; }
        .flip-text:nth-child(2) { animation-delay: 3.6s, 6.6s; }
        .flip-text:nth-child(3) { animation-delay: 7.2s, 10.2s; }
        .flip-text:nth-child(4) { animation-delay: 10.8s, 13.8s; }

        .violet__it {
          color: #8b5cf6;
        }

        .free span {
          font-size: 3rem;
          font-weight: bold;
          display: block;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .animate__this {
            font-size: 1.5rem;
          }
          
          .free span {
            font-size: 2rem;
          }

          .section1__wrapper {
            padding-top: 2rem;
          }
        }
      `}</style>
    </main>
  );
}