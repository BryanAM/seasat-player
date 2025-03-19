import { Fullscreen } from "lucide-react";
import { useState } from "react";

interface VideoPropTypes {
  coordinates: { x: number; y: number };
  ref: React.Ref<HTMLDivElement> | undefined;
  dragging: boolean;
  dimensions: { height: number; width: number };
  setPlayerSize: React.Dispatch<
    React.SetStateAction<{
      height: number;
      width: number;
    }>
  >;
  handleResize: () => void;
  unlockPosition: () => void;
  lockPosition: () => void;
}

function Video({
  coordinates,
  ref,
  dragging,
  dimensions,
  handleResize,
  unlockPosition,
  lockPosition,
}: VideoPropTypes) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    setIsFullScreen((prev) => {
      if (prev) {
        unlockPosition();
        handleResize();
      } else {
        lockPosition();
        coordinates.x = 0;
        coordinates.y = 0;
      }

      return !prev;
    });
  };

  const baseStyle = {
    position: "fixed",
    transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
    transition: !dragging
      ? "transform 500ms cubic-bezier(0.5,0,0,1)"
      : undefined,
    height: `${dimensions.height}px`,
    width: `${dimensions.width}px`,
    cursor: "pointer",
    userSelect: "none",
    touchAction: "none",
    willChange: "transform",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  const fullscreenOverrides = isFullScreen
    ? {
        position: "static",
        flex: "1 1 0%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // you can also override transform, transition, etc.
      }
    : {};

  const combined = {
    ...baseStyle,
    ...fullscreenOverrides,
  } as React.CSSProperties;

  return (
    <div
      role="dialog"
      aria-label="mini-player"
      ref={ref}
      className=" h-[220px] w-[300px] bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl fixed"
      style={combined}
    >
      <iframe
        className="rounded-t-2xl grow"
        width={isFullScreen ? "100%" : dimensions.width}
        height="75%"
        src="https://scoutui.com:8888/embed_player?urlServer=wss://scoutui.com:8443&streamName=rtsp://hull36:pacific1@10.0.36.5:554/front-low?&mediaProviders=WebRTC&autoplay=true"
      />

      <div className="p-2 text-white flex justify-between items-center">
        <button
          className="bg-transparent p-1 hover:cursor-pointer hover:scale-110 transition-transform duration-100 ease-linear"
          title="full screen"
          onClick={() => handleToggleFullScreen()}
        >
          <Fullscreen aria-lable="fullscreen" />
        </button>
        Mini Player Drag Area
      </div>
    </div>
  );
}

export default Video;
