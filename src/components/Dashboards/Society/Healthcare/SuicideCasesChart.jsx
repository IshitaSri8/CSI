import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

export const SuicideCasesChart = ({ categories, series }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [drilldownData, setDrilldownData] = useState([]);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const colors = [
    "#1F8297", // Dark Cyan
    "#69ABB9",
    "#26575D",
    "#BAD8DF",
    "#4D7479", //Dusty Teal
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
    2023: [
      { ageGroup: "0-18", count: 170 },
      { ageGroup: "19-35", count: 500 },
      { ageGroup: "36-60", count: 335 },
      { ageGroup: "61+", count: 140 },
    ],
    2024: [
      { ageGroup: "0-18", count: 200 },
      { ageGroup: "19-35", count: 450 },
      { ageGroup: "36-60", count: 360 },
      { ageGroup: "61+", count: 200 },
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
      {/* Main Chart for Suicide Cases per Year */}
      {!selectedYear ? (
        <CanvasJSChart
          options={{
            animationEnabled: true,
            title: {
              text: "Suicide Cases per Year",
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontColor: "#001F23",
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
              tickLength: 0,
              lineThickness: 0,
            },
            dataPointWidth: 30,
            data: [
              {
                type: "column",
                name: "Suicide Cases",
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
              text: `Suicide Cases in ${selectedYear} by Age Group`,
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontColor: "#001F23",
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
              tickLength: 0,
              lineThickness: 0,
            },
            dataPointWidth: 30,
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
            height: 80,
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
