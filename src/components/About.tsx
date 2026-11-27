import { lazy, Suspense } from "react";
import { resume } from "../data/resume";
import { useSection3D } from "./utils/useProgressive3D";
import "./styles/About.css";

const AboutScene = lazy(() => import("./Character/AboutScene"));

const PRODUCTION_STATS = [
  { value: "1,500+", label: "# daily staff on OC platform" },
  { value: "-60%", label: "# Qwen3-4B LLM inference cost" },
  { value: "1.5s", label: "# HLS seek from 30s baseline" },
  { value: "30K+", label: "# Kafka campaign users" },
];

const CREDENTIALS = [
  {
    label: "Education",
    title:
      resume.education[0]?.degree ?? "Bachelor of Computer Information Systems",
    meta: `${resume.education[0]?.school ?? "Okanagan College"} | ${
      resume.education[0]?.date ?? "Expected Dec 2026"
    }`,
  },
  {
    label: "Client delivery",
    title: "Top 2% on Freelancer.com",
    meta: "5-star rating | 50+ production-grade projects delivered",
  },
  {
    label: "ML systems scale",
    title: "S&P 500 Intraday Pipeline",
    meta: "26 horizons trained on 4x NVIDIA H100 GPUs | 15-min retraining",
  },
  {
    label: "Recognition",
    title: "Inter-University Hackathon Winner",
    meta: "Inter-university college hackathon | innovative problem-solving",
  },
];

const About = () => {
  const showModel = useSection3D("about");

  return (
    <section
      className="section-wrap section-block about-section"
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <div className="about-grid">
        <div className="about-visual" aria-hidden="true">
          {showModel && (
            <Suspense fallback={null}>
              <AboutScene />
            </Suspense>
          )}
        </div>

        <div className="about-narrative">
          <div className="section-head">
            <p className="section-cmd">
              <b>$</b> wc -l ./production.log
            </p>
            <h2 id="about-heading" className="section-title">
              End-to-end systems that ship to real users
            </h2>
          </div>

          <p className="about-body">{resume.basics.summary}</p>
          <p className="about-body">
            From architecting multi-tenant RAG retrieval and fine-tuning compact
            open-weights models to provisioning Kubernetes, Terraform, and CI/CD
            infrastructure, I focus on reliability, latency, and measurable cost
            reduction in production.
          </p>

          <div className="stats-strip" role="list" aria-label="Key production metrics">
            {PRODUCTION_STATS.map((stat) => (
              <div className="stat-cell" role="listitem" key={stat.label}>
                <span className="stat-num">{stat.value}</span>
                <span className="stat-cap">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="credentials-grid" aria-label="Education and credentials">
            {CREDENTIALS.map((item) => (
              <article className="credential-card" key={item.title}>
                <span className="credential-k">{item.label}</span>
                <h3 className="credential-v">{item.title}</h3>
                <p className="credential-m">{item.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
