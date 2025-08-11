"use client";

import React, { useState, useEffect } from 'react';

interface MobileOptimizedAvatarProps {
  className?: string;
}

const MatrixLoader = () => {
  const matrixChars = '01';
  const columns = 8;
  const rows = 6;
  
  return (
    <div className="font-mono text-green-400 text-xs leading-tight matrix-loader">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {[...Array(columns)].map((_, colIndex) => (
            <span 
              key={colIndex}
              className="inline-block w-4"
              style={{
                animationDelay: `${(rowIndex + colIndex) * 0.1}s`
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const MobileOptimizedAvatar: React.FC<MobileOptimizedAvatarProps> = ({ 
  className = "w-full h-full" 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Use static version on mobile
  if (isMobile) {
    if (isLoading) {
      return (
        <div className={`${className} flex items-center justify-center`}>
          <MatrixLoader />
        </div>
      );
    }

    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="w-64 h-64 rounded-full bg-gray-800 flex items-center justify-center text-6xl">
          👨‍💻
        </div>
      </div>
    );
  }

  // Load 3D component only on desktop
  return (
    <div className={className}>
      <React.Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <MatrixLoader />
        </div>
      }>
        <Desktop3DAvatar />
      </React.Suspense>
    </div>
  );
};

// Lazy loaded 3D component
const Desktop3DAvatar = React.lazy(() => 
  import('../Avatar3d').then(module => ({ default: module.default }))
);
