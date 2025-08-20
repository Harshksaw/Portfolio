import { useState, useEffect } from 'react';

interface ResponsiveSizes {
  deskScale: [number, number, number];
  deskPosition: [number, number, number];
  targetPosition: [number, number, number];
  reactLogoPosition: [number, number, number];
  ringPosition: [number, number, number];
  cubePosition: [number, number, number];
}

export const useResponsiveSize = () => {
  const [sizes, setSizes] = useState<ResponsiveSizes>({
    deskScale: [0.07, 0.07, 0.07],
    deskPosition: [0.25, -0.35, 0],
    targetPosition: [4, -1, 0],
    reactLogoPosition: [4, 4, 0],
    ringPosition: [-10, 7, 0],
    cubePosition: [1, -2, 0],
  });

  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 768) {
        // Mobile sizes
        setSizes({
          deskScale: [0.05, 0.05, 0.05],
          deskPosition: [0, -0.5, 0],
          targetPosition: [2, -1, 0],
          reactLogoPosition: [2, 2, 0],
          ringPosition: [-5, 3, 0],
          cubePosition: [0.5, -1, 0],
        });
      } else {
        // Desktop sizes
        setSizes({
          deskScale: [0.07, 0.07, 0.07],
          deskPosition: [0.25, -0.35, 0],
          targetPosition: [4, -1, 0],
          reactLogoPosition: [4, 4, 0],
          ringPosition: [-10, 7, 0],
          cubePosition: [1, -2, 0],
        });
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  return sizes;
};