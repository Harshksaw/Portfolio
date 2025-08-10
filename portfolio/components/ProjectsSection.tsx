"use client";

import React from "react";

export function ProjectsSection() {
  const projects = [
    {
      title: "YieldStone Page",
      description: "Webflow Site - AI-powered investment platform",
      image: "/img/projects/1.avif",
      link: "https://www.yieldstone.ai/",
      tags: ["Webflow", "Design", "AI"]
    },
    {
      title: "Simple Font Replacer",
      description: "Figma Plugin - Streamline font management",
      image: "/img/projects/2.avif", 
      link: "https://www.figma.com/community/plugin/1380643582596908985/simple-font-replacer",
      tags: ["Figma", "Plugin", "JavaScript"]
    },
    {
      title: "Andy PFP Generator",
      description: "Next.js Site - NFT profile picture generator",
      image: "/img/projects/3.avif",
      link: "https://generator.andytoken.com/",
      tags: ["Next.js", "React", "Web3"]
    }
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mt-2">
              Projects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Some of my recent work and creative projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
                      parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-4xl">🚀</div>';
                    }
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}