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
import Card3 from "../assets/card3.png";
import trend_ss from "assets/trend_ss.png";
import Laptop from "../assets/laptop.png";

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
        {/*Third Card*/}
        <div className="flex w-full m-4 block">
          {/* Image Column */}
          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={Card3}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "37rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <img
              src={trend_ss}
              alt="Small"
              style={{
                width: "30rem",
                height: "19rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            />
          </div>
          {/* Text Column */}
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div>
              <p className="text-white text-4xl">City Trends</p>
              <p className="text-white text-xl">
                Discover how your city has progressed over time. This feature
                allows you to explore past trends in sustainability, showing
                whether improvements have been made in key areas over months or
                years.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Landing;

{/* <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <SpaIcon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Nature
              </Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <Diversity3Icon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Society
              </Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <AccountBalanceIcon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Administration
              </Tag> */}