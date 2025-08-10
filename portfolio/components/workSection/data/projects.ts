import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "YieldStone AI Platform",
    type: "web",
    category: "Webflow Site",
    description: "AI-powered investment platform with dynamic charts and real-time data visualization for smart investment decisions.",
    tech: ["Webflow", "JavaScript", "GSAP", "Chart.js"],
    link: "https://www.yieldstone.ai/",
    image: "/img/projects/1.avif",
    video: "/video/yieldstone-demo.mp4",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Mobile Trading App",
    type: "mobile",
    category: "React Native App", 
    description: "Cross-platform trading application with real-time notifications, secure transactions, and intuitive user interface.",
    tech: ["React Native", "TypeScript", "Firebase", "WebSocket"],
    link: "#",
    image: "/img/projects/mobile-app.jpg",
    video: "/video/mobile-demo.mp4",
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Font Replacer Plugin",
    type: "tool",
    category: "Figma Plugin",
    description: "Streamline font management across design systems with batch replacement and smart matching capabilities.",
    tech: ["JavaScript", "Figma API", "HTML5", "CSS3"],
    link: "https://www.figma.com/community/plugin/1380643582596908985/simple-font-replacer",
    image: "/img/projects/2.avif",
    video: "/video/plugin-demo.mp4",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 4,
    title: "3D Portfolio Experience",
    type: "innovative",
    category: "Three.js Experience",
    description: "Interactive 3D portfolio with physics simulations, smooth animations, and immersive user experience.",
    tech: ["Three.js", "React", "WebGL", "GSAP"],
    link: "#",
    image: "/img/projects/3d-portfolio.jpg",
    video: "/video/3d-demo.mp4",
    color: "from-purple-500 to-pink-600"
  }
];

export const getProjectsByType = (type: string): Project[] => {
  if (type === "All") return projects;
  
  const typeMap = {
    "Web": "web",
    "Mobile": "mobile", 
    "Tools": "tool",
    "Innovative": "innovative"
  };
  
  return projects.filter(project => project.type === typeMap[type as keyof typeof typeMap]);
};