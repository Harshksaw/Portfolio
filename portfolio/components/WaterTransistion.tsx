// components/WaterTransition.js
import { motion } from "framer-motion";

const WaterTransition = ({ isActive }:any) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={isActive ? { y: "0%" } : { y: "100%" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-full bg-blue-600 z-50 flex items-center justify-center"
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,64L60,90.7C120,117,240,171,360,202.7C480,235,600,245,720,224C840,203,960,149,1080,138.7C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default WaterTransition;
