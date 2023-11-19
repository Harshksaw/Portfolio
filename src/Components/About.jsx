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
        <div className="w-full h-screen bg-gradient-to-b from-gray-300 to-black text-yellow-100" name="about">
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">

                    <h1 className="text-4xl font-bold mb-4 animate-bounce border-blue-500 text-orange-400 ">About</h1>


                </div>
                <a href={link} className="text-blue-500 hover:underline">
                    {typedText}
                </a>
                <p className="text-lg leading-relaxed text-gray-200 animate-pulse">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
                </p>
                <p className="text-lg leading-relaxed text-yellow-200 animate-pulse text-xl mt-15">

                    Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta suscipit sit architecto eos, exercitationem rerum laudantium harum modi impedit animi explicabo mollitia ducimus ipsum iste officia neque molestias dolores iusto. dolor sit amet, consectetur adipisicing elit. Laboriosam animi fuga voluptatem ipsa beatae? Eum voluptatem tempore ipsam tempora consequatur! Ipsa, tempore! Iusto fugiat est ipsa sed, velit neque deserunt.</p>
                <br />
                <p className="text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et inventore ducimus sit assumenda. Nihil at ipsam architecto! Quisquam, beatae quasi! Esse, aliquid! Tenetur, ex aliquid! Rem veritatis minus consectetur cum.</p>
            </div>
        </div>
    );
}


About.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };