function Video({ coordinates, ref }) {
  return (
    <div
      className="h-[220px] w-[300px] bg-red-500 rounded-2xl fixed"
      style={{
        position: "fixed",
        transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
        width: "300px",
        height: "200px",
        backgroundColor: "red",
        transition: "transform 200ms cubic-bezier(.66,.23,.38,1.04)", // Adjust timing/easing as needed
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      role="dialog"
      ref={ref}
    >
      <iframe
        className="rounded-t-2xl"
        src="https://scoutui.com:8888/embed_player?urlServer=wss://scoutui.com:8443&streamName=rtsp://hull36:pacific1@10.0.36.5:554/front-low?&mediaProviders=WebRTC&autoplay=true"
      />

      <div className="p-2">Other things down here</div>
    </div>
  );
}

export default Video;
