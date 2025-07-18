import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "animate-pulse animate-duration-3000 absolute inset-0 h-full w-full",
        className
      )}
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip)">
        <g filter="url(#filter)">
          <circle cx="200" cy="200" r="200" fill={fill} fillOpacity="0.4" />
        </g>
      </g>
      <defs>
        <filter
          id="filter"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur" />
        </filter>
        <clipPath id="clip">
          <rect width="400" height="400" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};