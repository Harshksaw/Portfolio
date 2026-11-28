import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import PacketBackground from "./PacketBackground";
import TechStack from "./TechStack";
import WhatIDo from "./WhatIDo";
import Work from "./Work";

const MainContainer = () => {
  return (
    <div className="page-shell">
      <PacketBackground />
      <Navbar />
      <main id="main-content">
        <Landing />
        <About />
        <WhatIDo />
        <Work />
        <TechStack />
        <Career />
      </main>
      <Contact />
    </div>
  );
};

export default MainContainer;
