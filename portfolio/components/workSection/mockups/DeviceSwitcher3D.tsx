import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mobile3DMockup } from './Mobile3DMockup';
import { Desktop3DMockup } from './Desktop3DMockup';
import { DeviceMockupProps } from '../types';

interface DeviceSwitcher3DProps extends DeviceMockupProps {
  autoSwitch?: boolean;
  switchInterval?: number;
  allowManualSwitch?: boolean;
}

export const DeviceSwitcher3D: React.FC<DeviceSwitcher3DProps> = ({ 
  project,
  autoSwitch = true,
  allowManualSwitch = true
}) => {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-switch between devices with dynamic timing
  useEffect(() => {
    if (!autoSwitch) return;
    
    // Calculate timing based on total number of images
    const mobileImages = project.mobileScreenshots?.length || 1;
    const webImages = project.webScreenshots?.length || 1;
    const totalImages = mobileImages + webImages;
    
    // Longer intervals for fewer images, shorter for more images
    const dynamicInterval = totalImages <= 4 ? 8000 : 
                           totalImages <= 8 ? 6000 : 5000;
    
    const interval = setInterval(() => {
      setCurrentDevice(prev => prev === 'mobile' ? 'desktop' : 'mobile');
    }, dynamicInterval);
    
    return () => clearInterval(interval);
  }, [autoSwitch, project.mobileScreenshots, project.webScreenshots]);

  const handleDeviceSwitch = (device: 'mobile' | 'desktop') => {
    if (!allowManualSwitch || isTransitioning || device === currentDevice) return;
    
    setIsTransitioning(true);
    setCurrentDevice(device);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const containerVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      scale: 1
    },
    exit: { 
      opacity: 0,
      scale: 0.95
    }
  };

  const transitionSettings = {
    duration: 1,
    ease: [0.4, 0, 0.2, 1] as const
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto flex flex-col items-center justify-center min-h-[400px] max-h-[90vh] overflow-hidden perspective-1200">
      {/* Device Toggle Buttons */}
      {allowManualSwitch && (
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => handleDeviceSwitch('desktop')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentDevice === 'desktop'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
          >
            💻 Desktop
          </motion.button>
          <motion.button
            onClick={() => handleDeviceSwitch('mobile')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentDevice === 'mobile'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
          >
            📱 Mobile
          </motion.button>
        </motion.div>
      )}

      {/* Device Animation Container */}
  <div className="relative w-full flex justify-center items-center pt-16 h-full">
        <AnimatePresence mode="wait">
          {currentDevice === 'desktop' ? (
            <motion.div
              key="desktop"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitionSettings}
              className="absolute w-full h-auto max-h-[80vh] flex items-center justify-center"
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
              className="absolute w-full h-auto max-h-[80vh] flex items-center justify-center"
            >
              <Mobile3DMockup project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Optimized floating transition particles */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180],
                  x: Math.random() * 300 - 150,
                  y: Math.random() * 300 - 150,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Auto-switch indicator with dynamic timing */}
      {autoSwitch && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-white/70 text-xs">
            Smart timing • {project.mobileScreenshots?.length || 1} mobile + {project.webScreenshots?.length || 1} web
          </span>
        </motion.div>
      )}

      <style jsx>{`
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
};