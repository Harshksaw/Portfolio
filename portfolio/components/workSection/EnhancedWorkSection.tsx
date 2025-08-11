"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from './data/projects';
import { ProjectType } from './types';
import { 
  ProjectFilter, 
  ProjectInfo, 
  ProjectNavigation, 
  BackgroundParticles,
  ProjectStats 
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
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for scroll effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const currentProject = filteredProjects[activeProject] || projects[0];

  // Auto-advance projects only when enabled and on "All" filter
  useEffect(() => {
    if (!autoAdvance || activeFilter !== "All") return;
    
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % filteredProjects.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [autoAdvance, activeFilter, filteredProjects.length]);

  // Update filtered projects when filter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const typeMap = { 
        "Web": "web", 
        "Mobile": "mobile", 
      };
      const filtered = projects.filter(p => p.type === typeMap[activeFilter as keyof typeof typeMap]);
      setFilteredProjects(filtered);
    }
    setActiveProject(0); // Reset to first project when filter changes
  }, [activeFilter]);

  // Handle filter change
  const handleFilterChange = (filter: ProjectType) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setAutoAdvance(true); // Re-enable auto-advance when going back to "All"
    } else {
      setAutoAdvance(false); // Stop auto-advance when user interacts with specific filter
    }
  };

  // Handle project change (when clicking on project navigation)
  const handleProjectChange = (index: number) => {
    setActiveProject(index);
    setAutoAdvance(false); // Stop auto-advance when user manually selects project
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
      className="min-h-screen bg-gradient-to-b text-white relative overflow-hidden"
    >
      
      {/* Animated background particles */}
      <BackgroundParticles count={20} />

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >

            <span className={`block bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent mt-2 mb-6`}>
              Projects
            </span>
          </motion.h2>
        
        </div>

        {/* Project Type Filter */}
        <ProjectFilter 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
           <ProjectNavigation
          totalProjects={filteredProjects.length}
          activeIndex={activeProject}
          onProjectChange={handleProjectChange}
          activeColor={currentProject.color}
          projects={filteredProjects}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-16 items-center">
          
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

        {/* Flying Project Stats - Positioned absolutely to not affect layout */}
        {/* <AnimatePresence mode="wait">
          <motion.div
            key={`stats-${activeProject}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <ProjectStats project={currentProject} />
          </motion.div>
        </AnimatePresence> */}


     
      </motion.div>
    </div>
  );
}

export default EnhancedWorkSection;