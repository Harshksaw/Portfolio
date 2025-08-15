import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const MobileMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const screenshots = project.mobileScreenshots || [project.image];

  // Dynamic timing based on number of images
  useEffect(() => {
    if (screenshots.length > 1) {
      // Calculate timing: more images = faster transitions
      const baseTime = screenshots.length <= 2 ? 3000 : 
                      screenshots.length <= 4 ? 2000 : 1500;
      
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      }, baseTime);
      return () => clearInterval(interval);
    }
  }, [screenshots.length]);

  // Reset to first screenshot when project changes
  useEffect(() => {
    setCurrentScreenshot(0);
  }, [project.id]);
  return (
    <div className="relative mx-auto">
      {/* Phone Frame */}
      <div className="relative w-64 sm:w-80 h-[520px] sm:h-[640px] bg-gray-900 rounded-[2rem] sm:rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-6 bg-black rounded-b-xl z-10"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentScreenshot}
                initial={{ 
                  opacity: 0,
                  scale: 1.02
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.98
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
                src={screenshots[currentScreenshot]} 
                alt={`${project.title} - Screenshot ${currentScreenshot + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Navigation dots for multiple screenshots */}
            {screenshots.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentScreenshot ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`View screenshot ${index + 1} of ${screenshots.length}`}
                  />
                ))}
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            
            {/* Status bar */}
            <div className="absolute top-2 sm:top-4 left-4 right-4 flex justify-between items-center text-white text-xs z-10">
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                </div>
                <div className="w-6 h-3 border border-white rounded-sm ml-2">
                  <div className="w-4 h-1 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating icons */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-lg sm:text-xl"
      >
        📱
      </motion.div>
    </div>
  );
};