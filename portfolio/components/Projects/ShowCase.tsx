import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectDetails from "./ProjectDetails";
import PhoneMockup from "./PhoneMockup";
import WebMockup from "./WebMockup";
import { motion } from "framer-motion";

// Sample Data: Each Project has a Mobile & Web Showcase
const projects = {
  ekaant: {
    name: "Ekaant Library Booking",
    description: "A library seat booking system with real-time availability.",
    icon: "/exp1.svg",
    mobileScreenshots: ["/ss.png", "/ss.png", "/ss.png"],
    webScreenshots: "/web1.png",
  },
  restaurant: {
    name: "Restaurant Ordering System",
    description: "A QR-based menu and order management system.",
    icon: "/exp2.svg",
    mobileScreenshots: ["/ss.png", "/ss.png"],
    webScreenshots: "/web1.png",
  },
};

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<keyof typeof projects>("ekaant");

  return (
    <div className="flex flex-col items-center gap-6 py-10 bg-gradient-to-b from-black to-gray-900 text-white">
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
      <div className="flex flex-col lg:flex-row items-center gap-0">
        {/* Mobile Showcase */}
        <PhoneMockup screenshots={projects[selectedProject].mobileScreenshots} />

   
          <WebMockup
            screenshot={projects[selectedProject].webScreenshots}
            name={projects[selectedProject].name}
            description={projects[selectedProject].description}
          />

      </div>
    </div>
  );
};

export default ProjectShowcase;
