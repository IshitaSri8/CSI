import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card } from "primereact/card";
import CustomTooltip from "./CustomTooltip"; // Adjust path as needed
import InfoIcon from "@mui/icons-material/Info";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

const cleanlinessOptions = {
  // 1. Cleanliness Rating (Bar Chart)
  cleanlinessRatingOptions: {
    animationEnabled: true,
    title: {
      text: "Cleanliness Rating for Transport Modes",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisY: {
    //  title: "Rating (0–10)",
      includeZero: true,
      maximum: 10,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
    //  title: "Transport Modes",
      labelFontSize: 10,

    },
   
    data: [
      {
        type: "column",
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
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisY: {
    //  title: "Frequency (Number of Activities)",
      includeZero: true,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
    //  title: "Months",
      labelFontSize: 10,
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
      text: "Cleanliness Adherence Percentage per Transport Type",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisY: {
    //  title: "Adherence Percentage (%)",
      includeZero: true,
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
      //title: "Transport Types",
      labelFontSize: 10,
    },
   
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Road", y: 85, color: colors[5] },
          { label: "Rail", y: 90, color: colors[6] },
          { label: "Airways", y: 95, color: colors[7] },
          { label: "Waterways", y: 80, color: colors[8] },
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
          <CanvasJSChart options={cleanlinessOptions.cleanlinessRatingOptions} />
        </Card>

        {/* 2. Frequency of Maintenance Activities */}
        <Card className="w-full">
          <CanvasJSChart options={cleanlinessOptions.maintenanceFrequencyOptions} />
          {/* <div className="flex align-items-start justify-content-between flex-row w-full">
            <CustomTooltip content={<CanvasJSChart options={cleanlinessOptions.maintenanceFrequencyOptions} />}>
              <InfoIcon style={{ height: "1.2rem", width: "1.2rem", color: "#00a269" }} />
            </CustomTooltip>
          </div> */}
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
