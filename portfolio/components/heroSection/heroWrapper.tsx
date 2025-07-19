import React, { useEffect, useRef } from "react";
import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";

export function HeroWrapper({}) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating badge animation
    if (badgeRef.current) {
      const badge = badgeRef.current;
      let angle = 0;
      const animate = () => {
        angle += 0.02;
        badge.style.transform = `translate(-50%, 0) translateY(${Math.sin(angle) * 3}px) rotate(${Math.sin(angle * 0.5) * 2}deg)`;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <main className="section1__wrapper relative max-w-maxWidth grow">
      {/* Premium background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-yellow-500/5 animate-pulse"></div>
      
      {/* Floating achievement badges */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30">
        <div 
          ref={badgeRef}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
            animation: "glow 2s ease-in-out infinite alternate"
          }}
        >
          🏆 In Top 2% on  Freelancer.com
        </div>
      </div>

      {/* Floating skill icons */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="skill-orbit skill-orbit-1">⚛️</div>
        <div className="skill-orbit skill-orbit-2">🤖</div>

        <div className="skill-orbit skill-orbit-4">🚀 </div>
        <div className="skill-orbit skill-orbit-4">☁️ </div>
        <div className="skill-orbit skill-orbit-4">📱</div>


      </div> */}



   


      {/* <HeroButton /> */}
      
      <h2 className="left mask pointer-events-none z-20 pt-20">
        <div className="free anime relative">
          <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Software Developer
          </span>
     

        </div>
        <div className="animation__wrapper anime">
        <span className="animate__this animate__this1 left-0 animated-line">
      Full Stack Developer<span className="yellow__it animate-dot">.</span>
      <br />
    </span>
    <span className="animate__this animate__this2 left-0 animated-line">
      Gen AI Developer<span className="yellow__it animate-dot">.</span>
      <br />
    </span>

    <span className="animate__this animate__this5 left-0 animated-line">
      Cloud Architect<span className="yellow__it animate-dot">.</span>
      <br />
    </span>

    <span className="animate__this animate__this8 left-0 animated-line">
      DevOps Engineer<span className="yellow__it animate-dot">.</span>
      <br />
    </span>
          <span>&nbsp;</span>
        </div>
      </h2>
      
      <HeroMarquee />

      <style jsx>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4)); }
          100% { filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)); }
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
        }
      `}</style>
    </main>
  );
}