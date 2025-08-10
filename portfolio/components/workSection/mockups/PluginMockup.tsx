import React from 'react';
import { motion } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const PluginMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  return (
    <div className="relative">
      {/* Figma Plugin Panel */}
      <div className="w-64 sm:w-80 h-80 sm:h-96 bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-10 sm:h-12 bg-gray-100 border-b flex items-center px-3 sm:px-4">
          <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">{project.title}</div>
          <div className="ml-auto flex gap-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Font preview */}
          <div className="space-y-2">
            <div className="text-xs text-gray-600 font-medium">Current Font</div>
            <div className="p-2 bg-gray-50 border rounded text-sm">Helvetica</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-gray-600 font-medium">Replace With</div>
            <div className="p-2 bg-blue-50 border-2 border-blue-300 rounded text-sm">Inter</div>
          </div>
          
          {/* Sample preview */}
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 sm:h-16 bg-blue-100 rounded border-2 border-blue-300 flex items-center justify-center text-xs text-blue-700">
              Before
            </div>
            <div className="h-12 sm:h-16 bg-green-100 rounded border-2 border-green-300 flex items-center justify-center text-xs text-green-700">
              After
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-8 sm:h-10 bg-blue-500 text-white rounded font-medium text-sm"
          >
            Replace Fonts
          </motion.button>
        </div>
      </div>
      
      {/* Plugin icon */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg text-sm sm:text-base"
      >
        🔧
      </motion.div>
    </div>
  );
};