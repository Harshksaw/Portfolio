"use client";

import React from "react";
import Image from "next/image";

interface AvatarImageProps {
  className?: string;
  showTitle?: boolean;
  scale?: number;
  position?: [number, number, number];
  cameraPosition?: [number, number, number];
  fov?: number;
  environmentPreset?: string;
}

export default function AvatarImage({
  className = "",
  showTitle = false,
}: AvatarImageProps) {
  return (
    <div className={`w-full absolute left-0 top-0 z-10 flex h-full items-center justify-center ${className}`}>
      <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        <Image
          src="/img/me.png"
          alt="Avatar"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
        {showTitle && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <h3 className="text-lg font-semibold">Developer Avatar</h3>
          </div>
        )}
      </div>
    </div>
  );
}
