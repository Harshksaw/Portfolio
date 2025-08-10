import React from 'react';
import { motion } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const MobileMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  return (
    <div className="relative mx-auto">
      {/* Phone Frame */}
      <div className="relative w-64 sm:w-80 h-[520px] sm:h-[640px] bg-gray-900 rounded-[2rem] sm:rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-6 bg-black rounded-b-xl z-10"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Status bar */}
            <div className="absolute top-2 sm:top-4 left-4 right-4 flex justify-between items-center text-white text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating icons */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-lg sm:text-xl"
      >
        📱
      </motion.div>
    </div>
  );
};