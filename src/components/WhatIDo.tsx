import { lazy, Suspense } from "react";
import { useSection3D } from "./utils/useProgressive3D";
import "./styles/WhatIDo.css";

const DeskScene = lazy(() => import("./Character/DeskScene"));

const FOCUS_PILLARS = [
  {
    eyebrow: "AI & Agentic Systems",
    title: "Production RAG & Inference Pipelines",
    description:
      "Designing multi-tenant retrieval pipelines, agentic tool execution over enterprise APIs, and staged ML inference that cuts LLM costs without sacrificing accuracy.",
    highlights: [
      "Azure AI Foundry, AWS Bedrock, LangChain, Qdrant & FAISS",
      "Bi-encoder retrieval + cross-encoder reranking & GLiNER NER",
      "QLoRA/Unsloth fine-tuning (60% cost reduction on Qwen3-4B)",
    ],
  },
  {
    eyebrow: "Full-Stack & Cloud",
    title: "Distributed Backends & Infrastructure",
    description:
      "Owning features end-to-end across Go gRPC services, Node.js/FastAPI microservices, React/React Native clients, and Kubernetes/IaC deployment pipelines.",
    highlights: [
      "Go (gRPC/Protobuf), NestJS, FastAPI, Next.js & Electron",
      "Apache Kafka, BullMQ, RabbitMQ & idempotent payment workflows",
      "AWS, Azure, Kubernetes, Terraform, Pulumi, Bazel & CI/CD",
    ],
  },
];

const WhatIDo = () => {
  const showDesk = useSection3D("capabilities");

  return (
    <section
      className="section-wrap section-block whatido-section"
      id="capabilities"
      tabIndex={-1}
      aria-labelledby="capabilities-heading"
    >
      <div className="whatido-layout">
        <div className="whatido-stage-col">
          <div className="section-head">
            <span className="section-eyebrow">What I Do</span>
            <h2 id="capabilities-heading" className="section-title">
              Engineering systems from prototype to production
            </h2>
          </div>

          <div className="desk-visual" aria-hidden="true">
            {showDesk && (
              <Suspense fallback={null}>
                <DeskScene />
              </Suspense>
            )}
          </div>
        </div>

        <div className="focus-stack">
          {FOCUS_PILLARS.map((pillar) => (
            <article className="focus-card" key={pillar.title}>
              <span className="focus-eyebrow">{pillar.eyebrow}</span>
              <h3 className="focus-title">{pillar.title}</h3>
              <p className="focus-desc">{pillar.description}</p>
              <ul className="focus-list">
                {pillar.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
