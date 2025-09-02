export interface Experience {
  id: number;
  year: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
  achievements: string[];
  logo: string;
}

export const experiences: Experience[] = [
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