import React from "react";
import landing from "assets/landing3.mp4";
import { useRef } from "react";
import { useEffect } from "react";

const LandingVideo = () => {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Reduce playback speed
    }
  }, []); // Run this effect once when the component mounts
  return (
    <div className="w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source
          // src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737617468/CSI-videos/mb2okycoedpl8lca40zs.mp4"
          src={landing}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default LandingVideo;
