import logo1 from "../assets/browser.png";

import logo3 from "../assets/python.gif";
import js from "../assets/icons8-javascript.gif";
import reacticon from "../assets/icons8-react-js.gif";
import logo5 from "../assets/Redux-logo-vector-01.svg";
import logo6 from "../assets/Node-JS-logo-vector-02.svg";
import logo7 from "../assets/Next.js.png";
import logo8 from "../assets/db.jpeg";
import logo9 from "../assets/typescript.png";

const Experience = () => {
  const technologies = [
    { id: 1, src: js, title: "JS", style: "shadow-purple-500" },

    { id: 2, src: reacticon, title: "REACT", style: "shadow-purple-500" },
    { id: 3, src: logo7, title: "NextJS", style: "shadow-green-400" },
    { id: 4, src: logo5, title: "REDUX", style: "shadow-purple-800" },
    { id: 5, src: logo6, title: "NODE", style: "shadow-green-400" },
    { id: 6, src: logo3, title: "PYTHON", style: "shadow-yellow-700" },
    { id: 7, src: logo1, title: "Html & CSS", style: "shadow-orange-500" },
    { id: 8, src: logo8, title: "Mongo & Sql", style: "shadow-yellow-700" },
    { id: 8, src: logo9, title: "TypeScript", style: "shadow-yellow-700" },
  ];

  return (
    <div
      name="experience"
      className="bg-gradient-to-b from-gray-400 to-violet-500 w-full h-screen"
    >
      <div>
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-centerw-full h-full text-white ">
          <div>
            <h1 className="text-4xl font-bold border-b-4 border-gray-300 p-2 inline">
              Experience
            </h1>
            <p className="py-6">
              These are the technologies i have worked with
            </p>
          </div>

          <div className="w-full  grid grid-cols-3 sm:grid-cols-4 gap-8 text-center py-8 px-12 sm:px-0 h-full">
            {technologies.map(({ id, src, title, style }) => (
              <div
                key={id}
                className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-20 mx-auto sm:h-10 w-10"
                  size={20}
                />
                <p className="mt-4">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
