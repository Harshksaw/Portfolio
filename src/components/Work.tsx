import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Document Intelligence",
    category: "Multi-tenant RAG Platform",
    tools: "FastAPI, LangChain, FAISS, Groq, Gemini, AWS ECS",
    image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1770617252/Screenshot_2026-02-01_at_10.09.24_PM_jyno2o.png",
    link: "https://aidoc.harshsaw.ca",
  },
  {
    title: "MySmartFactory.ai",
    category: "AI Safety Detection Platform",
    tools: "YOLO, FastAPI, Next.js, MongoDB, Redis, WhatsApp Alerts",
    image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_2.31.13_PM_degmoj.png",
    link: "",
  },
  {
    title: "StudyEkaant",
    category: "Room Booking Mobile App",
    tools: "React Native, Docker, Kubernetes, Redis — 200+ concurrent users",
    image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760193/File5_oppopy.png",
    link: "https://www.studyekaant.com",
  },
  {
    title: "Krishna Academy LMS",
    category: "Learning Management System",
    tools: "React Native, Node.js, AWS, FFmpeg — 1500+ students",
    image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756760199/File12_wa4uol.png",
    link: "https://krishnaacademy.in",
  },
  {
    title: "Bwisher",
    category: "E-commerce Platform",
    tools: "Next.js, Node.js, MongoDB, Stripe — 20K+ API calls/day",
    image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1756762378/Screenshot_2025-09-01_at_1.32.14_PM_ssxp1g.png",
    link: "https://bwisher.com",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
