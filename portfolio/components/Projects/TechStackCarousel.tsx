import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TechStackCarouselProps {
  selectedTech: string[];
}

// Predefined Tech Stack Icons
const allTechStackData = {
  nextjs: { name: "Next.js", icon: "/nextjs.svg", color: "#000000" },
  react: { name: "React", icon: "/react-icon.svg", color: "#61DAFB" },
  nodejs: { name: "Node.js", icon: "/nodejs.svg", color: "#339933" },
  aws: { name: "AWS", icon: "/aws.png", color: "#FF9900" },
  postgresql: { name: "PostgreSQL", icon: "/PostgresSQL.svg", color: "#336791" },
  tailwind: { name: "TailwindCSS", icon: "/TailwindCSS.svg", color: "#06B6D4" },
  graphql: { name: "GraphQL", icon: "/graphql.png", color: "#E10098" },
  docker: { name: "Docker", icon: "/Docker.svg", color: "#2496ED" },
  typescript: { name: "TypeScript", icon: "/typescript-48.png", color: "#3178C6" },
  python: { name: "Python", icon: "/python-188.png", color: "#3776AB" },
  mongodb: { name: "MongoDB", icon: "/mongodb.svg", color: "#47A248" },
  nestjs: { name: "NestJS", icon: "/nestjs.svg", color: "#E0234E" },
  kubernetes: { name: "Kubernetes", icon: "/kubernetes-144.png", color: "#326CE5" },
  grafana: { name: "Grafana", icon: "/grafana.svg", color: "#F46800" },
  vite: { name: "Vite", icon: "/Vite.js.svg", color: "#646CFF" },
};

const allTechStacks = allTechStackData as Record<string, { name: string; icon: string; color: string }>;

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ selectedTech }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Filter to only include tech that's selected
  const techStacks = selectedTech
    .map((tech) => allTechStacks[tech])
    .filter(Boolean);

  useEffect(() => {
    // Initialize visibility and detect mobile
    setIsVisible(true);
    setIsMobile(window.innerWidth <= 768);
    
    // Add resize listener for responsive adjustments
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative py-8 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-800">
      <h3 className="text-center text-white text-xl sm:text-2xl font-bold mb-6">Tech Stack</h3>

      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex justify-center"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              360: { slidesPerView: 3 },
              480: { slidesPerView: 4 },
              640: { slidesPerView: 5 },
              768: { slidesPerView: 6 },
              1024: { slidesPerView: 7 },
              1280: { slidesPerView: 8 },
            }}
            loop={true}
            autoplay={{ 
              delay: 2000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={1500}
            grabCursor={true}
            className="w-full max-w-6xl px-4"
          >
            {techStacks.map((tech, index) => (
              <SwiperSlide key={index} className="w-auto flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col items-center w-24 h-28 border border-gray-700 transition-all hover:shadow-xl hover:border-gray-600 group"
                  style={{
                    boxShadow: `0 4px 20px -2px ${tech.color}20`
                  }}
                >
                  <div className="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white text-sm font-medium text-center">
                    {tech.name}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default TechStackCarousel;