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
  const [currentDeviceView, setCurrentDeviceView] = useState<'mobile' | 'desktop'>('desktop');
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

  // Auto-advance projects with coordinated timing
  useEffect(() => {
    if (!autoAdvance || activeFilter !== "All") return;
    
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % filteredProjects.length);
    }, 12000); // Increased to 12 seconds for better coordination with device switching
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
    setActiveProject(0);
  }, [activeFilter]);

  // Handle filter change
  const handleFilterChange = (filter: ProjectType) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setAutoAdvance(true);
    } else {
      setAutoAdvance(false);
    }
  };

  // Handle project change with temporary pause
  const handleProjectChange = (index: number) => {
    setActiveProject(index);
    setAutoAdvance(false);
    // Resume auto-advance after user interaction timeout
    setTimeout(() => {
      if (activeFilter === "All") {
        setAutoAdvance(true);
      }
    }, 20000);
  };

  // Handle device view changes from DeviceSwitcher
  const handleDeviceChange = (device: 'mobile' | 'desktop') => {
    setCurrentDeviceView(device);
  };

  // Render appropriate mockup based on project type
  const renderMockup = () => {
    const mockupProps = { project: currentProject };
    
    switch (currentProject.type) {
      case "mobile":
        return <Mobile3DMockup {...mockupProps} />;
      default:
        // For web projects, use device switcher if mobile screenshots exist
        if (currentProject.mobileScreenshots && currentProject.mobileScreenshots.length > 0) {
          return (
            <DeviceSwitcher3D 
              {...mockupProps} 
              autoSwitch={true}
              allowManualSwitch={true}
              isMainAutoAdvanceActive={autoAdvance}
              onDeviceChange={handleDeviceChange}
              initialDevice="desktop"
            />
          );
        }
        return <Desktop3DMockup {...mockupProps} />;
    }
  };

  // Check if current project uses device switcher
  const usesDeviceSwitcher = currentProject.type === "web" && 
    currentProject.mobileScreenshots && 
    currentProject.mobileScreenshots.length > 0;

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-white relative overflow-hidden bg-gray-800"
    >
      {/* Animated background particles */}
      <BackgroundParticles count={20} />

      <motion.div
        style={{ y, opacity, scale }}
        className={`
          container mx-auto px-4 sm:px-6 relative z-10
          ${usesDeviceSwitcher ? 'py-4 sm:py-6' : 'py-6 sm:py-10'}
        `}
      >
        {/* Header */}
        <div className={`text-center ${usesDeviceSwitcher ? 'mb-4 sm:mb-6' : 'mb-6 sm:mb-8'}`}>
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

        {/* Project Navigation */}
        <div className={`${usesDeviceSwitcher ? 'mb-4' : 'mb-6'}`}>
          <ProjectNavigation
            totalProjects={filteredProjects.length}
            activeIndex={activeProject}
            onProjectChange={handleProjectChange}
            activeColor={currentProject.color}
            projects={filteredProjects}
          />
        </div>

        {/* Main Content - Adaptive Layout */}
        <div className={`
          flex flex-col items-center
          ${usesDeviceSwitcher 
            ? 'lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start' 
            : 'lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center'
          }
        `}>
          {/* Device Mockup */}
          <div className={`
            relative w-full flex justify-center
            ${usesDeviceSwitcher 
              ? 'order-1 lg:order-2 lg:col-span-3' 
              : 'order-1 lg:order-2'
            }
          `}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject}-${currentProject.type}-${currentDeviceView}`}
                initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative max-w-full"
              >
                {renderMockup()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Info */}
          <div className={`
            w-full
            ${usesDeviceSwitcher 
              ? 'order-2 lg:order-1 lg:col-span-2 px-4 lg:px-0 mt-6 lg:mt-0' 
              : 'order-2 lg:order-1 px-4 lg:px-0'
            }
          `}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`${usesDeviceSwitcher ? 'text-center lg:text-left' : 'text-center lg:text-left'}`}
              >
                <ProjectInfo project={currentProject} />
                
                {/* Device indicator for switcher projects */}
                {usesDeviceSwitcher && (
                  <motion.div
                    className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>Currently viewing:</span>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${currentDeviceView === 'desktop' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-green-500/20 text-green-300'
                      }
                    `}>
                      {currentDeviceView === 'desktop' ? 'Desktop' : 'Mobile'} View
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Auto-advance status indicator */}
        {autoAdvance && activeFilter === "All" && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-white/60 text-xs">Auto-advance active</span>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced CSS for final integration */}
      <style jsx>{`
        /* Ensure smooth transitions */
        .relative {
          contain: layout style;
        }

        /* Responsive breakpoints */
        @media (max-width: 640px) {
          .lg\\:grid-cols-5 {
            display: flex;
            flex-direction: column;
          }
        }

        /* Height optimizations for device switcher */
        @media (max-height: 600px) {
          .py-4 {
            padding: 0.75rem 0;
          }
          .py-6 {
            padding: 1rem 0;
          }
        }

        /* Desktop layout refinements */
        @media (min-width: 1024px) {
          .lg\\:grid-cols-5 {
            grid-template-columns: 2fr 3fr;
            align-items: flex-start;
            gap: 2rem;
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1280px) {
          .container {
            max-width: 1200px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px) saturate(1.1);
          }
        }

        /* Accessibility - reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.2s !important;
          }
        }

        /* Focus states */
        button:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }

        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

export default EnhancedWorkSection;
