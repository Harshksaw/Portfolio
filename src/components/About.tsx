import "./styles/About.css";
import SectionModel from "./Character/SectionModel";
import { aboutCamera, loadAboutModel } from "./Character/variants/aboutModel";

const About = ({ enable3D = false }: { enable3D?: boolean }) => {
  return (
    <div className="about-section" id="about">
      {/* harshsecond — its own canvas in the left column (text is on the right). */}
      {enable3D && (
        <SectionModel
          className="section-model about-model"
          sectionSelector=".about-section"
          camera={aboutCamera}
          load={loadAboutModel}
        />
      )}
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full-Stack &amp; AI/DevOps Engineer who ships production-grade systems end-to-end.
          I build scalable backends, AI/LLM pipelines, and mobile apps — from architecture
          to deployment. My work spans React Native, Node.js, Python, AWS, Kubernetes,
          and LangChain. Ranked top 2% on Freelancer.com with 50+ apps delivered.
        </p>
      </div>
    </div>
  );
};

export default About;
