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
    <div className="relative w-full flex items-center justify-center py-2">
      <div 
        ref={containerRef}
        className={`
          relative mx-auto select-none
          /* Better sizing for device switcher context */
          w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px]
          /* Aspect ratio maintained height */
          h-[400px] sm:h-[480px] md:h-[520px] lg:h-[560px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleContentClick}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          whileHover={{ scale: 1.005 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3
          }}
        >
          {/* Phone Frame - more compact */}
          <div className={`
            relative w-full h-full
            bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
            rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem]
            p-1 sm:p-1.5
            shadow-xl
            border border-gray-600
          `}>
            
            {/* Main Screen Container */}
            <div className={`
              relative w-full h-full 
              bg-black 
              rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem]
              overflow-hidden
            `}>
              
              {/* Notch - smaller */}
              <div className={`
                absolute top-0 left-1/2 transform -translate-x-1/2 z-30
                w-12 sm:w-16 md:w-20
                h-1.5 sm:h-2 md:h-2.5
                bg-black 
                rounded-b-md sm:rounded-b-lg
              `} />
              
              {/* Screen Content */}
              <div className="w-full h-full bg-gray-900 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`${project.id}-mobile-${currentScreenshot}`}
                    initial={{ 
                      opacity: 0,
                      scale: 1.01
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0.99
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    src={screenshots[currentScreenshot]} 
                    alt={`${project.title} - Mobile View ${currentScreenshot + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AnimatePresence>
                
                {/* Very subtle reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-transparent pointer-events-none" />
                
                {/* Status Bar - minimal */}
                <div className={`
                  absolute top-0.5 sm:top-1 md:top-1.5 
                  left-2 sm:left-3 right-2 sm:right-3 
                  flex justify-between items-center 
                  text-white text-[8px] sm:text-[9px] md:text-[10px] 
                  z-20 opacity-70
                `}>
                  <span className="font-medium">9:41</span>
                  
                  <div className="flex gap-0.5 sm:gap-1 items-center">
                    {/* Signal */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`
                            w-0.5 rounded-full bg-white
                            ${bar === 1 ? 'h-0.5' : bar === 2 ? 'h-1' : bar === 3 ? 'h-1' : 'h-1.5'}
                          `}
                        />
                      ))}
                    </div>
                    
                    {/* Battery - smaller */}
                    <div className="w-3 sm:w-4 h-1.5 sm:h-2 border border-white rounded-sm relative ml-0.5">
                      <div className="h-0.5 bg-green-400 rounded-sm m-0.5 w-2/3" />
                      <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 sm:h-1 bg-white rounded-r-sm" />
                    </div>
                  </div>
                </div>

                {/* Navigation indicator - more subtle */}
                {screenshots.length > 1 && (
                  <motion.div
                    className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 text-white/30 text-[10px] sm:text-xs text-center bg-black/10 px-2 py-0.5 rounded-full backdrop-blur-sm"
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {currentScreenshot + 1}/{screenshots.length}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Custom CSS for minimal animations and mobile fixes */}
      <style jsx>{`
        /* Performance optimizations */
        .relative {
          will-change: auto;
        }
        
        /* Mobile-specific fixes */
        @media (max-width: 480px) {
          .h-[400px] {
            height: 350px;
          }
          .max-w-[200px] {
            max-width: 180px;
          }
        }

        @media (max-height: 600px) {
          .h-[400px] {
            height: 320px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .h-[400px] {
            height: 280px;
          }
          .py-2 {
            padding: 0.25rem 0;
          }
        }

        /* Better fit in device switcher */
        @media (min-width: 768px) {
          .max-w-[240px] {
            max-width: 220px;
          }
          .h-[480px] {
            height: 440px;
          }
        }

        @media (min-width: 1024px) {
          .max-w-[280px] {
            max-width: 260px;
          }
          .h-[520px] {
            height: 480px;
          }
        }

        /* High DPI optimizations */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .object-cover {
            image-rendering: -webkit-optimize-contrast;
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.2s !important;
          }
        }

        /* Focus styles for accessibility */
        .cursor-pointer:focus-visible {
          outline: 2px solid #60A5FA;
          outline-offset: 2px;
        }

        /* Touch device optimizations */
        @media (pointer: coarse) {
          .cursor-pointer {
            cursor: default;
          }
          .scale-1\.005:hover {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
