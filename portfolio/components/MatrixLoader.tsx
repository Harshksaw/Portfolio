"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixLoader = ({ onComplete, compact = false }: { onComplete?: () => void; compact?: boolean }) => {
  const [isVisible, setIsVisible] = useState(true);
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');
  const columns = compact ? 15 : 25;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={compact ? "absolute inset-0 bg-black z-50 flex items-center justify-center" : "fixed inset-0 bg-black z-[9999] flex items-center justify-center"}
        >
          {/* Matrix Rain Background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 flex flex-col text-green-400 text-sm font-mono opacity-70 select-none"
                style={{ 
                  left: `${(i / columns) * 100}%`,
                  fontSize: '12px',
                  lineHeight: '14px'
                }}
                animate={{
                  y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  <motion.span
                    key={j}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: j * 0.05,
                    }}
                  >
                    {chars[Math.floor(Math.random() * chars.length)]}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Main Loading Content */}
          <div className="relative z-10 text-center">
            {/* Central Terminal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/80 border-2 border-green-400 rounded-lg p-8 backdrop-blur-sm"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-400/30">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-400 text-xs font-mono">PORTFOLIO.EXE</span>
              </div>

              {/* Loading Text */}
              <div className="font-mono text-green-400 text-left space-y-2 min-w-[300px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-green-300">&gt;</span> Loading 3D Avatar...
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-green-300">&gt;</span> Parsing geometry data...
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <span className="text-green-300">&gt;</span> Loading textures & materials...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <span className="text-green-300">&gt;</span> Initializing animation system...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <span className="text-green-300">&gt;</span> Setting up lighting & environment...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 }}
                  className="text-green-400 font-bold"
                >
                  <span className="text-green-300">&gt;</span> 3D Avatar Ready!
                </motion.div>

                {/* Progress Bar */}
                <div className="mt-4 pt-2 border-t border-green-400/30">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-green-300"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                  <motion.p
                    className="text-xs text-green-400 mt-2 text-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Rendering 3D model...
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Glitch effect overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <div className="w-full h-full bg-green-400 mix-blend-multiply"></div>
            </motion.div>
          </div>

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
              height: '2px',
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixLoader;