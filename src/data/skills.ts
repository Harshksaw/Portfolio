import * as images from '../assets/index';

export interface Skill {
    name: string;
    icon?: string; // Optional icon path
    invert?: boolean; // Invert colors for dark mode (e.g. Next.js, Express)
}

export interface SkillCategory {
    title: string;
    skills: Skill[];
    color?: string; // Optional brand color for the category label
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Programming Languages",
        color: "#007ACC", // VS Code Blue / TypeScript Blue
        skills: [
            { name: "JavaScript (ES6+)", icon: images.js },
            { name: "TypeScript", icon: images.typescript },
            { name: "Python", icon: images.python },
            { name: "Go (Golang)", icon: images.go },
        ]
    },
    {
        title: "Frontend & Mobile",
        color: "#61DAFB", // React Cyan
        skills: [
            { name: "ReactJs", icon: images.react },
            { name: "NextJs", icon: images.next, invert: true },
            { name: "QwikJs", icon: images.qwik },
            { name: "React Native", icon: images.react }, // Reusing React icon
        ]
    },
    {
        title: "Backend",
        color: "#68A063", // Node.js Green
        skills: [
            { name: "NestJS", icon: images.nestjs },
            { name: "ExpressJs", icon: images.express, invert: true },
            { name: "FastAPI", icon: images.fastapi },
            { name: "Flask", icon: images.flask, invert: true },
            { name: "GraphQL", icon: images.graphql },
            { name: "Prisma", icon: images.prisma, invert: true },
            { name: "BullMQ" }, // No icon
            { name: "Kafka", icon: images.apachekafka }, // Kafka is usually white/black complex, checking.
        ]
    },
    {
        title: "Databases",
        color: "#336791", // PostgreSQL Blue
        skills: [
            { name: "PostgreSQL", icon: images.postgresql }, // SimpleIcons Postgres is dark blue/black. Inverting makes it white.
            { name: "MySQL", icon: images.mysql },
            { name: "MongoDB", icon: images.mongodb },
            { name: "Redis", icon: images.redis },
            { name: "SurrealDB", icon: images.surrealdb },
        ]
    },
    {
        title: "Cloud & DevOps",
        color: "#FF9900", // AWS Orange
        skills: [
            { name: "AWS", icon: images.aws }, // AWS is usually orange/white.
            { name: "Docker", icon: images.docker },
            { name: "Kubernetes", icon: images.kubernetes },
            { name: "GitHub Actions", icon: images.github, invert: true },
            { name: "Prometheus", icon: images.prometheus },
            { name: "Grafana", icon: images.grafana },
            { name: "Kafka", icon: images.apachekafka },
        ]
    },
    {
        title: "AI & GenAI Frameworks",
        color: "#A259FF", // Generic AI Purple
        skills: [
            { name: "LangChain", icon: images.langchain, invert: true },
            { name: "LangSmith", icon: images.langsmith, invert: true },
            { name: "AutoGen", icon: images.autogen, invert: true },
            { name: "Mem0", icon: images.mem0, invert: true },
            { name: "RAG", icon: images.rag, invert: true },
            { name: "Pinecone", icon: images.pinecone, invert: true },
            { name: "Qdrant", icon: images.qdrant, invert: true },
            { name: "N8N", icon: images.n8n },
            { name: "Faiss", icon: images.faiss, invert: true },
            { name: "AstraDB", icon: images.datastax },
        ]
    }
];
