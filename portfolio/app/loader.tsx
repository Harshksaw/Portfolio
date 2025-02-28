"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../components/ShootingStarTransition.module.css";

const Loader = ({ setLoading }: { setLoading: (value: boolean) => void }) => {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (textRefs.current.some((el) => el === null)) return;

    const tl = gsap.timeline({
      onComplete: () => setTimeout(() => setLoading(false), 500), // Delay before transition
    });

    // Delay text animation to ensure background stars are visible first
    tl.to(textRefs.current[0], { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "+=0.8") // Delay added
      .to(textRefs.current[1], { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "+=0.5")
      .to(textRefs.current[2], { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "+=0.5")
      .to(textRefs.current.filter(Boolean), { opacity: 0, duration: 0.6, ease: "power3.inOut" }, "+=1.5"); // Extended delay before fade-out

  }, [setLoading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-4xl font-bold z-50 overflow-hidden">
      {/* Background Shooting Stars */}
      <div className={styles.shootingStars}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.star}></div>
        ))}
      </div>

      {/* Text Loader */}
      <div className="flex flex-col items-center gap-5 relative z-10">
        <span ref={(el) => (textRefs.current[0] = el)} className="opacity-0 translate-y-10">
          Hi,
        </span>
        <span ref={(el) => (textRefs.current[1] = el)} className="flex opacity-0 translate-y-10 gap-4">
          <span
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            Harsh
          </span>
          here
        </span>
        <span ref={(el) => (textRefs.current[2] = el)} className="opacity-0 translate-y-10 text-gray-400 text-lg">
          {"</>"} Crafting Code, Building Dreams.
        </span>
      </div>
    </div>
  );
};

export default Loader;
