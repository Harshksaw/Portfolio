"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timeline } from "./Timeline";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export default  function ExperienceTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experienceData = [
    {
      id: 1,
      year: "2024-2025",
      company: "Jythu",
      position: "Full-stack Developer",
      duration: "May 2024 - Jan 2025",
      location: "Remote",
      description: "Developing full-stack applications with Node.js, React Native, and AWS. Optimizing API performance and UI interactions.",
      skills: ["Node.js", "React Native", "AWS", "API Optimization"],
      achievements: ["Built scalable full-stack applications", "Optimized API performance by 40%"],
      logo: "🚀"
    },
    {
      id: 2,
      year: "2023-Present",
      company: "Freelancer.com",
      position: "Freelance Software Developer",
      duration: "Dec 2023 - Present",
      location: "Remote",
      description: "Recognized in the top 2% of developers on Freelancer.com. Delivered 30+ projects in full-stack development & DevOps.",
      skills: ["Full-stack Development", "DevOps", "Cloud Architecture", "CI/CD"],
      achievements: ["Top 2% developer ranking", "30+ successful projects delivered", "5-star rating maintained"],
      logo: "💼"
    },
    {
      id: 3,
      year: "2024",
      company: "Tastemate",
      position: "React Native Developer",
      duration: "Apr 2024 - Aug 2024",
      location: "Remote (US)",
      description: "Developed and optimized mobile applications using React Native, TypeScript, and Firebase.",
      skills: ["React Native", "TypeScript", "Firebase", "Mobile Development"],
      achievements: ["Improved app performance by 35%", "Implemented real-time features"],
      logo: "📱"
    }
  ];

  // Convert experience data to timeline format
  const timelineData: TimelineEntry[] = experienceData.map((item) => ({
    title: item.year,
    content: (
      <div className="mb-8">
        {/* Company Header */}
        <div className="flex items-start gap-4 mb-6 p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="text-3xl">{item.logo}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {item.position}
            </h3>
            <p className="text-blue-400 font-semibold text-lg mb-1">{item.company}</p>
            <p className="text-gray-400 text-sm mb-4">{item.duration} • {item.location}</p>
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 text-base">
              {item.description}
            </p>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Achievements:</h4>
              <ul className="space-y-2">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                    <span className="text-green-400 text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300 hover:bg-blue-500/30 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  // GSAP slide-in animation when component comes into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a slide-in animation from the About section
      gsap.fromTo(
        sectionRef.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate individual timeline items
      gsap.fromTo(
        ".timeline-content",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-black text-white relative"
    >
      <div className="timeline-content">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}