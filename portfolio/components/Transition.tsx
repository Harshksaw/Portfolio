import { AnimatePresence, motion } from "framer-motion";

const FourStepClosingTransition = ({ isActive }: { isActive: boolean }) => {
  const transitionSettings = { duration: 1.2, ease: "easeInOut" };

  return (

    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1, backgroundColor: "#000000", y: 0 }}
          animate={{ opacity: 1, backgroundColor: "#0A192F", y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 w-full h-full"
        />
      )}
    </AnimatePresence>

  );
};

export default FourStepClosingTransition;
