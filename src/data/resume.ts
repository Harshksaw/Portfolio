// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for résumé / experience content.
//
// Edit THIS file and everything updates:
//   • the site's career timeline  (src/components/Career.tsx)
//   • the printable web résumé     (src/components/Resume.tsx, served at /resume)
//
// To reorder the timeline, just move entries in `experience` (top = shown first).
// Set `websiteOnly: true` on an entry to show it on the site but hide it from the
// printable résumé.
// ─────────────────────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  companyUrl?: string;
  date: string;
  /** Concise one-paragraph text shown on the site timeline. */
  blurb: string;
  /** Detailed bullets shown on the printable /resume page. */
  bullets: string[];
  /** true → shown on the site, omitted from the printable résumé. */
  websiteOnly?: boolean;
}

export interface ResumeProject {
  name: string;
  stack: string;
  liveUrl?: string;
  repoUrl?: string;
  bullets: string[];
}

export interface ResumeData {
  basics: {
    name: string;
    title: string;
    phone: string;
    location: string;
    email: string;
    links: { label: string; url: string }[];
    summary: string;
  };
  education: { degree: string; school: string; date: string }[];
  experience: ExperienceEntry[];
  projects: ResumeProject[];
  skills: { category: string; items: string[] }[];
  achievements: string[];
}

