import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import landing from "assets/landing_page.mp4";

const LandingVideo = () => {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Reduce playback speed
    }
  }, []); // Run this effect once when the component mounts
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      style={
        {
          // position: "relative",
          // width: "100%",
          // height: "100%",
          // objectFit: "contain",
        }
      }
    >
      <source
        // src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737617468/CSI-videos/mb2okycoedpl8lca40zs.mp4"
        // src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1738141276/CSI-videos/db7qssegrcy6yxuybsas.mp4"
        // src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1738143177/CSI-videos/bwd4mh2hbstjv8hkgud8.mp4"
        src={landing}
        type="video/mp4"
      />
    </video>
  );
};

export default LandingVideo;
