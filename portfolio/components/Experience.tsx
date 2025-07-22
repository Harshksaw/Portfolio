"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  year: string;
  company: string;
  position: string;
  description: string;
  skills: string[];
  type: "work" | "education" | "project";
  logo?: string;
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    year: "2024",
    company: "Tech Company",
    position: "Senior Full-Stack Developer",
    description: "Led development of scalable web applications using Next.js and Node.js",
    skills: ["Next.js", "React", "Node.js", "TypeScript"],
    type: "work"
  },
  {
    id: 2,
    year: "2023",
    company: "Startup Inc",
    position: "Frontend Developer",
    description: "Built responsive user interfaces and improved performance by 40%",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    type: "work"
  },
  {
    id: 3,
    year: "2022",
    company: "University",
    position: "Computer Science Degree",
    description: "Graduated with honors, specialized in web development",
    skills: ["Data Structures", "Algorithms", "Web Dev"],
    type: "education"
  }
];

export function MacBookExperienceTimeline() {
  const macbookRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState(0);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // MacBook entrance animation
      gsap.fromTo(macbookRef.current, 
        { 
          y: 100, 
          opacity: 0,
          rotateX: -45 
        },
        { 
          y: 0, 
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: macbookRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline items animation
      experienceData.forEach((_, index) => {
        gsap.fromTo(`.timeline-item-${index}`,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.timeline-item-${index}`,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveItem(index),
              onEnterBack: () => setActiveItem(index)
            }
          }
        );
      });

      // MacBook screen content sync with scroll
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.floor(progress * experienceData.length);
          setActiveItem(Math.min(activeIndex, experienceData.length - 1));
        }
      });

    }, macbookRef);

    return () => ctx.revert();
  }, []);

  const currentExperience = experienceData[activeItem];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="text-center py-20">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          My Journey
        </h2>
        <p className="text-xl text-gray-400">
          Experience & Timeline
        </p>
      </div>

      <div className="flex items-start justify-between max-w-7xl mx-auto px-8 gap-16">
        {/* MacBook Display */}
        <div 
          ref={macbookRef}
          className="sticky top-20 w-1/2 perspective-1000"
          style={{ transform: "perspective(1000px)" }}
        >
          {/* MacBook Container */}
          <div className="relative transform-gpu">
            {/* MacBook Base */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-2xl border border-gray-700">
              {/* Screen */}
              <div className="bg-black rounded-lg p-6 aspect-[16/10] border-4 border-gray-900 relative overflow-hidden">
                {/* Screen Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg" />
                
                {/* Content Display */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-sm">Harsh-portfolio.dev</div>
                  </div>

                  {/* Experience Content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="space-y-4 h-full animate-fadeIn">
                      {/* Company/Title */}
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-2xl font-bold text-white">
                          {currentExperience?.position}
                        </h3>
                        <p className="text-blue-400 text-lg">
                          {currentExperience?.company}
                        </p>
                        <p className="text-gray-400">
                          {currentExperience?.year}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-300 leading-relaxed">
                          {currentExperience?.description}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentExperience?.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                       border border-blue-500/30 rounded-full text-sm text-blue-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute bottom-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          currentExperience?.type === 'work' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : currentExperience?.type === 'education'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {currentExperience?.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard */}
              <div className="mt-2 bg-gray-700 rounded-lg p-2">
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className="bg-gray-600 rounded h-2"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* MacBook Shadow */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 h-8 
                          bg-black/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="w-1/2 space-y-24">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item-${index} relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b 
                            from-blue-500 via-purple-500 to-pink-500 h-full opacity-30"></div>
              
              {/* Timeline Node */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full 
                             border-4 z-10 transition-all duration-300 ${
                activeItem === index 
                  ? 'bg-blue-500 border-blue-300 scale-125 shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-700 border-gray-500'
              }`}></div>

              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"}`}>
                <div className={`bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-500 ${
                  activeItem === index 
                    ? 'border-blue-500/50 shadow-xl shadow-blue-500/10 scale-105' 
                    : 'border-gray-700/50'
                }`}>
                  {/* Year Badge */}
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 
                                text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {item.year}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.position}
                  </h3>
                  <p className="text-blue-400 mb-3">{item.company}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-1">
                    {item.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {item.skills.length > 3 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{item.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Resume Button */}
      <div className="text-center py-20">
        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                         text-white font-bold rounded-lg overflow-hidden transition-all duration-300 
                         hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
          <span className="relative z-10">Download Full Resume</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 
                        translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
}