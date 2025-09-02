
import { motion, useSpring } from "motion/react";
import type { FC, JSX } from "react";
import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

type CursorMode = "default" | "pointer" | "text";

const PointerCursor: FC  = () => (
    
<svg width={28}
    height={34} viewBox="0 0 709 698" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M697.35 405.306L509.991 488.746C506.054 490.321 502.904 493.47 500.542 498.195L417.889 686.335C410.016 704.438 380.889 698.933 373.016 676.887L210.063 225.824C203.764 207.721 217.936 192.762 236.039 199.848L687.899 361.223C709.938 368.309 715.45 397.435 697.347 405.309L697.35 405.306Z" fill="black"/>
<path d="M128.209 158.915L3.83121 34.5321C-2.46754 28.2395 -0.892847 16.429 7.76793 7.76803C16.4289 -0.892905 28.2336 -2.46757 34.532 3.83134L158.123 128.214C164.421 134.513 162.847 146.317 154.186 154.978C146.312 162.846 134.508 165.208 128.209 158.915Z" fill="black"/>
<path d="M158.897 347.056L42.3876 464.346C36.0888 470.645 24.2845 469.07 15.6235 460.409C6.96258 451.749 5.38789 439.944 11.6868 433.645L128.984 317.142C135.282 310.844 147.087 312.418 155.748 321.079C163.621 328.946 165.196 340.757 158.897 347.056Z" fill="black"/>
<path d="M214.788 104.602V26.6727C214.788 18.0117 224.236 10.9258 236.041 10.9258C247.851 10.9258 257.294 18.012 257.294 26.6727L257.3 104.602C257.3 113.263 247.852 120.349 236.047 120.349C224.236 120.349 214.788 113.263 214.788 104.602Z" fill="black"/>
<path d="M103.022 215.602H25.086C16.4251 215.602 9.33911 225.051 9.33911 236.855C9.33911 248.666 16.4254 258.109 25.086 258.109H103.022C111.683 258.109 118.769 248.66 118.769 236.855C118.763 225.051 111.676 215.602 103.022 215.602Z" fill="black"/>
<path d="M314.772 127.431L438.362 4.62125C444.661 -1.6775 456.465 -0.102808 465.126 8.55797C473.787 17.2189 475.362 29.0236 469.063 35.322L345.473 158.131C339.174 164.43 327.369 162.855 318.708 154.195C310.048 145.534 308.473 133.723 314.772 127.431Z" fill="black"/>
</svg>

)
const DefaultCursorSVG: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={42}
    viewBox="0 0 50 54"
    fill="none"
    style={{ scale: 0.5 }}
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_91_7928"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_91_7928"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const TextCursorSVG: FC = () => (
  <svg width="2" height="28" viewBox="0 0 2 28" fill="none">
    <rect x="0" y="0" width="2" height="28" fill="white" />
  </svg>
);

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  // Moved declarations outside to avoid redeclaring on every mouse event:
  const cursorModeMap: { mode: CursorMode; selectors: string[] }[] = [
    {
      mode: "pointer",
      selectors: ["a", "button", "[role='button']", "[data-cursor='pointer']"],
    },
    {
      mode: "text",
      selectors: [
        "input[type='text']",
        "input[type='email']",
        "input[type='password']",
        "textarea",
        "[contenteditable='true']",
        "[data-cursor='text']",
      ],
    },
  ];

  useEffect(() => {
    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const detectCursorMode = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      for (const { mode, selectors } of cursorModeMap) {
        if (selectors.some((selector) => target.closest(selector))) {
          setCursorMode(mode);
          return;
        }
      }
      setCursorMode("default");
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      detectCursorMode(e);

      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.7) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        setTimeout(() => scale.set(1), 150);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, rotation, scale, cursorModeMap]);

  // const getCursorSVG = () => {
  //   switch (cursorMode) {
  //     case "pointer":
  //       return (
  //         <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
  //           <circle cx="9" cy="9" r="4" fill="white" />
  //         </svg>
  //       );
  //     case "text":
  //       return <TextCursorSVG />;
  //     default:
  //       return cursor;
  //   }
  // };

  return (
    <motion.div
    className="hidden md:flex"
      style={{
        height:"38px",
        width:"42px",
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 999999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      aria-hidden="true"
    >
    <motion.div
      style={{ position: "absolute" }}
      animate={{
        opacity: cursorMode === "default" ? 1 : 0,
        scale: cursorMode === "default" ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      {cursor}
    </motion.div>

    <motion.div
      style={{ position: "absolute" }}
      animate={{
        opacity: cursorMode === "pointer" ? 1 : 0,
        scale: cursorMode === "pointer" ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      <PointerCursor />
    </motion.div>

    <motion.div
      style={{ position: "absolute" }}
      animate={{
        opacity: cursorMode === "text" ? 1 : 0,
        scale: cursorMode === "text" ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      <TextCursorSVG />
    </motion.div>
    </motion.div>
  );
}
