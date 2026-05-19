# Agent Context

## Purpose
This file is the single shared context for AI agents working in this repository.

Use it to:
- understand what this portfolio repo contains
- find the source-of-truth content files
- avoid mixing active content with legacy content
- record work step by step as changes are made

## Repository Goal
This repository contains the source code and content for Harsh Kumar Saw's portfolio website.

The active portfolio focuses on:
- work experience
- technical skills
- projects
- portfolio presentation

## Active Source of Truth
Use these files as the main content authority:
- `src/data/profile.ts`
- `src/data/experiences.ts`
- `src/data/skills.ts`
- `src/data/projects.ts`
- `src/data/projects.json`
- `README.md`

## Organized Content Folder
The detailed text archive has already been extracted into:
- `organized-content/00-all-content-detailed.md`
- `organized-content/01-profile.md`
- `organized-content/02-work-experience.md`
- `organized-content/03-tech-stack.md`
- `organized-content/04-projects.md`
- `organized-content/05-portfolio-repo-context.md`
- `organized-content/06-legacy-3d-ref.md`

If an agent needs a clean text summary first, start from:
- `organized-content/00-all-content-detailed.md`

## Important Content Rule
Do not merge `3d-ref/` into the active portfolio content unless explicitly requested.

Reason:
- `3d-ref/` contains legacy reference material
- it includes conflicting work history and project identity
- it should be treated as inspiration or archive, not current truth

## Current Identity Summary
- Name: Harsh Kumar Saw
- Headline: Full-Stack & AI/DevOps Engineer
- Positioning: production-grade systems, end-to-end delivery, AI/LLM systems, DevOps/cloud, microservices

## Main Content Areas

### Work Experience
Primary file:
- `src/data/experiences.ts`

Current experience set includes:
- OmMuse
- MoreThinks Solutions Ltd.
- Bwisher Ltd
- Freelancer.com
- Jythu Ltd
- Tastemate

### Tech Stack
Primary file:
- `src/data/skills.ts`

Categories include:
- Programming Languages
- Frontend and Mobile
- Backend
- Databases
- Cloud and DevOps
- AI and GenAI Frameworks

### Projects
Primary files:
- `src/data/projects.ts`
- `src/data/projects.json`

Current main projects include:
- Document Intelligence Platform
- StudyEkaant
- Krishna Academy LMS
- MySmartFactory.ai
- Bwisher E-commerce Platform

## Agent Working Rules
- Prefer active data in `src/data/*` over inferred content from UI components.
- Use `organized-content/` for quick reference when summarizing or restructuring text.
- Treat `3d-ref/` as legacy unless the task explicitly asks for it.
- Do not delete or overwrite existing user content without clear reason.
- If content conflicts are found, record them in the log before changing anything.

## Recording Protocol
Every agent working on this repo should record important actions here.

When updating this file:
- append a new log entry
- keep older entries
- use exact dates when possible
- record what changed, why, and which files were touched

## Step Log Template
Copy this format for new entries:

```md
### Step N
- Date: YYYY-MM-DD
- Agent: agent name or identifier
- Task: short description
- Files reviewed:
  - path
- Files changed:
  - path
- Summary:
  - what was done
- Notes:
  - risks, conflicts, follow-ups, or decisions
```

## Step Log

### Step 1
- Date: 2026-05-18
- Agent: Codex
- Task: Analyze portfolio content and organize it into a single detailed archive folder.
- Files reviewed:
  - `src/data/profile.ts`
  - `src/data/experiences.ts`
  - `src/data/skills.ts`
  - `src/data/projects.ts`
  - `src/data/projects.json`
  - `README.md`
  - `3d-ref/src/components/Career.tsx`
  - `3d-ref/src/components/TechStack.tsx`
  - `3d-ref/src/components/Work.tsx`
- Files changed:
  - `organized-content/README.md`
  - `organized-content/00-all-content-detailed.md`
  - `organized-content/01-profile.md`
  - `organized-content/02-work-experience.md`
  - `organized-content/03-tech-stack.md`
  - `organized-content/04-projects.md`
  - `organized-content/05-portfolio-repo-context.md`
  - `organized-content/06-legacy-3d-ref.md`
- Summary:
  - Extracted the active portfolio content into one detailed archive folder.
  - Separated legacy `3d-ref/` content from the active portfolio because it conflicts with current profile and experience data.
- Notes:
  - `src/data/*` should be treated as the main source of truth for content updates.

### Step 2
- Date: 2026-05-18
- Agent: Codex
- Task: Create one shared context file for AI agents with a persistent step-by-step recording area.
- Files reviewed:
  - `organized-content/00-all-content-detailed.md`
  - `organized-content/06-legacy-3d-ref.md`
- Files changed:
  - `AGENT_CONTEXT.md`
- Summary:
  - Created a single agent-facing context file with project guidance, source-of-truth references, and a reusable step log template.
- Notes:
  - Future agents should append new steps instead of replacing prior entries.
