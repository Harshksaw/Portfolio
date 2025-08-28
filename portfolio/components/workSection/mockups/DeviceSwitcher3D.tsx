import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mobile3DMockup } from './Mobile3DMockup';
import { Desktop3DMockup } from './Desktop3DMockup';
import { DeviceMockupProps } from '../types';

interface DeviceSwitcher3DProps extends DeviceMockupProps {
  autoSwitch?: boolean;
  switchInterval?: number;
  allowManualSwitch?: boolean;
  initialDevice?: 'mobile' | 'desktop';
}

export const DeviceSwitcher3D: React.FC<DeviceSwitcher3DProps> = ({ 
  project,
  autoSwitch = true,
  allowManualSwitch = true,
  initialDevice = 'desktop'
}) => {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'desktop'>(initialDevice);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch between devices with smart timing
  useEffect(() => {
    if (!autoSwitch || isPaused) return;
    
    // Calculate timing based on content and device capabilities
    const mobileImages = project.mobileScreenshots?.length || 1;
    const webImages = project.webScreenshots?.length || 1;
    const totalImages = mobileImages + webImages;
    
    // Smart interval calculation
    const baseInterval = 7000; // Base 7 seconds
    const imageMultiplier = Math.max(totalImages * 1000, 2000); // At least 2s per extra image
    const dynamicInterval = Math.min(baseInterval + imageMultiplier, 15000); // Cap at 15s
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentDevice(prev => prev === 'mobile' ? 'desktop' : 'mobile');
      }
    }, dynamicInterval);
    
    return () => clearInterval(interval);
  }, [autoSwitch, isPaused, isTransitioning, project.mobileScreenshots, project.webScreenshots]);

  const handleDeviceSwitch = (device: 'mobile' | 'desktop') => {
    if (!allowManualSwitch || isTransitioning || device === currentDevice) return;
    
    setIsTransitioning(true);
    setIsPaused(true); // Pause auto-switching
    setCurrentDevice(device);
    
    // Reset states after transition
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsPaused(false), 3000); // Resume auto-switch after 3s
    }, 800);
  };

  const handleContainerInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5s of no interaction
  };

  const containerVariants = {
    initial: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -20
    }
  };

  const transitionSettings = {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94] as const
  };

  return (
    <div 
      className={`
        relative w-full max-w-6xl mx-auto 
        flex flex-col items-center justify-center
        /* Responsive height management */
        min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]
        max-h-[85vh] sm:max-h-[90vh]
        overflow-visible
        px-4 sm:px-6 md:px-8
        py-4 sm:py-6
      `}
      onMouseEnter={handleContainerInteraction}
      onTouchStart={handleContainerInteraction}
    >
      
      {/* Device Toggle Controls */}
      {allowManualSwitch && (
        <motion.div 
          className={`
            absolute top-0 sm:top-2 md:top-4 
            left-1/2 transform -translate-x-1/2 
            z-30 flex gap-2 sm:gap-3
            bg-black/20 backdrop-blur-md 
            rounded-full 
            p-2 sm:p-3
            border border-white/10 shadow-lg
          `}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            onClick={() => handleDeviceSwitch('desktop')}
            className={`
              px-3 sm:px-4 py-2 sm:py-2.5 
              rounded-full text-xs sm:text-sm font-medium 
              transition-all duration-300 
              min-w-[80px] sm:min-w-[100px]
              ${currentDevice === 'desktop'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }
              ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
            whileHover={!isTransitioning ? { scale: 1.05 } : {}}
            whileTap={!isTransitioning ? { scale: 0.95 } : {}}
            disabled={isTransitioning}
          >
            💻 Desktop
          </motion.button>
          
          <motion.button
            onClick={() => handleDeviceSwitch('mobile')}
            className={`
              px-3 sm:px-4 py-2 sm:py-2.5 
              rounded-full text-xs sm:text-sm font-medium 
              transition-all duration-300
              min-w-[80px] sm:min-w-[100px]
              ${currentDevice === 'mobile'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }
              ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
            whileHover={!isTransitioning ? { scale: 1.05 } : {}}
            whileTap={!isTransitioning ? { scale: 0.95 } : {}}
            disabled={isTransitioning}
          >
            📱 Mobile
          </motion.button>
        </motion.div>
      )}

      {/* Main Device Display Area */}
      <div className={`
        relative w-full flex-1 
        flex justify-center items-center
        /* Responsive top spacing for controls */
        ${allowManualSwitch ? 'pt-16 sm:pt-20 md:pt-24' : 'pt-4'}
        ${autoSwitch ? 'pb-16 sm:pb-20' : 'pb-4'}
      `}>
        <AnimatePresence mode="wait">
          {currentDevice === 'desktop' ? (
            <motion.div
              key="desktop"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitionSettings}
              className="w-full h-full flex items-center justify-center"
            >
              <Desktop3DMockup project={project} />
            </motion.div>
          ) : (
            <motion.div
              key="mobile"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitionSettings}
              className="w-full h-full flex items-center justify-center"
            >
              <Mobile3DMockup project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating transition effects */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`
                  absolute w-2 h-2 rounded-full
                  ${i % 2 === 0 ? 'bg-blue-400' : 'bg-green-400'}
                  shadow-lg
                `}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: '50vw',
                  y: '50vh',
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  x: `${20 + Math.random() * 60}vw`,
                  y: `${20 + Math.random() * 60}vh`,
                  rotate: [0, 360],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Smart Status Indicator */}
      {autoSwitch && (
        <motion.div
          className={`
            absolute bottom-0 sm:bottom-2 md:bottom-4 
            left-1/2 transform -translate-x-1/2 
            flex items-center gap-2 sm:gap-3
            bg-black/20 backdrop-blur-md 
            rounded-full 
            px-3 sm:px-4 py-2 sm:py-2.5
            border border-white/10 shadow-lg
            max-w-[90vw]
          `}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className={`
              w-2 h-2 rounded-full
              ${isPaused ? 'bg-yellow-400' : 'bg-green-400'}
            `}
            animate={!isPaused ? {
              opacity: [1, 0.3, 1],
              scale: [1, 1.3, 1]
            } : {
              opacity: [1, 0.5, 1],
              scale: 1
            }}
            transition={{
              duration: isPaused ? 1.5 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="text-white/70 text-xs sm:text-sm flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-medium">
              {isPaused ? 'Paused' : 'Auto-switching'}
            </span>
            <span className="opacity-60 text-center sm:text-left">
              {project.mobileScreenshots?.length || 1}📱 + {project.webScreenshots?.length || 1}💻
            </span>
          </div>
          
          {/* Progress indicator for auto-switch */}
          {!isPaused && autoSwitch && (
            <div className="relative w-8 h-1 bg-white/20 rounded-full overflow-hidden ml-1">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                animate={{
                  width: ["0%", "100%", "0%"]
                }}
                transition={{
                  duration: 8, // Match with switch timing
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          )}
        </motion.div>
      )}

      {/* Device transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Responsive helper text */}
      {allowManualSwitch && (
        <motion.div
          className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <p className="text-white/50 text-xs sm:text-sm max-w-xs sm:max-w-md">
            Click device buttons to switch manually • Auto-switching {isPaused ? 'paused' : 'active'}
          </p>
        </motion.div>
      )}

      {/* Enhanced CSS for better responsive behavior */}
      <style jsx>{`
        /* Ensure proper containment */
        .relative {
          contain: layout style;
        }

        /* Improved responsive breakpoints */
        @media (max-width: 480px) {
          .min-h-[500px] {
            min-height: 450px;
          }
          
          .pt-16 {
            padding-top: 3rem;
          }
          
          .pb-16 {
            padding-bottom: 3rem;
          }
        }

        /* Tablet optimization */
        @media (min-width: 768px) and (max-width: 1024px) {
          .max-h-[85vh] {
            max-height: 80vh;
          }
        }

        /* Large screen optimization */
        @media (min-width: 1440px) {
          .min-h-[500px] {
            min-height: 900px;
          }
          
          .max-h-[85vh] {
            max-height: 85vh;
          }
        }

        /* Landscape mobile handling */
        @media (max-height: 600px) and (orientation: landscape) {
          .min-h-[500px] {
            min-height: 400px;
          }
          
          .max-h-[85vh] {
            max-height: 95vh;
          }
          
          .pt-16 {
            padding-top: 2rem;
          }
          
          .pb-16 {
            padding-bottom: 2rem;
          }
        }

        /* High density displays */
        @media (-webkit-min-device-pixel-ratio: 2) {
          .backdrop-blur-md {
            backdrop-filter: blur(8px) saturate(1.2);
          }
          
          .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }

        /* Prevent layout shift during transitions */
        .flex-1 {
          flex: 1 1 0%;
          min-height: 0;
        }

        /* Optimize for touch devices */
        @media (pointer: coarse) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          .text-xs {
            font-size: 0.875rem;
          }
        }

        /* Container query support fallback */
        @supports not (container-type: inline-size) {
          .w-full {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
