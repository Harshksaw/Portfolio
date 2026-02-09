
export interface Project {
    title: string;
    shortTitle: string;
    type: string;
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
        description: [
            "Architected a multi-tenant RAG platform with session-isolated FAISS indices for semantic search across PDF, DOCX, and TXT.",
            "Engineered fault-tolerant LLM orchestration using LangChain with automatic failover between Groq and Google Gemini.",
            "Built LCEL-based retrieval pipelines with context-aware query rewriting and hybrid document chunking.",
            "Designed idempotent ingestion workflows using SHA-256 fingerprinting to deduplicate embeddings.",
            "Deployed to AWS ECS Fargate."
        ],
        techStack: ["FastAPI", "LangChain", "FAISS", "Groq", "Google Gemini", "AWS ECS", "Docker"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/9d7cb1f6c53918b3c36069f08ce3bb8e.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/5d92c6ea0824910384219e31ec7f7798.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/db50fe271496c3eb25c423de4f1bc1c8.png"],
        demoUrl: "https://aidoc.harshsaw.ca",
        repoUrl: "https://github.com/Harshksaw/document-intelligence-platform"
    },
    {
        title: "Full-Stack Room Booking System",
        shortTitle: "StudyEkaant",
        type: "production",
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
        description: [
            "Used by 3 institutions; 1500+ concurrent students.",
            "Low-latency streaming via AWS + FFmpeg; latency ↓ ~40%.",
            "Anti-piracy: screenshot/record blocking, device-bound login, suspicious-activity alerts."
        ],
        techStack: ["React", "Node/Express", "MongoDB", "AWS"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File12_wa4uol.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760198/File11_p5uety.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File13_gkbiv1.png"],
        demoUrl: "https://krishnaacademy.in",
        repoUrl: "https://github.com/Harshksaw/LMS-App"
    },
    {
        title: "MySmartFactory.ai",
        shortTitle: "AI Safety Detection",
        type: "production",
        description: [
            "End-to-end system with FastAPI backend and Next.js frontend, integrated with three containers running machine learning models",
            "AI-centric site with multi-persona chat and RAG experiments (self-hosted LLM via Ollama).",
            "(YOLO and CV) for safety failure detection using live CCTV cameras.",
            "Real-time alerts via WhatsApp, email, browser, and push notifications.",
            "Industrial KPI & incident management with multi-role RBAC",
        ],
        techStack: ["Next.js", "FastAPI", "MongoDB", "Redis"],
        image: ["https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_2.31.13_PM_degmoj.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.32.41_PM_iiqlvi.png", "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762379/Screenshot_2025-09-01_at_2.31.23_PM_djcjap.png"]
    },
    {
        title: "AI Interview Platform with Autogen",
        shortTitle: "AI Interviewer",
        type: "prototype",
        description: [
            "Automated technical interview platform powered by Autogen and LLMs.",
            "Dynamic question generation, real-time candidate evaluation, and feedback.",
            "Multi-turn conversational flow with context-aware follow-ups.",
            "Admin dashboard for interview management and analytics.",
            "Supports code execution and scoring for coding rounds."
        ],
        techStack: ["Next.js", "FastAPI", "Autogen", "MongoDB"],
        image: ["data:image/jpeg;base64,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", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTEhMWFhUVFxMWGBcVFxEWFRYVFxUWFhUXGBcYKCggGBolGxUXITIhJSkrLy4uGB8zODMtNygtLisBCgoKDg0OFxAQGi0lHR8tLS0tLS0tLS0vLS0tLS8tLS0tLS0tKysrLS0tLSstKystLS0tLS0tLS0tLSsrLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQIDBwQFBgj/xABLEAABAwICAwkNBAcIAwEAAAABAAIDBBESIQUGMQcTIkFRU2GR0RQXJDI0UnF0gZKhs9IjQlSiFjNik7HB8ENEY3JzgqOywtPxFf/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAQEAAgICAgICAwEAAAAAAAABAhEDEiExBBNRYUFxIjKhFP/aAAwDAQACEQMRAD8Ao1CVCBEqzdHwBxBc2Qx8LEY2tc7FbgjhZbbey6zKiijy3plRcuYDvscTW2wDfNn7d7dHSh/G2mQuph0bS2ONrwcsIY1pB87ESRbo/kpjo2g/x+m7Yr+nxkHIWSgLrv8A86g5J7cfBiv/ANvQsSp0fBhfgacVvs74enb07PipHO2RhWXNTPuMDH2wtviYwHHYYrW4r3t0Jnc03mH3GoILIsp+5pvM/I1Hc83mH3GoILJbKbuabzD7rUdzzeYfcamxDZFlN3PN5h9xqO55vMPutQQ2Qpu55vMPuNR3PN5h9xqCGyLKbuebzD7jUdzzeYfdajuebzD7jexBBZFlP3PNzZ9xvYjuebmz7jexBj2RZZHc83N/kb2I7nm5v8jexBjWRZZPc83N/kb2I7nm5v8jexBioWV3PNzf5G9iO5pubPuN7FAxUiy+5ZubPuDsWTQUpxfbRuDLHZHni4tgQatCkmbZxFiLEix22TECIQhAqUBKAnAKR3m59qpNW0z5I5IWBsxiIkDib4WOuLDpXUM3OKoEHfqU4TexEhBz2Hg5hT7h3kM3rZ+VGuzZT1l+FPEcze0JGVja2Z47LbHCWKW1xJ3ParC9u+Uf2jg7FhlDmWN8LLCzRnssombm9UC075o92FpZaSKVwNyDiNrXcLbenjVhUUU4JMsjZLtAAazAGuBdcjjzBbtO1vSsxT9eKO1Vk3c5qgMOLRpytcwy4jtzxDO+fwCO91VXvi0ZlxbxLYqzUKfriO1VZ3sqrnqH91J2JDuY1Vrb9RDO+Ucl/Re2xWmlT64nsqzvZVV777Q/u5bfwSHcxqueott8o5OW9tmxWolT64dlWd7Kq52h/dSdiTvY1XO0X7uTsVqAJ1k+vE7VVXexq+dof3cqBuYVfPUWy36uTsVrWRZR9eJ2qqDuX1ef21Fn/AIcl8+TLJKdy+rvffqL0b3LZWvZFk+vE2qfvX1fPUX7uTsQdzCrtbfqLPj3uS/syVsWSWTpidlRd6iq/E03VL2I71FV+JpuqXsVuWSWU/XidqqTvU1X4mm6pexHepqvxNN1S9iO9TVfiabql7FbKE+uHaqoj3LKppBFRSmxvYtlIPpyUh3MquxG/UYvJvt2xyBwNiMAdbJmez0LvtY5nMiGFxaS+xLTY2sTa/sWsdDJdoE01y8RklxsSb8JtyMrAHbazhmFb6sTdrnJNzurLGs36lAYSQQJQ43N8zh/qwU0OoVY18b98oSYQAGujfgft/WANGLb8Fu3wSiMv7pdcX4OJ4OXHmb2OzZtIHo2+r0znw8IlxDyASbm1gdvtUXhx1uJ7V5r01AY6mZhIJjmfGSNhLXFpI6MlgrbazeXVXrc/zXLWELm00MQnWQgdZOASgJ7Wq0iFy7iHkM3rZ+VErFVebiXkU3rZ+VErDXRj6UoCVIEqlUIQhAIQlAQACWyE5SABLZKAnAKobhS2SSvDWlxNgASSeIDaVyGldaJMxG9kLDsLrukcPOIHijoFzmL22LHk5ph/bTj4rn/TrnuA25WFzfLI7P4KNtVGbDG252DEL9SqnSsxfnJJUTA52Ecxb6WljRn6brTsY+/BxMFx9rJiYWj9sE8Llt1DjWX3Z/pf68f2vSySyqfQ+v8lKTHLeeAOIZI64dhvkb52HtP8ANWToPTENZGJYjduwg7QeRbY8kyZ5YWM6yQhSEJpC1UMISJ9k0hSGpE5NQCEIQY9bRsmbhfewNwQbEH00rFVebiXkU3rZ+VErDXRj6UoCVIEqlUIQhAIQlAQACWyE5SABLZKAnAKobhS2SSvDWlxNgASSeIDaVyGldaJMxG9kLDsLrukcPOIHijoFzmL22LHk5ph/bTj4rn/TrnuA25WFzfLI7P4KNtVGbDG252DEL9SqnSsxfnJJUTA52Ecxb6WljRn6brTsY+/BxMFx9rJiYWj9sE8Llt1DjWX3Z/pf68f2vSySyqfQ+v8lKTHLeeAOIZI64dhvkb52HtP8ANWToPTENZGJYjduwg7QeRbY8kyZ5YWM6yQhSEJpC1UMISJ9k0hSGpE5NQCEIQY9bRsmbhfewNwQbEH/9k="]
    },
    {
        title: "Bwisher E-commerce Platform",
        shortTitle: "Bwisher",
        type: "production",
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
