
import React from "react";
import { Timeline } from "@/components/ui/timeline";
 const experienceData = [
  {
    title: "Airing Private Limited",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          <strong>Technical Lead (Full Stack) - Internship</strong>
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mb-2">
          Jan 2025 - Present · 2 mos · Remote
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm">
          Leading the development of a high-performance inventory management platform for a thriving e-commerce business.
          Utilizing <strong>MERN stack & GraphQL</strong> to build a scalable system.
        </p>
      </div>
    ),
  },
  {
    title: "Jythu",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          <strong>Full-stack Developer - Contract (Part-time)</strong>
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mb-2">
          May 2024 - Present · 10 mos · Remote
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm">
          Developing and maintaining full-stack applications using <strong>Node.js, React Native, and AWS</strong>. 
          Optimizing API performance and ensuring smooth UI interactions.
        </p>
      </div>
    ),
  },
  {
    title: "Freelancer.com",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          <strong>Freelance Software Developer</strong>
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mb-2">
          Dec 2023 - Present · 1 yr 3 mos · Remote
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm">
          Recognized among the <strong>top 2% of developers on Freelancer.com</strong>. 
          Successfully completed <strong>30+ projects</strong> in full-stack development and DevOps.
        </p>
      </div>
    ),
  },
  {
    title: "Tastemate",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          <strong>React Native Developer - Internship</strong>
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm mb-2">
          Apr 2024 - Aug 2024 · 5 mos · Remote (United States)
        </p>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm">
          Developed cross-platform mobile applications using <strong>React Native, TypeScript, and Firebase</strong>.
          Improved app performance and user experience.
        </p>
      </div>
    ),
  },
];


export default function Experience() {
  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">💼 Work Experience</h2>
      <Timeline data={experienceData} />
    </section>
  );
}
