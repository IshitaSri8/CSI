import React from "react";

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
        <source
          src="https://res.cloudinary.com/dqbjijwmy/video/upload/v1737609058/CSI-videos/pjbjqbmdazd41so7vscy.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default LandingVideo;
