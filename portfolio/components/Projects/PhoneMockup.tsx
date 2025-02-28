"use client"
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

interface PhoneMockupProps {
  screenshots: string[];
}

const PhoneMockup = ({ screenshots }: PhoneMockupProps) => {
  return (
    <motion.div
      className=" relative w-[250px] h-[500px]    bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Speaker */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-700 rounded-full"></div>

      {/* Mobile Screenshots */}
      <div className="absolute top-1 left-1 right-1 bottom-1 overflow-hidden rounded-md">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          speed={800}
          className="w-full h-full"
        >
          {screenshots.map((src, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Mobile Screenshot ${index + 1}`}
                  fill
                  sizes="250px"
                  className="object-cover object-top rounded-[30px]"
                  priority={index === 0}
                />
              </div>
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
