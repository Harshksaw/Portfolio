import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import TechStack from "./TechStack";
import Work from "./Work";

const MainContainer = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <main id="main-content">
        <Landing />
        <About />
        <Work />
        <TechStack />
        <Career />
      </main>
      <Contact />
    </div>
  );
};

export default MainContainer;
