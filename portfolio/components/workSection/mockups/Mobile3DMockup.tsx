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
    <div className="relative w-full flex items-center justify-center min-h-[400px] py-4 px-2">
      {/* Responsive Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-60 rounded-2xl" />
      
      <div 
        ref={containerRef}
        className={`
          relative mx-auto select-none z-10
          /* Compact, content-focused sizing */
          w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px]
          /* Fixed height for consistency */
          h-[480px] sm:h-[520px] md:h-[550px] lg:h-[580px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleContentClick}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          whileHover={{ scale: 1.01 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.4
          }}
        >
          {/* Simplified Phone Frame */}
          <div className={`
            relative w-full h-full
            bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900
            rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem]
            p-1 sm:p-1.5 md:p-2
            shadow-2xl
            border border-gray-600
          `}>
            
            {/* Main Screen Container */}
            <div className={`
              relative w-full h-full 
              bg-black 
              rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.75rem]
              overflow-hidden
            `}>
              
              {/* Minimal Notch */}
              <div className={`
                absolute top-0 left-1/2 transform -translate-x-1/2 z-30
                w-16 sm:w-20 md:w-24
                h-2 sm:h-2.5 md:h-3
                bg-black 
                rounded-b-lg
              `} />
              
              {/* Screen Content - Full Focus */}
              <div className="w-full h-full bg-gray-900 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`${project.id}-mobile-${currentScreenshot}`}
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
                      duration: 1.2, // Slower, more gentle transitions
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    src={screenshots[currentScreenshot]} 
                    alt={`${project.title} - Mobile View ${currentScreenshot + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AnimatePresence>
                
                {/* Minimal screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-transparent pointer-events-none" />
                
                {/* Simplified Status Bar */}
                <div className={`
                  absolute top-1 sm:top-1.5 md:top-2 
                  left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 
                  flex justify-between items-center 
                  text-white text-[9px] sm:text-[10px] md:text-xs 
                  z-20 opacity-80
                `}>
                  <span className="font-medium">9:41</span>
                  
                  <div className="flex gap-1 items-center">
                    {/* Simple signal bars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`
                            w-0.5 rounded-full bg-white
                            ${bar === 1 ? 'h-1' : bar === 2 ? 'h-1.5' : bar === 3 ? 'h-1.5' : 'h-2'}
                          `}
                        />
                      ))}
                    </div>
                    
                    {/* Simple battery */}
                    <div className="w-4 sm:w-5 h-2 border border-white rounded-sm relative ml-1">
                      <div className="h-0.5 sm:h-1 bg-green-400 rounded-sm m-0.5 w-3/4" />
                      <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-1 bg-white rounded-r-sm" />
                    </div>
                  </div>
                </div>

                {/* Content tap indicator - only show if multiple screenshots */}
                {screenshots.length > 1 && (
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/40 text-xs text-center bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm"
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Tap or swipe • {currentScreenshot + 1}/{screenshots.length}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient background extensions for better visual integration */}
      <div className="absolute -inset-4 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20 pointer-events-none rounded-3xl" />
      
      {/* Custom CSS for minimal animations */}
      <style jsx>{`
        /* Ensure smooth performance */
        .relative {
          will-change: auto;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .min-h-[400px] {
            min-height: 380px;
          }
        }

        @media (max-height: 600px) {
          .h-[480px] {
            height: 420px;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .h-[480px] {
            height: 360px;
          }
          .min-h-[400px] {
            min-height: 300px;
          }
        }

        /* High DPI optimizations */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .object-cover {
            image-rendering: -webkit-optimize-contrast;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.2s !important;
          }
        }

        /* Focus styles */
        .cursor-pointer:focus-visible {
          outline: 2px solid #60A5FA;
          outline-offset: 2px;
        }

        /* Touch optimization */
        @media (pointer: coarse) {
          .cursor-pointer {
            cursor: default;
          }
        }
      `}</style>
    </div>
  );
};
