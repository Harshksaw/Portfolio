import { motion } from "framer-motion";

// Define tech stack with logos
const techStack = [
  { name: "Next.js", logo: "/react-icon.svg" },
  { name: "React", logo: "/react-icon.svg" },
  { name: "Node.js", logo: "/react-icon.svg" },
  { name: "AWS", logo: "/react-icon.svg" },
  { name: "PostgreSQL", logo: "/react-icon.svg" },
  { name: "TailwindCSS", logo: "/react-icon.svg" },
];

const TechStack = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg dark:bg-black-800 bg-white text-center">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">🛠 My Tech Stack</h3>

      <div className="grid grid-cols-3 gap-4">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <img src={tech.logo} alt={tech.name} className="h-12 w-12" />
            <p className="text-gray-300 text-sm mt-2">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
