
"use client"
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* Background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96 overflow-hidden">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-3xl"
          >
            Ready to take <span className="text-purple">your</span> digital
            presence to the next level?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white-200 md:mt-10 my-5 text-center max-w-xl"
          >
           Reach out to me today and let&apos;s discuss how I can help you

            achieve your goals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="mailto:mister.harshkumar@gmail.com">
              <MagicButton
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </motion.div>
        </div>
        
        {/* Contact Info Cards for Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4 mt-12">
          <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-purple-600/20 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Email</h3>
              <a href="mailto:mister.harshkumar@gmail.com" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
              mister.harshkumar@gmail.com
              </a>
            </div>
          </div>
          
          <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-800 flex items-center">
            <div className="bg-purple-600/20 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Phone</h3>
              <a href="tel:+1234567890" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 border-t border-gray-800 pt-6">
          <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} Harsh Kumar
          </p>

          <div className="flex items-center gap-4">
            {socialMedia.map((info) => (
              <div
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:border-purple-500 transition-colors"
              >
                <Image src={info.img} alt="icons" width={20} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
