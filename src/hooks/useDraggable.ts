import { useState, useEffect, useRef, useCallback } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const useDraggable = (height: number, width: number) => {
  const videoRef = useRef<HTMLDivElement>(null);

  const draggingRef = useRef<boolean>(false);
  const animationFrameId = useRef<number>(null);
  const initialMousePosRef = useRef({ x: 0, y: 0 });
  const initialWindowPosRef = useRef({ x: 0, y: 0 });

  const [coordinates, setCoordinates] = useState({
    x: window.innerWidth - width,
    y: window.innerHeight - height,
  });

  const handleResize = () => {
    const dX = window.innerWidth - width;
    const dY = window.innerHeight - height;
    setCoordinates({ x: dX, y: dY });
  };

  /**
   * Calculate pointer movment inrelation to the video window
   * Set window coordinates
   */
  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (draggingRef.current) {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = requestAnimationFrame(() => {
          const dX = event.clientX - initialMousePosRef.current.x;
          const dY = event.clientY - initialMousePosRef.current.y;

          let newX = initialWindowPosRef.current.x + dX;
          let newY = initialWindowPosRef.current.y + dY;

          newX = clamp(newX, 0, window.innerWidth - width);
          newY = clamp(newY, 0, window.innerHeight - height);

          setCoordinates({ x: newX, y: newY });
        });
      }
    },
    [height, width]
  );

  /**
   * Detect of pointer up, remove relevant listeners
   */
  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      if (videoRef.current) {
        draggingRef.current = false;
        // Release pointer capture
        videoRef.current.releasePointerCapture(event.pointerId);
        videoRef.current.removeEventListener("pointermove", handlePointerMove);
        videoRef.current.removeEventListener("pointerup", handlePointerUp);
        videoRef.current.removeEventListener("pointercancel", handlePointerUp);
      }
    },
    [handlePointerMove]
  );

  /**
   * Detect of pointerdown (click or touch) within draggable area
   */
  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
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
    },
    [coordinates, handlePointerMove, handlePointerUp]
  );

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  });

  return { videoRef, coordinates, draggingRef, handleResize };
};
