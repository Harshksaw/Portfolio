import { FaGithub , FaLinkedin } from "react-icons/fa"
import {HIOutlineMail} from "react-icons/hi"
import {BsFillPersonLinesFill} from "react-icons/bs"



export default function SocialLinks() {
  return (
    <div className="flex flex-col top-[35%] left-0 fixed">

            <ul>
                <li className="flex justify-between items-center w-40 h-14 px-4 bg-gray-500">
                    <a href= "" className="flex justify-between items-center w-full text-white">
                        <>
                            Linkedin <FaLinkedin size={30}/>
                        </>

                    </a>
                </li>

            </ul>
      
    </div>
  )
}
