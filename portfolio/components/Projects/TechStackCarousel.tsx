import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

interface TechStackCarouselProps {
  selectedTech: string[];
}

// Define type for tech keys
type TechKey = keyof typeof allTechStackData;

// Predefined Tech Stack Icons
const allTechStackData = {
  nextjs: { name: "Next.js", icon: "/nextjs.svg" },
  react: { name: "React", icon: "/react-icon.svg" },
  nodejs: { name: "Node.js", icon: "/nodejs.svg" },
  aws: { name: "AWS", icon: "/aws.png" },
  postgresql: { name: "PostgreSQL", icon: "/PostgresSQL.svg" },
  tailwind: { name: "TailwindCSS", icon: "/TailwindCSS.svg" },
  graphql: { name: "GraphQL", icon: "/graphql.png" },
  docker: { name: "Docker", icon: "/Docker.svg" },
  typescript: { name: "TypeScript", icon: "/typescript-48.png" },
  python: { name: "Python", icon: "/python-188.png" },
  mongodb: { name: "MongoDB", icon: "/mongodb.svg" },
  nestjs: { name: "NestJS", icon: "/nestjs.svg" },
  kubernetes: { name: "Kubernetes", icon: "/kubernetes-144.png" },
  grafana: { name: "Grafana", icon: "/grafana.svg" },
  vite: { name: "Vite", icon: "/Vite.js.svg" },
};

const allTechStacks = allTechStackData as Record<string, { name: string; icon: string }>;

const TechStackCarousel: React.FC<TechStackCarouselProps> = ({ selectedTech }) => {
  const techStacks = selectedTech.map((tech) => allTechStacks[tech]).filter(Boolean);

  return (
    <div className="w-full overflow-hidden py-6 sm:py-10 bg-gray-900">
      <h2 className="text-center text-white text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Tech Stack</h2>

      <div className="relative w-full flex justify-center">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={8} // ✅ Reduced space between items
          slidesPerView={2} // ✅ Default for very small screens
          breakpoints={{
            360: { slidesPerView: 3, spaceBetween: 10 }, // ✅ Adjusted for small screens
            480: { slidesPerView: 4, spaceBetween: 12 },
            640: { slidesPerView: 5, spaceBetween: 14 },
            768: { slidesPerView: 6, spaceBetween: 16 },
            1024: { slidesPerView: 7, spaceBetween: 18 },
            1280: { slidesPerView: 8, spaceBetween: 20 },
          }}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1500} // ✅ Slower speed for smooth animation
          grabCursor={true}
          className="w-full max-w-6xl px-2 sm:px-4"
        >
          {techStacks.concat(techStacks).map((tech, index) => (
            <SwiperSlide key={index} className="w-auto flex justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 rounded-lg p-3 shadow-md flex flex-col items-center w-20 sm:w-24"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
                <p className="text-white text-xs sm:text-sm mt-2">{tech.name}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TechStackCarousel;
