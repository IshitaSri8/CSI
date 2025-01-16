import { Carousel } from "primereact/carousel";
import React from "react";
import nature_video from "assets/ills/nature_video.mp4";
import csi_video from "assets/ills/csi.mp4";
import society_video from "assets/ills/society.mp4";
import admin_video from "assets/ills/admin.mp4";

const LandingCarousel = () => {
  const renderCarouselItem = (item) => {
    const { title, heading, videoSrc } = item;
    return (
      <div
        className="flex flex-column align-items-center md:flex-wrap container"
        style={{ textAlign: "center" }}
      >
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          className="w-full"
          style={{ position: "absolute" }}
        />
        <p
          className=" text-primary1 text-8xl m-0 p-0"
          style={{
            mixBlendMode: "screen",
            height: "100%",
            width: "100%",
            fontWeight: 1000,
            position: "relative",
            // top: "50%",
            zIndex: 1000,
            background: "white",
          }}
        >
          {title} <br />
          <span className="text-6xl">{heading} </span>
        </p>
      </div>
    );
  };

  const items = [
    {
      title: "City Sustainability Index",
      heading: "Measuring and Boosting Urban Sustainability.",
      videoSrc: csi_video,
    },
    {
      title: "NATURE",
      heading: "Sustaining our planets for future generations.",
      videoSrc: nature_video,
    },
    {
      title: "SOCIETY",
      heading: "Empowering sustainable changes, enriching diverse lives.",
      videoSrc: society_video,
    },
    {
      title: "ADMINISTRATION",
      heading: "Empowering responsible administration for lasting impact.",
      videoSrc: admin_video,
    },
  ];

  return (
    <Carousel
      value={items}
      itemTemplate={renderCarouselItem}
      numVisible={1}
      numScroll={1}
      circular
      autoplayInterval={10000}
    />
  );
};

export default LandingCarousel;
