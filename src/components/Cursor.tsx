import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Touch devices have no hover cursor — skip the per-frame loop entirely.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    // quickTo reuses ONE tween per axis instead of creating a new tween every
    // frame (which piled up ~60 overwritten tweens/sec on the main thread).
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1 });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1 });

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let frameId = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        xTo(cursorPos.x);
        yTo(cursorPos.y);
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        xTo(rect.left);
        yTo(rect.top);
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };
    const onOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };
    const items = document.querySelectorAll<HTMLElement>("[data-cursor]");
    items.forEach((element) => {
      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
    });

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      items.forEach((element) => {
        element.removeEventListener("mouseover", onOver);
        element.removeEventListener("mouseout", onOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
