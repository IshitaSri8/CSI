import React from "react";
import Nature from "assets/ills/nature.svg";
import Society from "assets/ills/society.svg";
import Admin from "assets/ills/admin.svg";
import { Carousel } from "primereact/carousel";
import MySvgImage from "assets/Landing Page revised illustration 1.svg";
import nature_video from "assets/ills/nature_video.mp4";
import csi_video from "assets/ills/csi.mp4";
import society_video from "assets/ills/society.mp4";
import admin_video from "assets/ills/admin.mp4";

const Landing = () => {
  // Template function to render carousel items
  const renderCarouselItem = (item) => {
    const { title, heading, description, imageSrc } = item;
    return (
      <div className="flex flex-column align-items-center p-2 gap-1 w-full">
        <p className="text-4xl text-primary1 m-0 p-1 font-bold">{title}</p>
        <p className="text-3xl text-primary1 m-0 p-0 font-medium">{heading}</p>
        <p className="text-lg text font-medium m-0 p-0">{description}</p>
        {imageSrc && (
          <img src={imageSrc} alt={title} style={{ width: "50rem" }} />
        )}
      </div>
    );
  };

  const items = [
    {
      title: "City Sustainability Index",
      heading: "Measuring and Boosting Urban Sustainability.",
      description:
        "Empowering governments, businesses and citizens to track and improve urban sustainability for a greener future.",
      imageSrc: MySvgImage,
      isButtonVisible: true,
    },
    {
      title: "Dimensions of CSI",
      heading: "Nature",
      description: "Sustaining our planets for future generations.",
      imageSrc: Nature,
      isButtonVisible: false,
    },
    {
      title: "Dimensions of CSI",
      heading: "Society",
      description: "Empowering sustainable changes, enriching diverse lives.",
      imageSrc: Society,
      isButtonVisible: false,
    },
    {
      title: "Dimensions of CSI",
      heading: "Administration",
      description: "Empowering responsible administration for lasting impact.",
      imageSrc: Admin,
      isButtonVisible: false,
    },
  ];

  const renderCarouselItem1 = (item) => {
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

  const items1 = [
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
    <div className="flex flex-column gap-4">
      <Carousel
        value={items}
        itemTemplate={renderCarouselItem}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={20000}
      />
      <Carousel
        value={items1}
        itemTemplate={renderCarouselItem1}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={20000}
      />
    </div>
  );
};

export default Landing;
