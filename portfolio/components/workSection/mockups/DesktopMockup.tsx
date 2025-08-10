import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const DesktopMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const screenshots = project.webScreenshots || [project.image];

  // Auto-cycle through screenshots every 1.5 seconds
  useEffect(() => {
    if (screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
      }, 1500); // Change screenshot every 1.5 seconds
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
        <div className="w-full max-w-[500px] sm:max-w-[600px] h-[300px] sm:h-[375px] bg-gray-800 rounded-lg overflow-hidden shadow-2xl mx-auto">
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
            <motion.img 
              key={currentScreenshot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={screenshots[currentScreenshot]}
              alt={`${project.title} - Screenshot ${currentScreenshot + 1}`}
              className="w-full h-full object-cover"
            />
            
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
        
        {/* Base */}
        <div className="w-full max-w-[520px] sm:max-w-[620px] h-3 sm:h-4 bg-gray-700 rounded-b-lg mx-auto shadow-lg"></div>
        
        {/* Reflection */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};