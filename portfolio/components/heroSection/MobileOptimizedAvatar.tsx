"use client";

import React from 'react';
import Image from 'next/image';

interface MobileOptimizedAvatarProps {
  className?: string;
}

export const MobileOptimizedAvatar: React.FC<MobileOptimizedAvatarProps> = ({ 
  className = "w-full h-full" 
}) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <Image
          src="/img/me.png"
          alt="Avatar"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
};
