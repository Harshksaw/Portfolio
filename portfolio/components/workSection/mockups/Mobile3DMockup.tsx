import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const Mobile3DMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const screenshots = project.mobileScreenshots || [project.image];
  
  // Motion values for smooth 3D transforms
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Screenshot cycling with dynamic timing
  useEffect(() => {
    if (screenshots.length > 1 && !isInteracted) {
      const baseTime = screenshots.length <= 2 ? 4000 : 
                      screenshots.length <= 4 ? 3000 : 2000;
      
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

  // Handle mouse movement for 3D effect (desktop only)
  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    const rotateXValue = (mouseY / rect.height) * -15;
    const rotateYValue = (mouseX / rect.width) * 15;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      rotateX.set(0);
      rotateY.set(0);
      setIsInteracted(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsInteracted(true);
    }
  };

  // Touch/click handler for screenshot navigation
  const handleScreenshotChange = (index: number) => {
    setCurrentScreenshot(index);
    setIsInteracted(true);
    
    // Resume auto-cycling after 5 seconds of inactivity
    setTimeout(() => setIsInteracted(false), 5000);
  };

  // Swipe gesture handling for mobile
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = event.touches[0];
    containerRef.current?.setAttribute('data-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!isMobile || screenshots.length <= 1) return;
    
    const startX = parseInt(containerRef.current?.getAttribute('data-start-x') || '0');
    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next screenshot
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      } else {
        // Swipe right - previous screenshot
        setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
      setIsInteracted(true);
      setTimeout(() => setIsInteracted(false), 5000);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`
        relative mx-auto select-none
        ${!isMobile ? 'perspective-1000' : ''}
        /* Responsive container sizing */
        w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]
        h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh]
        max-h-[600px] sm:max-h-[650px] md:max-h-[700px]
        min-h-[500px]
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: !isMobile ? smoothRotateX : 0,
          rotateY: !isMobile ? smoothRotateY : 0,
          transformStyle: !isMobile ? 'preserve-3d' : 'flat'
        }}
        animate={{
          scale: isInteracted ? 1.02 : 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 35,
          duration: 0.3
        }}
      >
        {/* Phone Frame with responsive 3D effect */}
        <div className={`
          relative w-full h-full
          bg-gradient-to-br from-gray-800 via-gray-900 to-black 
          rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem]
          p-1.5 sm:p-2 md:p-2.5
          shadow-xl md:shadow-2xl
          ${!isMobile ? 'transform-style-preserve-3d' : ''}
        `}>
          {/* 3D Depth layers - only on desktop */}
          {!isMobile && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] translate-z-[-3px] opacity-70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] translate-z-[-6px] opacity-50"></div>
            </>
          )}
          
          {/* Main Screen Container */}
          <div className={`
            relative w-full h-full 
            bg-black 
            rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem]
            overflow-hidden
            ${!isMobile ? 'translate-z-[2px]' : ''}
          `}>
            {/* Dynamic Island / Notch */}
            <div className={`
              absolute top-0 left-1/2 transform -translate-x-1/2 z-20
              w-20 sm:w-24 md:w-28 lg:w-32
              h-3 sm:h-4 md:h-5 lg:h-6
              bg-gradient-to-b from-gray-900 to-black 
              rounded-b-lg sm:rounded-b-xl
              shadow-sm
            `}></div>
            
            {/* Screen Content */}
            <div className="w-full h-full bg-gray-900 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`${project.id}-${currentScreenshot}`}
                  initial={{ 
                    opacity: 0,
                    scale: 1.05,
                    filter: 'blur(4px)'
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(4px)'
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  src={screenshots[currentScreenshot]} 
                  alt={`${project.title} - Screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
              </AnimatePresence>
              
              {/* Screen reflection - adaptive to interaction */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
                animate={{
                  opacity: isInteracted ? 0.1 : 0.03
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation dots - responsive sizing */}
              {screenshots.length > 1 && (
                <motion.div 
                  className={`
                    absolute left-1/2 transform -translate-x-1/2 
                    flex gap-1.5 sm:gap-2 
                    bg-black/25 backdrop-blur-sm 
                    rounded-full 
                    px-2 sm:px-3 py-1 sm:py-1.5
                    bottom-8 sm:bottom-10 md:bottom-12
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {screenshots.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleScreenshotChange(index)}
                      className={`
                        rounded-full transition-all duration-300 
                        touch-manipulation min-w-[44px] min-h-[44px]
                        flex items-center justify-center
                        ${index === currentScreenshot ? 'bg-white/90' : 'bg-white/40 hover:bg-white/60'}
                      `}
                      whileHover={!isMobile ? { scale: 1.1 } : {}}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View screenshot ${index + 1} of ${screenshots.length}`}
                    >
                      <div className={`
                        w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                        ${index === currentScreenshot ? 'bg-gray-800' : 'bg-transparent'}
                      `} />
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              {/* Status bar - responsive */}
              <div className={`
                absolute top-1 sm:top-2 md:top-3 lg:top-4 
                left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 
                flex justify-between items-center 
                text-white text-[10px] sm:text-xs 
                z-20
              `}>
                <motion.span 
                  className="font-medium"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  9:41
                </motion.span>
                
                <div className="flex gap-1 sm:gap-2 items-center">
                  {/* Signal indicators */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <motion.div
                        key={bar}
                        className={`
                          w-0.5 sm:w-1 rounded-full bg-white
                          ${bar === 1 ? 'h-1' : bar === 2 ? 'h-1.5' : bar === 3 ? 'h-2' : 'h-2.5'}
                        `}
                        animate={{ 
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: bar * 0.3
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Battery */}
                  <motion.div 
                    className="w-5 sm:w-6 h-2 sm:h-3 border border-white rounded-sm relative overflow-hidden"
                    whileHover={!isMobile ? { scale: 1.1 } : {}}
                  >
                    <motion.div 
                      className="h-0.5 sm:h-1 bg-green-400 rounded-sm m-0.5"
                      animate={{ width: ["70%", "85%", "70%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    {/* Battery tip */}
                    <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-1 bg-white rounded-r-sm" />
                  </motion.div>
                </div>
              </div>

              {/* Swipe indicator for mobile */}
              {isMobile && screenshots.length > 1 && (
                <motion.div
                  className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-xs text-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Swipe to navigate
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS for 3D transforms */}
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
        
        .translate-z-[-3px] {
          transform: translateZ(-3px);
        }
        
        .translate-z-[-6px] {
          transform: translateZ(-6px);
        }
        
        .will-change-transform {
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Responsive adjustments for very small screens */
        @media (max-height: 600px) {
          .min-h-[500px] {
            min-height: 450px;
          }
        }

        /* Landscape mobile optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          .h-[85vh] {
            height: 95vh;
          }
        }

        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .will-change-transform {
            transform: translateZ(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
