import { AnimatePresence, motion } from "framer-motion";
import styles from "./ShootingStarTransition.module.css"; // Import styles for animation

const FourStepClosingTransition = ({ isActive }: { isActive: boolean }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1, backgroundColor: "#000000" }}
          animate={{ opacity: 1, backgroundColor: "#0A192F" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 w-full h-full overflow-hidden"
        >
          {/* Shooting Stars Background */}
          <div className={styles.shootingStars}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.star}></div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FourStepClosingTransition;
