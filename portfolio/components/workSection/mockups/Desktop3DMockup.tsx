import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const Desktop3DMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const screenshots = project.webScreenshots || [project.image];
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
      className="relative max-w-full overflow-visible perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative preserve-3d"
        animate={{
          rotateY: isHovered ? -6 : 0,
          rotateX: isHovered ? 3 : 0,
          scale: isHovered ? 1.01 : 1,
          z: isHovered ? 30 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 35,
          duration: 0.4
        }}
      >
        {/* MacBook Frame with enhanced 3D effect */}
        <div className="relative transform-style-preserve-3d">
          {/* 3D Depth layers for the laptop body */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-lg transform translate-z-[-16px] opacity-40 blur-sm scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-lg transform translate-z-[-12px] opacity-60 blur-sm scale-103"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg transform translate-z-[-8px] opacity-80 blur-sm scale-101"></div>
          
          {/* Main laptop body */}
          <div className="w-full max-w-[500px] sm:max-w-[600px] h-[300px] sm:h-[375px] bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-lg overflow-hidden shadow-2xl mx-auto relative transform translate-z-[4px]">
            
            {/* Screen */}
            <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative transform translate-z-[2px]">
              {/* Screen content with fade slideshow */}
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
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  src={screenshots[currentScreenshot]}
                  alt={`${project.title} - Screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover transform-gpu"
                />
              </AnimatePresence>
              
              {/* Enhanced Browser UI with 3D effects */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-gray-800 to-gray-850 flex items-center px-2 sm:px-4 z-20 transform translate-z-[4px]"
                animate={{
                  boxShadow: isHovered 
                    ? "0 4px 20px rgba(0, 0, 0, 0.4)" 
                    : "0 2px 10px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Traffic lights with hover animations */}
                <div className="flex gap-1 sm:gap-2">
                  {['red', 'yellow', 'green'].map((color, index) => (
                    <motion.div
                      key={color}
                      className={`w-2 h-2 sm:w-3 sm:h-3 bg-${color}-500 rounded-full cursor-pointer`}
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: `0 0 10px var(--tw-${color}-500)`
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        opacity: isHovered ? 1 : 0.8
                      }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
                
                {/* Enhanced address bar */}
                <motion.div 
                  className="flex-1 mx-2 sm:mx-4"
                  animate={{
                    scale: isHovered ? 1.02 : 1
                  }}
                >
                  <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded text-xs flex items-center px-2 text-gray-300 overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded"
                      animate={{
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="truncate relative z-10">{project.link}</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Subtle screen reflection */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"
                animate={{
                  opacity: isHovered ? 0.2 : 0.1
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Minimalist Navigation for multiple screenshots */}
              {screenshots.length > 1 && (
                <motion.div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/25 backdrop-blur-sm rounded-full px-4 py-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {screenshots.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        index === currentScreenshot ? 'bg-white' : 'bg-white/25 hover:bg-white/50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View screenshot ${index + 1} of ${screenshots.length}`}
                    />
                  ))}
                </motion.div>
              )}
              
              {/* Enhanced Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                animate={{
                  boxShadow: isHovered ? [
                    "0 0 30px rgba(59, 130, 246, 0.4)",
                    "0 0 60px rgba(147, 51, 234, 0.5)",
                    "0 0 30px rgba(59, 130, 246, 0.4)"
                  ] : [
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 40px rgba(147, 51, 234, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
          
          {/* Enhanced Base with 3D depth */}
          <motion.div 
            className="w-full max-w-[520px] sm:max-w-[620px] h-3 sm:h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-auto shadow-2xl relative transform translate-z-[2px]"
            animate={{
              scale: isHovered ? 1.02 : 1,
              boxShadow: isHovered 
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 4px 16px rgba(0, 0, 0, 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Base depth layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-lg transform translate-z-[-2px] opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-gray-600 rounded-b-lg transform translate-z-[-4px] opacity-60"></div>
          </motion.div>
          
          {/* Enhanced Reflection */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
            animate={{
              opacity: isHovered ? 0.6 : 0.3,
              width: isHovered ? "200px" : "160px"
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Optimized floating elements with subtle movement */}
        <motion.div
          className="absolute -top-4 -right-6 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl text-xl z-20"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 6, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotate: 180,
            transition: { duration: 0.4 }
          }}
        >
          💻
        </motion.div>

        {/* Optimized floating particles */}
        <motion.div
          className="absolute top-1/4 -left-8 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40"
          animate={{ 
            y: [0, -15, 0],
            x: [0, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 -right-4 w-3 h-3 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-35"
          animate={{ 
            y: [0, -12, 0],
            x: [0, 8, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
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
        
        .translate-z-[2px] {
          transform: translateZ(2px);
        }
        
        .translate-z-[4px] {
          transform: translateZ(4px);
        }
        
        .translate-z-[-2px] {
          transform: translateZ(-2px);
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
        
        .translate-z-[-16px] {
          transform: translateZ(-16px);
        }
        
        .scale-101 {
          transform: scale(1.01);
        }
        
        .scale-103 {
          transform: scale(1.03);
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .bg-gray-850 {
          background-color: rgb(26, 32, 44);
        }
      `}</style>
    </div>
  );
};