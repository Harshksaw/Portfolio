import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  count?: number;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ count = 10 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 150}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};