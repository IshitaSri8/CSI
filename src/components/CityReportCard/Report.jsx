import React, { useState } from "react";
import { Card } from "primereact/card";
import nature from "assets/Report/Nature.svg";
import admin from "assets/Report/Admin.svg";
import society from "assets/Report/Society.svg";
import overall from "assets/Report/Overall score.svg";
import Earth from "assets/Report/Earth.svg";
import AirQuality from "assets/Report/Air quality.svg";
import Climate from "assets/Report/Climate quality.svg";
import Water from "assets/Report/Water Management.svg";
import Fire from "assets/Report/Fire & energy.svg";
import CanvasJSReact from "@canvasjs/react-charts";

const CityReportCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = {
    Environment: {
      title: "Nature Metrics",
      data: [10, 80, 30, 3, 50, 78, 70, 60, 90, 80, 110, 90],
    },
    Social: {
      title: "Society Metrics",
      data: [15, 5, 25, 45, 55, 95, 75, 85, 105, 87, 115, 65],
    },
    Governance: {
      title: "Administration Metrics",
      data: [20, 10, 80, 50, 60, 70, 76, 40, 10, 110, 180, 130],
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const calculateCumulativeScores = (data) => {
  //   let cumulative = 0;
  //   return data.map((value) => {
  //     cumulative += value;
  //     return cumulative;
  //   });
  // };
  // // Assuming you have the scores for each category
  // const environmentScores = categories.Environment.data;
  // const socialScores = categories.Social.data;
  // const governanceScores = categories.Governance.data;

  // // Calculate cumulative scores for Pareto chart
  // const overallScores = environmentScores.map(
  //   (val, index) => val + socialScores[index] + governanceScores[index]
  // );
  // const cumulativeScores = calculateCumulativeScores(overallScores);

  const options = {
    animationEnabled: true,
    title: {
      text: "City Sustainability Metrics",
      fontFamily: "Montserrat",
      fontWeight: 800,
      fontSize: 15,
      padding: { bottom: 10 },
    },
    axisY: {
      title: "Score",
      gridThickness: 0,
      labelFontSize: 12,
    },
    axisX: {
      interval: 1,
      labelFontSize: 10,
      // labelFontFamily: "Montserrat",
    },
    height: 400,
    width: 750,
    dataPointWidth: 12,
    data: [
      {
        type: "column",
        name: "Nature",
        color: "#26575D",
        showInLegend: true,
        dataPoints: categories.Environment.data.map((val, index) => ({
          label: months[index],
          y: val,
        })),
        dataPointWidth: 10,
      },
      {
        type: "column",
        name: "Social",
        color: "#FFDD82",
        showInLegend: true,
        dataPoints: categories.Social.data.map((val, index) => ({
          label: months[index],
          y: val,
        })),
      },
      {
        type: "column",
        name: "Adminstration",
        color: "#1F8297",
        showInLegend: true,
        dataPoints: categories.Governance.data.map((val, index) => ({
          label: months[index],
          y: val,
        })),
      },
      // {
      //   type: "line",
      //   name: "Cumulative Score",
      //   showInLegend: true,
      //   dataPoints: cumulativeScores.map((val, index) => ({
      //     label: months[index],
      //     y: val,
      //   })),
      //   lineColor: "#FF0000",
      //   markerType: "circle",
      //   markerSize: 5,
      // },
    ],
  };

  return (
    <div className="flex flex-column p-4 gap-4 sec-theme">
      <div className="flex justify-content-around gap-4">
        {/* First Card */}
        <Card
          className="flex align-items-center justify-content-between p-2 w-20rem h-12rem"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 0 ? "#A2DBBF" : "#ffffff" }}
        >
          {hoveredIndex === 0 ? (
            <p className="font-semibold text-sm text-900">
              <img src={AirQuality} alt="nature" className="w-1.5rem mr-3" />
              Air Quality
              <br />
              <img src={Water} alt="nature" className="w-1.5rem mr-3" />
              Water Conservation & Preservation
              <br />
              <img src={Fire} alt="nature" className="w-1.5rem mr-3" />
              Fire & Energy
              <br />
              <img src={Earth} alt="nature" className="w-1.5rem mr-3" />
              Earth
              <br />
              <img src={Climate} alt="nature" className="w-1.5rem mr-3" />
              Climate Quality
            </p>
          ) : (
            <div>
              <div className="flex gap-8">
                <div className="flex flex-column align-items-start">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Nature
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">80</p>
                </div>
                <div className="flex align-items-start justify-content-end ml-5">
                  <img src={nature} alt="nature" className="w-5rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Second Card */}
        <Card
          className="flex align-items-center justify-content-between p-2 w-20rem h-12rem"
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 1 ? "#FFDD82" : "#ffffff" }}
        >
          {hoveredIndex === 1 ? (
            <p className="font-semibold text-sm text-900">
              <img src={AirQuality} alt="nature" className="w-1.5rem mr-3" />
              Housing
              <br />
              <img src={Water} alt="nature" className="w-1.5rem mr-3" />
              Healthcare
              <br />
              <img src={Fire} alt="nature" className="w-1.5rem mr-3" />
              Transport
              <br />
              <img src={Earth} alt="nature" className="w-1.5rem mr-3" />
              Cultural presentation
            </p>
          ) : (
            <div>
              <div className="flex gap-8">
                <div className="flex flex-column align-items-start">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Society
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">70</p>
                </div>
                <div className="flex align-items-start justify-content-end ml-5">
                  <img src={society} alt="society" className="w-5rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Third Card */}
        <Card
          className="flex align-items-center justify-content-between p-2 w-20rem h-12rem"
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 2 ? "#BAD8DF" : "#ffffff" }}
        >
          {hoveredIndex === 2 ? (
            // <ul className="list-none p-0 m-0">
            //   <li className="mb-2 text-lg font-semibold text-900">
            //     Government Schemes
            //   </li>
            //   <li className="mb-2 text-lg font-semibold text-900">
            //     Anti-corruption
            //   </li>
            //   <li className="mb-2 text-lg font-semibold text-900">
            //     Human Rights
            //   </li>
            // </ul>
            <p className="font-semibold text-sm text-900">
              <img src={AirQuality} alt="nature" className="w-1.5rem mr-3" />
              Government Schemes
              <br />
              <img src={Water} alt="nature" className="w-1.5rem mr-3" />
              Anti-corruption
              <br />
              <img src={Fire} alt="nature" className="w-1.5rem mr-3" />
              Human Rights
            </p>
          ) : (
            <div>
              <div className="flex gap-3">
                <div className="flex flex-column align-items-start">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Administration
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">60</p>
                </div>
                <div className="flex align-items-start justify-content-end">
                  <img src={admin} alt="Admin" className="w-5rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Fourth Card */}
        <Card
          className="flex align-items-center justify-content-between p-2 w-20rem h-12rem"
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 3 ? "#F7A47A" : "#ffffff" }}
        >
          {hoveredIndex === 3 ? (
            <div className="flex justify-content-center gap-2 align-items-center">
              <img src={nature} className="h-5rem" alt="nature" />
              <p>+</p>
              <img src={society} className="h-5rem" alt="society" />
              <p>+</p>
              <img src={admin} className="h-5rem" alt="admin" />
            </div>
          ) : (
            <div>
              <div className="flex">
                <div className="flex flex-column align-items-start">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Overall Score
                  </h2>
                  <p className="text-4xl font-bold text-theme mt-1 mb-0">70</p>
                </div>
                <div className="flex align-items-start justify-content-end ml-3">
                  <img src={overall} alt="Overall Score" className="w-5rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="flex">
        <div
          className="flex flex-column p-2 border-round-lg"
          style={{ flex: "70%" }}
        >
          <CanvasJSReact.CanvasJSChart options={options} />
        </div>
        <div className="flex flex-column pl-6" style={{ flex: "30%" }}>
          <p className="text-xl font-medium mt-0 mb-1">Summary</p>
          <div className="flex border-round bg-white px-3 mb-2">
            <p>
              The score 70 is combined output of all the indicators falling
              under SDG 11. This score indicates the actual picture of City
              Ayodhya and also the areas where improvements are required.
            </p>
          </div>
          <div className="flex border-round bg-white px-3 mb-2">
            <p>
              CSI serves as a benchmarking tool, allowing cities to compare
              their sustainability performance with peers regionally and
              globally, fostering healthy competition and knowledge exchange.
            </p>
          </div>
          <div className="flex border-round bg-white px-3">
            <p>
              CSI promotes integrated and balanced urban development strategies.
            </p>
          </div>
          <p className="text-xl font-medium mb-1">Areas of improvement</p>
          <div className="flex border-round bg-white px-3">
            <p>
              Air Quality
              <br />
              Green Space
              <br />
              Land use
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityReportCard;
