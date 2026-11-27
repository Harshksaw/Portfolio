import { useEffect, useRef, useState } from "react";
import { ArrowOutwardIcon, CloseIcon, GitHubIcon } from "./Icons";
import "./styles/Work.css";

interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  impact: string;
  summary: string;
  stack: string[];
  bullets: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "doc-intel",
    title: "Document Intelligence Platform",
    category: "Multi-tenant RAG & LLM orchestration",
    impact: "Session-isolated Qdrant indexes + automatic Groq-to-Gemini failover",
    summary:
      "Production conversational Q&A over PDF, DOCX, and TXT files with SHA-256 ingestion deduplication and streaming retrieval.",
    stack: ["FastAPI", "LangChain", "Qdrant", "Groq / Gemini", "AWS ECS Fargate"],
    bullets: [
      "Architected a multi-tenant RAG platform with session-isolated Qdrant indexes for semantic search and conversational Q&A across PDF, DOCX, and TXT documents.",
      "Engineered resilient LLM orchestration using LangChain RunnableWithFallbacks, implementing automatic provider failover (Groq to Gemini) with context-aware query rewriting.",
      "Deployed to AWS ECS Fargate with GitHub Actions CI/CD and multi-worker Uvicorn scaling, using SHA-256 fingerprinting to deduplicate embeddings.",
    ],
    image:
      "https://res.cloudinary.com/dgheyg3iv/image/upload/f_auto,q_auto,w_960,c_limit/v1770617252/Screenshot_2026-02-01_at_10.09.24_PM_jyno2o.png",
    liveUrl: "https://aidoc.harshsaw.ca/",
    repoUrl: "https://github.com/Harshksaw/document_portal",
  },
  {
    id: "codeexpo",
    title: "CodeExpo: Cloud IDE & Sandbox",
    category: "Containerized developer environment",
    impact: "Live xterm.js WebSocket terminal + isolated Docker session containers",
    summary:
      "Full-stack browser IDE replicating a local workflow with real-time execution, live preview pane, and Socket.IO workspace sync.",
    stack: ["React", "Node.js", "WebSocket", "Docker", "Nginx", "xterm.js"],
    bullets: [
      "Engineered a browser-based IDE replicating a local dev environment with an interactive xterm.js terminal over WebSocket, live preview pane, and Socket.IO workspace synchronization.",
      "Architected containerized sandbox environments using Docker multi-stage builds and an Nginx reverse proxy to manage isolated execution contexts per session.",
      "Managed editor and workspace state with Zustand.",
    ],
    liveUrl: "https://code.harshsaw.ca",
    repoUrl: "https://github.com/Harshksaw/Project-IDX-Codesandbox",
  },
  {
    id: "krishna-lms",
    title: "Krishna Academy LMS & Streaming",
    category: "Mobile EdTech & HLS video pipeline",
    impact: "2K+ learners | Seek time cut 30s to 1.5s | ~70% less bandwidth",
    summary:
      "Production React Native learning apps backed by Terraform-provisioned AWS infrastructure and FFmpeg HLS transcoding.",
    stack: ["React Native", "Node.js", "AWS S3 / CloudFront", "FFmpeg", "Terraform"],
    bullets: [
      "Shipped production React Native LMS and admin apps serving thousands of learners with device-bound authentication and anti-piracy controls.",
      "Built an asynchronous FFmpeg HLS transcoding pipeline delivered via S3 and CloudFront, orchestrated with SQS, Lambda, and SNS.",
      "Reduced video seek latency from 30s to 1.5s while cutting streaming bandwidth costs by approximately 70%.",
    ],
    image:
      "https://res.cloudinary.com/dgheyg3iv/image/upload/f_auto,q_auto,w_960,c_limit/v1756760199/File12_wa4uol.png",
    liveUrl: "https://krishnaacademy.in",
  },
  {
    id: "bwisher",
    title: "Bwisher Platform & Marketing Engine",
    category: "E-commerce & event-driven messaging",
    impact: "30K+ users | 20K+ API calls/day | Idempotent Stripe/payments",
    summary:
      "High-throughput storefront and multi-channel campaign orchestrator running behind feature-flagged Kubernetes rollouts.",
    stack: ["Next.js", "NestJS", "Apache Kafka", "BullMQ", "Kubernetes"],
    bullets: [
      "Architected a multi-channel marketing platform using Apache Kafka and BullMQ to orchestrate personalized SMS, email, and WhatsApp campaigns across 30K+ users.",
      "Designed idempotent NestJS and FastAPI microservices for payment and credit workflows with retry and exponential backoff to eliminate duplicate transactions.",
      "Owned Kubernetes deployments, Jenkins CI/CD, Prometheus/Grafana observability, and tenant-by-tenant feature-flag rollouts.",
    ],
    image:
      "https://res.cloudinary.com/dgheyg3iv/image/upload/f_auto,q_auto,w_960,c_limit/v1756762378/Screenshot_2025-09-01_at_1.32.14_PM_ssxp1g.png",
    liveUrl: "https://bwisher.com",
  },
];

