import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const Desktop3DMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const screenshots = project.webScreenshots || [project.image];
  
  // Motion values for smooth 3D transforms
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  // Detect mobile device and screen size
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Screenshot cycling with dynamic timing
  useEffect(() => {
    if (screenshots.length > 1 && !isInteracted) {
      const baseTime = screenshots.length <= 2 ? 4000 : 
                      screenshots.length <= 4 ? 3000 : 2500;
      
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
    
    const rotateXValue = (mouseY / rect.height) * -8;
    const rotateYValue = (mouseX / rect.width) * 8;
    
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

  const handleScreenshotChange = (index: number) => {
    setCurrentScreenshot(index);
    setIsInteracted(true);
    setTimeout(() => setIsInteracted(false), 5000);
  };

  return (
    <div 
      ref={containerRef}
      className={`
        relative w-full max-w-none overflow-visible select-none
        ${!isMobile ? 'perspective-1200' : ''}
        /* Responsive container with proper aspect ratio */
        px-2 sm:px-4 md:px-6
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full"
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
        {/* Laptop Container with more conservative sizing */}
        <div className={`
          relative mx-auto
          ${!isMobile ? 'transform-style-preserve-3d' : ''}
          /* Much smaller, more reasonable laptop sizing */
          w-full
          max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px] xl:max-w-[650px]
        `}>
          {/* Laptop Screen */}
          <div 
            className={`
              w-full
              /* Smaller, more proportional heights */
              h-[160px] sm:h-[220px] md:h-[280px] lg:h-[340px] xl:h-[380px]
              bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 
              rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl
              overflow-hidden 
              shadow-xl md:shadow-2xl
              mx-auto relative 
              border-2 border-gray-700
              ${!isMobile ? 'translate-z-[4px]' : ''}
            `}
            style={{ 
              transform: !isMobile ? 'perspective(800px) rotateX(-2deg)' : 'none',
              transformOrigin: 'bottom center'
            }}
          >
            
            {/* Enhanced Browser UI Bar - smaller */}
            <motion.div 
              className={`
                absolute top-0 left-0 right-0 
                h-4 sm:h-6 md:h-7 lg:h-8
                bg-gradient-to-b from-gray-800 to-gray-850 
                flex items-center 
                px-1.5 sm:px-2 md:px-3 lg:px-4
                z-20
                ${!isMobile ? 'translate-z-[4px]' : ''}
                border-b border-gray-700
              `}
              animate={{
                boxShadow: isInteracted 
                  ? "0 4px 20px rgba(0, 0, 0, 0.4)" 
                  : "0 2px 10px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Traffic lights - smaller */}
              <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
                {['red', 'yellow', 'green'].map((color, index) => (
                  <motion.div
                    key={color}
                    className={`
                      w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3
                      bg-${color}-500 rounded-full cursor-pointer
                      shadow-sm
                    `}
                    whileHover={!isMobile ? { 
                      scale: 1.2,
                      boxShadow: `0 0 8px rgba(${color === 'red' ? '239, 68, 68' : color === 'yellow' ? '245, 158, 11' : '34, 197, 94'}, 0.6)`
                    } : {}}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      opacity: isInteracted ? 1 : 0.8
                    }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>
              
              {/* Address bar - smaller */}
              <motion.div 
                className="flex-1 mx-1.5 sm:mx-2 md:mx-3 lg:mx-4"
                animate={{
                  scale: isInteracted ? 1.01 : 1
                }}
              >
                <div className={`
                  h-2.5 sm:h-3.5 md:h-4 lg:h-5
                  bg-gradient-to-r from-gray-700 to-gray-600 
                  rounded-sm
                  flex items-center 
                  px-1.5 sm:px-2 md:px-3
                  text-gray-300 
                  overflow-hidden relative
                  shadow-inner
                `}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-md"
                    animate={{
                      opacity: isInteracted ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="truncate relative z-10 text-[10px] sm:text-xs md:text-sm font-mono">
                    {project.link || 'https://example.com'}
                  </span>
                </div>
              </motion.div>

              {/* Browser controls - smaller */}
              <div className="flex gap-0.5 sm:gap-1">
                {['←', '→', '↻'].map((symbol, index) => (
                  <motion.button
                    key={symbol}
                    className={`
                      w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                      bg-gray-600 hover:bg-gray-500 
                      rounded-sm
                      flex items-center justify-center
                      text-gray-300 text-[10px] sm:text-xs md:text-sm
                      shadow-sm
                    `}
                    whileHover={!isMobile ? { scale: 1.05, backgroundColor: '#6B7280' } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    {symbol}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Screen Content Area - adjusted for smaller UI */}
            <div className={`
              w-full 
              h-[calc(100%-16px)] sm:h-[calc(100%-24px)] md:h-[calc(100%-28px)] lg:h-[calc(100%-32px)]
              bg-gray-900 relative overflow-hidden mt-4 sm:mt-6 md:mt-7 lg:mt-8
              ${!isMobile ? 'translate-z-[2px]' : ''}
            `}>
              {/* Screenshot Display with smooth transitions */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`${project.id}-desktop-${currentScreenshot}`}
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
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  src={screenshots[currentScreenshot]}
                  alt={`${project.title} - Desktop Screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
              </AnimatePresence>
              
              {/* Screen reflection effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
                animate={{
                  opacity: isInteracted ? 0.15 : 0.08
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation dots - smaller and better positioned */}
              {screenshots.length > 1 && (
                <motion.div 
                  className={`
                    absolute bottom-2 sm:bottom-3 md:bottom-4 
                    left-1/2 transform -translate-x-1/2 
                    flex gap-1.5 sm:gap-2
                    bg-black/30 backdrop-blur-md 
                    rounded-full 
                    px-2 sm:px-3 py-1.5 sm:py-2
                    border border-white/10
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
                        min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]
                        flex items-center justify-center
                        ${index === currentScreenshot ? 'bg-white/90' : 'bg-white/30 hover:bg-white/50'}
                      `}
                      whileHover={!isMobile ? { scale: 1.1 } : {}}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View desktop screenshot ${index + 1} of ${screenshots.length}`}
                    >
                      <div className={`
                        w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full
                        ${index === currentScreenshot ? 'bg-gray-800' : 'bg-transparent'}
                      `} />
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              {/* Enhanced ambient glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-lg"
                animate={{
                  boxShadow: isInteracted ? [
                    "0 0 40px rgba(59, 130, 246, 0.3)",
                    "0 0 80px rgba(147, 51, 234, 0.4)",
                    "0 0 40px rgba(59, 130, 246, 0.3)"
                  ] : [
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 40px rgba(147, 51, 234, 0.25)",
                    "0 0 20px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          {/* Laptop Base/Keyboard - smaller */}
          <motion.div 
            className={`
              w-full 
              h-2 sm:h-3 md:h-3.5 lg:h-4
              bg-gradient-to-b from-gray-700 to-gray-800 
              rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl
              shadow-lg
              border-x-2 border-b-2 border-gray-600
              ${!isMobile ? 'translate-z-[-2px]' : ''}
            `}
            style={{
              transform: !isMobile ? 'perspective(800px) rotateX(-8deg)' : 'none',
              transformOrigin: 'top center'
            }}
            animate={{
              boxShadow: isInteracted 
                ? "0 8px 25px rgba(0, 0, 0, 0.3)" 
                : "0 4px 15px rgba(0, 0, 0, 0.2)"
            }}
          />
          
          {/* Enhanced reflection/shadow - smaller */}
          <motion.div 
            className={`
              absolute bottom-0 left-1/2 transform -translate-x-1/2 
              w-12 sm:w-16 md:w-20 lg:w-24
              h-0.5 sm:h-1 md:h-1.5
              bg-gradient-to-r from-transparent via-white/15 to-transparent 
              blur-sm
              ${!isMobile ? 'translate-z-[-4px]' : ''}
            `}
            animate={{
              opacity: isInteracted ? 0.8 : 0.4,
              scale: isInteracted ? 1.3 : 1
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Custom CSS for 3D transforms and responsive design */}
      <style jsx>{`
        .perspective-1200 {
          perspective: 1200px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
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
        
        .will-change-transform {
          will-change: transform;
          backface-visibility: hidden;
        }
        
        .bg-gray-850 {
          background-color: rgb(26, 32, 44);
        }

        /* Responsive design improvements for smaller sizes */
        @media (max-width: 640px) {
          .perspective-1200 {
            perspective: 600px;
          }
        }

        @media (max-height: 600px) {
          /* Adjust for small height screens */
          .h-[160px] {
            height: 140px;
          }
        }

        @media (max-height: 500px) {
          /* Very small screens */
          .h-[160px] {
            height: 120px;
          }
        }

        /* High DPI optimizations */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .will-change-transform {
            transform: translateZ(0) scale(1);
          }
        }

        /* Ensure proper scaling on all devices */
        @media (min-width: 1920px) {
          .max-w-[900px] {
            max-width: 1000px;
          }
        }
      `}</style>
    </div>
  );
};
