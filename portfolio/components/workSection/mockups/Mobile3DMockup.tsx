import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const Mobile3DMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const screenshots = project.mobileScreenshots || [project.image];
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through screenshots every 2 seconds
  useEffect(() => {
    if (screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [screenshots.length]);

  // Reset to first screenshot when project changes
  useEffect(() => {
    setCurrentScreenshot(0);
  }, [project.id]);

  return (
    <div 
      className="relative mx-auto perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative preserve-3d"
        animate={{
          rotateY: isHovered ? 8 : 0,
          rotateX: isHovered ? -3 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 35,
          duration: 0.4
        }}
      >
        {/* Phone Frame with 3D effect */}
        <div className="relative w-64 sm:w-80 h-[520px] sm:h-[640px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[2rem] sm:rounded-[3rem] p-2 shadow-2xl transform-style-preserve-3d">
          {/* 3D Depth layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-4px] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-8px] opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-12px] opacity-40"></div>
          
          {/* Main Screen Container */}
          <div className="relative w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden transform translate-z-[2px]">
            {/* Notch with 3D effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-6 bg-gradient-to-b from-gray-900 to-black rounded-b-xl z-20 shadow-lg"></div>
            
            {/* Screen Content with fade slideshow */}
            <div className="w-full h-full bg-gray-900 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentScreenshot}
                  initial={{ 
                    opacity: 0
                  }}
                  animate={{ 
                    opacity: 1
                  }}
                  exit={{ 
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                  src={screenshots[currentScreenshot]} 
                  alt={`${project.title} - Screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover transform-gpu"
                />
              </AnimatePresence>
              
              {/* Subtle screen reflection */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
                animate={{
                  opacity: isHovered ? 0.15 : 0.05
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Minimalist Navigation dots */}
              {screenshots.length > 1 && (
                <motion.div 
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {screenshots.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        index === currentScreenshot ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View screenshot ${index + 1} of ${screenshots.length}`}
                    />
                  ))}
                </motion.div>
              )}
              
              {/* Status bar with 3D depth */}
              <div className="absolute top-2 sm:top-4 left-4 right-4 flex justify-between items-center text-white text-xs z-20">
                <motion.span 
                  className="font-medium"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  9:41
                </motion.span>
                <div className="flex gap-2 items-center">
                  {/* Signal bars with animation */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1 h-1 bg-white rounded-full"
                        animate={{ 
                          opacity: [1, 0.6, 1],
                          scale: [1, 0.8, 1]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: bar * 0.2
                        }}
                      />
                    ))}
                  </div>
                  {/* Battery indicator */}
                  <motion.div 
                    className="w-6 h-3 border border-white rounded-sm ml-2 relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="h-1 bg-white rounded-sm m-0.5"
                      animate={{ width: ["60%", "80%", "60%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced floating icons with subtle 3D movement */}
        <motion.div
          className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl text-lg sm:text-xl z-10"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.15,
            rotate: 180,
            transition: { duration: 0.3 }
          }}
        >
          📱
        </motion.div>

        {/* Optimized floating particles */}
        <motion.div
          className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40"
          animate={{ 
            y: [0, -12, 0],
            x: [0, 6, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-1/3 -left-6 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30"
          animate={{ 
            y: [0, -8, 0],
            x: [0, -4, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .translate-z-2 {
          transform: translateZ(2px);
        }
        
        .translate-z-[-4px] {
          transform: translateZ(-4px);
        }
        
        .translate-z-[-8px] {
          transform: translateZ(-8px);
        }
        
        .translate-z-[-12px] {
          transform: translateZ(-12px);
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};