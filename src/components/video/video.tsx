function Video({ coordinates, ref, dragging, dimensions }) {
  return (
    <div
      role="dialog"
      aria-label="mini-player"
      ref={ref}
      className=" h-[220px] w-[300px] bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl fixed"
      style={{
        position: "fixed",
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
        transition: `${!dragging && "transform 500ms cubic-bezier(0.5,0,0,1)"}`,
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        // can cost in performance so use sparingly
        willChange: "transform",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <iframe
        className="rounded-t-2xl"
        width={dimensions.width}
        height="75%"
        src="https://scoutui.com:8888/embed_player?urlServer=wss://scoutui.com:8443&streamName=rtsp://hull36:pacific1@10.0.36.5:554/front-low?&mediaProviders=WebRTC&autoplay=true"
      />

      <div className="p-2 text-white">Draggable Area</div>
    </div>
  );
}

export default Video;
