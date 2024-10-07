import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card } from "primereact/card";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Fare = () => {
    const colors = [
      "#26575D",
      "#1F8297",
      "#4D7479",
      "#4C9BAC",
      "#98C6CF",
      "#F7A47A",
      "#47B881",
      "#FFDD82",
      "#F64C4C",
      ];
  // 1. Average Fare per Transport Mode (Bar Chart)
  const averageFareOptions = {
    animationEnabled: true,
    title: {
      text: "Average Fare per Transport Mode",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisY: {
     // title: "Fare (in USD)",
      includeZero: false,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
     // title: "Transport Modes",
     labelFontSize: 10,
    },
    height: 200,
    width: 300,
    data: [
      {
        type: "column",
        dataPoints: [
            { label: "Road", y: 100, color: colors[0] },
            { label: "Rail", y: 550, color: colors[1] },
            { label: "Airways", y: 1200, color: colors[2] },
            { label: "Waterways", y: 1800, color: colors[3] },
        ],
      },
    ],
  };

  // 2. Fare Affordability Index (Line Chart)
  const fareAffordabilityOptions = {
    animationEnabled: true,
    title: {
      text: "Fare Affordability Index (as % of Average Income)",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    height: 200,
    width: 300,
    axisY: {
      //title: "% of Income",
      includeZero: false,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
     // title: "Years",
     labelFontSize: 10,
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { label: "2019", y: 5 },
          { label: "2020", y: 5.5 },
          { label: "2021", y: 6 },
          { label: "2022", y: 5.8 },
          { label: "2023", y: 6.1 },
        ],
        color: colors[4],
      },
    ],
  };

  // 3. Comparison of Fare Structures (Stacked Bar Chart)
  const fareStructureOptions = {
    animationEnabled: true,
    title: {
      text: "Fare Structures Across Transport Modes",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisY: {
     // title: "Fare (in USD)",
      includeZero: true,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
        labelFontSize: 10,
    },
    toolTip: {
      shared: true,
    },
    legend: {
        // horizontalAlign: "right",
        // verticalAlign: "center",
        fontSize: 8,
      },
    height: 200,
    width: 300,
    data: [
      {
        type: "stackedBar",
        name: "Base Fare",
        showInLegend: true,
        color: colors[5],
        dataPoints: [
          { label: "Road", y: 1.0 },
          { label: "Rail", y: 1.5 },
          { label: "Airways", y: 3.0 },
          { label: "Waterways", y: 1.2 },
        ],
      },
      {
        type: "stackedBar",
        name: "Peak Fare",
        showInLegend: true,
        color: colors[4],
        dataPoints: [
          { label: "Road", y: 0.5 },
          { label: "Rail", y: 0.8 },
          { label: "Airways", y: 2.7 },
          { label: "Waterways", y: 0.6 },
        ],
      },
    ],
  };

  return (
    <>
      {/* Row for Average Fare and Fare Affordability */}
      <div className="flex align-items-center justify-content-between flex-row gap-3">
        {/* 1. Average Fare per Transport Mode */}
        <Card className="w-full p-0 h-15rem">
          {/* <h1 className="m-0 p-1 text-lg">Average Fare per Transport Mode</h1> */}
          <CanvasJSChart options={averageFareOptions} />
          {/* <div className="flex align-items-start justify-content-between flex-row w-full">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              />
              <p className="text-green-500 text-xs p-0 m-0">
                5% increase in last one year.
              </p>
            </div>
            <CustomTooltip content={<CanvasJSChart options={averageFareOptions} />}>
              <InfoIcon style={{ height: "1.2rem", width: "1.2rem", color: "#00a269" }} />
            </CustomTooltip>
          </div> */}
        </Card>

        {/* 2. Fare Affordability Index */}
        <Card className="w-full h-15rem p-0">
          <CanvasJSChart options={fareAffordabilityOptions} />
        </Card>
        {/* 3. Comparison of Fare Structures */}
        <Card className="w-full h-15rem p-0">
          <CanvasJSChart options={fareStructureOptions} />
        </Card>
      </div>
    </>
  );
};

export default Fare;
