import React, { useEffect, useState } from "react";

export function Intro({}) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate animation completion after 3 seconds
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isComplete) {
    return null; // Hide intro after completion
  }

  return (
    <div id="intro" className="home__starteranimation">
      <div className="background__color"></div>
      <div className="animation__container">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mb-8"></div>
          <h1 className="text-white text-4xl font-bold animate-pulse">Portfolio</h1>
          <p className="text-gray-300 text-lg mt-4">Loading...</p>
        </div>
      </div>
    </div>
  );
}
