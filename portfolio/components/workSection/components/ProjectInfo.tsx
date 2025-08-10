import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectInfoProps {
  project: Project;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <motion.div 
      key={project.id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white text-sm font-medium rounded-full`}>
            {project.category}
          </span>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="text-gray-400 capitalize text-sm sm:text-base">{project.type}</span>
        </div>
        
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Built with:</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, idx) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 sm:px-8 py-3 bg-gradient-to-r ${project.color} text-white font-medium rounded-lg hover:scale-105 transition-transform duration-200 text-center`}
        >
          View Project
        </motion.a>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 sm:px-8 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:border-gray-500 transition-colors"
        >
          Case Study
        </motion.button>
      </div>
    </motion.div>
  );
};