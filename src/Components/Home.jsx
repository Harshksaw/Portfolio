import harsh from "../assets/harsh.jpeg";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from 'react-scroll';
const Home = () => {
    return (
        <div
            name="home"
            className="h-screen w-full bg-gradient-to-br  from-black via-black to-gray-500"
        >
            {/* <img src={harsh} alt=""/> */}

            <div
                className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full 
            px-4 md:flex-row  "
            >
                <div className="flex flex-col justify-center h-full">
                    <h2 className="text-4xl sm:text-7xl font-bold text-blue-600 ">
                        I am a Full Stack Developer
                    </h2>
                    <p className="text-gray-500  py-4 max-w-md ">
                        detail Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Dolorum debitis porro repudiandae aliquid recusandae, officia
                        tenetur maiores temporibus quae. Corrupti est cupiditate iure aut
                        quod veniam aliquid nisi quas numquam animi fuga iste facere, unde
                        explicabo officiis velit incidunt perferendis doloribus dolorem id
                        consequatur laboriosam expedita at deserunt? Velit, sequi.
                    </p>
                    <div>
                        <Link to="portfolio" smooth duration={500} 
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
                        className="rounded-2xl mx-auto w-2/3 md:w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
