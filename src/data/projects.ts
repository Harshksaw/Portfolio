export type ProjectCategory = 'AI' | 'Web' | 'Mobile' | 'Subjects';

export interface Project {
    title: string;
    shortTitle: string;
    type: string;
    category: ProjectCategory;
    description: string[];
    techStack: string[];
    image: string[];
    demoUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        title: "Document Intelligence Platform",
        shortTitle: "AI Doc Ent",
        type: "production",
        category: "AI",
        description: [
            "Architected a multi-tenant RAG platform with session-isolated FAISS indices for semantic search across PDF, DOCX, and TXT.",
            "Engineered fault-tolerant LLM orchestration using LangChain with automatic failover between Groq and Google Gemini.",
            "Built LCEL-based retrieval pipelines with context-aware query rewriting and hybrid document chunking.",
            "Designed idempotent ingestion workflows using SHA-256 fingerprinting to deduplicate embeddings.",
            "Deployed to AWS ECS Fargate."
        ],
        techStack: ["FastAPI", "LangChain", "FAISS", "Groq", "Google Gemini", "AWS ECS", "Docker"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1770617252/Screenshot_2026-02-01_at_10.09.24_PM_jyno2o.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1770617251/Screenshot_2026-02-01_at_10.09.33_PM_fvhvht.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1770617252/Screenshot_2026-02-01_at_10.09.10_PM_nrjwbt.png"],
        demoUrl: "https://aidoc.harshsaw.ca",
        repoUrl: "https://github.com/Harshksaw/document-intelligence-platform"
    },
    {
        title: "Full-Stack Room Booking System",
        shortTitle: "StudyEkaant",
        type: "production",
        category: "Mobile",
        description: [
            "Microservices architecture with autoscaling and load balancing.",
            "Supports 200+ concurrent users; ~95% uptime.",
            "Offline booking + payments; >$5K monthly transactions. Message queues, caching, and real-time seat tracking; API response times ~60% faster."
        ],
        techStack: ["React Native", "Docker", "Kubernetes", "Redis"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760193/File5_oppopy.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760200/p17_mui7p3.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760201/p15_m78wma.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760201/p16_rgvkmt.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760191/File3_mdbyvr.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760190/File8_tccknl.png"],
        demoUrl: "https://www.studyekaant.com",
        repoUrl: "https://github.com/Harshksaw/Ekaant-StudyRoom-APP"
    },
    {
        title: "Learning Management System",
        shortTitle: "Krishna Academy LMS",
        type: "production",
        category: "Mobile",
        description: [
            "Used by 3 institutions; 1500+ concurrent students.",
            "Low-latency streaming via AWS + FFmpeg; latency ↓ ~40%.",
            "Anti-piracy: screenshot/record blocking, device-bound login, suspicious-activity alerts."
        ],
        techStack: ["React Native", "Node/Express", "MongoDB", "AWS"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File12_wa4uol.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760198/File11_p5uety.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File13_gkbiv1.png"],
        demoUrl: "https://krishnaacademy.in",
        repoUrl: "https://github.com/Harshksaw/LMS-App"
    },
    {
        title: "MySmartFactory.ai",
        shortTitle: "AI Safety Detection",
        type: "production",
        category: "AI",
        description: [
            "End-to-end system with FastAPI backend and Next.js frontend, integrated with three containers running machine learning models",
            "AI-centric site with multi-persona chat and RAG experiments (self-hosted LLM via Ollama).",
            "(YOLO and CV) for safety failure detection using live CCTV cameras.",
            "Real-time alerts via WhatsApp, email, browser, and push notifications.",
            "Industrial KPI & incident management with multi-role RBAC"
        ],
        techStack: ["Next.js", "FastAPI", "MongoDB", "Redis"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_2.31.13_PM_degmoj.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.32.41_PM_iiqlvi.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.31.23_PM_djcjap.png"]
    },
    {
        title: "Bwisher E-commerce Platform",
        shortTitle: "Bwisher",
        type: "production",
        category: "Web",
        description: [
            "Full-featured e-commerce platform for fashion and lifestyle products.",
            "Multi-vendor support, product catalog, cart, checkout, and order tracking.",
            "Integrated payment gateways, inventory management, and analytics dashboard.",
            "Mobile-first responsive UI with optimized performance.",
            "Admin panel for vendor onboarding, product uploads, and sales insights."
        ],
        techStack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_1.32.14_PM_ssxp1g.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760200/l3_xtghtv.png"],
        demoUrl: "https://bwisher.com",
        repoUrl: "https://github.com/Harshksaw/bwisher-ecommerce"
    }
];
