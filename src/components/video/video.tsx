function Video({ coordinates, ref }) {
  return (
    <div
      className="h-[220px] w-[300px] bg-red-500 rounded-2xl fixed"
      style={{
        top: `${coordinates.y}px`,
        left: `${coordinates.x}px`,
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
