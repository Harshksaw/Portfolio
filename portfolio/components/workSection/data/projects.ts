import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Room & Library Booking",
    type: "mobile",
    category: "Full-Stack Mobile App",
    description: "A full-stack library booking application that enables users to check real-time availability and book seats in multiple locations. It supports custom time slots, admin management, and detailed analytics.",
    tech: ["React", "Node.js", "AWS", "PostgreSQL", "Tailwind", "Grafana", "Docker", "TypeScript"],
    link: "https://www.studyekaant.com/",
    github: "https://github.com/Harshksaw/Ekaant-StudyRoom-APP",
    image: "/projects/File2.png",
    mobileScreenshots: ["/projects/File3.png", "/projects/p15.png", "/projects/p16.png", "/projects/p17.png", "/projects/File5.png", "/projects/File6.png", "/projects/File7.png"],
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png"],
    color: "from-blue-500 to-purple-600",
    featured: true
  },
  {
    id: 2,
    title: "Learning Management System",
    type: "mobile",
    category: "Educational Mobile Platform",
    description: "A full-fledged Learning Management System (LMS) designed for Krishna Academy. Includes interactive quizzes, video lectures, real-time student progress tracking, and a dedicated admin panel.",
    tech: ["React", "Node.js", "AWS", "PostgreSQL", "Tailwind", "Grafana", "Docker", "TypeScript"],
    link: "https://krishnaacademy.in/",
    github: "https://github.com/Harshksaw/LMS-App",
    image: "/projects/File1.png",
    mobileScreenshots: ["/projects/File12.png", "/projects/File10.png", "/projects/File11.png", "/projects/File9.png"],
    webScreenshots: ["/projects/l1.png", "/projects/l2.png", "/projects/l3.png", "/projects/l4.png"],
    color: "from-green-500 to-teal-600",
    featured: true
  },
  {
    id: 3,
    title: "Bwisher E-Commerce Platform",
    type: "web",
    category: "E-Commerce Platform",
    description: "Designed and deployed a production-grade NestJS microservices backend and SEO-optimized Next.js storefront for a high-traffic e-commerce brand. Engineered real-time order pipelines, automated CI/CD releases, and advanced caching—resulting in faster transactions, higher availability, and boosted revenue.",
    tech: ["NestJS", "Next.js", "Docker", "Kubernetes", "Redis", "RabbitMQ", "Prometheus", "Grafana", "TypeScript"],
    link: "https://www.bwisher.com/",
    github: "https://github.com/Harshksaw",
    image: "/projects/bwisher.png",
    mobileScreenshots: [],
    webScreenshots: ["/projects/bwisher.png", "/projects/bwisher2.png"],
    color: "from-red-500 to-yellow-600",
    featured: true
  }
];

export const getProjectsByType = (type: string): Project[] => {
  if (type === "All") return projects;
  
  const typeMap = {
    "Web": "web",
    "Mobile": "mobile", 

  };
  
  return projects.filter(project => project.type === typeMap[type as keyof typeof typeMap]);
};