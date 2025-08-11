"use client";

import React, { useState, useEffect } from 'react';

export const MobileDebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    userAgent: '',
    viewport: '',
    connection: '',
    performance: '',
    scrollY: 0
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        userAgent: navigator.userAgent.slice(0, 50) + '...',
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        connection: (navigator as any).connection?.effectiveType || 'unknown',
        performance: `${Math.round(performance.now())}ms`,
        scrollY: window.scrollY
      });
    };

    updateDebugInfo();
    window.addEventListener('scroll', updateDebugInfo);
    window.addEventListener('resize', updateDebugInfo);
    
    return () => {
      window.removeEventListener('scroll', updateDebugInfo);
      window.removeEventListener('resize', updateDebugInfo);
    };
  }, []);

  // Show only in development or with special URL param
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsVisible(urlParams.has('debug') || process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-red-500/90 text-white p-3 rounded text-xs z-[9999] max-w-xs">
      <div className="font-bold mb-2">Mobile Debug</div>
      <div>UA: {debugInfo.userAgent}</div>
      <div>VP: {debugInfo.viewport}</div>
      <div>Net: {debugInfo.connection}</div>
      <div>Perf: {debugInfo.performance}</div>
      <div>Scroll: {debugInfo.scrollY}px</div>
      <button 
        onClick={() => setIsVisible(false)}
        className="mt-2 bg-red-600 px-2 py-1 rounded text-xs"
      >
        Hide
      </button>
    </div>
  );
};
