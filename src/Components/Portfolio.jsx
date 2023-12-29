import portfolio1 from "../assets/Movix.png";
import portfolio2 from "../assets/foodapp.jpeg";
import portfolio3 from "../assets/ecomthumb.png";
import portfolio4 from "../assets/lms.jpg";
import portfolio5 from "../assets/pokedex.png";
import portfolio6 from "../assets/hotstar.png";

const Portfolio = () => {
  const portfolios = [
    { id: 1, src: portfolio1 },
    {
      id: 2,
      src: portfolio2,
      demo: "https://github.com/Harshksaw/Native-App_Food_delivery",
      code: "https://github.com/Harshksaw/Native-App_Food_delivery",
    },
    {
      id: 3,
      src: portfolio3,
      demo: "https://e-commerce-eight-mu-24.vercel.app/",
      code: "https://github.com/Harshksaw/E-Commerce",
    },
    {
      id: 4,
      src: portfolio4,
      code: "https://github.com/Harshksaw/LMS-Frontend",
    },
    {
      id: 5,
      src: portfolio5,
      code: "https://github.com/Harshksaw/Pokedex-React",
      demo: "https://harshksaw.github.io/",
    },
    {
      id: 6,
      src: portfolio6,
      demo: "https://harshksaw.github.io/Hotstart_clone/",
      code: "https://github.com/Harshksaw/Hotstart_clone",
    },
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-purple-400 to-blue-200 w-full text-white max-h-[80%]"
    >
      <div className="max-w-screen-lg p-2 mx-auto flex flex-col justify-center w-full max-h-[80%]">
        <div className="pb-8">
          <h1 className="text-4xl font-bold inline border-b-4 border-gray-500 text-blue-700">
            Portfolio
          </h1>
          <p className="py-6">Check out my work</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center py-12 px-4 sm:px-0">
          {portfolios.map(({ id, src, demo, code }) => (
            <div className="shadow-md rounded-lg py-5 sm:mb-10" key={id}>
              <div className="aspect-w-16 aspect-h-9 max-h-[11rem]">
                <img
                  src={src}
                  alt=""
                  className="object-cover w-full h-full rounded-md duration-300 hover:scale-110 sm: max-h-[18rem]"
                />
              </div>
              <div className="flex items-center justify-center mt-5">
                <button className="w-1/2 px-6 py-3 m-2 duration-150 hover:scale-105 bg-blue-500 text-white rounded-md">
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    Demo
                  </a>
                </button>
                <button className="w-1/2 px-6 py-3 m-2 duration-150 hover:scale-105 bg-green-500 text-white rounded-md">
                  <a href={code} target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
