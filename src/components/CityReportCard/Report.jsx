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
import transport from "assets/Report/transport.svg";
import Healthcare from "assets/Report/Healthcare.svg";
import Housing from "assets/Report/Housing.svg";
import Cultural from "assets/Report/Cultural preservation.svg";
import AntiCorruption from "assets/Report/Anti corruption.svg";
import GovtPol from "assets/Report/Government policies.svg";
import HumanRights from "assets/Report/Human Rights.svg";
import { Divider } from "primereact/divider";
import transparency from "assets/Report/Transparency and accountability.svg";
import community from "assets/Report/Community engagement and holistic wellbeing.svg";
import disaster from "assets/Report/disaster management.svg";
import ethical from "assets/Report/ethical leadership.svg";

const CityReportCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = {
    Environment: {
      title: "Nature Metrics",
      data: [60, 40, 30, 70, 55, 65, 45, 50, 40, 75, 80, 60],
    },
    Social: {
      title: "Society Metrics",
      data: [68, 81, 58, 44, 72, 37, 50, 68, 87, 48, 52, 40],
    },
    Governance: {
      title: "Administration Metrics",
      data: [40, 53, 82, 65, 69, 53, 32, 51, 82, 31, 53, 73],
    },
    Overall: {
      title: "Overall Score",
      data: [56, 58, 57, 60, 65, 52, 42, 56, 70, 51, 62, 58],
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
      labelFontSize: 10,
    },
    axisX: {
      interval: 1,
      labelFontSize: 10,
      // labelFontFamily: "Montserrat",
    },

    toolTip: {
      shared: true,
      cornerRadius: 4,
    },

    height: 300,
    width: 800,
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
        name: "Society",
        color: "#FFDD82",
        showInLegend: true,
        dataPoints: categories.Social.data.map((val, index) => ({
          label: months[index],
          y: val,
        })),
      },
      {
        type: "column",
        name: "Administration",
        color: "#1F8297",
        showInLegend: true,
        dataPoints: categories.Governance.data.map((val, index) => ({
          label: months[index],
          y: val,
        })),
      },
      {
        type: "line",
        name: "Overall Score",
        color: "red",
        showInLegend: true,
        dataPoints: categories.Overall.data.map((val, index) => ({
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
    <div className="flex flex-column p-2 gap-3 sec-theme">
      <div className="flex justify-content-around gap-3">
        {/* First Card */}
        <Card
          pt={{
            body: {
              className: "w-full",
            },
          }}
          className="flex align-items-center justify-content-between p-2 w-full h-12rem border-round-xl"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 0 ? "#A2DBBF" : "#ffffff" }}
        >
          {hoveredIndex === 0 ? (
            <div className="flex justify-content-between w-full">
              <div className="flex flex-column justify-content-start align-items-start w-full">
                <div className="flex gap-1">
                  <img src={AirQuality} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">Air Quality</p>
                </div>
                <div className="flex gap-1 align-items-center">
                  <img src={Earth} alt="nature" className="w-1.2rem" />
                  <p className="font-semibold text-xs text-900">Earth</p>
                </div>
                <div className="flex gap-1">
                  <img src={Fire} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Fire & Energy
                  </p>
                </div>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column justify-content-start align-items-start w-full">
                <div className="flex gap-1">
                  <img src={Water} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Water Management
                  </p>
                </div>
                <div className="flex gap-1">
                  <img src={Climate} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Climate Quality
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row align-items-start justify-content-between">
                <div className="flex flex-column align-items-start justify-content-between">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Nature
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">80</p>
                </div>
                <div className="flex align-items-start justify-content-end ml-5">
                  <img src={nature} alt="nature" className="w-4rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Sustaining our planets for future generations.
                </p>
              </div>
            </div>
          )}
        </Card>
        {/* Second Card */}
        <Card
          pt={{
            body: {
              className: "w-full",
            },
          }}
          className="flex align-items-center justify-content-between w-full h-12rem border-round-xl"
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 1 ? "#FFDD82" : "#ffffff" }}
        >
          {hoveredIndex === 1 ? (
            <div className="flex justify-content-between w-full">
              <div className="flex flex-column justify-content-start align-items-start w-full">
                <div className="flex gap-1">
                  <img src={Housing} alt="nature" className="w-1rem" />
                  <p className="font-semibold text-xs text-900">
                    City Planning
                  </p>
                </div>

                <div className="flex gap-1">
                  <img src={Healthcare} alt="nature" className="w-1rem" />
                  <p className="font-semibold text-xs text-900">
                    Basic Services
                  </p>
                </div>

                <div className="flex gap-1">
                  <img src={Cultural} alt="nature" className="w-1rem" />
                  <p className="font-semibold text-xs text-900">
                    Cultural Preservation
                  </p>
                </div>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column justify-content-center align-items-center w-full">
                <div className="flex gap-1 align-items-center">
                <img src={community} alt="nature" className="w-1rem" />
                  <p className="font-semibold text-xs text-900">
                    Employment Opportunities
                  </p>
                </div>

                <div className="flex gap-1 align-items-center ">
                <img src={community} alt="nature" className="w-1rem" />
                  <p className="font-semibold text-xs text-900">
                    Community Engagement & Holistic Well-Being
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex align-items-center justify-content-center flex-column w-full">
              <div className="flex flex-row align-items-start justify-content-between w-full gap-8">
                <div className="flex flex-column align-items-startjustify-content-between">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Society
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">80</p>
                </div>
                <div className="flex align-items-start justify-content-end">
                  <img src={society} alt="Admin" className="w-4rem" />
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm">
                  Empowering sustainable change, enriching diverse lives.
                </p>
              </div>
            </div>
          )}
        </Card>
        {/* Third Card */}
        <Card
          pt={{
            body: {
              className: "w-full",
            },
          }}
          className="flex align-items-center justify-content-between p-2 w-full h-12rem border-round-xl"
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
            <div className="flex justify-content-between w-full">
              <div className="flex flex-column justify-content-start align-items-start w-full">
                <div className="flex gap-1">
                  <img src={transparency} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Transparency and Accountability
                  </p>
                </div>

                <div className="flex gap-1">
                  <img src={ethical} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Ethical Leadership
                  </p>
                </div>

                <div className="flex gap-1">
                  <img src={disaster} alt="nature" className="w-1.5rem" />
                  <p className="font-semibold text-xs text-900">
                    Disaster Management
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row align-items-start justify-content-between">
                <div className="flex flex-column align-items-startjustify-content-between">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Administration
                  </h2>
                  <p className="text-4xl font-bold text-theme mb-0 mt-1">60</p>
                </div>
                <div className="flex align-items-start justify-content-end">
                  <img src={admin} alt="Admin" className="w-4rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Empowering responsible administration for lasting impact.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Fourth Card */}
        <Card
          pt={{
            body: {
              className: "w-full",
            },
          }}
          className="flex align-items-center justify-content-between p-2 w-full h-12rem border-round-xl"
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ background: hoveredIndex === 3 ? "#F7A47A" : "#ffffff" }}
        >
          {hoveredIndex === 3 ? (
            <div className="flex justify-content-center gap-3 align-items-center">
              <img src={nature} className="h-5rem" alt="nature" />
              <p>+</p>
              <img src={society} className="h-5rem" alt="society" />
              <p>+</p>
              <img src={admin} className="h-5rem" alt="admin" />
            </div>
          ) : (
            <div>
              <div className="flex flex-row align-items-start justify-content-between">
                <div className="flex flex-column align-items-start">
                  <h2 className="text-2xl font-semibold text-900 mb-0 mt-0">
                    Overall Score
                  </h2>
                  <p className="text-4xl font-bold text-theme mt-1 mb-0">70</p>
                </div>
                <div className="flex align-items-start justify-content-end ml-3">
                  <img src={overall} alt="Overall Score" className="w-4rem" />
                </div>
              </div>
              <div>
                <p className="text-sm">
                  Shaping a Sustainable Future through NSA Dimensions.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className="flex">
        <div
          className="flex flex-column border-round-2xl"
          style={{ flex: "70%" }}
        >
          <Card className="border-round-xl h-full">
            <CanvasJSReact.CanvasJSChart options={options} />
          </Card>
        </div>
        <div className="flex flex-column pl-4" style={{ flex: "30%" }}>
          <p className="text-xl font-medium mt-0 mb-1">Summary</p>
          <div className="flex border-round bg-white px-3 mb-2">
            <p>
              While the city has made strides in waste management and urban
              greening, air pollution and water conservation remain critical
              challenges.
            </p>
          </div>
          <div className="flex border-round bg-white px-3 mb-2">
            <p>
              The city has made considerable progress in enhancing cultural
              heritage and public well-being, but there is room for improvement
              in ensuring equitable access to services for all citizens.
            </p>
          </div>
          <div className="flex border-round bg-white px-3">
            <p>
              The city's governance is progressive, particularly in
              environmental monitoring and data-driven decision-making. Yet,
              efforts to increase administrative efficiency and public
              participation must continue.
            </p>
          </div>
          <p className="text-xl font-medium mb-1">Areas of improvement</p>
          <div className="flex border-round bg-white px-3">
            <p>Air Quality, Green Space, and Land Use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityReportCard;
