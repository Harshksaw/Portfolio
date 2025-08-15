import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const DesktopMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const screenshots = project.webScreenshots || [project.image];

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
    <div className="relative max-w-full overflow-hidden">
      {/* MacBook Frame */}
      <div className="relative">
        {/* Screen */}
        <div className="w-full max-w-[500px] sm:max-w-[600px] h-[300px] sm:h-[375px] bg-gray-800 rounded-t-lg overflow-hidden shadow-2xl mx-auto border-2 border-gray-700"
             style={{ 
               transform: 'perspective(800px) rotateX(-2deg)',
               transformOrigin: 'bottom center'
             }}>
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
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
            
            {/* Browser UI */}
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gray-800 flex items-center px-2 sm:px-4 z-10">
              <div className="flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 mx-2 sm:mx-4">
                <div className="h-3 sm:h-4 bg-gray-700 rounded text-xs flex items-center px-2 text-gray-400 overflow-hidden">
                  <span className="truncate">{project.link}</span>
                </div>
              </div>
            </div>
            
            {/* Navigation for multiple screenshots */}
            {screenshots.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
            
            {/* Glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.4)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-lg pointer-events-none"
            />
          </div>
        </div>
        
     
        {/* Enhanced Reflection */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};