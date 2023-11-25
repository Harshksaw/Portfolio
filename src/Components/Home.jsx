import harsh from "../assets/harsh.jpeg";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { FaCodeBranch } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";


const Home = () => {
  return (
    <div
      name="home"
      className="h-screen w-full bg-gradient-to-br  from-blue-200 via-black to-purple-200"
    >
      {/* <img src={harsh} alt=""/> */}

      <div
        className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full 
            px-4 md:flex-row  transition duration-400"
      >
      <div className="flex flex-col justify-center h-full">
      <h2 className="text-3xl sm:text-7xl font-bold text-blue-600 mb-4 flex flex-row">
        <FaCodeBranch className="mr-2 text-green-500 " />
         AM
      </h2>
      <div className="Typewriter">
        <span className="Typewriter__wrapper flex items-center text-yellow-400 text-4xl md:text-6xl">
        <FaCode/>
          <Typewriter 
            options={{
              strings: ["Student", "Full Stack Developer", "Data Science Enthusiast"],
              autoStart: true,
              loop: true,
            }}
            />
       
          {/* <span className="Typewriter__cursor"></span> */}
        </span>
      </div>


          <p className="text-gray-500  py-4 max-w-md ">
            detail Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dolorum debitis porro repudiandae aliquid recusandae, officia
          
          </p>
          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group text-yellow-500 text-2xl shadow-[0_0_5px_red] w-fit px-6 py-3 my-2 flex items-center rounded-md
                        bg-gradient-to-r from-cyan-300 via-blue-600 to-blue-400 cursor-pointer "
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardDoubleArrowRight size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
        <div>
          <img
            src={harsh}
            alt="my profilepicture"
            className="rounded-2xl mx-auto w-2/3 md:w-full mb-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
