import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { getTechIcon } from '../utils/techIcons';

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
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition-colors group"
              title={tech}
            >
              <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                {getTechIcon(tech)}
              </div>
              <span className="hidden sm:inline">{tech}</span>
            </motion.div>
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
        {project.github && (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:border-gray-500 transition-colors text-center flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </motion.a>
        )}
  
      </div>
    </motion.div>
  );
};