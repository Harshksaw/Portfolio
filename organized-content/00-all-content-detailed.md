# Full Content Archive

## Archive Purpose
This document consolidates the portfolio's current profile, work experience, technology stack, project information, and repository context into one detailed text file.

## Authority and Scope
Primary source of truth:
- `src/data/profile.ts`
- `src/data/experiences.ts`
- `src/data/skills.ts`
- `src/data/projects.ts`
- `README.md`

Excluded from the main identity archive:
- `3d-ref/` is treated as legacy reference content because it contains conflicting career and project information.

## 1. Profile

### Full Name
Harsh Kumar Saw

### Professional Headline
Full-Stack & AI/DevOps Engineer who ships production-grade systems end-to-end.

### Intro
Hey! I'm Harsh Kumar Saw.

### Core Positioning
- AI/LLM Systems
- DevOps/Cloud
- Microservices

### Public Links
- LinkedIn: https://www.linkedin.com/in/harsh-kumar-saw-32727b247
- GitHub: https://github.com/Harshksaw
- Resume: https://drive.google.com/file/d/1iyV0euSsl0PY2wEbspc6uuIKQ_nGyyww/view?usp=sharing

### Profile Summary
Harsh Kumar Saw is positioned as an end-to-end builder focused on production systems. The language across the active portfolio emphasizes full-stack engineering, AI-backed product development, cloud deployment, reliability, and applied DevOps execution.

## 2. Work Experience

### OmMuse
- Role: Software Engineer Intern
- Duration: November 2025 to Present
- Location: Remote
- Summary: Implemented HubSpot CRM integration and enterprise-level project sharing features.

Details:
- Implemented HubSpot CRM integration in Go for syncing user metrics.
- Replaced background goroutine-based behavior with synchronous API calls for reliability.
- Built enterprise project sharing and collaborator management functionality.
- Added role-based access control.
- Improved project search behavior.
- Fixed concurrency bugs.
- Added graceful shutdown handling.

Technologies:
- Go
- HubSpot API
- CRM Integration
- Rate Limiting
- Graceful Shutdown
- Role-Based Access Control

### MoreThinks Solutions Ltd.
- Role: Full-Stack Developer Intern
- Duration: June 2025 to September 2025
- Location: Burnaby, BC
- Summary: Built and maintained frontend and backend services for the Fanciti platform.

Details:
- Worked in a unified monorepo.
- Built frontend features with Qwik.js and React.
- Built RESTful APIs with Node.js and SurrealDB.
- Integrated AWS ECS, EKS, and API Gateway.
- Improved UI/UX performance and accessibility.
- Automated build and deployment workflows with CI/CD.

Technologies:
- Qwik.js
- React
- Node.js
- SurrealDB
- AWS ECS
- AWS EKS
- API Gateway
- CI/CD

### Bwisher Ltd
- Role: Software Engineer Intern
- Duration: December 2024 to June 2025
- Location: Remote
- Summary: Built backend services for e-commerce systems.

Details:
- Built services for customers, orders, and inventory.
- Used Node.js and FastAPI.
- Managed PostgreSQL and Redis usage.
- Supported 20K+ API calls per day.
- Added BullMQ for async order processing.
- Built internal utilities for data aggregation.

Technologies:
- Node.js
- Python
- FastAPI
- PostgreSQL
- Redis
- BullMQ
- CI/CD

### Freelancer.com
- Role: Full-Stack Software Dev
- Duration: December 2023 to Present
- Location: Remote
- Summary: Delivered full-stack applications for clients across industries.

Details:
- Ranked in the top 2% globally.
- Delivered 50+ applications.
- Maintained 5-star rating and 99% client satisfaction.
- Worked across backend systems, frontend applications, infrastructure, and monitoring.

Technologies:
- NestJS
- Docker
- Kubernetes
- Redis
- RabbitMQ
- BullMQ
- Next.js
- React
- GitHub Actions
- Prometheus
- Grafana

### Jythu Ltd
- Role: Full-Stack Developer (Part-time Contract)
- Duration: June 2024 to December 2024
- Location: Remote
- Summary: Deployed scalable production systems with strong focus on performance and security.

Details:
- Deployed two high-traffic production systems.
- Supported 10K+ active users.
- Improved throughput through indexing, Redis caching, and API design.
- Implemented OAuth 2.0, JWT, and RBAC.
- Helped maintain about 99% uptime.

Technologies:
- React
- Node.js
- PostgreSQL
- AWS
- Redis
- OAuth 2.0
- JWT
- RBAC

### Tastemate
- Role: React Native Full-Stack Developer
- Duration: April 2024 to June 2024
- Location: Remote (US, Seattle)
- Summary: Developed and optimized a mobile food app with real-time and ML-backed functionality.

Details:
- Optimized caching and state synchronization with TanStack Query.
- Reduced redundant calls.
- Integrated Firebase with an ML recommendation service.
- Reduced perceived latency by about 40%.
- Built real-time chat features.

