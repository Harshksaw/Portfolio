import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProjectDetails from "./ProjectDetails";
import PhoneMockup from "./PhoneMockup";
import WebMockup from "./WebMockup";
import { motion, useInView } from "framer-motion";
import TechStackCarousel from "./TechStackCarousel";
import Image from "next/image";

// Project data (could be moved to data folder later)
const projects = {
  ekaant: {
    name: "Room & Library Booking",
    description:
      "A full-stack library booking application that enables users to check real-time availability and book seats in multiple locations. It supports custom time slots, admin management, and detailed analytics.",
    icon: "/projects/File2.png",
    mobileScreenshots: ["/projects/File3.png", "/projects/p15.png", "/projects/p16.png" ,"/projects/p17.png", "/projects/File5.png", "/projects/File6.png", "/projects/File7.png"],
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png" ], 
    techStack: ["react", "nodejs", "aws", "postgresql", "tailwind","grafana", "docker", "typescript"],
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
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png" ], 
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
    mobileScreenshots: ["/projects/F204.png", "/projects/F205.png","/projects/F206.png", "/projects/F207.png"],
    webScreenshots: ["/projects/F201.png", "/projects/F202.png", "/projects/F203.png"], 
    techStack: ["nextjs" ,"react", "nodejs", "mongodb", "tailwind"],
    live: "https://restaurant-order.example.com",
    github: "https://github.com/username/restaurant-ordering",
    featured: false
  },
};

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<keyof typeof projects>("ekaant");
  const [animatePhone, setAnimatePhone] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Start animation when section comes into view
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setAnimatePhone(true), 400);
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef} 
      id="projects"
      className="relative py-20 lg:py-28"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
      
      {/* Section Title with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          My Projects
        </h2>
        <div className="mt-4 max-w-2xl mx-auto px-4">
          <p className="text-gray-300">
            Here are some of my recent projects that showcase my skills and experience in building real-world applications.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Project Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(projects).map(([key, project]) => (
              <button
                key={key}
                onClick={() => {
                  setAnimatePhone(false);
                  setSelectedProject(key as keyof typeof projects);
                  setTimeout(() => setAnimatePhone(true), 100);
                }}
                className={`px-5 py-3 rounded-full transition-all duration-300 ${
                  selectedProject === key 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6">
                    <Image 
                      src={project.icon} 
                      alt={project.name} 
                      fill 
                      className="object-contain rounded-full"
                    />
                  </div>
                  <span className="font-medium">{project.name}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            {animatePhone && (
              <div className="relative">
                <PhoneMockup 
                  screenshots={projects[selectedProject].mobileScreenshots} 
                  animate={animatePhone}
                />
                
                {/* Floating labels */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-900/80 px-4 py-2 rounded-full backdrop-blur-sm text-white text-sm font-medium">
                  Mobile View
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 w-[300px] h-[300px] rounded-full blur-3xl bg-purple-800/20 -bottom-20 -left-10" />
              </div>
            )}
          </motion.div>
          
          {/* Project Info & Web Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            {/* Project Details */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {projects[selectedProject].name}
              </h3>
              
              <p className="text-gray-300 mb-6">
                {projects[selectedProject].description}
              </p>
              
              {/* Project Links */}
              <div className="flex flex-wrap gap-4 mb-6">
                <a 
                  href={projects[selectedProject].live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg text-white font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
            
            {/* Web Preview */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-900/80 px-4 py-2 rounded-full backdrop-blur-sm text-white text-sm font-medium">
                Web View
              </div>
              
              {animatePhone && (
                <div className="bg-gray-900/50 backdrop-blur-sm p-2 sm:p-4 rounded-2xl border border-gray-800 overflow-hidden">
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
                          <Image
                            src={screenshot}
                            alt={`${projects[selectedProject].name} screenshot`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <TechStackCarousel selectedTech={projects[selectedProject].techStack} />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
