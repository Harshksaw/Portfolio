// import SocialLinks from './src/Components/SocialLinks';
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import SocialLinks from "./Components/SocialLinks";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Experience />
      <Portfolio />
      <About
        text="Passionate full-stack MERN developer and avid data science enthusiast, crafting digital solutions"
        link="/portfolio"
      />
      <Contact />

      <SocialLinks />
    </div>
  );
}

export default App;
