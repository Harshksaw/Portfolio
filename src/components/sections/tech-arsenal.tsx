'use client';

import React from 'react';
import { skillCategories } from '../../data/skills';
import { cn } from '../../lib/utils';
import { Marquee } from '../shared/margue';

const TechArsenal: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 md:py-24">
      <div className="text-center mb-16 space-y-4 relative z-10 px-4">
        {/* Main Title is handled by parent section, but adding subheading here as requested */}
        <p className="text-primary-main/80 text-lg md:text-xl font-medium tracking-wide">
          My technical skills and tools
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full relative z-10 max-w-7xl px-2 md:px-0">
        {skillCategories.map((category, idx) => (
          <div key={category.title} className="flex flex-col md:flex-row items-center w-full relative group/row">
            {/* Fixed Left Sidebar - Category Title */}
            <div
              className="w-full md:w-64 flex-shrink-0 flex items-center justify-start md:justify-end md:pr-8 mb-4 md:mb-0 relative"
            >
              <h3
                className="text-xl md:text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 transition-all duration-500 group-hover/row:scale-105"
                style={{
                  // Use the category color for a subtle glow or accent on hover, or just text color
                  textShadow: `0 0 20px ${category.color || '#fff'}40`
                }}
              >
                <span className={cn(
                  "hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full transition-all duration-300 opacity-50 group-hover/row:opacity-100 group-hover/row:h-12",
                )}
                  style={{ backgroundColor: category.color || '#fff' }}
                />
                {category.title}
              </h3>
            </div>

            {/* Scrollable Right Side - Marquee */}
            <div className="flex-1 w-full overflow-hidden relative">
              {/* Gradient mask on edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-primary-darkest to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary-darkest to-transparent z-10" />

              <Marquee
                reverse={idx % 2 === 1} // Alternate direction
                pauseOnHover
                className="[--duration:50s] [--gap:3rem]"
              >
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex items-center justify-center p-2 transition-all duration-300 hover:scale-110"
                  >
                    {/* Icon */}
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={cn(
                          "w-10 h-10 md:w-14 md:h-14 object-contain transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]",
                          skill.invert && "filter brightness-0 invert"
                        )}
                      />
                    ) : (
                      <div
                        className="w-3 h-3 rounded-full opacity-50 group-hover:opacity-100 transition-all"
                        style={{ backgroundColor: category.color || '#fff' }}
                      />
                    )}

                    {/* Tooltip Name appearing on hover */}
                    <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-white/90 whitespace-nowrap bg-black/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-none z-50">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-primary-darkest to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-primary-darkest to-transparent z-20" />
    </div>
  );
};

export default TechArsenal;
