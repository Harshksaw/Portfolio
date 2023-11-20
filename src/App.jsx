





// import SocialLinks from './src/Components/SocialLinks';
import Navbar from './Components/NavBar';
import Home from './Components/Home';
import SocialLinks from './Components/SocialLinks';
import About from './Components/About';
import Portfolio from './Components/Portfolio';
import Experience from './Components/Experience';
import Contact from './Components/Contact';




function App() {


  return (
    <div>
      <Navbar />
      <Home />
      <About text="Passionate MERN full-stack developer and avid data science enthusiast, crafting digital solutions" link="/portfolio"/>
      <Portfolio/>
      <Experience/>


      <Contact/>
      <SocialLinks />
    </div>

  )
}

export default App
