import "./App.css";
import { useState } from "react";
import Navigation from "./components/navigation/navigation";
import Video from "./components/video/video";
import { useDraggable } from "./hooks/useDraggable";

const DEFAULT_PLAYER_HEIGHT = 200;
const DEFAULT_PLAYER_WIDTH = 300;

function App() {
  const [videoDimension, setVideoDimensions] = useState({
    height: DEFAULT_PLAYER_HEIGHT,
    width: DEFAULT_PLAYER_WIDTH,
  });

  const {
    videoRef,
    coordinates,
    draggingRef,
    handleResize,
    unlockPosition,
    lockPosition,
  } = useDraggable(videoDimension.height, videoDimension.width);

  return (
    <section className="flex flex-col bg-accent min-h-dvh">
      <Navigation />

      <Video
        ref={videoRef}
        dimensions={videoDimension}
        coordinates={coordinates}
        dragging={draggingRef.current}
        setPlayerSize={setVideoDimensions}
        handleResize={handleResize}
        unlockPosition={unlockPosition}
        lockPosition={lockPosition}
      />
    </section>
  );
}

export default App;
