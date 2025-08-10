import React from 'react';
import { motion } from 'framer-motion';
import { DeviceMockupProps } from '../types';

export const InnovativeMockup: React.FC<DeviceMockupProps> = ({ project }) => {
  return (
    <div className="relative">
      {/* 3D Canvas Container */}
      <div className="w-80 sm:w-96 h-80 sm:h-96 bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Simulated 3D content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-lg"
            style={{
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        
        {/* Particle effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-cyan-400"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-cyan-400"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>
        
        {/* WebGL indicator */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-xs text-cyan-400 font-mono">
          WebGL Active
        </div>
        
        {/* Performance stats */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-xs text-cyan-400 font-mono">
          <div>FPS: 60</div>
          <div>Vertices: 1.2K</div>
        </div>
      </div>
      
      {/* VR/AR icon */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg text-lg sm:text-xl"
      >
        🥽
      </motion.div>
    </div>
  );
};