const MORE_SYSTEMS = [
  {
    title: "MySmartFactory.ai",
    subtitle: "AI Safety Detection Platform",
    detail: "YOLO computer-vision monitoring with FastAPI, Next.js, Redis, and automated WhatsApp safety alerts.",
  },
  {
    title: "StudyEkaant",
    subtitle: "Room Booking Mobile App",
    detail: "React Native + Docker/Kubernetes + Redis, serving 200+ concurrent users.",
    url: "https://www.studyekaant.com",
  },
  {
    title: "S&P 500 Intraday Forecast Engine",
    subtitle: "Quantitative ML Pipeline",
    detail: "XGBoost models across 26 intraday horizons on 4x NVIDIA H100 GPUs with 15-min warm-start retraining.",
  },
];

const CodeExpoPreview = () => (
  <div className="codeexpo-preview" aria-hidden="true">
    <div className="codeexpo-bar">
      <span className="codeexpo-host">tty: code.harshsaw.ca | docker-sandbox</span>
    </div>
    <pre className="codeexpo-ascii">
{`+-------------+     ws://pty      +--------------+
|  xterm.js   | ----------------> | nginx  :443  |
+-------------+                   +--------------+
                                         |
                                         v
+-------------+   volume mount    +--------------+
|  server.ts  | <---------------- | docker exec  |
| nginx.conf  |   cpus: 1 iso     | session pod  |
+-------------+                   +--------------+`}
    </pre>
    <div className="codeexpo-term">
      <span>$ vite --port 5173</span>
      <span className="term-ok">[ready] proxy :443</span>
    </div>
  </div>
);

const Work = () => {
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeProject && !dialog.open) {
      dialog.showModal();
    }
  }, [activeProject]);

  // Safari fallback for closedby="any" light dismiss.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);
    return () => {
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const handleDialogClose = () => {
    const dialog = dialogRef.current;
    if (dialog) dialog.returnValue = "";
    setActiveProject(null);
  };

  return (
    <section
      className="section-wrap section-block deferred-section"
      id="work"
      tabIndex={-1}
      aria-labelledby="work-heading"
    >
      <div className="section-head">
        <p className="section-cmd">
          <b>$</b> ls -la ./deployments
        </p>
        <h2 id="work-heading" className="section-title">
          Production systems &amp; case studies
        </h2>
        <p className="section-lead">
          Each system shipped to live users. Inspect deployments, repositories,
          or open architecture notes directly.
        </p>
      </div>

      <div className="work-grid">
        {FEATURED_PROJECTS.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-media">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  width={960}
                  height={540}
                  loading={index === 0 ? undefined : "lazy"}
                  decoding="async"
                  {...(index === 0
                    ? ({ fetchpriority: "high" } as Record<string, string>)
                    : {})}
                />
              ) : (
                <CodeExpoPreview />
              )}
              <span className="project-index" aria-hidden="true">
                0{index + 1}
              </span>
            </div>

            <div className="project-body">
              <div className="project-meta">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-impact">{project.impact}</p>
              <p className="project-summary">{project.summary}</p>

              <ul className="project-tags" aria-label={`${project.title} technologies`}>
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="project-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link project-link-primary"
                  >
                    <span>Live</span>
                    <ArrowOutwardIcon width={15} height={15} />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <GitHubIcon width={15} height={15} />
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  type="button"
                  className="project-link project-details-btn"
                  onClick={() => setActiveProject(project)}
                >
                  Architecture
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="more-systems" aria-label="Additional shipped systems">
        {MORE_SYSTEMS.map((item) => (
          <article className="mini-project" key={item.title}>
            <div className="mini-project-head">
              <div>
                <h3 className="mini-project-title">{item.title}</h3>
                <p className="mini-project-sub">{item.subtitle}</p>
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mini-project-link"
                  aria-label={`Visit ${item.title}`}
                >
                  <ArrowOutwardIcon width={16} height={16} />
                </a>
              )}
            </div>
            <p className="mini-project-desc">{item.detail}</p>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClose={handleDialogClose}
        {...({ closedby: "any" } as Record<string, string>)}
      >
        {activeProject && (
          <div className="dialog-surface">
            <div className="dialog-header">
              <div>
                <span className="dialog-cmd">{activeProject.category}</span>
                <h1 id="project-dialog-title" className="dialog-title">
                  {activeProject.title}
                </h1>
              </div>
              <form method="dialog">
                <button
                  type="submit"
                  className="dialog-close-btn"
                  aria-label="Close architecture details"
                  autoFocus
                >
                  <CloseIcon />
                </button>
              </form>
            </div>

            <p className="dialog-impact">{activeProject.impact}</p>

            <ul className="dialog-bullets">
              {activeProject.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>

            <div className="dialog-footer">
              <ul className="project-tags">
                {activeProject.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="dialog-links">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Open Live App</span>
                    <ArrowOutwardIcon width={16} height={16} />
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    <GitHubIcon width={16} height={16} />
                    <span>View Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};

export default Work;
