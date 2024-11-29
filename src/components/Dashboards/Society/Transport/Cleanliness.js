import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card } from "primereact/card";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = [
  "#98C6CF", // Light Blue
  "#1F8297", // Dark Cyan
  "#166c7d", // Dark Teal
  "#0F4B57", // Dark Slate Blue
  "#5B98A4", // Slate Blue
];

const cleanlinessOptions = {
  // 1. Cleanliness Rating (Bar Chart)
  cleanlinessRatingOptions: {
    animationEnabled: true,
    title: {
      text: "Rating for Transport Modes",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      includeZero: true,
      labelFontFamily: "Montserrat",
      maximum: 10,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
      labelFontSize: 10,
      labelFontFamily: "Montserrat",
    },

    data: [
      {
        type: "bar",
        dataPoints: [
          { label: "Road", y: 7, color: colors[0] },
          { label: "Rail", y: 8, color: colors[1] },
          { label: "Airways", y: 9, color: colors[2] },
          { label: "Waterways", y: 6, color: colors[3] },
        ],
      },
    ],
  },

  // 2. Frequency of Maintenance Activities (Line Chart)
  maintenanceFrequencyOptions: {
    animationEnabled: true,
    title: {
      text: "Frequency of Maintenance Activities per Year",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      includeZero: true,
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
        type: "line",
        dataPoints: [
          { label: "Jan", y: 2, color: colors[4] },
          { label: "Feb", y: 3, color: colors[4] },
          { label: "Mar", y: 2, color: colors[4] },
          { label: "Apr", y: 4, color: colors[4] },
          { label: "May", y: 3, color: colors[4] },
          { label: "Jun", y: 5, color: colors[4] },
          { label: "Jul", y: 3, color: colors[4] },
          { label: "Aug", y: 2, color: colors[4] },
          { label: "Sep", y: 4, color: colors[4] },
          { label: "Oct", y: 3, color: colors[4] },
          { label: "Nov", y: 2, color: colors[4] },
          { label: "Dec", y: 5, color: colors[4] },
        ],
      },
    ],
  },

  // 3. Cleanliness Adherence Percentage (Column Chart)
  adherenceOptions: {
    animationEnabled: true,
    title: {
      text: "Adherence Percentage per Transport Type",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#4C4C4C",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 150,
    axisY: {
      includeZero: true,
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
          { label: "Road", y: 85, color: colors[3] },
          { label: "Rail", y: 90, color: colors[2] },
          { label: "Airways", y: 95, color: colors[1] },
          { label: "Waterways", y: 80, color: colors[0] },
        ],
      },
    ],
  },
};

const Cleanliness = () => {
  return (
    <>
      {/* Row for Cleanliness Rating and Frequency of Maintenance */}
      <div className="flex align-items-center justify-content-between flex-row gap-3">
        {/* 1. Cleanliness Rating */}
        <Card className="w-full">
          {/* <h1 className="m-0 p-1 text-lg">Cleanliness Rating for Transport Modes</h1> */}
          <CanvasJSChart
            options={cleanlinessOptions.cleanlinessRatingOptions}
          />
        </Card>

        {/* 2. Frequency of Maintenance Activities */}
        <Card className="w-full">
          <CanvasJSChart
            options={cleanlinessOptions.maintenanceFrequencyOptions}
          />
        </Card>

        {/* 3. Cleanliness Adherence Percentage */}
        <Card className="w-full">
          <CanvasJSChart options={cleanlinessOptions.adherenceOptions} />
        </Card>
      </div>
    </>
  );
};

export default Cleanliness;
