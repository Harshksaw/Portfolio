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
    company: "Airing Ltd",
    position: "Full-Stack Software Engineer",
    duration: "Dec 2024 - Jun 2025",
    location: "Remote",
    description: "Leading microservices architecture for Bwisher E-commerce platform with comprehensive DevOps implementation and performance optimization.",
    skills: ["NestJS", "Docker", "Kubernetes", "Redis", "RabbitMQ", "BullMQ", "Next.js", "React", "GitHub Actions", "Prometheus", "Grafana"],
    achievements: [
      "Designed microservices on hardened Linux VPS; ~20K+ API calls/day; availability ~98%",
      "Blue-green CI/CD with GitHub Actions + IaC; ~45% faster MTTR",
      "Queues for orders/inventory/shipping; order-to-dispatch latency ↓ ~70%",
      "Redis caching + SQL indexing; median endpoint latency ~500ms → ~200ms (~60% faster)",
      "SEO-first Next.js storefront and live KPI dashboard; order processing time ↓ ~40%, organic traffic ↑ ~50%",
      "WhatsApp marketing engine with cohort targeting; repeat purchase rate ↑ ~35%, +15% monthly revenue",
      "Mentored 2 engineers; coding standards and RBAC cut post-merge defects ~30%"
    ],
    logo: "🚀"
  },
  {
    id: 2,
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
    id: 3,
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