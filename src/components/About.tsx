import { lazy, Suspense } from "react";
import { resume } from "../data/resume";
import { useSection3D } from "./utils/useProgressive3D";
import "./styles/About.css";

const AboutScene = lazy(() => import("./Character/AboutScene"));

const CREDENTIALS = [
  {
    label: "Education",
    title:
      resume.education[0]?.degree ?? "Bachelor of Computer Information Systems",
    meta: `${resume.education[0]?.school ?? "Okanagan College"} · ${
      resume.education[0]?.date ?? "Expected Dec 2026"
    }`,
  },
  {
    label: "Client Delivery",
    title: "Top 2% on Freelancer.com",
    meta: "5-star rating · 25+ production-grade projects delivered",
  },
  {
    label: "ML Systems Scale",
    title: "S&P 500 Intraday Pipeline",
    meta: "26 horizons trained on 4× NVIDIA H100 GPUs · 15-min retraining",
  },
  {
    label: "Recognition",
    title: "Inter-University Hackathon Winner",
    meta: "Awarded for rapid end-to-end engineering & problem solving",
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
            <span className="section-eyebrow">About</span>
            <h2 id="about-heading" className="section-title">
              End-to-end systems that ship to real users.
            </h2>
          </div>

          <p className="about-body">{resume.basics.summary}</p>
          <p className="about-body">
            From architecting multi-tenant RAG retrieval and fine-tuning compact
            open-weights models to provisioning Kubernetes, Terraform, and CI/CD
            infrastructure, I focus on reliability, latency, and measurable cost
            reduction in production.
          </p>

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
