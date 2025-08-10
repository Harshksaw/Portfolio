"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from './data/projects';
import { ProjectType } from './types';
import { 
  ProjectFilter, 
  ProjectInfo, 
  ProjectNavigation, 
  BackgroundParticles 
} from './components';
import { 
  MobileMockup, 
  DesktopMockup, 
  PluginMockup, 
  InnovativeMockup 
} from './mockups';

export function EnhancedWorkSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for scroll effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const currentProject = projects[activeProject];

  // Auto-advance projects every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 7000); // Change project every 7 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle filter change
  const handleFilterChange = (filter: ProjectType) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setActiveProject(0);
    } else {
      const typeMap = { 
        "Web": "web", 
        "Mobile": "mobile", 
        // "Tools": "tool", 
        // "Innovative": "innovative" 
      };
      const found = projects.findIndex(p => p.type === typeMap[filter as keyof typeof typeMap]);
      if (found !== -1) setActiveProject(found);
    }
  };

  // Render appropriate mockup based on project type
  const renderMockup = () => {
    const mockupProps = { project: currentProject };
    
    switch (currentProject.type) {
      case "mobile":
        return <MobileMockup {...mockupProps} />;
      case "tool":
        return <PluginMockup {...mockupProps} />;
      case "innovative":
        return <InnovativeMockup {...mockupProps} />;
      default:
        return <DesktopMockup {...mockupProps} />;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
    >
      
      {/* Animated background particles */}
      <BackgroundParticles count={20} />

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >

            <span className={`block bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent mt-2`}>
              Projects
            </span>
          </motion.h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            From web applications to mobile apps, plugins to innovative 3D experiences
          </p>
        </div>

        {/* Project Type Filter */}
        <ProjectFilter 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Project Info */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <ProjectInfo project={currentProject} />
            </AnimatePresence>
          </div>

          {/* Device Mockup */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject}-${currentProject.type}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {renderMockup()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Project Navigation */}
        <ProjectNavigation
          totalProjects={projects.length}
          activeIndex={activeProject}
          onProjectChange={setActiveProject}
          activeColor={currentProject.color}
        />
      </motion.div>
    </div>
  );
}

export default EnhancedWorkSection;