Technologies:
- React Native
- Expo
- TanStack Query
- Firebase
- Flask
- TypeScript
- Real-time Chat

## 3. Tech Stack

### Programming Languages
- JavaScript (ES6+)
- TypeScript
- Python
- Go (Golang)

### Frontend and Mobile
- React.js
- Next.js
- Qwik.js
- React Native

### Backend
- NestJS
- Express.js
- FastAPI
- Flask
- GraphQL
- Prisma
- BullMQ
- Kafka

### Databases and Data Systems
- PostgreSQL
- MySQL
- MongoDB
- Redis
- SurrealDB

### Cloud and DevOps
- AWS
- Docker
- Kubernetes
- GitHub Actions
- Prometheus
- Grafana
- Kafka

### AI and GenAI Frameworks
- LangChain
- LangSmith
- AutoGen
- Mem0
- RAG
- Pinecone
- Qdrant
- N8N
- Faiss
- AstraDB

### Skill Positioning Summary
- Full-stack engineering
- Cloud-native deployment
- DevOps and observability
- AI application development
- Vector search and retrieval systems

## 4. Projects

### Document Intelligence Platform
- Short Title: AI Doc Ent
- Type: Production
- Category: AI
- Demo: https://aidoc.harshsaw.ca
- Repository: https://github.com/Harshksaw/document-intelligence-platform

Details:
- Multi-tenant RAG platform with session-isolated FAISS indices.
- Semantic search across PDF, DOCX, and TXT.
- LangChain-based orchestration with failover between Groq and Google Gemini.
- LCEL retrieval pipelines with context-aware query rewriting.
- Hybrid chunking strategy.
- SHA-256 fingerprinting for deduplicated ingestion.
- Deployed to AWS ECS Fargate.

Tech stack:
- FastAPI
- LangChain
- FAISS
- Groq
- Google Gemini
- AWS ECS
- Docker

### Full-Stack Room Booking System
- Short Title: StudyEkaant
- Type: Production
- Category: Mobile
- Demo: https://www.studyekaant.com
- Repository: https://github.com/Harshksaw/Ekaant-StudyRoom-APP

Details:
- Microservices architecture with autoscaling and load balancing.
- 200+ concurrent users.
- Approximately 95% uptime.
- Offline booking and payment support.
- More than $5K monthly transactions.
- Message queues, caching, and real-time seat tracking.
- API response times improved by about 60%.

Tech stack:
- React Native
- Docker
- Kubernetes
- Redis

### Learning Management System
- Short Title: Krishna Academy LMS
- Type: Production
- Category: Mobile
- Demo: https://krishnaacademy.in
- Repository: https://github.com/Harshksaw/LMS-App

Details:
- Used by 3 institutions.
- 1500+ concurrent students.
- AWS and FFmpeg used to reduce streaming latency by about 40%.
- Anti-piracy protections including screenshot blocking, recording blocking, device-bound login, and suspicious-activity alerts.

Tech stack:
- React Native
- Node/Express
- MongoDB
- AWS

### MySmartFactory.ai
- Short Title: AI Safety Detection
- Type: Production
- Category: AI

Details:
- End-to-end system with FastAPI backend and Next.js frontend.
- Three containers running machine learning models.
- Multi-persona chat.
- RAG experiments with self-hosted Ollama.
- YOLO and computer vision for live CCTV safety detection.
- Real-time alerts via WhatsApp, email, browser, and push notifications.
- Industrial KPI and incident management with multi-role RBAC.

Tech stack:
- Next.js
- FastAPI
- MongoDB
- Redis

### Bwisher E-commerce Platform
- Short Title: Bwisher
- Type: Production
- Category: Web
- Demo: https://bwisher.com
- Repository: https://github.com/Harshksaw/bwisher-ecommerce

Details:
- Multi-vendor e-commerce platform for fashion and lifestyle products.
- Product catalog, cart, checkout, and order tracking.
- Payment gateways, inventory management, and analytics dashboard.
- Mobile-first responsive UI.
- Admin panel for onboarding, product uploads, and sales insights.

Tech stack:
- Next.js
- Node.js
- MongoDB
- Stripe

## 5. Portfolio Repository Context

### Live Site
- https://harshsaw.me

### Site Stack
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- OGL
- Lenis
- Vercel

### Repository Features
- Performance-focused rendering and SEO
- Data-driven sections for profile, experience, skills, and projects
- Interactive animation and 3D visuals
- Responsive layout

## 6. Legacy 3D Reference

### Separation Note
`3d-ref/` contains conflicting identity and career content, so it is not treated as part of the active portfolio archive.

### Legacy Career Mentions
- CallHQ.ai
- Adobe
- Genpact Headstrong
- Infogain

### Legacy Project Mentions
- CallHQ
- Whatsapp Automation
- Broki
- Orrdr.com

### Legacy Visual Tech Stack
- React
- Next.js
- Node.js
- Express
- MongoDB
- MySQL
- TypeScript
- JavaScript
