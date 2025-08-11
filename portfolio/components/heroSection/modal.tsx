// @ts-nocheck
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Modal() {
  const [mouseX, setMouseX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 0.3);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      style={{ 
        width: "100%", 
        height: "100vh", 
        position: "relative",
        background: "linear-gradient(135deg, #1e3a8a, #1f2937, #000000)"
      }}
    >
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          color: 'white',
          fontSize: '18px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid #444',
              borderTop: '3px solid #fff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading Avatar...
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
      
      <div 
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `rotateY(${mouseX * 10}deg)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="relative w-[600px] h-[600px]">
          <Image
            src="/img/me.png"
            alt="Avatar"
            fill
            className="object-contain drop-shadow-2xl filter brightness-110"
            priority
          />
        </div>
      </div>
    </div>
  );
}