export const resume: ResumeData = {
  basics: {
    name: "Harsh Saw",
    title: "Full-Stack & AI Engineer",
    phone: "+1 (778) 583-2260",
    location: "Kelowna, BC, Canada",
    email: "mister.harshkumar@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/Harshksaw" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/harsh-kumar-s-32727b247/",
      },
      { label: "Website", url: "https://harshsaw.me/" },
    ],
    summary:
      "Full-stack software engineer with 2+ years of experience shipping production systems across distributed messaging, cloud infrastructure, and AI pipelines. Currently building RAG and agentic workflows at Ommuse; prior work spans real-time marketing platforms, video streaming infrastructure, and mobile apps serving thousands of users.",
  },

  education: [
    {
      degree: "Bachelor of Computer Information Systems",
      school: "Okanagan College",
      date: "Expected Dec 2026",
    },
  ],

  experience: [
    {
      role: "Software Engineer, AI & Automation",
      company: "Okanagan College — IT Services",
      location: "Kelowna, BC",
      companyUrl: "https://www.okanagan.bc.ca/",
      date: "Apr 2026 – Present",
      blurb:
        "Building OC Connect, a college-wide agentic AI assistant on Azure AI Foundry with a custom RAG layer over institutional data and Banner SIS integrations. Sole developer of the LMS migration platform 1,500+ staff and instructors relied on daily for the Moodle-to-Brightspace transition, plus an org-wide workflow and issue-tracking system adopted across departments.",
      bullets: [
        "Building OC Connect, a college-wide unified-services platform — an agentic AI assistant on Azure AI Foundry that goes beyond retrieval to take action for staff and students, surfacing recommendations and initiating cross-system requests.",
        "Architected a custom RAG layer over heterogeneous institutional data, with a microservice fabric integrating Banner SIS and multiple platform APIs behind a unified retrieval and action interface.",
        "Shipped an org-wide workflow and issue-tracking system adopted across departments — Jira-style process tracking with real-time collaboration, replacing manual coordination between staff, instructors, and students.",
        "Sole developer of an internal LMS migration platform, built and deployed end-to-end and relied on daily by 1,500+ staff and instructors for the institution-wide Moodle-to-Brightspace transition.",
        "Delivered guided step-by-step migration workflows with progress tracking and complete records, real-time notifications and chat, and AI-powered templating.",
        "Built an end-to-end workflow management system for the Developer course, coordinating staff and students to track issues and streamline task management.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Ommuse",
      location: "Seattle, US",
      companyUrl: "https://ommuse.com/",
      date: "Nov 2025 – Present",
      blurb:
        "Led an AI-powered search (RAG) feature end-to-end, from development through deployment, partnering directly with B2B clients. Built enterprise RBAC across data layers and fixed concurrency bugs in Go services.",
      bullets: [
        "Architecting AI-powered semantic search and natural language chat for enterprise studio workflows using a RAG pipeline (MongoDB Vector Store, AWS Bedrock), enabling producers to query projects, tracks, and collaborators conversationally.",
        "Built HubSpot CRM sync for a 12K+ user music platform in Go — async batch worker using sync.Map deduplication (30s flush, 100-user chunks) syncing live metrics across 8 API trigger points; platform manages 18K+ tracks and 67 GB of user audio.",
        "Engineered a cross-platform desktop uploader (Electron) with a persistent folder-sync engine (chokidar + SQLite WAL), parallelized S3 multipart uploads, an OAuth 2.0 PKCE auth flow, and a typed IPC bridge exposing 70+ gRPC service methods to the renderer.",
        "Shipped features across a polyglot monorepo (Go gRPC/protobuf, TypeScript/React, Python) unified by Bazel, owning full deployment infrastructure — AWS (S3, SQS, ECR), Docker, Pulumi IaC, Envoy proxy, and GitHub Actions CI/CD.",
      ],
    },
    {
      role: "Full-Stack ML Engineer (Contract)",
      company: "Darwin X Global Solutions",
      location: "Remote, USA",
      companyUrl: "https://www.darwinxsolutions.com/",
      date: "Apr 2026 – Jul 2026",
      // Not on the Aug 2026 PDF résumé — site timeline only.
      websiteOnly: true,
      blurb:
        "Built the resume/JD parsing and candidate–job matching layers for a production AI job portal, replacing monolithic LLM calls with a staged, cost-aware inference pipeline.",
      bullets: [
        "Built the resume/JD parsing layer for a production AI job portal using GLiNER zero-shot NER, normalizing extracted skills, titles, and employers against a proprietary 30,000-entry skills taxonomy.",
        "Architected candidate–job matching with bi-encoder embedding retrieval and cross-encoder reranking, replacing monolithic external LLM calls with a staged, cost-aware inference pipeline.",
        "Fine-tuned Qwen3-4B via QLoRA/Unsloth on logged production traffic to self-host resume rewriting, cutting per-resume LLM inference cost by 60%.",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "MoreThinks (Fanciti)",
      location: "BC",
      date: "2025",
      websiteOnly: true,
      blurb:
        "Built the Fanciti platform frontend (Qwik.js, React) and backend (Node.js, SurrealDB) in a monorepo, with vector embedding pipelines feeding ML recommendations and AWS EKS CI/CD.",
      bullets: [
        "Built the Fanciti platform frontend (Qwik.js, React) and backend (Node.js, SurrealDB) in a monorepo, with vector embedding pipelines feeding ML recommendations and AWS EKS CI/CD.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Bwisher Ltd",
      location: "Remote",
      companyUrl: "https://bwishernepal.com/",
      date: "Dec 2024 – Jun 2025",
      blurb:
        "Architected a multi-channel marketing platform (Kafka, BullMQ) for 30K+ users with idempotent NestJS/FastAPI payment microservices, and owned Kubernetes deployments with feature-flagged rollouts.",
      bullets: [
        "Architected a multi-channel marketing platform using Apache Kafka and BullMQ, orchestrating personalized SMS, email, and WhatsApp campaigns with custom offers across 30K+ users while feeding real-time CRM and analytics pipelines.",
        "Designed idempotent NestJS and FastAPI microservices for payment and credit workflows with retry and exponential backoff strategies, eliminating duplicate transactions in high-stakes financial operations.",
        "Owned end-to-end deployment infrastructure with Jenkins, Kubernetes, Prometheus, and Grafana; shipped features behind feature flags enabling safe tenant-by-tenant rollouts with instant kill-switch control.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Freelancer.com (Top 2%)",
      location: "Remote",
      companyUrl: "https://www.freelancer.com/u/misterharshkumar",
      date: "2023 – Present",
      websiteOnly: true,
      blurb:
        "50+ full-stack apps delivered across diverse industries. NestJS, Docker, Kubernetes, Redis, RabbitMQ, Next.js. 5-star rating, 99% satisfaction.",
      bullets: [
        "Delivered 50+ full-stack apps across diverse industries using NestJS, Docker, Kubernetes, Redis, RabbitMQ, and Next.js — maintaining a 5-star rating and 99% client satisfaction.",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Jythu Ltd",
      location: "Remote",
      companyUrl: "https://jythu.com/",
      date: "Jan 2024 – Dec 2024",
      blurb:
        "Shipped React Native LMS + admin apps for 2K+ learners, provisioned AWS with Terraform and GitHub Actions, and built an FFmpeg/HLS streaming pipeline cutting seek time from 30s to 1.5s.",
      bullets: [
        "Shipped two production React Native apps (LMS + admin panel) with Node.js backends serving 2K+ learners; provisioned full AWS infrastructure with Terraform and GitHub Actions CI/CD, with multi-layer anti-piracy controls including device-bound auth.",
        "Built an end-to-end video streaming pipeline using FFmpeg HLS transcoding delivered via S3/CloudFront, orchestrated through SQS, Lambda, and SNS — reducing seek time from 30s to 1.5s and cutting bandwidth by approximately 70%.",
      ],
    },
  ],

  projects: [
    {
      name: "Document Intelligence Platform (RAG)",
      stack:
        "FastAPI, LangChain, Qdrant, Groq, Google Gemini, AWS ECS Fargate, Docker",
      liveUrl: "https://aidoc.harshsaw.ca/",
      repoUrl: "https://github.com/Harshksaw/document_portal",
      bullets: [
        "Architected a multi-tenant RAG platform with session-isolated Qdrant indexes, enabling semantic search and conversational Q&A over PDF, DOCX, and TXT documents.",
        "Engineered resilient LLM orchestration using LangChain RunnableWithFallbacks, implementing automatic provider failover (Groq to Gemini) with streaming retrieval pipelines featuring context-aware query rewriting and hybrid document chunking.",
        "Deployed to AWS ECS Fargate with GitHub Actions CI/CD and multi-worker Uvicorn scaling; designed idempotent ingestion using SHA-256 fingerprinting to deduplicate embeddings and reduce redundant indexing.",
      ],
    },
    {
      name: "CodeExpo — Browser-Based IDE & Sandbox Environment",
      stack: "React, Node.js, WebSocket, Docker, Nginx, Zustand, xterm.js",
      liveUrl: "https://code.harshsaw.ca",
      repoUrl: "https://github.com/Harshksaw/Project-IDX-Codesandbox",
      bullets: [
        "Engineered a full-stack browser-based IDE replicating a local dev environment — live terminal via xterm.js and WebSocket, real-time code execution with browser preview pane, and Socket.IO file synchronization across the workspace.",
        "Architected containerized sandbox environments using Docker with multi-stage builds and an Nginx reverse proxy, managing isolated execution contexts and environment lifecycle per session.",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "Go (Golang)", "Bash"],
    },
    {
      category: "Frontend & mobile",
      items: ["React", "Next.js", "React Native", "Qwik.js", "Electron"],
    },
    {
      category: "Backend & messaging",
      items: [
        "NestJS",
        "FastAPI",
        "Express",
        "Fastify",
        "GraphQL",
        "gRPC/Protobuf",
        "Apache Kafka",
        "BullMQ",
        "RabbitMQ",
      ],
    },
    {
      category: "Databases",
      items: [
        "PostgreSQL",
        "MongoDB",
        "DynamoDB",
        "Redis",
        "MySQL",
        "SurrealDB",
        "SQLite",
      ],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Pulumi",
        "Bazel",
        "Jenkins",
        "GitHub Actions",
      ],
    },
    {
      category: "AI & ML",
      items: [
        "PyTorch",
        "Hugging Face Transformers",
        "PEFT/LoRA/QLoRA",
        "Unsloth",
        "vLLM",
        "embeddings",
        "cross-encoder reranking",
        "LangChain",
        "RAG",
        "Qdrant",
        "FAISS",
        "Pinecone",
        "AWS Bedrock",
      ],
    },
  ],

  achievements: [
    "Sole developer of an internal LMS migration platform at Okanagan College, built and deployed end-to-end and relied on daily by 1,500+ staff and instructors for the institution-wide Moodle-to-Brightspace transition — featuring guided step-by-step migration workflows with progress tracking and complete records, real-time notifications and chat, and AI-powered templating.",
    "Built an end-to-end stock prediction pipeline covering 500 S&P 500 constituents over 5 years of 15-minute bar data — XGBoost models trained across 26 intraday horizons on 4x NVIDIA H100 GPUs (DRAC), with automated warm-start retraining every 15 minutes during market hours, served via a FastAPI backend backed by a PostgreSQL data warehouse and a multi-rolling feature pipeline.",
    "Ranked in the top 2% of verified freelancers on Freelancer.com with a 5-star rating, delivering 50+ production-grade projects.",
    "Won an inter-university college hackathon, demonstrating innovative problem-solving and technical proficiency.",
  ],
};
