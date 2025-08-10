import React from 'react';
import { motion } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const DesktopMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  return (
    <div className="relative max-w-full overflow-hidden">
      {/* MacBook Frame */}
      <div className="relative">
        <div className="w-full max-w-[500px] sm:max-w-[600px] h-[300px] sm:h-[375px] bg-gray-800 rounded-lg overflow-hidden shadow-2xl mx-auto">
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            
            {/* Browser UI */}
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gray-800 flex items-center px-2 sm:px-4">
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