
const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.5, // Back to original timing for desktop
        staggerChildren: 0.04, // Back to original stagger for desktop
      },
    },
  };

  const containerWithDelay = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.04, 
      },
    },
  };
  
  const charVariant = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, // Back to original duration for desktop
        ease: [0.22, 1, 0.36, 1], // strong easeOut (cubic-bezier)
      },
    },
  };
  const charVariantWithDelay = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        // delay: 1.5, // starts after 1.5 seconds
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  const staggeredVariantsWithDelay = {
    hidden: {},
    visible: {
        transition: {
        delayChildren: 1.5,
            staggerChildren: 0.2, 
            staggerDirection: -1, 
        },
    },
};
  

  export {container, charVariant,charVariantWithDelay, containerWithDelay, staggeredVariantsWithDelay}