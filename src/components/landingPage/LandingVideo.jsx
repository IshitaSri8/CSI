import React from "react";
import csi_video from "assets/videos/csi_new.mp4";

const LandingVideo = () => {
  return (
    <div className="w-full h-screen">
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={csi_video} type="video/mp4" />
      </video>
    </div>
  );
};

export default LandingVideo;
