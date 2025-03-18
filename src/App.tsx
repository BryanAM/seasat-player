import "./App.css";
import { useState } from "react";
import Navigation from "./components/navigation/navigation";
import Video from "./components/video/video";
import { useIsMobile } from "./hooks/useIsMobile";
import { useDraggable } from "./hooks/useDraggable";

function App() {
  const isMobile = useIsMobile();
  const [videoDimension, setVideoDimensions] = useState({
    height: 200,
    width: 300,
  });

  const { videoRef, coordinates, draggingRef } = useDraggable(
    videoDimension.height,
    videoDimension.width
  );

  return (
    <section className="flex flex-col bg-accent min-h-dvh">
      <Navigation isMobile={isMobile} />

      <Video
        ref={videoRef}
        dimensions={videoDimension}
        coordinates={coordinates}
        dragging={draggingRef.current}
      />
    </section>
  );
}

export default App;
