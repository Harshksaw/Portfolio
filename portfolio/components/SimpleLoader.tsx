"use client";

import React from "react";

interface SimpleLoaderProps {
  onComplete?: () => void;
  text?: string;
  instanceId?: string;
}

export default function SimpleLoader({ 
  onComplete,
  text = "Loading...",
  instanceId
}: SimpleLoaderProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-green-400 font-mono text-sm">{text}</p>
      </div>
    </div>
  );
}
