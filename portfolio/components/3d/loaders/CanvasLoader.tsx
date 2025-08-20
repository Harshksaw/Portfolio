"use client";

import { Html } from '@react-three/drei';

export const CanvasLoader = () => {
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="matrix-loader-3d">
        <div className="matrix-rain">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="matrix-column" style={{ animationDelay: `${i * 0.2}s` }}>
              {Array.from({ length: 8 }, (_, j) => (
                <span key={j} className="matrix-char" style={{ animationDelay: `${(i * 0.2) + (j * 0.1)}s` }}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="loading-text">LOADING...</p>
      </div>
      
      <style jsx>{`
        .matrix-loader-3d {
          position: relative;
          width: 200px;
          height: 150px;
          overflow: hidden;
        }
        .matrix-rain {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .matrix-column {
          display: flex;
          flex-direction: column;
          flex: 1;
          animation: matrixRain 1.5s linear infinite;
        }
        .matrix-char {
          color: #00ff41;
          font-family: 'Courier New', monospace;
          font-size: 10px;
          line-height: 1;
          opacity: 0;
          animation: charFade 0.1s ease-in-out infinite alternate;
        }
        .loading-text {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          color: #00ff41;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 12px;
          text-shadow: 0 0 8px #00ff41;
          animation: pulse 1.2s ease-in-out infinite;
          margin: 0;
        }
        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes charFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </Html>
  );
};