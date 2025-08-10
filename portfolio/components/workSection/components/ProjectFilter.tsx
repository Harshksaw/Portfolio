import React from 'react';
import { motion } from 'framer-motion';
import { ProjectType, FilterButtonProps } from '../types';

const FilterButton: React.FC<FilterButtonProps> = ({ type, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
      isActive 
        ? 'bg-white text-black font-medium' 
        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
    }`}
  >
    {type}
  </motion.button>
);

interface ProjectFilterProps {
  activeFilter: ProjectType;
  onFilterChange: (filter: ProjectType) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({ 
  activeFilter, 
  onFilterChange 
}) => {
  const filters: ProjectType[] = ["All", "Web", "Mobile", "Tools", "Innovative"];

  return (
    <div className="flex justify-center mb-8 sm:mb-12">
      <div className="flex bg-gray-800/50 rounded-full p-2 backdrop-blur-sm overflow-x-auto max-w-full">
        <div className="flex gap-1 sm:gap-2 min-w-max px-2">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              type={filter}
              isActive={activeFilter === filter}
              onClick={() => onFilterChange(filter)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};