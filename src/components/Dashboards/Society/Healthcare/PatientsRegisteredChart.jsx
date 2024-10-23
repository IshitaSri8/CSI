import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

export const PatientsRegisteredChart = ({ categories, series }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [drilldownData, setDrilldownData] = useState([]);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const colors = [
    "#FFDD82", // Light Yellow
    "#47B881", // Green
    "#F7A47A", // Light Orange
    "#4D7479", //Dusty Teal
    "#98C6CF", // Light Blue
    "#1F8297", // Dark Cyan
    "#166c7d", // Dark Teal
    "#0F4B57", // Dark Slate Blue
    "#5B98A4", // Slate Blue
    "#F64C4C", // Red
    "#8AB5BE", // Soft Blue-Green
    "#B9D2D8", // Pale Cyan
    "#E9F3F5", // Very Light Cyan
  ];

  const ageGroupData = {
    2020: [
      { ageGroup: "0-18", count: 120 },
      { ageGroup: "19-35", count: 450 },
      { ageGroup: "36-60", count: 300 },
      { ageGroup: "61+", count: 150 },
    ],
    2021: [
      { ageGroup: "0-18", count: 130 },
      { ageGroup: "19-35", count: 460 },
      { ageGroup: "36-60", count: 310 },
      { ageGroup: "61+", count: 160 },
    ],
    2022: [
      { ageGroup: "0-18", count: 140 },
      { ageGroup: "19-35", count: 470 },
      { ageGroup: "36-60", count: 320 },
      { ageGroup: "61+", count: 170 },
    ],
  };

  // Function to handle click events on main chart points (for drilldown)
  const handlePointClick = (e) => {
    const year = e.dataPoint.label; // Get the clicked year (X-axis label)
    setSelectedYear(year);
    setDrilldownData(ageGroupData[year]);
  };

  return (
    <div className="w-full flex flex-column">
      {/* Main Chart for Registered Patients per Year */}
      {!selectedYear ? (
        <CanvasJSChart
          options={{
            animationEnabled: true,
            title: {
              text: "Registered Patients per Year",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: "500",
              fontColor: "black",
              horizontalAlign: "left",
              padding: { bottom: 20 },
            },
            axisY: {
              includeZero: true,
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
                type: "column",
                name: "Registered Patients",
                click: handlePointClick, // Trigger drilldown on click
                dataPoints: categories.map((year, index) => ({
                  label: year,
                  y: series[index],
                  color: colors[index % colors.length],
                  indexLabel: `{y}`,
                  indexLabelFontSize: 10,
                  indexLabelPlacement: "outside",
                  indexLabelFontFamily: "Montserrat",
                })),
              },
            ],
          }}
          containerProps={{
            width: "100%",
            height: 200,
          }}
        />
      ) : (
        // Drilldown Chart for Age Group Details
        <CanvasJSChart
          options={{
            animationEnabled: true,
            title: {
              text: `Patients Registered in ${selectedYear} by Age Group`,
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontColor: "black",
              horizontalAlign: "left",
              padding: { bottom: 20 },
            },
            axisY: {
              includeZero: true,
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
                type: "column",
                name: "Age Group",
                dataPoints: drilldownData.map((group) => ({
                  label: group.ageGroup,
                  y: group.count,
                  indexLabel: `{y}`,
                  indexLabelFontSize: 10,
                  indexLabelPlacement: "outside",
                  indexLabelFontFamily: "Montserrat",
                  color: colors[group % colors.length],
                })),
              },
            ],
          }}
          containerProps={{
            width: "100%",
            height: 200,
          }}
        />
      )}

      {/* Button to go back to the main chart from the drilldown */}
      {selectedYear && (
        <button
          onClick={() => setSelectedYear(null)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#1f8297",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Yearly Data
        </button>
      )}
    </div>
  );
};
