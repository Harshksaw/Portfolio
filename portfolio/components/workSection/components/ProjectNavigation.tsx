import React from 'react';
import { motion } from 'framer-motion';

interface ProjectNavigationProps {
  totalProjects: number;
  activeIndex: number;
  onProjectChange: (index: number) => void;
  activeColor: string;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  totalProjects,
  activeIndex,
  onProjectChange,
  activeColor
}) => {
  return (
    <div className="flex justify-center mt-12 sm:mt-16 gap-2 sm:gap-3">
      {Array.from({ length: totalProjects }, (_, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onProjectChange(idx)}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            idx === activeIndex 
              ? `bg-gradient-to-r ${activeColor}` 
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
        />
      ))}
    </div>
  );
};