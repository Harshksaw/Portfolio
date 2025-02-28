import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const appData = {
  app1: {
    icon: "/exp1.svg", // Replace with your app icon
    screenshots: ["/screenshot.png", "/ss.png", "/screenshot.png"],
  },
  app2: {
    icon: "/exp2.svg", // Replace with your app icon
    screenshots: ["/ss.png", "/ss.png", "/ss.png"],
  },
};

const PhoneShowcase = () => {
  const [selectedApp, setSelectedApp] = useState<keyof typeof appData>("app1");

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phone Frame */}
      <motion.div
        className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Speaker */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-700 rounded-full"></div>

        {/* Screenshot Slider (Inside the Phone) */}
        <div className="absolute top-1 left-1 right-1 bottom-1 overflow-hidden rounded-md">
          <Swiper loop autoplay={{ delay: 2000 }}>
            {appData[selectedApp].screenshots.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  width={280}
                  height={550}
                  className="w-full h-full object-cover rounded-[30px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Home Button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-900 rounded-full"></div>
      </motion.div>

      {/* App Selection Icons */}
      <div className="flex gap-6">
        {Object.entries(appData).map(([app, { icon }]) => (
          <button
            key={app}
            onClick={() => setSelectedApp(app as keyof typeof appData)}
            className={`p-2 rounded-full ${
              selectedApp === app ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            <Image src={icon} alt={`${app} icon`} width={50} height={50} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneShowcase;
