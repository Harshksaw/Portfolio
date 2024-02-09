import { useEffect, useState } from "react";

import PropTypes from 'prop-types';
// const About = ({text, link }) => {

export default function About({ text, link }) {

    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setTypedText((prevText) => prevText + text.charAt(index));
            index++;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, 100);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [text]);


    return (

<main className="w-full min-h-screen bg-gradient-to-b from-gray-300 to-black text-yellow-100" name="about">
  <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
    <div className="pb-8">
      {/* <h1 className="text-4xl font-bold mb-4 border-blue-500 text-orange-300 inline relative z-1 animate__animated animate__bounce">Who Am I</h1> */}
      <h1 className="text-6xl font-bold mb-4 animate-bounce border-blue-500 text-orange-400">Who Am I</h1>
        </div>
        <a href={link} className="text-blue-500 text-3xl hover:underline mb-5">
            {typedText}
        </a>
        <p className="text-gray-200 text-lg md:text-2xl  mt-4">
            Web Development Journey: My journey in the world of web development has been exhilarating. I've honed my skills in React JS and Node Js. The dynamic nature of web development and the power to create seamless user experiences.
        </p>
        <p className="text-lg leading-relaxed text-yellow-200 animated-text  mt-5 md:mt-15">
            But my interests don't stop at web development! I'm also delving into the world of data science for the long run. I've been actively learning and gaining hands-on experience in machine learning (ML), exploratory data analysis (EDA), and data analysis. The ability to extract valuable insights from data and make data-driven decisions is a skill I'm keen on mastering.
        </p>
        <br />
        <p className="hidden md:block text-lg md:text-2xl animated-text ">
            My ultimate goal is to bridge the gap between technology and data to create innovative solutions that solve real-world problems. I'm always on the lookout for exciting opportunities, collaborations, and projects that align with my interests and ambitions.
        </p>
    </div>
</main>

    );
}


About.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };