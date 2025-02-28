import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectDetails from "./ProjectDetails";
import PhoneMockup from "./PhoneMockup";
import WebMockup from "./WebMockup";
import { motion } from "framer-motion";
import TechStackCarousel from "./TechStackCarousel";

// Sample Data: Each Project has a Mobile & Web Showcase

  const projects = {
    ekaant: {
      name: "Room & Library Booking",
      description:
        "A full-stack library booking application that enables users to check real-time availability and book seats in multiple locations. It supports custom time slots, admin management, and detailed analytics.",
      icon: "/projects/File2.png",
      mobileScreenshots: ["/projects/File3.png", "/projects/p15.png", "/projects/p16.png" ,"/projects/p17.png", "/projects/File5.png", "/projects/File6.png", "/projects/File7.png"],
      webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png" ], 
      techStack: ["react", "nodejs", "aws", "postgresql", "tailwind","grafana", "docker", "typescript"],
    },
    krishnaAcademy: {
      name: "Learning Management System",
      description:
        "A full-fledged Learning Management System (LMS) designed for Krishna Academy. Includes interactive quizzes, video lectures, real-time student progress tracking, and a dedicated admin panel.",
      icon: "/projects/File1.png",
      mobileScreenshots: ["/projects/File12.png", "/projects/File10.png", "/projects/File11.png", "/projects/File9.png"],
      webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png" ], 
      techStack: ["react", "nodejs", "aws", "postgresql", "tailwind", "grafana", "docker", "typescript"],
    },
    restaurant: {
      name: "Restaurant Ordering System",
      description:
        "A QR-based digital menu and order management system that enhances restaurant efficiency by allowing customers to order and pay seamlessly from their phones.",
      icon: "/projects/food.webp",
      mobileScreenshots: ["/projects/F204.png", "/projects/F205.png", "/projects/F206.png", "/projects/f207.png"],
      webScreenshots: ["/projects/F201.png", "/projects/F202.png", "/projects/F203.png"], 
      techStack: ["nextjs" ,"react", "nodejs", "mongodb", "tailwind", ],
    },
  };
  

  
  const ArrowIndicator = () => (
    <motion.div 
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
      animate={{ x: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 5L20 12L13 19M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<keyof typeof projects>("ekaant");

  return (
  
    <div className="flex flex-col justify-center items-center gap-6 py-10 bg-gradient-to-b from-black to-gray-900 text-white  ">
      <h2 className="text-4xl font-bold mb-6"> MY Projects</h2>

      {/* Project Selection Carousel */}
      <div className="w-full max-w-3xl ">
        
        <Swiper slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          2560: {
            slidesPerView: 4,
          }
        }}
        spaceBetween={10} loop autoplay={{ delay: 1000 }} className="pb-4">
          {Object.entries(projects).map(([key, project]) => (
            <SwiperSlide key={key}>
              <ProjectDetails
                name={project.name}
                description={project.description}
                icon={project.icon}
                onSelect={() => setSelectedProject(key as keyof typeof projects)}
                isSelected={selectedProject === key}
              />
            </SwiperSlide>
          ))}

          <div>

          <div className="md:hidden ">

            <ArrowIndicator />
          </div>
          </div>
        </Swiper>
      </div>

      {/* Screenshots Showcase */}
      <div className="flex flex-col justify-center  items-center gap-0">
        {/* Mobile Showcase */}
        <PhoneMockup screenshots={projects[selectedProject].mobileScreenshots} />

   
          <WebMockup
            screenshots={projects[selectedProject].webScreenshots}
            name={projects[selectedProject].name}
            description={projects[selectedProject].description}

          />
      

      </div>
      <div className="relative w-full flex justify-center">

<TechStackCarousel selectedTech={projects[selectedProject].techStack} />
  </div>
    </div>
  );
};

export default ProjectShowcase;
