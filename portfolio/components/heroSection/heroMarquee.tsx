import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { TextHoverEffect } from "../ui/text-hover-effect";

// Register GSAP plugins
gsap.registerPlugin(CustomEase);

export function HeroMarquee({}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Creative rolling text animation with enhanced effects
    function createCreativeRoll(
      targets: gsap.TweenTarget,
      vars: gsap.TweenVars,
      reverse?: number,
    ) {
      vars = vars || {};
      vars.ease || (vars.ease = "none");
      
      const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10);
          },
        }),
        elements = gsap.utils.toArray(targets) as HTMLElement[],
        clones = elements.map((el) => {
          let clone = el.cloneNode(true);
          el.parentNode?.appendChild(clone);
          return clone;
        }),
        positionClones = () =>
          elements.forEach((el, i) =>
            gsap.set(clones[i], {
              position: "absolute",
              overwrite: false,
              top: el.offsetTop,
              left: reverse ? "-100%" : "100%",
            }),
          );
      
      positionClones();
      
      // Enhanced animation with creative effects
      elements.forEach((el, i) => {
        // Main rolling animation
        tl.to([el, clones[i]], { 
          xPercent: reverse ? 100 : -100, 
          ease: "none",
          ...vars 
        }, 0);
        
        // Add subtle scale animation for breathing effect
        tl.to([el, clones[i]], {
          scaleY: 1.02,
          duration: (vars.duration as number) ? (vars.duration as number) / 4 : 3.75,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, 0);
        
        // Add slight rotation for dynamic feel
        tl.to([el, clones[i]], {
          rotation: 0.5,
          duration: (vars.duration as number) ? (vars.duration as number) / 2 : 7.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, 0);
      });
      
      window.addEventListener("resize", () => {
        let time = tl.totalTime();
        tl.totalTime(0);
        positionClones();
        tl.totalTime(time);
      });
      
      return tl;
    }

    // Create staggered character animations for creative flow
    function createCharacterFlow() {
      const textElement = textRef.current;
      if (!textElement) return;

      const text = textElement.textContent || "";
      const chars = text.split("");
      
      // Wrap each character in a span
      textElement.innerHTML = chars.map((char, i) => 
        `<span class="char-${i}" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");

      // Animate characters with staggered wave effect
      gsap.set(`.char-${Math.floor(Math.random() * chars.length)}`, {
        color: "#ffd700",
        textShadow: "0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700"
      });

      gsap.to("[class*='char-']", {
        y: -5,
        duration: 2,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true
        },
        ease: "sine.inOut"
      });

      // Random golden highlight effect
      setInterval(() => {
        gsap.set("[class*='char-']", { color: "", textShadow: "" });
        const randomChar = Math.floor(Math.random() * chars.length);
        gsap.set(`.char-${randomChar}`, {
          color: "#ffd700",
          textShadow: "0 0 10px #ffd700, 0 0 20px #ffd700",
          duration: 0.5
        });
      }, 2000);
    }

    createCreativeRoll(".rollingText", { duration: 20 }, 1);
    createCharacterFlow();

    // Add container glow effect
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      gsap.killTweensOf(".rollingText");
      gsap.killTweensOf("[class*='char-']");
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
    };
  }, []);
  return (
    <div 
      ref={containerRef}
      className="wrapperRollingText anime pointer-events-none z-20 select-none rounded-3xl tracking-[-0.1em] overflow-hidden relative"
    >
      {/* Background gradient for creative flow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-pulse opacity-30"></div>
      
      {/* Floating particles for extra creativity */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i} ${3 + Math.random() * 2}s infinite linear`
            }}
          />
        ))}
      </div>
      
      <div 
        ref={textRef}
        className="rollingText md:!text-[150px] text-[80px] font-bold bg-gradient-to-r from-white via-violet-300 to-white bg-clip-text text-transparent relative z-10"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 3s ease-in-out infinite"
        }}
      >
         Kumar - Harsh - Kumar&nbsp;
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: 0% 0; }
        }
        
        ${[...Array(5)].map((_, i) => `
          @keyframes float-${i} {
            0% { transform: translateX(-10px) translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 10px)) translateY(${Math.sin(i) * 20}px) rotate(360deg); opacity: 0; }
          }
        `).join('')}
      `}</style>
    </div>
  );
}