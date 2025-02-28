import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

interface PhoneMockupProps {
  screenshots: string[];
}

const PhoneMockup = ({ screenshots }: PhoneMockupProps) => {
  return (
    <motion.div
      className="relative w-[250px] h-[500px] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Speaker */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-700 rounded-full"></div>

      {/* Mobile Screenshots */}
      <div className="absolute top-1 left-1 right-1 bottom-1 overflow-hidden rounded-md">
        <Swiper loop autoplay={{ delay: 2000 }}>
          {screenshots.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={`Mobile Screenshot ${index + 1}`}
                width={280}
                height={550}
                className="w-full h-full object-cover rounded-[30px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Home Button */}
      {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-900 rounded-full"></div> */}
    </motion.div>
  );
};

export default PhoneMockup;
