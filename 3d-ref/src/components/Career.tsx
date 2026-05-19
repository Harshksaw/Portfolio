import "./styles/Career.css";

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

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>OmMuse · Remote</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              HubSpot CRM integration in Go, enterprise project sharing with RBAC,
              goroutine concurrency fixes, and enhanced search functionality.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer Intern</h4>
                <h5>MoreThinks (Fanciti) · BC</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built Fanciti platform frontend (Qwik.js, React) and backend (Node.js,
              SurrealDB) in a monorepo. AWS ECS/EKS, API Gateway, CI/CD automation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>Bwisher Ltd · Remote</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Node.js + FastAPI backends for e-commerce handling 20K+ API calls/day.
              PostgreSQL, Redis, BullMQ async order processing.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>Freelancer.com · Top 2%</h5>
              </div>
              <h3>2023–</h3>
            </div>
            <p>
              50+ full-stack apps delivered across diverse industries. NestJS, Docker,
              Kubernetes, Redis, RabbitMQ, Next.js. 5-star rating, 99% satisfaction.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>Jythu Ltd · Remote</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Two high-traffic production systems serving 10K+ active users.
              OAuth 2.0 + JWT with RBAC; Redis caching; ~99% uptime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
