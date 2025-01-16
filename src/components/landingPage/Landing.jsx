import { Button } from "primereact/button";
import React from "react";
import MySvgImage from "assets/Landing Page revised illustration 1.svg";
import Nature from "assets/ills/nature.svg";
import Society from "assets/ills/society.svg";
import Admin from "assets/ills/admin.svg";
import { Carousel } from "primereact/carousel";

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
      imageSrc: MySvgImage,
      isButtonVisible: false,
    },
    {
      title: "Dimensions of CSI",
      heading: "Society",
      description: "Empowering sustainable changes, enriching diverse lives.",
      imageSrc: MySvgImage,
      isButtonVisible: false,
    },
    {
      title: "Dimensions of CSI",
      heading: "Administration",
      description: "Empowering responsible administration for lasting impact.",
      imageSrc: MySvgImage,
      isButtonVisible: false,
    },
  ];

  return (
    <>
      <Carousel
        value={items}
        itemTemplate={renderCarouselItem}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={20000}
      />
      {/* Main Content */}
      <div
        className="flex flex-column gap-1 mt-5 align-items-center md:flex-wrap"
        style={{ textAlign: "center" }}
      >
        <p className="text-4xl text-primary1 m-0 p-0 font-bold">
          City Sustainability Index
        </p>
        <p className="text-4xl text-primary1 m-0 p-0 font-medium">
          Measuring and Boosting Urban Sustainability
        </p>
        <p className="text-xl text font-medium">
          Empowering governments, businesses and citizens to track and improve
          urban sustainability for a greener future.
        </p>

        <Button
          label="Explore More"
          icon="pi pi-globe"
          className="bg-primary1 mb-3"
          raised
          // onClick={scrollToCSISteps} // Add onClick handler
        />

        {/* Landing SVG Image */}
        <img className="w-full" src={MySvgImage} alt="Landing Illustration" />
      </div>
    </>
  );
};

export default Landing;
