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
  Mobile3DMockup,
  Desktop3DMockup,
  DeviceSwitcher3D
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

  // Render appropriate mockup based on project type (3D only)
  const renderMockup = () => {
    const mockupProps = { project: currentProject };
    
    switch (currentProject.type) {
      case "mobile":
        return <Mobile3DMockup {...mockupProps} />;
      default:
        // For web projects, use the device switcher to show both desktop and mobile
        if (currentProject.mobileScreenshots && currentProject.mobileScreenshots.length > 0) {
          return (
            <DeviceSwitcher3D 
              {...mockupProps} 
              autoSwitch={autoAdvance}
              allowManualSwitch={true}
            />
          );
        }
        return <Desktop3DMockup {...mockupProps} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen  text-white relative overflow-hidden bg-gray-800"
    >
      {/* Animated background particles */}
      <BackgroundParticles count={20} />

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 py-2 sm:py-10 relative z-10 "
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className={`block bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent mt-2 mb-6`}>
              Projects
            </span>
          </motion.h2>
        </div>

        {/* Project Type Filter */}
        {/* <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        /> */}
        <ProjectNavigation
          totalProjects={filteredProjects.length}
          activeIndex={activeProject}
          onProjectChange={handleProjectChange}
          activeColor={currentProject.color}
          projects={filteredProjects}
        />

        {/* Main Content - Mobile Optimized Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          {/* Device Mockup - Show first on mobile */}
          <div className="relative order-1 lg:order-2 flex justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject}-${currentProject.type}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative max-w-full"
              >
                {renderMockup()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Info - Compact mobile layout */}
          <div className="order-2 lg:order-1 w-full px-4 lg:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <ProjectInfo project={currentProject} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
     
    
}

export default EnhancedWorkSection;
