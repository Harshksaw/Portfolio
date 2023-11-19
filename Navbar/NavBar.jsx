import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "about",
    },
    {
      id: 3,
      link: "portfolio",
    },
    {
      id: 4,
      link: "experience",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 text-white bg-black fixed">
      <div>
        <h1 className="text-5xl font-extrabold ml-2">Harsh</h1>
      </div>
      <ul className="hidden md:flex ">
        {links.map(({ id, link }) => (
          <li
            className="px-4 cursor-pointer capitalize font-medium text-blue-400 hover:scale-110 duration-150"
            key={id}
          >
            {link}
          </li>
        ))}
      </ul>

      <div

      
        className=" space-x-2 mr-2 cursor-pointer z-10 text-gray-400 md:hidden"
        onClick={() => setNav(!nav)}
      >
          {/* click to close  */}
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

        {nav && (
          <ul className="flex flex-col justify-center  items-center
          absolute top-0 left-0 w-full h-screen bg-gradient-to-br from-black to-gray-600 text-gray-500">
            {links.map(({ id, link }) => (
              <li
                className="px-4 cursor-pointer capitalize py-6 text-4xl"
                key={id}
              >
                {link}
              </li>
            ))} 
          </ul>
      
        )}

          
  
    </div>
  );
}