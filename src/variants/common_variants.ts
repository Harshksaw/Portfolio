const sectionVariant = {
    hidden: {
      y: "100vh",
    },
    show: {
      y: 0,
      transition: {
        delay: 1.2, // Back to original timing for desktop
        duration: 1.6, // Back to original duration for desktop
        ease: [0.22, 1, 0.36, 1], 
      },
    },
  };
  
  
  export {sectionVariant}
  