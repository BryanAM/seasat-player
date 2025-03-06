import "./App.css";
import Navigation from "./components/navigation/navigation";
import Video from "./components/video/video";
import { useIsMobile } from "./hooks/is-mobile";
import { useEffect, useRef, useState } from "react";

function App() {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLDivElement>(null);
  const videoDimensions = useRef({ h: 220, w: 300 });
  const draggingRef = useRef<boolean>(false);
  const initialMousePosRef = useRef({ x: 0, y: 0 });
  const initialWindowPosRef = useRef({ x: 0, y: 0 });
  const [coordinates, setCoordinates] = useState({
    x: window.innerWidth - videoDimensions.current.w,
    y: window.innerHeight - videoDimensions.current.h,
  });

  /**
   * Calculate mouse movement
   */
  const handleMouseMove = (event) => {
    if (draggingRef.current) {
      const deltaX = event.clientX - initialMousePosRef.current.x;
      const deltaY = event.clientY - initialMousePosRef.current.y;
      setCoordinates({
        x: initialWindowPosRef.current.x + deltaX,
        y: initialWindowPosRef.current.y + deltaY,
      });
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    console.log("Drag ended");
  };

  /**
   * Detect if our mousedown is on draggable area
   */
  const handleMouseDown = (event) => {
    if (videoRef.current && videoRef.current.contains(event.target)) {
      // handle drag
      draggingRef.current = true;
      initialMousePosRef.current = { x: event.clientX, y: event.clientY };
      initialWindowPosRef.current = { ...coordinates };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <section className="flex flex-col bg-accent min-h-dvh">
      <Navigation isMobile={isMobile} />

      <Video ref={videoRef} coordinates={coordinates} />
    </section>
  );
}

export default App;
