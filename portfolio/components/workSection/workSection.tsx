import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

// Work Section Implementation
// Work Section Implementation
export function WorkSection() {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        title={
          <span className="text-white">
            Recent Work & Projects
            <br />
            <span className="text-4xl md:text-6xl font-bold mt-1 leading-relaxed bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Building Digital Experiences
            </span>
          </span>
        }
        badge={
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
            🚀 Featured Work
          </div>
        }
        src="/video/transcode.mp4"
        isVideo={true}
        showGradient={false}
      />
    </div>
  );
}

