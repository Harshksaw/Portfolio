import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const Mobile3DMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const screenshots = project.mobileScreenshots || [project.image];
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Slower screenshot cycling with longer timing
  useEffect(() => {
    if (screenshots.length > 1 && !isInteracted) {
      // Much longer intervals for better content viewing
      const baseTime = screenshots.length <= 2 ? 8000 : 
                      screenshots.length <= 4 ? 6000 : 5000;
      
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      }, baseTime);
      return () => clearInterval(interval);
    }
  }, [screenshots.length, isInteracted]);

  // Reset screenshot when project changes
  useEffect(() => {
    setCurrentScreenshot(0);
    setIsInteracted(false);
  }, [project.id]);

  // Simplified touch handlers
  const handleTouchStart = (event: React.TouchEvent) => {
    if (screenshots.length <= 1) return;
    const touch = event.touches[0];
    containerRef.current?.setAttribute('data-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (screenshots.length <= 1) return;
    
    const startX = parseInt(containerRef.current?.getAttribute('data-start-x') || '0');
    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 80) { // Higher threshold for accidental swipes
      if (diff > 0) {
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      } else {
        setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
      setIsInteracted(true);
      setTimeout(() => setIsInteracted(false), 8000); // Longer pause
    }
  };

  // Simple click handler for content area
  const handleContentClick = () => {
    if (screenshots.length > 1) {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      setIsInteracted(true);
      setTimeout(() => setIsInteracted(false), 8000);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center py-3 sm:py-4">
      <div 
        ref={containerRef}
        className={`
          relative mx-auto select-none
          /* Moderate sizing - bigger than before but not overwhelming */
          w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px]
          /* Better proportioned height */
          h-[440px] sm:h-[520px] md:h-[560px] lg:h-[600px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleContentClick}
      >
<<<<<<< Updated upstream
        <motion.div
          className="relative w-full h-full cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ 
            type: "spring",
            stiffness: 350,
            damping: 25,
            duration: 0.4
          }}
        >
          {/* Phone Frame - moderate styling */}
          <div className={`
            relative w-full h-full
            bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
            rounded-[1.8rem] sm:rounded-[2.2rem] md:rounded-[2.6rem]
            p-1.5 sm:p-2 md:p-2.5
            shadow-2xl
            border border-gray-600
            backdrop-blur-sm
          `}>
=======
        {/* Phone Frame with 3D effect */}

        <div className="relative w-64 sm:w-80 h-[80px] sm:h-[440px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[2rem] sm:rounded-[3rem] p-2 shadow-2xl transform-style-preserve-3d">
</div>          {/* 3D Depth layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-4px] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-8px] opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-[2rem] sm:rounded-[3rem] transform translate-z-[-12px] opacity-40"></div>
          
          {/* Main Screen Container */}
          <div className="relative w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden transform translate-z-[2px]">
            {/* Notch with 3D effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-6 bg-gradient-to-b from-gray-900 to-black rounded-b-xl z-20 shadow-lg"></div>
>>>>>>> Stashed changes
            
            {/* Subtle depth effect for desktop */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-[1.8rem] sm:rounded-[2.2rem] md:rounded-[2.6rem] translate-z-[-2px] opacity-50" />
            )}
            
            {/* Main Screen Container */}
            <div className={`
              relative w-full h-full 
              bg-black 
              rounded-[1.5rem] sm:rounded-[1.9rem] md:rounded-[2.3rem]
              overflow-hidden
              ${!isMobile ? 'translate-z-[1px]' : ''}
            `}>
              
              {/* Dynamic Island - modern look */}
              <div className={`
                absolute top-0 left-1/2 transform -translate-x-1/2 z-30
                w-16 sm:w-20 md:w-24
                h-2 sm:h-2.5 md:h-3
                bg-gradient-to-b from-gray-900 to-black
                rounded-b-lg sm:rounded-b-xl
                shadow-lg
              `} />
              
              {/* Screen Content */}
              <div className="w-full h-full bg-gray-900 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`${project.id}-mobile-${currentScreenshot}`}
                    initial={{ 
                      opacity: 0,
                      scale: 1.02,
                      filter: 'blur(2px)'
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)'
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0.98,
                      filter: 'blur(2px)'
                    }}
                    transition={{ 
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    src={screenshots[currentScreenshot]} 
                    alt={`${project.title} - Mobile View ${currentScreenshot + 1}`}
                    className="w-full h-full object-cover will-change-transform"
                    loading="lazy"
                  />
                </AnimatePresence>
                
                {/* Screen reflection - moderate */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-transparent pointer-events-none"
                  animate={{
                    opacity: isInteracted ? 0.08 : 0.04
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Status Bar - well-sized */}
                <div className={`
                  absolute top-1 sm:top-1.5 md:top-2 
                  left-3 sm:left-4 right-3 sm:right-4 
                  flex justify-between items-center 
                  text-white text-[9px] sm:text-[10px] md:text-xs 
                  z-20 opacity-75
                `}>
                  <motion.span 
                    className="font-medium"
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    9:41
                  </motion.span>
                  
                  <div className="flex gap-1 sm:gap-1.5 items-center">
                    {/* Signal bars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <motion.div
                          key={bar}
                          className={`
                            w-0.5 sm:w-1 rounded-full bg-white
                            ${bar === 1 ? 'h-1' : bar === 2 ? 'h-1.5' : bar === 3 ? 'h-2' : 'h-2.5'}
                          `}
                          animate={{ 
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: bar * 0.2
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Battery indicator */}
                    <motion.div 
                      className="w-4 sm:w-5 h-2 sm:h-2.5 border border-white rounded-sm relative ml-1"
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                    >
                      <motion.div 
                        className="h-1 sm:h-1.5 bg-green-400 rounded-sm m-0.5"
                        animate={{ width: ["75%", "85%", "75%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-1 sm:h-1.5 bg-white rounded-r-sm" />
                    </motion.div>
                  </div>
                </div>

                {/* Navigation indicator - balanced */}
                {screenshots.length > 1 && (
                  <motion.div
                    className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white/40 text-xs text-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
                    animate={{ 
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {currentScreenshot + 1} / {screenshots.length}
                  </motion.div>
                )}

                {/* Subtle ambient glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-[1.5rem] sm:rounded-[1.9rem] md:rounded-[2.3rem]"
                  animate={{
                    boxShadow: isInteracted ? [
                      "0 0 20px rgba(34, 197, 94, 0.15)",
                      "0 0 40px rgba(59, 130, 246, 0.2)",
                      "0 0 20px rgba(34, 197, 94, 0.15)"
                    ] : [
                      "0 0 15px rgba(34, 197, 94, 0.1)",
                      "0 0 30px rgba(59, 130, 246, 0.15)",
                      "0 0 15px rgba(34, 197, 94, 0.1)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Custom CSS for moderate styling */}
      <style jsx>{`
        /* Performance and visual improvements */
        .relative {
          will-change: auto;
        }
        
        .will-change-transform {
          will-change: transform;
          backface-visibility: hidden;
        }
        
        .translate-z-[-2px] {
          transform: translateZ(-2px);
        }
        
        .translate-z-[1px] {
          transform: translateZ(1px);
        }
        
        /* Mobile-specific adjustments */
        @media (max-width: 480px) {
          .h-[440px] {
            height: 380px;
          }
          .max-w-[220px] {
            max-width: 200px;
          }
        }

        @media (max-height: 600px) {
          .h-[440px] {
            height: 360px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .h-[440px] {
            height: 300px;
          }
          .py-3 {
            padding: 0.5rem 0;
          }
        }

        /* Tablet and desktop refinements */
        @media (min-width: 768px) {
          .max-w-[260px] {
            max-width: 250px;
          }
          .h-[520px] {
            height: 500px;
          }
        }

        @media (min-width: 1024px) {
          .max-w-[300px] {
            max-width: 280px;
          }
          .h-[560px] {
            height: 540px;
          }
        }

        @media (min-width: 1280px) {
          .max-w-[320px] {
            max-width: 300px;
          }
          .h-[600px] {
            height: 580px;
          }
        }

        /* High DPI and performance optimizations */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .object-cover {
            image-rendering: -webkit-optimize-contrast;
          }
          .backdrop-blur-sm {
            backdrop-filter: blur(4px) saturate(1.1);
          }
        }

        /* Accessibility - reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.3s !important;
          }
          .scale-1\.02:hover {
            transform: scale(1);
          }
        }

        /* Focus and interaction states */
        .cursor-pointer:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }

        /* Touch device optimizations */
        @media (pointer: coarse) {
          .cursor-pointer {
            cursor: default;
          }
          .hover\\:scale-1\\.05:hover {
            transform: scale(1);
          }
        }

        /* Container improvements */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        /* Color consistency */
        .bg-gray-700 {
          background-color: rgb(55, 65, 81);
        }
        
        .bg-gray-800 {
          background-color: rgb(31, 41, 55);
        }
        
        .bg-gray-900 {
          background-color: rgb(17, 24, 39);
        }
      `}</style>
    </div>
  );
};
