import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { HIOutlineMail } from "react-icons/hi";
// import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          Linkedin <FaLinkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/harsh-kumar-32727b247/",
      style: "rounded-br-md",
    },
    {
      id: 2,
      child: (
        <>
          Github <FaGithub size={30} />{" "}
        </>
      ),
      href: "https://github.com/Harshksaw",
      style: "rounded-br-md",
    },
    {
      id: 3,
      child: (
        <>
          leetcode <SiLeetcode size={30} />{" "}
        </>
      ),
      href: "https://leetcode.com/Harshsaw/",
      style: "rounded-br-md",
    },
    {
      id: 4,
      child: (
        <>
          Twitter <FaTwitter size={30} />{" "}
        </>
      ),
      href: "https://twitter.com/Mr_harshkumar",
      style: "rounded-br-md",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col top-[35%] left-0 fixed">
      <ul>
        {links.map(({ child, id, href, style }) => {
          return (
            <li
              key={id}
              className={
                "flex justify-between items-center w-40 h-14 px-4 ml-[-100px]  hover:ml-[10px] hover:rounded-md    duration-300 bg-gray-600" +
                " " +
                style
              }
            >
              <a
                href={href}
                className="flex justify-between items-center w-full text-blue-400"
                target="_blank"
                rel="noreferrer"
              >
                {child}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SocialLinks;
