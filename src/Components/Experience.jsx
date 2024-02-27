import styled from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";
// Add a styled component for Tilt with desired styling
import { motion } from "framer-motion";
const TiltCard = styled(Tilt)`
  & > * {
    transform: translate3d(0, 0, 0); // Prevent default translation
  }
`;

const Experience = () => {
  return (
    <section id="Skills" className="bg-violet-400 py-16">
      <div className="container mx-auto px-4">
      <motion.h2
          initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly above viewport
          animate={{ opacity: 1, y: 0 }} // Animate on load: fade in and move down
          transition={{ delay: 0.2, duration: 3 }} // Set animation timing
          className="text-5xl font-bold text-center mb-8 text-violet-700"
        >
          Skills
        </motion.h2>

        {/* Description with animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly above viewport
          animate={{ opacity: 1, y: 0 }} // Animate on load: fade in and move down
          transition={{ delay: 0.4, duration: 4 }} // Set animation timing (slightly delayed compared to title)
          className="text-lg text-center text-blue-700 mb-16"
        >
          Here are some of my skills I've been working on for the past 2 years.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <TiltCard
              key={`skill-${index}`}
              options={{
                scale: 1.05, // Adjust scale for hover effect
                max: 25, // Set maximum tilt angle
              }}
            >
              <div className="rounded-lg shadow-md p-8 flex flex-col items-center bg-gradient-to-b from-blue-500 to-violet-500">
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  {skill.title}
                </h3>
                <ul className="flex flex-wrap gap-4">
                {skill.skills.map((item, index_x) => (
                  <li
                    key={`skill-x-${index_x}`}
                    className="flex items-center gap-2 bg-gray-200 rounded-lg px-4 py-2 text-gray-600"
                  >
                    <img src={item.image} alt={item.name} className="w-6 h-6" />
                    {item.name}
                  </li>
                ))}
              </ul>

              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
