'use client'

import { useEffect, useState } from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "./experience-card";

interface PathData {
  id: string;
  d: string;
}

export default function ExperienceSection() {
  const [paths, setPaths] = useState<PathData[]>([]);

  // Calculate center of element relative to viewport (no scroll offset)
  const center = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const updatePaths = () => {
    const nails = experiences.map((_, i) => document.getElementById(`nail_${i + 1}`));
    const validNails = nails.filter((n): n is HTMLElement => n !== null);

    if (validNails.length < 2) return;

    const newPaths: PathData[] = [];

    for (let i = 0; i < validNails.length - 1; i++) {
      const current = validNails[i];
      const next = validNails[i + 1];

      const c1 = center(current);
      const c2 = center(next);

      newPaths.push({
        id: `path_${i}`,
        d: `M${c1.x},${c1.y} C${c1.x},${(c1.y + c2.y) / 2} ${c2.x},${(c1.y + c2.y) / 2} ${c2.x},${c2.y}`
      });
    }

    setPaths(newPaths);
  };

  useEffect(() => {
    // Initial update
    updatePaths();

    // Add event listeners
    window.addEventListener("resize", updatePaths);
    window.addEventListener("scroll", updatePaths);

    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(updatePaths, 100);

    return () => {
      window.removeEventListener("resize", updatePaths);
      window.removeEventListener("scroll", updatePaths);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {experiences.map((exp, index) => {
          // Alternating alignment logic
          const isEven = index % 2 === 0;
          const rotation = isEven ? "-rotate-2 md:-rotate-3" : "rotate-2 md:rotate-3";
          const alignment = isEven ? "justify-end md:pr-20" : "justify-start md:pl-20";
          const margin = index === 0 ? "" : "-mt-20"; // Overlap cards slightly

          return (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              nailId={`nail_${index + 1}`}
              rotation={rotation}
              justification={alignment}
              marginClass={margin}
            />
          );
        })}
      </section>

      <svg
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="rgba(112, 0, 255, 0.4)" // Neon purple trace
            strokeWidth={3}
            fill="none"
            strokeDasharray="8 6"
            className="drop-shadow-[0_0_8px_rgba(112,0,255,0.8)]" // Neon glow on the string too
          />
        ))}
      </svg>
    </>
  );
}

