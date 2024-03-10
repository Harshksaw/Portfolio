// import SocialLinks from './src/Components/SocialLinks';
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import SocialLinks from "./Components/SocialLinks";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";

import Contact from "./Components/Contact";
import Experience from "./Components/Experience";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Home />
      <Portfolio />

      <Experience />
      <About
        text="Passionate full-stack MERN developer and avid data science enthusiast, crafting digital solutions"
        link="/portfolio"
      />

      <Contact />
      <SocialLinks />
    </ThemeProvider>
  );
};

export default App;
