import portfolio1 from "../assets/portfolio-1.png";
import portfolio2 from "../assets/portfolio-2.png";
import portfolio3 from "../assets/portfolio-3.png";
import portfolio4 from "../assets/portfolio-4.png";
import portfolio5 from "../assets/portfolio-5.png";

const Portfolio = () => {
    const portfolios = [
        { id: 1, src: portfolio1 },
        { id: 2, src: portfolio2 },
        { id: 3, src: portfolio3 },
        { id: 4, src: portfolio4 },
        { id: 5, src: portfolio5 },
    ];

    return (
        <div
            name="portfolio"
            className="bg-gradient-to-b from-purple-400 to-blue-200 w-full text-white mg:h-screen"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <h1 className="text-4xl font-bold inline border-b-4 border-gray-500">
                        Portfolio
                    </h1>
                    <p className="py-6">Check out my work</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0 ">
                  
                    {portfolios.map(({id, src}) => {
                        return (
                            <div className="shadow-md shadow-gray-500 rounded-lg " key={id}>
                                <img
                                    src={src}
                                    alt=""
                                    className="rounded-md duration-300 hover:scale-105"
                                />
                                <div className="flex items-center justify-center">
                                    <button className="w-1/2 px-6 py-3 m-4 duration-150 hover:scale-105">
                                        Demo
                                    </button>
                                    <button className="w-1/2 px-6 py-3 m-4 duration-150 hover:scale-105">
                                        COde
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }

                    
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
