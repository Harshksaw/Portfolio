"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixLoader = ({ 
  onComplete, 
  compact = false,
  instanceId = 'default'
}: { 
  onComplete?: () => void; 
  compact?: boolean;
  instanceId?: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isMounted = useRef(true);
  const animationFrameId = useRef<number>();
  
  // Optimized character set for better performance
  const chars = useMemo(() => '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split(''), []);
  const columns = useMemo(() => {
    if (typeof window === 'undefined') return 15;
    return window.innerWidth < 768 ? 8 : compact ? 15 : 25;
  }, [compact]);
  
  // Optimized loading steps for faster 3D model loading
  const loadingSteps = useMemo(() => [
    { text: "Initializing WebGL context...", delay: 0.2 },
    { text: "Loading model geometry...", delay: 0.4 },
    { text: "Parsing mesh data...", delay: 0.6 },
    { text: "Loading compressed textures...", delay: 0.8 },
    { text: "Compiling optimized shaders...", delay: 1.0 },
    { text: "Setting up PBR materials...", delay: 1.2 },
    { text: "Initializing skeletal rig...", delay: 1.4 },
    { text: "Loading animation clips...", delay: 1.6 },
    { text: "Optimizing render batches...", delay: 1.8 },
    { text: "3D Model Ready!", delay: 2.0, isComplete: true }
  ], []);
  
  // Prevent multiple instances
  useEffect(() => {
    const existingLoaders = document.querySelectorAll(`[data-loader-id="${instanceId}"]`);
    if (existingLoaders.length > 1) {
      setIsVisible(false);
      return;
    }
    
    return () => {
      isMounted.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [instanceId]);

  useEffect(() => {
    // Detect mobile and prevent body scroll
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Prevent scrolling when loader is active
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPosition = originalStyle.position;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = '0';
    document.body.style.left = '0';
    
    // Update loading steps with cleanup check
    loadingSteps.forEach((step, index) => {
      const timeoutId = setTimeout(() => {
        if (isMounted.current) {
          setLoadingStep(index);
        }
      }, step.delay * 1000);
      
      return () => clearTimeout(timeoutId);
    });

    // Complete after 2 seconds (reduced from 4)
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsVisible(false);
        setTimeout(() => {
          // Restore original body styles
          document.body.style.overflow = originalOverflow;
          document.body.style.position = originalPosition;
          document.body.style.width = '';
          document.body.style.height = '';
          document.body.style.top = '';
          document.body.style.left = '';
          
          onComplete?.();
        }, 300);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      
      // Cleanup styles on unmount
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
    };
  }, [onComplete, loadingSteps]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-loader-id={instanceId}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={compact ? "absolute inset-0 bg-black z-50 flex items-center justify-center" : "fixed inset-0 bg-black z-[9999] flex items-center justify-center"}
        >
          {/* Optimized Matrix Rain Background - Reduced for mobile */}
          {!isMobile && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: columns }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 flex flex-col text-green-400 text-sm font-mono opacity-40 select-none"
                  style={{ 
                    left: `${(i / columns) * 100}%`,
                    fontSize: isMobile ? '8px' : '11px',
                    lineHeight: isMobile ? '10px' : '13px'
                  }}
                  animate={{
                    y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear",
                  }}
                >
                  {Array.from({ length: isMobile ? 8 : 12 }).map((_, j) => (
                    <motion.span
                      key={j}
                      animate={{
                        opacity: [0.1, 0.6, 0.1],
                      }}
                      transition={{
                        duration: 0.6,
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
          )}

          {/* Simplified Grid for Mobile */}
          <div className={`absolute inset-0 ${isMobile ? 'opacity-10' : 'opacity-20'}`}>
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: isMobile ? '30px 30px' : '50px 50px'
              }}
            />
          </div>

          {/* Main Loading Content - Mobile Optimized */}
          <div className="relative z-10 text-center px-4">
            {/* Enhanced Terminal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 120 }}
              className={`bg-black/95 border-2 border-green-400 rounded-lg ${
                isMobile ? 'p-4 mx-2' : 'p-8'
              } backdrop-blur-sm shadow-2xl shadow-green-400/20`}
              style={{ 
                boxShadow: '0 0 50px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)',
                maxWidth: isMobile ? '100vw' : 'auto',
                width: isMobile ? 'calc(100vw - 2rem)' : 'auto'
              }}
            >
              {/* Terminal Header */}
              <div className={`flex items-center justify-between ${isMobile ? 'mb-4 pb-2' : 'mb-6 pb-3'} border-b border-green-400/30`}>
                <div className="flex space-x-2">
                  <motion.div 
                    className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-red-500`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div 
                    className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-yellow-500`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-green-500`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className={`text-green-400 ${isMobile ? 'text-xs' : 'text-sm'} font-mono tracking-wider`}>
                  {isMobile ? '3D_LOADER' : '3D_AVATAR_LOADER.EXE'}
                </span>
              </div>

              {/* Loading Steps */}
              <div className={`font-mono text-green-400 text-left space-y-2 ${
                isMobile ? 'text-xs' : 'text-sm min-w-[350px]'
              }`}>
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: index <= loadingStep ? 1 : 0.3,
                      x: index <= loadingStep ? 0 : -10,
                      color: step.isComplete ? '#10b981' : index <= loadingStep ? '#4ade80' : '#6b7280'
                    }}
                    transition={{ duration: 0.15, delay: step.delay * 0.8 }}
                    className={`flex items-center ${step.isComplete ? 'font-bold text-green-400' : ''}`}
                  >
                    <span className="text-green-300 mr-2">&gt;</span>
                    <span className="flex-1 truncate">{step.text}</span>
                    {index === loadingStep && !step.isComplete && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="ml-2"
                      >
                        _
                      </motion.span>
                    )}
                    {step.isComplete && index <= loadingStep && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 text-green-400"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>
                ))}

                {/* Mobile-Optimized Progress Bar */}
                <div className={`${isMobile ? 'mt-4 pt-3' : 'mt-6 pt-4'} border-t border-green-400/30`}>
                  <div className="flex justify-between text-xs mb-2">
                    <span>{isMobile ? 'Progress' : 'Loading Progress'}</span>
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      {Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%
                    </motion.span>
                  </div>
                  
                  <div className={`w-full bg-gray-800 rounded-full ${isMobile ? 'h-2' : 'h-3'} overflow-hidden border border-green-400/30`}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {/* Optimized shine effect for mobile */}
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.p
                    className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-400 mt-3 text-center`}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {isMobile ? '3D Model Loading...' : 'Rendering 3D Avatar Model...'}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Simplified 3D Cube for Mobile */}
            {!isMobile && (
              <motion.div
                className="absolute -top-16 -right-16 w-12 h-12"
                animate={{ 
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <div className="w-full h-full border-2 border-green-400 bg-green-400/10" 
                     style={{ transform: 'perspective(100px) rotateX(45deg) rotateY(45deg)' }} />
              </motion.div>
            )}

            {/* Mobile floating indicator */}
            {isMobile && (
              <motion.div
                className="absolute -top-8 right-4 w-6 h-6 border border-green-400 rounded"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <div className="w-full h-full bg-green-400/20" />
              </motion.div>
            )}
          </div>

          {/* Simplified scanning lines for mobile */}
          {!isMobile && [...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(34, 197, 94, ${0.1 + i * 0.05}), transparent)`,
                height: '2px',
              }}
              animate={{
                y: [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Reduced particle effect for performance */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(isMobile ? 3 : 6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixLoader;