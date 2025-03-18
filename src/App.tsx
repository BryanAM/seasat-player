import "./App.css";
import { useState } from "react";
import Navigation from "./components/navigation/navigation";
import Video from "./components/video/video";
import { useDraggable } from "./hooks/useDraggable";

function App() {
  const [videoDimension, setVideoDimensions] = useState({
    height: 200,
    width: 300,
  });

  const { videoRef, coordinates, draggingRef, handleResize } = useDraggable(
    videoDimension.height,
    videoDimension.width
  );

  return (
    <section className="flex flex-col bg-accent min-h-dvh">
      <Navigation />

      <Video
        ref={videoRef}
        dimensions={videoDimension}
        coordinates={coordinates}
        dragging={draggingRef.current}
        setPlayerSize={setVideoDimensions}
        setOrigin={handleResize}
      />
    </section>
  );
}

export default App;
