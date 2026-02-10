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
    year: "Nov 2025 - Present",
    company: "OmMuse",
    position: "Software Engineer Intern",
    duration: "Nov 2025 - Present",
    location: "Remote",
    description: "Implemented HubSpot CRM integration and enterprise-level project sharing features.",
    skills: ["Go", "HubSpot API", "CRM Integration", "Rate Limiting", "Graceful Shutdown", "Role-Based Access Control"],
    achievements: [
      "Implemented HubSpot CRM integration to sync user metrics with synchronous API calls in Go, replacing background goroutines for reliability.",
      "Developed enterprise-level project sharing and collaborator management features with role-based access control.",
      "Enhanced project search functionality and fixed goroutine concurrency bugs with graceful shutdown handling."
    ],
    logo: "🎵"
  },
  {
    id: 2,
    year: "Jun 2025 – Sept 2025",
    company: "MoreThinks Solutions Ltd.",
    position: "Full-Stack Developer Intern",
    duration: "Jun 2025 – Sept 2025",
    location: "Burnaby, BC",
    description: "Built and maintained frontend and backend services for the Fanciti platform.",
    skills: ["Qwik.js", "React", "Node.js", "SurrealDB", "AWS (ECS, EKS)", "CI/CD"],
    achievements: [
      "Contributed to the Fanciti platform building frontend (Qwik.js, React) and backend services within a unified monorepo.",
      "Developed RESTful APIs using Node.js and SurrealDB, integrating AWS ECS, EKS, and API Gateway.",
      "Improved UI/UX performance and accessibility; automated build/deploy workflows with CI/CD."
    ],
    logo: "💡"
  },
  {
    id: 3,
    year: "Dec 2024 - Jun 2025",
    company: "Bwisher Ltd",
    position: "Software Engineer Intern",
    duration: "Dec 2024 - Jun 2025",
    location: "Remote",
    description: "Assisted in building backend services using Node.js and Python (FastAPI) for e-commerce.",
    skills: ["Node.js", "Python (FastAPI)", "PostgreSQL", "Redis", "BullMQ", "CI/CD"],
    achievements: [
      "Built backend services using Node.js and Python (FastAPI) for customer, order, and inventory systems.",
      "Managed data storage and caching with PostgreSQL and Redis for an e-commerce platform handling 20K+ API calls/day.",
      "Integrated BullMQ for async order processing and developed internal FastAPI utilities for data aggregation."
    ],
    logo: "✈️"
  },
  {
    id: 3,
    year: "2023-2025",
    company: "Freelancer.com",
    position: "Full-Stack Software Dev",
    duration: "Dec 2023 - Present",
    location: "Remote",
    description: "Developed ,Designed & Deployed full stack apps .",
    skills: ["NestJS", "Docker", "Kubernetes", "Redis", "RabbitMQ", "BullMQ", "Next.js", "React", "GitHub Actions", "Prometheus", "Grafana"],
    achievements: [
      "Ranked among top 2% freelancers globally on Freelancer.com",
      "Delivered 50+ full-stack apps for clients across diverse industries",
      "Maintained 5-star rating with 99% client satisfaction"

    ],
    logo: "🚀"
  },
  {
    id: 4,
    year: "2024",
    company: "Jythu Ltd",
    position: "Full-Stack Developer (Part-time Contract)",
    duration: "Jun 2024 - Dec 2024",
    location: "Remote",
    description: "Deployed scalable production systems with focus on security, performance optimization, and high-availability architecture.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Redis", "OAuth 2.0", "JWT", "RBAC"],
    achievements: [
      "Deployed two high-traffic production systems serving 10K+ active users",
      "Improved backend throughput with indexing, Redis caching, and efficient API design",
      "Implemented OAuth 2.0 + JWT with RBAC for security and compliance; ~99% uptime"
    ],
    logo: "💼"
  },
  {
    id: 5,
    year: "2024",
    company: "Tastemate",
    position: "React Native Full-Stack Developer",
    duration: "Apr 2024 - Jun 2024",
    location: "Remote (US, Seattle)",
    description: "Developed and optimized mobile food app with real-time features, ML integration, and advanced state management for enhanced user experience.",
    skills: ["React Native", "Expo", "TanStack Query", "Firebase", "Flask (ML)", "TypeScript", "Real-time Chat"],
    achievements: [
      "Optimized caching/state with TanStack Query to reduce redundant calls and improve sync",
      "Integrated Firebase with ML recommendation service; perceived latency ↓ ~40%",
      "Developed mobile food app with real-time chat integration"
    ],
    logo: "📱"
  }
];
