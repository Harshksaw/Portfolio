import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectStatsProps {
  project: Project;
}

const StatItem: React.FC<{
  icon: string;
  value: string;
  label: string;
  delay: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
}> = ({ icon, value, label, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: -100 }}
    animate={{ 
      opacity: 1, 
      scale: 1, 
      x: 0,
      y: [0, -10, 0],
    }}
    transition={{
      duration: 0.8,
      delay,
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    className="absolute bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 flex items-center gap-2 text-white shadow-lg hover:scale-105 transition-transform"
    style={position}
  >
    <span className="text-lg">{icon}</span>
    <div className="text-center">
      <div className="text-lg font-bold text-blue-300">{value}</div>
      <div className="text-xs text-gray-300">{label}</div>
    </div>
  </motion.div>
);

export const ProjectStats: React.FC<ProjectStatsProps> = ({ project }) => {
  if (project.id === 1) {
    // Room & Library Booking stats
    return (
      <div className="w-full h-full relative">
        <StatItem
          icon="💺"
          value="Custom UI"
          label="Seat Selection"
          delay={0.5}
          position={{ top: '15%', right: '5%' }}
        />
        <StatItem
          icon="📅"
          value="Real-time"
          label="Booking System"
          delay={1}
          position={{ top: '55%', left: '2%' }}
        />
        <StatItem
          icon="📊"
          value="Analytics"
          label="Dashboard"
          delay={1.5}
          position={{ bottom: '20%', right: '15%' }}
        />
        <StatItem
          icon="🏢"
          value="Multi-location"
          label="Support"
          delay={2}
          position={{ top: '35%', left: '8%' }}
        />
      </div>
    );
  } else if (project.id === 2) {
    // Krishna Academy stats  
    return (
      <div className="w-full h-full relative">
        <StatItem
          icon="📱"
          value="10K+"
          label="Downloads"
          delay={0.5}
          position={{ top: '10%', right: '8%' }}
        />
        <StatItem
          icon="🎥"
          value="5K"
          label="Live Students"
          delay={1}
          position={{ top: '45%', left: '3%' }}
        />
        <StatItem
          icon="💰"
          value="$10K"
          label="Monthly Revenue"
          delay={1.5}
          position={{ bottom: '15%', right: '5%' }}
        />
        <StatItem
          icon="🏆"
          value="Interactive"
          label="Quizzes"
          delay={2}
          position={{ top: '65%', left: '12%' }}
        />
        <StatItem
          icon="📚"
          value="Progress"
          label="Tracking"
          delay={2.5}
          position={{ top: '25%', right: '2%' }}
        />
      </div>
    );
  }
  
  return null;
};