import portfolio1 from "../assets/Movix.png";
import portfolio5 from "../assets/pokedex.png";
import portfolio6 from "../assets/hotstar.png";
const Portfolio = () => {
  const portfolios = [
    { id: 1, src: portfolio1 },
    { id: 2, src: portfolio1 },
    { id: 3, src: portfolio1 },
    { id: 4, src: portfolio1 },
    { id: 5, src: portfolio5 },
    { id: 6, src: portfolio6 },
  ];

  return (
    <div
      name="portfolio"
      className="bg-gradient-to-b from-purple-400 to-blue-200 w-full text-white min-h-screen"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <h1 className="text-4xl font-bold inline border-b-4 border-gray-500">
            Portfolio
          </h1>
          <p className="py-6">Check out my work</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center py-8 px-4 sm:px-0">
          {portfolios.map(({ id, src }) => (
            <div className="shadow-md rounded-lg" key={id}>
              <div className="aspect-w-16 aspect-h-9 max-h-[11rem]">
                <img
                  src={src}
                  alt=""
                  className="object-cover w-full h-full rounded-md duration-300 hover:scale-150"
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                <button className="w-1/2 px-6 py-3 m-2 duration-150 hover:scale-105 bg-blue-500 text-white rounded-md">
                  Demo
                </button>
                <button className="w-1/2 px-6 py-3 m-2 duration-150 hover:scale-105 bg-green-500 text-white rounded-md">
                  Code
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
