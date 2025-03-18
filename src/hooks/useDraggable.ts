import { useState, useEffect, useRef } from "react";

export const useDraggable = (height: number, width: number) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoDimensions = useRef({ h: height, w: width });
  const draggingRef = useRef<boolean>(false);
  const animationFrameId = useRef<number>(null);
  const initialMousePosRef = useRef({ x: 0, y: 0 });
  const initialWindowPosRef = useRef({ x: 0, y: 0 });

  const [coordinates, setCoordinates] = useState({
    x: window.innerWidth - videoDimensions.current.w,
    y: window.innerHeight - videoDimensions.current.h,
  });

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const handleResize = () => {
    const rX = window.innerWidth - videoDimensions.current.w;
    const rY = window.innerHeight - videoDimensions.current.h;
    setCoordinates({ x: rX, y: rY });
  };

  /**
   * Calculate mouse movement
   */
  const handlePointerMove = (event: PointerEvent) => {
    if (draggingRef.current) {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(() => {
        const deltaX = event.clientX - initialMousePosRef.current.x;
        const deltaY = event.clientY - initialMousePosRef.current.y;

        let newX = initialWindowPosRef.current.x + deltaX;
        let newY = initialWindowPosRef.current.y + deltaY;

        newX = clamp(newX, 0, window.innerWidth - videoDimensions.current.w);
        newY = clamp(newY, 0, window.innerHeight - videoDimensions.current.h);

        setCoordinates({ x: newX, y: newY });
      });
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    if (videoRef.current) {
      draggingRef.current = false;
      // Release pointer capture
      videoRef.current.releasePointerCapture(event.pointerId);
      videoRef.current.removeEventListener("pointermove", handlePointerMove);
      videoRef.current.removeEventListener("pointerup", handlePointerUp);
      videoRef.current.removeEventListener("pointercancel", handlePointerUp);
    }
  };

  /**
   * Detect if our mousedown is on draggable area
   */
  const handlePointerDown = (event: PointerEvent) => {
    if (
      videoRef.current &&
      event.target instanceof Node &&
      videoRef.current.contains(event.target)
    ) {
      // handle drag
      draggingRef.current = true;
      initialMousePosRef.current = { x: event.clientX, y: event.clientY };
      initialWindowPosRef.current = { ...coordinates };
      // Capture the pointer to ensure all events are sent to this element
      videoRef.current.setPointerCapture(event.pointerId);
      videoRef.current.addEventListener("pointermove", handlePointerMove);
      videoRef.current.addEventListener("pointerup", handlePointerUp);
      videoRef.current.addEventListener("pointercancel", handlePointerUp);
    }
  };

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  });

  return { videoRef, coordinates, draggingRef };
};
