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
      name: "Ekaant Library Booking",
      description:
        "A full-stack library booking application that enables users to check real-time availability and book seats in multiple locations. It supports custom time slots, admin management, and detailed analytics.",
      icon: "/ekaant-icon.svg",
      mobileScreenshots: ["/projects/File3.png", "/projects/File4.png", "/projects/File5.png", "/projects/File6.png", "/projects/File7.png"],
      webScreenshots: "/projects/File2.png",
      techStack: ["react", "nodejs", "aws", "postgresql", "tailwind","grafana", "docker", "typescript"],
    },
    krishnaAcademy: {
      name: "Krishna Academy LMS",
      description:
        "A full-fledged Learning Management System (LMS) designed for Krishna Academy. Includes interactive quizzes, video lectures, real-time student progress tracking, and a dedicated admin panel.",
      icon: "/krishna-academy-icon.svg",
      mobileScreenshots: ["/projects/File12.png", "/projects/File10.png", "/projects/File11.png", "/projects/File9.png"],
      webScreenshots: "/projects/File1.png",
      techStack: ["react", "nodejs", "aws", "postgresql", "tailwind", "grafana", "docker", "typescript"],
    },
    restaurant: {
      name: "Restaurant Ordering System",
      description:
        "A QR-based digital menu and order management system that enhances restaurant efficiency by allowing customers to order and pay seamlessly from their phones.",
      icon: "/restaurant-icon.svg",
      mobileScreenshots: ["/projects/File9.png", "/projects/File10.png", "/projects/File11.png", "/projects/File12.png"],
      webScreenshots: "/projects/File1.png",
      techStack: ["nextjs" ,"react", "nodejs", "postgresql", "tailwind", ],
    },
  };
  

  

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<keyof typeof projects>("ekaant");

  return (
    <div className="flex flex-col justify-center items-center gap-6 py-10 bg-gradient-to-b from-black to-gray-900 text-white  ">
      <h2 className="text-4xl font-bold mb-6"> MY Projects</h2>

      {/* Project Selection Carousel */}
      <div className="w-full max-w-3xl">
        <Swiper slidesPerView={2} spaceBetween={20} loop autoplay={{ delay: 3000 }} className="pb-4">
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
        </Swiper>
      </div>

      {/* Screenshots Showcase */}
      <div className="flex flex-col justify-center  items-center gap-0">
        {/* Mobile Showcase */}
        <PhoneMockup screenshots={projects[selectedProject].mobileScreenshots} />

   
          <WebMockup
            screenshot={projects[selectedProject].webScreenshots}
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
