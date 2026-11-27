import { lazy, Suspense } from "react";
import { useSection3D } from "./utils/useProgressive3D";
import "./styles/WhatIDo.css";

const DeskScene = lazy(() => import("./Character/DeskScene"));

const FOCUS_PILLARS = [
  {
    cmd: "$ ./agents --rag",
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
    cmd: "$ ./services --infra",
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
            <p className="section-cmd">
              <b>$</b> git diff a/legacy b/production
            </p>
            <h2 id="capabilities-heading" className="section-title">
              Engineering systems from prototype to production
            </h2>
          </div>

          <div className="diff-panel" aria-label="Production latency and cost improvements">
            <span className="diff-header">--- a/legacy</span>
            <span className="diff-header">+++ b/production</span>
            <span className="diff-hunk">@@ -1,2 +1,2 @@</span>
            <span className="diff-minus">- 30s HLS video seek latency</span>
            <span className="diff-plus">+ 1.5s direct byte-range S3/CloudFront seek</span>
            <span className="diff-minus">- Linear cloud LLM API spend on documents</span>
            <span className="diff-plus">+ -60% inference cost via Qwen3-4B QLoRA</span>
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
              <span className="focus-cmd">{pillar.cmd}</span>
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
