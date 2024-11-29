import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card } from "primereact/card";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Fare = () => {
  const colors = [
    "#98C6CF", // Light Blue
    "#1F8297", // Dark Cyan
    "#166c7d", // Dark Teal
    "#0F4B57", // Dark Slate Blue
    "#5B98A4", // Slate Blue
  ];
  // 1. Average Fare per Transport Mode (Bar Chart)
  const averageFareOptions = {
    animationEnabled: true,
    title: {
      text: "Average Fare per Transport Mode",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      includeZero: false,
      labelFontFamily: "Montserrat",
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },

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
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      includeZero: false,
      gridThickness: 0,
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },
    axisX: {
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
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
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      // title: "Fare (in USD)",
      includeZero: true,
      gridThickness: 0,
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },
    axisX: {
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      horizontalAlign: "left",
      // verticalAlign: "center",
      fontSize: 8,
      fontFamily: "Montserrat",
      fontWeight: 400,
    },

    data: [
      {
        type: "stackedBar",
        name: "Base Fare",
        showInLegend: true,
        color: colors[0],
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
        color: colors[1],
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
      <div className="flex align-items-center justify-content-between gap-3">
        {/* 1. Average Fare per Transport Mode */}
        <Card className="w-full">
          {/* <h1 className="m-0 p-1 text-lg">Average Fare per Transport Mode</h1> */}
          <CanvasJSChart options={averageFareOptions} />
        </Card>

        {/* 2. Fare Affordability Index */}
        <Card className="w-full">
          <CanvasJSChart options={fareAffordabilityOptions} />
        </Card>
        {/* 3. Comparison of Fare Structures */}
        <Card className="w-full">
          <CanvasJSChart options={fareStructureOptions} />
        </Card>
      </div>
    </>
  );
};

export default Fare;
