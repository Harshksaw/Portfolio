"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
interface PhoneMockupProps {
  screenshots: string[];
  animate?: boolean;
}

const PhoneMockup = ({ screenshots, animate = true }: PhoneMockupProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = screenshots.length;
  
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const isFullyLoaded = imagesLoaded > 0;

  // Display at least one image even if not all are loaded
  useEffect(() => {
    // Force display after 2 seconds even if not all images loaded
    const timer = setTimeout(() => {
      if (imagesLoaded > 0) {
        // At least one image is loaded
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [imagesLoaded]);

  return (
    <div className="relative">
      {/* Phone frame */}
      <div 
        className={`relative w-[280px] h-[580px] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden transition-all duration-700 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Phone top notch */}
        <div className="absolute top-0 left-0 right-0 h-6 flex justify-center items-start z-10">
          <div className="bg-black h-6 w-40 rounded-b-2xl flex items-center justify-center">
            <div className="bg-gray-800 h-2 w-20 rounded-full"></div>
          </div>
        </div>
        
        {/* Speaker */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full z-20"></div>
        
        {/* Status bar */}
        <div className="absolute top-1 left-0 right-0 px-6 h-6 flex justify-between items-center z-20">
          <div className="text-white text-xs">9:41</div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 10a6 6 0 0 0-12 0v8h12v-8z"></path>
              <path d="M20 14v-3a8 8 0 0 0-16 0v3"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M2 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2z"></path>
              <path d="M6 12h12"></path>
              <path d="M12 18V6"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 2h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"></path>
              <path d="M8 4h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"></path>
              <path d="M13 6h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"></path>
              <path d="M18 8h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"></path>
            </svg>
          </div>
        </div>

        {/* Loading indicator */}
        {imagesLoaded < 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-30">
            <div className="w-12 h-12 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Mobile Screenshots */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ 
              delay: 2000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={1000}
            className="w-full h-full"
          >
            {screenshots.map((src, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Mobile Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full z-20"></div>
      </div>
      
      {/* Reflection effect */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-blue-400/10 to-transparent blur-xl -z-10 rounded-full transition-opacity duration-700 ${
          animate ? 'opacity-50' : 'opacity-0'
        }`}
      />
      
      {/* Phone shadow */}
      <div
        className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-black blur-xl -z-10 rounded-full transition-all duration-700 ${
          animate ? 'opacity-20 scale-100' : 'opacity-0 scale-80'
        }`}
      />
      
      {/* Phone animation effect */}
      {animate && (
        <div className="absolute -inset-1 rounded-[50px] bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default PhoneMockup;