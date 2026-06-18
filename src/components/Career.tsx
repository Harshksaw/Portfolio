import { useEffect, useRef, useState } from "react";
import "./styles/Career.css";

interface CareerEntry {
  role: string;
  company: string;
  date: string;
  description: string;
}

const careerEntries: CareerEntry[] = [
  {
    role: "Teaching Assistant",
    company: "Okanagan College · Contract",
    date: "2026",
    description:
      "Built an end-to-end workflow management system for the Developer course, coordinating staff and students to track issues and streamline task management.",
  },
  {
    role: "Lead Software Engineer",
    company: "OmMuse · Remote",
    date: "2025–",
    description:
      "Led an AI-powered search (RAG) feature end-to-end, from development through deployment, partnering directly with B2B clients. Built enterprise RBAC across data layers and fixed concurrency bugs in Go services.",
  },
  {
    role: "Full-Stack Developer Intern",
    company: "MoreThinks (Fanciti) · BC",
    date: "2025",
    description:
      "Built the Fanciti platform frontend (Qwik.js, React) and backend (Node.js, SurrealDB) in a monorepo, with vector embedding pipelines feeding ML recommendations and AWS EKS CI/CD.",
  },
  {
    role: "Software Engineer Intern",
    company: "Bwisher Ltd · Remote",
    date: "2024–25",
    description:
      "Architected a multi-channel marketing platform (Kafka, BullMQ) for 30K+ users with idempotent NestJS/FastAPI payment microservices, and owned Kubernetes deployments with feature-flagged rollouts.",
  },
  {
    role: "Full-Stack Developer",
    company: "Freelancer.com · Top 2%",
    date: "2023–",
    description:
      "50+ full-stack apps delivered across diverse industries. NestJS, Docker, Kubernetes, Redis, RabbitMQ, Next.js. 5-star rating, 99% satisfaction.",
  },
  {
    role: "Full-Stack Developer",
    company: "Jythu Ltd · Remote",
    date: "2024",
    description:
      "Shipped React Native LMS + admin apps for 2K+ learners, provisioned AWS with Terraform and GitHub Actions, and built an FFmpeg/HLS streaming pipeline cutting seek time from 30s to 1.5s.",
  },
];

const TypingText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 18);

    return () => window.clearInterval(id);
  }, [started, text]);

  const isTyping = started && typed.length < text.length;

  return (
    <p ref={ref} className="career-typed">
      <span className="career-typed-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="career-typed-visible">
        {typed}
        {isTyping && <span className="career-caret" />}
      </span>
    </p>
  );
};

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {careerEntries.map((entry) => (
            <div className="career-info-box" key={`${entry.company}-${entry.role}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.company}</h5>
                </div>
                <h3>{entry.date}</h3>
              </div>
              <TypingText text={entry.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
