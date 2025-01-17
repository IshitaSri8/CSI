import React from "react";
import nature from "assets/Report/Nature.svg";
import { PieChart } from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import aqi from "assets/illustration/aqi1.svg";
import water from "assets/illustration/water1.svg";
import land from "assets/illustration/land1.svg";
import waste from "assets/illustration/waste1.svg";
import Rainfall from "assets/illustration/Rainfall1.svg";
import Temperature from "assets/illustration/temperature1.svg";
import { useNavigate } from "react-router-dom";
import pathConstants from "pathConstants";
import score from "score";

const Nature = () => {
  const navigate = useNavigate();
  const natureLables = [
    "AQI",
    "Water Management",
    "Land Usage",
    "Waste Management",
    "Green Coverage",
    "Fire & Energy",
    "GHG Emission",
  ];
  const natureData = [20, 15, 10, 10, 15, 10, 20];

  const metrics = [
    {
      img: aqi,
      title: "Air Quality",
      score: score.AQI,
      path: pathConstants.AQI,
    },
    {
      img: water,
      title: "Water Management",
      score: score.WATER,
      path: pathConstants.WATER,
    },
    {
      img: waste,
      title: "Waste Management",
      score: score.WASTE,
      path: pathConstants.WASTE,
    },
    {
      img: land,
      title: "Land Usage",
      score: score.LAND,
      path: pathConstants.LAND,
    },
    {
      img: Temperature,
      title: "Temperature",
      score: score.TEMP,
      path: pathConstants.TEMP,
    },
    {
      img: Rainfall,
      title: "Rainfall",
      score: score.RAIN,
      path: pathConstants.RAIN,
    },
  ];

  // Function to determine background color based on score
  const getScoreBackgroundColor = (score) => {
    if (score >= 81 && score <= 100) {
      return "#0C9D61"; // Green for good
    } else if (score >= 41 && score <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (score >= 0 && score <= 40) {
      return "#E62225"; // Red for poor
    }
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-column p-4 gap-4">
      <div className="flex gap-4">
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 justify-content-around p-4"
          style={{ flex: "22%" }}
        >
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-4">
              <p className="card-title p-0 m-0 text-xl">Nature</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.NATURE}
              </p>
            </div>
            <img src={nature} alt="nature" className="w-4rem" />
          </div>
            <p className="text-tertiary3">
              Sustaining our planets for future generations.
            </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={natureLables}
            series={natureData}
            height={140}
            fontSize={8}
          />
        </div>
        <div className="flex flex-column" style={{ flex: "50%" }}>
          <div className="flex flex-column border-round-2xl bg-white p-3">
            <p className="text-xl font-medium">Summary</p>
            <p className="p-0 m-0">
              The score {score.NATURE} reflects the combined performance of the
              key environmental indicators.
            </p>
            <Divider />
            <p className="p-0 m-0">
              Nature's outstanding performance showcase exceptional efforts
              towards ensuring a sustainable future.
            </p>
            <Divider />
            <p className="text-lg font-medium">Indicator Highlights:</p>
            <p className="p-0 m-0">1. Achiever indicators: Temperature</p>
            <p className="p-0 m-0">
              2. Areas of Improvement: Water Management, Waste Management
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap w-full">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="cardMetric flex bg-white border-round-2xl shadow-2"
            onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
            style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
          >
            <div className="flex flex-column gap-3 align-items-center">
              <img src={metric.img} alt={metric.title} />
              <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-lg w-16rem text-center">
                {metric.title}
              </p>
            </div>
            <div
              className="flex border-round-right-2xl px-4 flex-column gap-8 py-2"
              style={{
                backgroundColor: getScoreBackgroundColor(metric.score),
                // padding: "1.6rem",
              }}
            >
              <p className="font-medium p-0 m-0 text-white text-sm text-left">
                SCORE
              </p>
              <p className="text-5xl font-semibold text-white p-0 m-0 text-center">
                {metric.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nature;
