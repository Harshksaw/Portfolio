import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectNavigationProps {
  totalProjects: number;
  activeIndex: number;
  onProjectChange: (index: number) => void;
  activeColor: string;
  projects: Project[];
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  totalProjects,
  activeIndex,
  onProjectChange,
  activeColor,
  projects
}) => {
  return (
    <div className="flex justify-center mt-12 sm:mt-16">
      <div className="flex flex-wrap gap-2 sm:gap-3 max-w-4xl justify-center">
        {projects.map((project, idx) => (
          <motion.button
            key={`${project.id}-${idx}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onProjectChange(idx)}
            className={`px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium border ${
              idx === activeIndex 
                ? `bg-gradient-to-r ${activeColor} text-white border-transparent shadow-lg` 
                : 'text-gray-400 hover:text-white border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
            }`}
          >
            {project.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
};