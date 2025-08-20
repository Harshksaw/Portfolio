import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

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
        
      });
      
      window.addEventListener("resize", () => {
        let time = tl.totalTime();
        tl.totalTime(0);
        positionClones();
        tl.totalTime(time);
      });
      
      return tl;
    }


    createCreativeRoll(".rollingText", { duration: 20 }, 1);

    return () => {
      gsap.killTweensOf(".rollingText");
    };
  }, []);
  return (
    <div 
      ref={containerRef}
      className="wrapperRollingText anime pointer-events-none z-20 select-none rounded-3xl tracking-[-0.1em] overflow-hidden relative"
    >
      <div 
        ref={textRef}
        className="rollingText md:text-[150px] text-[80px] font-bold text-white whitespace-nowrap"
      >
         Kumar - Harsh - Kumar&nbsp;
      </div>
    </div>
  );
}