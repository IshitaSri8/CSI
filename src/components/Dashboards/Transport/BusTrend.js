import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BusTrend = ({ totalBusesData, electricBusesData }) => {
  const [chartData, setChartData] = useState({
    BaseChart: [],
  });

  useEffect(() => {
    // Map data to include only year in the label
    const totalBusesDataPoints = totalBusesData.map(({ year, count }) => ({
      label: year.toString(),
      x: new Date(year, 0), // Set the month and day to zero to represent only the year
      y: parseFloat(count),
    }));

    const electricBusesDataPoints = electricBusesData.map(
      ({ year, count }) => ({
        label: year.toString(),
        x: new Date(year, 0),
        y: parseFloat(count),
      })
    );

    const newChartData = {
      BaseChart: [
        {
          name: "Total Public Transport",
          type: "splineArea",
          showInLegend: true,
          dataPoints: totalBusesDataPoints,
          color: "#26575D",
          markerSize: 5,
        },
        {
          name: "Public Transport Using Renewable Energy",
          type: "line",
          showInLegend: true,
          dataPoints: electricBusesDataPoints,
          color: "#98C6CF",
          markerSize: 5,
        },
      ],
    };

    setChartData(newChartData);
  }, [totalBusesData, electricBusesData]);

  const baseChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Transportion Trend Over the Past Decade",
      fontSize: 12,
      fontFamily: "DM Sans",
      fontWeight: "800",
    },
    axisX: {
      labelFontColor: "#E9F3F5",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      valueFormatString: "YYYY", // Show only year
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#E9F3F5",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
      title: "",
    },
    data: chartData["BaseChart"] || [],
    toolTip: {
      shared: true, // Allows shared tooltip for comparing data points
      content: "{name}: {y}",
    },
  };

  return (
    <div className="bus-trend-chart">
      <CanvasJSChart
        options={baseChartOptions}
        containerProps={{ width: "100%", height: 200 }}
      />
    </div>
  );
};

export default BusTrend;
