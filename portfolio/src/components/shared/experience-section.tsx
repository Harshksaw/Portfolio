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
    const nail1 = document.getElementById("nail_1");
    const nail2 = document.getElementById("nail_2");
    const nail3 = document.getElementById("nail_3");
    if (!nail1 || !nail2 || !nail3) return;

    const c1 = center(nail1);
    const c2 = center(nail2);
    const c3 = center(nail3);

    const newPaths: PathData[] = [
      {
        id: "path1",
        d: `M${c1.x},${c1.y} C${c1.x},${(c1.y + c2.y) / 2} ${c2.x},${(c1.y + c2.y) / 2} ${c2.x},${c2.y}`,
      },
      {
        id: "path2",
        d: `M${c2.x},${c2.y} C${c2.x},${(c2.y + c3.y) / 2} ${c3.x},${(c2.y + c3.y) / 2} ${c3.x},${c3.y}`,
      },
    ];
    setPaths(newPaths);
  };

  useEffect(() => {
    updatePaths();
    window.addEventListener("resize", updatePaths);
    window.addEventListener("scroll", updatePaths);
    return () => {
      window.removeEventListener("resize", updatePaths);
      window.removeEventListener("scroll", updatePaths);
    };
  }, []);

  return (
    <>
      

<section className="max-w-7xl mx-auto w-full">
        <ExperienceCard
          experience={experiences[0]}
          nailId="nail_1"
          rotation="-rotate-12"
          justification="justify-end"
          marginClass="md:mr-20"
        />
        <ExperienceCard
          experience={experiences[1]}
          nailId="nail_2"
          rotation="rotate-12"
          justification="justify-start"
          marginClass="mt-12 md:-mt-12 md:ml-12"
        />
        <ExperienceCard
          experience={experiences[2]}
          nailId="nail_3"
          rotation="-rotate-[8deg]"
          justification="justify-end"
          marginClass="mt-12 mr-0 md:mr-24"
        />
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
            stroke="black"
            strokeWidth={2}
            fill="none"
            strokeDasharray="8 6"
          />
        ))}
      </svg>
    </>
  );
}

