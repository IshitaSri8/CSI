import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RailTrend = ({ totalTrainsData, electricTrainsData }) => {
  const [chartData, setChartData] = useState({
    BaseChart: [],
  });

  useEffect(() => {
    // Map data to include only year in the label
    const totalTrainsDataPoints = totalTrainsData.map(({ year, count }) => ({
      label: year.toString(),
      x: new Date(year, 0), // Set the month and day to zero to represent only the year
      y: parseFloat(count),
    }));

    const electricTrainsDataPoints = electricTrainsData.map(
      ({ year, count }) => ({
        label: year.toString(),
        x: new Date(year, 0),
        y: parseFloat(count),
      })
    );

    const newChartData = {
      BaseChart: [
        {
          name: "Total Trains",
          type: "splineArea",
          showInLegend: true,
          dataPoints: totalTrainsDataPoints,
          color: "#26575D",
          markerSize: 5,
        },
        {
          name: "Electric Trains",
          type: "line",
          showInLegend: true,
          dataPoints: electricTrainsDataPoints,
          color: "#98C6CF",
          markerSize: 5,
        },
      ],
    };

    setChartData(newChartData);
  }, [totalTrainsData, electricTrainsData]);

  const baseChartOptions = {
    animationEnabled: true,
    theme: "light2",
    height: 300,
    title: {
      text: "Trains Trend Over the Past Decade",
      fontSize: 12,
      fontFamily: "DM Sans",
      fontWeight: "800",
    },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#26575D",
      tickColor: "#26575D",
      valueFormatString: "YYYY", // Show only year
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#26575D",
      tickColor: "#26575D",
      lineThickness: 1,
      title: "",
    },
    data: chartData["BaseChart"] || [],
    toolTip: {
      shared: true, // Allows shared tooltip for comparing data points
      content: "{name}: {y} trains",
    },
  };

  return (
    <div className="rail-trend-chart">
      <CanvasJSChart
        options={baseChartOptions}
        containerProps={{ width: "100%", height: "300px" }}
      />
    </div>
  );
};

export default RailTrend;
