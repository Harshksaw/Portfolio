"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDetails from "./ProjectDetails";
import PhoneMockup from "./PhoneMockup";
import WebMockup from "./WebMockup";
import Image from "next/image";
import TechStackCarousel from "./TechStackCarousel";

// Project data
const projects = {
  ekaant: {
    name: "Room & Library Booking",
    description:
      "A full-stack library booking application that enables users to check real-time availability and book seats in multiple locations. It supports custom time slots, admin management, and detailed analytics.",
    icon: "/projects/File2.png",
    mobileScreenshots: ["/projects/File3.png", "/projects/p15.png", "/projects/p16.png", "/projects/p17.png", "/projects/File5.png", "/projects/File6.png", "/projects/File7.png"],
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png"],
    techStack: ["react", "nodejs", "aws", "postgresql", "tailwind", "grafana", "docker", "typescript"],
    live: "https://ekaant.example.com",
    github: "https://github.com/username/ekaant",
    featured: true
  },
  krishnaAcademy: {
    name: "Learning Management System",
    description:
      "A full-fledged Learning Management System (LMS) designed for Krishna Academy. Includes interactive quizzes, video lectures, real-time student progress tracking, and a dedicated admin panel.",
    icon: "/projects/File1.png",
    mobileScreenshots: ["/projects/File12.png", "/projects/File10.png", "/projects/File11.png", "/projects/File9.png"],
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png"],
    techStack: ["react", "nodejs", "aws", "postgresql", "tailwind", "grafana", "docker", "typescript"],
    live: "https://krishna-academy.example.com",
    github: "https://github.com/username/krishna-academy",
    featured: true
  },
  restaurant: {
    name: "Restaurant Ordering System",
    description:
      "A QR-based digital menu and order management system that enhances restaurant efficiency by allowing customers to order and pay seamlessly from their phones.",
    icon: "/projects/food.webp",
    mobileScreenshots: ["/projects/F204.png", "/projects/F205.png", "/projects/F206.png", "/projects/F207.png"],
    webScreenshots: ["/projects/F201.png", "/projects/F202.png", "/projects/F203.png"],
    techStack: ["nextjs", "react", "nodejs", "mongodb", "tailwind"],
    live: "https://restaurant-order.example.com",
    github: "https://github.com/username/restaurant-ordering",
    featured: false
  },
};

// Framer Motion variants for animations (only used for content)
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<keyof typeof projects>("ekaant");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle project changes
  const changeProject = (projectKey: keyof typeof projects) => {
    if (projectKey === selectedProject) return;
    setSelectedProject(projectKey);
  };

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 mt-10 z-10 bg-black"
    >
      {/* Background element to ensure separation from hero */}
      <div className="absolute inset-0 bg-black -z-10" />

      {/* Section Title - NO ANIMATION */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          My Projects
        </h2>
        <div className="mt-4 max-w-2xl mx-auto px-4">
          <p className="text-gray-300">
            Here are some of my recent projects that showcase my skills and experience in building real-world applications.
          </p>
        </div>
      </div>

      {/* Project Selection Tabs - NO ANIMATION */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(projects).map(([key, project]) => (
            <button
              key={key}
              onClick={() => changeProject(key as keyof typeof projects)}
              className={`px-6 py-4 md:px-8 md:py-4 rounded-xl transition-all duration-300 ${
                selectedProject === key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                  <img 
                    src={project.icon} 
                    alt={project.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <span className="font-medium text-base md:text-lg">{project.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Project Display Area - Keep animations for content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Mobile Preview Column */}
          <motion.div
            className="flex flex-col items-center"
            initial="visible"
            animate="visible"
            variants={fadeIn}
          >
            {/* Mobile View Label */}
            <div className="mb-6 text-center">
              <span className="inline-block bg-blue-900 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-blue-900/20 border border-blue-700">
                Mobile View
              </span>
            </div>
            
            {/* Phone Container */}
            <div className="relative min-h-[580px] flex items-center justify-center">
              {/* Show phone mockup */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject + "-mobile"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <PhoneMockup
                    screenshots={projects[selectedProject].mobileScreenshots}
                    animate={true}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 w-[300px] h-[300px] rounded-full blur-3xl bg-purple-800/20 -bottom-20 -left-10" />
            </div>
          </motion.div>
          
          {/* Project Info & Web Preview Column */}
          <motion.div
            className="flex flex-col gap-2"
            initial="visible"
            animate="visible"
            variants={fadeIn}
          >

       

            {/* Web View Label */}
            <div className="text-center mb-2">
              <span className="inline-block bg-blue-900 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-blue-900/20 border border-blue-700">
                Web View
              </span>
            </div>
            
            {/* Web Preview with AnimatePresence for smooth transitions */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject + "-web"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900/50 backdrop-blur-sm p-2 sm:p-4 rounded-2xl border border-gray-800 overflow-hidden"
                >
                  <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    pagination={{ clickable: true }}
                    navigation={!isMobile}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    className="rounded-lg overflow-hidden"
                  >
                    {projects[selectedProject].webScreenshots.map((screenshot, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full aspect-video">
                          <img
                            src={screenshot}
                            alt={`${projects[selectedProject].name} screenshot`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject + "-details"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 mb-10"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {projects[selectedProject].name}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {projects[selectedProject].description}
                </p>
                
                {/* Project Links */}
                <div className="flex flex-wrap gap-4 mb-2">
                  <a 
                    href={projects[selectedProject].live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                    Live Demo
                  </a>
                  
                  <a 
                    href={projects[selectedProject].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg text-white font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Tech Stack Section - Keep animation */}
        <motion.div
          className="mt-16"
          initial="visible"
          animate="visible"
          variants={fadeIn}
        >
          <TechStackCarousel selectedTech={projects[selectedProject].techStack} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;