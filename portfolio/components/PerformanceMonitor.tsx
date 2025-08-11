"use client";

import React, { useEffect, useState } from 'react';

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<{
    fps: number;
    memory: number;
    loadTime: number;
  }>({
    fps: 0,
    memory: 0,
    loadTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: (performance as any).memory?.usedJSHeapSize || 0,
          loadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    measureFPS();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-[9999] font-mono">
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {Math.round(metrics.memory / 1024 / 1024)}MB</div>
      <div>Load: {metrics.loadTime}ms</div>
    </div>
  );
};
