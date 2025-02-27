// components/Loader.js
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ setLoading }:any) => {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);




 
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setTimeout(() => setLoading(false), 500),
    });

    tl.to(textRefs.current[0], { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
    .to(textRefs.current[1], { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "+=0.5")
    .to(textRefs.current[2], { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "+=0.5")
    .to(textRefs.current, { opacity: 0, duration: 0.5, ease: "power3.inOut" }, "+=1");

}, [setLoading]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-4xl font-bold z-50">
      <div className="flex flex-col items-center gap-5">
        <span ref={(el) => (textRefs.current[0] = el)} className="opacity-0 translate-y-10">
          Hi,
        </span>

        {/* "Harsh here." with proper animation */}

        <span ref={(el) => (textRefs.current[1] = el)} className="flex opacity-0 translate-y-10 gap-4">
          <span
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            style={{ fontFamily: "Pacifico, cursive" }} // Custom curved font
          >
            Harsh
          </span>
          here
        </span>



        <span ref={(el) => (textRefs.current[2] = el)} className="opacity-0 translate-y-10 text-gray-400 text-lg">
          {"</>"} Crafting Code, Building Dreams.
        </span>
      </div>
    </div>

  );
};

export default Loader;
