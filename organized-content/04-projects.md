# Projects

## Summary
The active portfolio project set is concentrated around AI systems, mobile platforms, and production-grade web applications. Several projects explicitly emphasize concurrency, real-time behavior, infrastructure scaling, and business impact.

## 1. Document Intelligence Platform
- Short Title: AI Doc Ent
- Type: Production
- Category: AI
- Demo: https://aidoc.harshsaw.ca
- Repository: https://github.com/Harshksaw/document-intelligence-platform

Detailed description:
- Architected a multi-tenant RAG platform with session-isolated FAISS indices.
- Enabled semantic search across PDF, DOCX, and TXT documents.
- Built fault-tolerant LLM orchestration using LangChain.
- Added automatic failover between Groq and Google Gemini.
- Built LCEL-based retrieval pipelines.
- Added context-aware query rewriting.
- Used hybrid document chunking strategies.
- Designed idempotent ingestion workflows using SHA-256 fingerprinting.
- Prevented duplicate embeddings through content fingerprinting.
- Deployed the system to AWS ECS Fargate.

Tech stack:
- FastAPI
- LangChain
- FAISS
- Groq
- Google Gemini
- AWS ECS
- Docker

## 2. Full-Stack Room Booking System
- Short Title: StudyEkaant
- Type: Production
- Category: Mobile
- Demo: https://www.studyekaant.com
- Repository: https://github.com/Harshksaw/Ekaant-StudyRoom-APP

Detailed description:
- Built using a microservices architecture.
- Included autoscaling and load balancing.
- Supported 200+ concurrent users.
- Reported approximately 95% uptime.
- Included offline booking and payment flows.
- Processed more than $5K in monthly transactions.
- Used message queues, caching, and real-time seat tracking.
- Improved API response times by about 60%.

Tech stack:
- React Native
- Docker
- Kubernetes
- Redis

## 3. Learning Management System
- Short Title: Krishna Academy LMS
- Type: Production
- Category: Mobile
- Demo: https://krishnaacademy.in
- Repository: https://github.com/Harshksaw/LMS-App

Detailed description:
- Used by 3 institutions.
- Supported 1500+ concurrent students.
- Improved streaming latency using AWS and FFmpeg.
- Reduced latency by about 40%.
- Added anti-piracy controls.
- Included screenshot blocking.
- Included screen recording blocking.
- Added device-bound login.
- Added suspicious-activity alerts.

Tech stack:
- React Native
- Node/Express
- MongoDB
- AWS

## 4. MySmartFactory.ai
- Short Title: AI Safety Detection
- Type: Production
- Category: AI

Detailed description:
- Built as an end-to-end system with a FastAPI backend and Next.js frontend.
- Integrated three containers running machine learning models.
- Included a multi-persona chat interface.
- Included RAG experiments with a self-hosted LLM via Ollama.
- Used YOLO and computer vision for safety-failure detection from live CCTV feeds.
- Sent real-time alerts through WhatsApp, email, browser, and push notifications.
- Included industrial KPI and incident management features.
- Used multi-role RBAC.

Tech stack:
- Next.js
- FastAPI
- MongoDB
- Redis

## 5. Bwisher E-commerce Platform
- Short Title: Bwisher
- Type: Production
- Category: Web
- Demo: https://bwisher.com
- Repository: https://github.com/Harshksaw/bwisher-ecommerce

Detailed description:
- Built a full-featured e-commerce platform for fashion and lifestyle products.
- Included multi-vendor support.
- Included product catalog, cart, checkout, and order tracking.
- Integrated payment gateways.
- Added inventory management.
- Added analytics dashboard functionality.
- Used a mobile-first responsive UI approach.
- Included an admin panel for vendor onboarding, product uploads, and sales insights.

Tech stack:
- Next.js
- Node.js
- MongoDB
- Stripe

## Cross-Project Themes
- Production deployment
- AI and RAG systems
- Mobile-first application delivery
- Real-time features
- Access control and admin tooling
- Infrastructure scaling
- Reliability and performance tuning

## Source Notes
- Sourced from `src/data/projects.ts`
