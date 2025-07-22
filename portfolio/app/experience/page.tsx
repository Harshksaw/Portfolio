import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useState } from "react";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Aceternity Timeline Component
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-6xl mb-4 text-white max-w-4xl font-bold">
          Professional
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
            Experience
          </span>
        </h2>
        <p className="text-neutral-300 text-lg md:text-xl max-w-3xl mb-10">
          Building innovative solutions and gaining valuable experience across different technologies and domains
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// Experience Timeline Section using Aceternity Timeline
export function ExperienceTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experienceData = [
    {
      id: 1,
      year: "2024-2025",
      company: "Jythu",
      position: "Full-stack Developer",
      duration: "May 2024 - Jan 2025",
      location: "Remote",
      description: "Developing full-stack applications with Node.js, React Native, and AWS. Optimizing API performance and UI interactions.",
      skills: ["Node.js", "React Native", "AWS", "API Optimization"],
      achievements: ["Built scalable full-stack applications", "Optimized API performance by 40%"],
      logo: "🚀"
    },
    {
      id: 2,
      year: "2023-Present",
      company: "Freelancer.com",
      position: "Freelance Software Developer",
      duration: "Dec 2023 - Present",
      location: "Remote",
      description: "Recognized in the top 2% of developers on Freelancer.com. Delivered 30+ projects in full-stack development & DevOps.",
      skills: ["Full-stack Development", "DevOps", "Cloud Architecture", "CI/CD"],
      achievements: ["Top 2% developer ranking", "30+ successful projects delivered", "5-star rating maintained"],
      logo: "💼"
    },
    {
      id: 3,
      year: "2024",
      company: "Tastemate",
      position: "React Native Developer",
      duration: "Apr 2024 - Aug 2024",
      location: "Remote (US)",
      description: "Developed and optimized mobile applications using React Native, TypeScript, and Firebase.",
      skills: ["React Native", "TypeScript", "Firebase", "Mobile Development"],
      achievements: ["Improved app performance by 35%", "Implemented real-time features"],
      logo: "📱"
    }
  ];

  // Convert experience data to timeline format
  const timelineData: TimelineEntry[] = experienceData.map((item) => ({
    title: item.year,
    content: (
      <div className="mb-8">
        {/* Company Header */}
        <div className="flex items-start gap-4 mb-6 p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
          <div className="text-3xl">{item.logo}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {item.position}
            </h3>
            <p className="text-blue-400 font-semibold text-lg mb-1">{item.company}</p>
            <p className="text-gray-400 text-sm mb-4">{item.duration} • {item.location}</p>
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 text-base">
              {item.description}
            </p>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Achievements:</h4>
              <ul className="space-y-2">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                    <span className="text-green-400 text-sm mt-0.5 flex-shrink-0">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300 hover:bg-blue-500/30 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  // GSAP slide-in animation when component comes into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a slide-in animation from the About section
      gsap.fromTo(
        sectionRef.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate individual timeline items
      gsap.fromTo(
        ".timeline-content",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative"
    >
      <div className="timeline-content">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}

// Simple transition component for About to Experience
export function AboutToExperienceTransition() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a smooth transition trigger
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top center",
        onEnter: () => {
          // Optional: Add any transition effects here
          console.log("Transitioning to Experience Timeline");
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={triggerRef}
      className="h-20 bg-gradient-to-b from-gray-100 to-gray-900"
    />
  );
}

// Projects Section (simplified)
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

// Contact Section
export function ContactSection() {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Build
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              Something Amazing
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a
            href="mailto:hello@harshkumar.dev"
            className="group p-8 bg-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="text-5xl mb-6">📧</div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              Send an Email
            </h3>
            <p className="text-green-400 font-medium">hello@harshkumar.dev</p>
          </a>

          <a
            href="https://t.me/Harshkumar_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="text-5xl mb-6">💬</div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              Chat on Telegram
            </h3>
            <p className="text-blue-400 font-medium">@Harshkumar_dev</p>
          </a>
        </div>

        <div className="text-center pt-12 border-t border-gray-700/50">
          <p className="text-gray-400">
            © 2024 Harsh Kumar. Built with Next.js & ❤️
          </p>
        </div>
      </div>
    </section>
  );
}