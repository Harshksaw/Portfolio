'use client'

import { useEffect, useState } from "react";
import { useLoading } from "@/components/providers/LoadingProvider";

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) clearInterval(interval);
      }, 2000);
    }
  }, 100);

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  return { loaded, percent };
};

const CharacterLoader = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);

  if (percent >= 100 && !loaded) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setIsLoaded(true), 1000);
    }, 600);
  }

  useEffect(() => {
    if (!isLoaded) return;
    import("@/components/3d/utils/initialFX").then((module) => {
      setExiting(true);
      setTimeout(() => {
        module.initialFX();
        setIsLoading(false);
      }, 900);
    });
  }, [isLoaded]);

  const barWidth = Math.min(percent, 100);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050810] transition-opacity duration-700 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo / Initials */}
        <div className="text-4xl font-bold tracking-widest text-white font-bitcount">
          HKS
        </div>

        {/* Marquee text */}
        <div className="overflow-hidden w-full">
          <p className="text-xs tracking-[0.4em] text-primary-light/60 uppercase animate-marquee whitespace-nowrap">
            Full Stack Developer &nbsp;&nbsp; AI Engineer &nbsp;&nbsp; DevOps Engineer &nbsp;&nbsp; Full Stack Developer &nbsp;&nbsp; AI Engineer &nbsp;&nbsp;
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Loading</span>
            <span>{barWidth}%</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-light rounded-full transition-all duration-100"
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>

        {loaded && (
          <p className="text-primary-light text-sm tracking-widest animate-pulse">
            Welcome
          </p>
        )}
      </div>
    </div>
  );
};

export default CharacterLoader;
