import { Carousel } from "primereact/carousel";
import React from "react";
import Landing from "./Landing";
import Parameters from "./Parameters";

const LandingCarousel = () => {
  const componentsData = [
    { content: <Landing /> },
    { content: <Parameters /> },
  ];

  // Template function for rendering each item
  const itemTemplate = (data) => (
    <div
      className="flex flex-column align-items-center justify-content-center md:flex-wrap overflow-auto w-full"
      style={{ marginTop: 80 }}
    >
      {data.content}
    </div>
  );

  return (
    <Carousel
      value={componentsData}
      itemTemplate={itemTemplate}
      numVisible={1}
      numScroll={1}
      circular
      autoplayInterval={5000}
    />
  );
};

export default LandingCarousel;
