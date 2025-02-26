
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
export const experienceData = [
  {
    title: "Airing Private Limited",
    content: (
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/airing.png" alt="Airing Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">
              Technical Lead (Full Stack) - Internship
            </p>
            <p className="text-gray-400 text-xs">Airing Private Limited · Jan 2025 - Present · Remote</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs md:text-sm">
          Leading the development of a high-performance inventory management platform using <strong>MERN & GraphQL</strong>.
        </p>
      </div>
    ),
  },
  {
    title: "Jythu",
    content: (
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/jythu.png" alt="Jythu Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">
              Full-stack Developer - Contract (Part-time)
            </p>
            <p className="text-gray-400 text-xs">Jythu · May 2024 - Present · Remote</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs md:text-sm">
          Developing full-stack applications with <strong>Node.js, React Native, and AWS</strong>. Optimizing API performance and UI interactions.
        </p>
      </div>
    ),
  },
  {
    title: "Freelancer.com",
    content: (
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/freelancer.svg" alt="Freelancer Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">
              Freelance Software Developer
            </p>
            <p className="text-gray-400 text-xs">Freelancer.com · Dec 2023 - Present · Remote</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs md:text-sm">
          Recognized in the <strong>top 2% of developers on Freelancer.com</strong>. Delivered <strong>30+ projects</strong> in full-stack development & DevOps.
        </p>
      </div>
    ),
  },
  {
    title: "Tastemate",
    content: (
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/logos/tastemate.svg" alt="Tastemate Logo" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">
              React Native Developer - Internship
            </p>
            <p className="text-gray-400 text-xs">Tastemate · Apr 2024 - Aug 2024 · Remote (US)</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs md:text-sm">
          Developed and optimized mobile applications using <strong>React Native, TypeScript, and Firebase</strong>.
        </p>
      </div>
    ),
  },
];



export default function Experience() {
  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-20">
      <h2 className="text-4xl font-bold text-slate-200 mb-8 text-center ">💼 <TextGenerateEffect words={"My Experience"} 




      /></h2>
      <Timeline data={experienceData} />
    </section>
  );
}
