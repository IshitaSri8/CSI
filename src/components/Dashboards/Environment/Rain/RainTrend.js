import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import { Button } from "primereact/button";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RainTrend = ({
  rainYears,
  yearAverageRainActual,
  yearAverageRainExpected,
  selectedYear,
  setSelectedYear,
  monthRainActual,
  monthRainExpected,
}) => {
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [baseChartOptions, setBaseChartOptions] = useState({});
  const [drilldownChartOptions, setDrilldownChartOptions] = useState({});

  useEffect(() => {
    // Base chart setup with year-wise actual and expected average rainfall
    const actualDataPoints = rainYears.map((year) => ({
      label: year.toString(),
      y: parseFloat(yearAverageRainActual[year]),
    }));

    const expectedDataPoints = rainYears.map((year) => ({
      label: year.toString(),
      y: parseFloat(yearAverageRainExpected[year]),
    }));

    setBaseChartOptions({
      animationEnabled: true,
      theme: "light2",
      height: 200,
      legend: {
        fontSize: 10,
      },
      title: {
        text: "Rainfall Trend Over Years",
        fontSize: 15,
        fontFamily: "DM Sans",
        fontWeight: "800",
      },
      axisX: {
        interval: 1,
        labelFontColor: "#717171",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
      },
      axisY: {
        includeZero: false,
        gridThickness: 0,
        labelFontColor: "#717171",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
        lineThickness: 1,
      },
      data: [
        {
          type: "line",
          name: "Actual Rainfall",
          showInLegend: true,
          dataPoints: actualDataPoints,
          click: handleYearClick, // Handle clicks for drilldown
        },
        {
          type: "line",
          name: "Expected Rainfall",
          showInLegend: true,
          dataPoints: expectedDataPoints,
          click: handleYearClick,
        },
      ],
    });
  }, [rainYears, yearAverageRainActual, yearAverageRainExpected]);

  useEffect(() => {
    // Drilldown chart setup for selected year
    if (isDrilldown && selectedYear) {
      const actualDataPoints = monthRainActual.map((data) => ({
        label: `Month ${data.month}`,
        y: parseFloat(data.actual),
      }));

      const expectedDataPoints = monthRainExpected.map((data) => ({
        label: `Month ${data.month}`,
        y: parseFloat(data.expected),
      }));

      setDrilldownChartOptions({
        animationEnabled: true,
        theme: "light2",
        height: 200,
        legend: {
          fontSize: 10,
        },
        title: {
          text: `Rainfall Trend Over Months for ${selectedYear}`,
          fontSize: 15,
          fontFamily: "DM Sans",
          fontWeight: "800",
        },
        axisX: {
          title: "Month",
          interval: 1,
          labelFontColor: "#717171",
          lineColor: "#a2a2a2",
          tickColor: "#a2a2a2",
        },
        axisY: {
          includeZero: false,
          gridThickness: 0,
          labelFontColor: "#717171",
          lineColor: "#a2a2a2",
          tickColor: "#a2a2a2",
          lineThickness: 1,
        },
        data: [
          {
            type: "line",
            name: "Actual Rainfall",
            showInLegend: true,
            dataPoints: actualDataPoints,
          },
          {
            type: "line",
            name: "Expected Rainfall",
            showInLegend: true,
            dataPoints: expectedDataPoints,
          },
        ],
      });
    }
  }, [isDrilldown, selectedYear, monthRainActual, monthRainExpected]);

  const handleYearClick = (e) => {
    const year = parseInt(e.dataPoint.label);

    if (!isNaN(year)) {
      setSelectedYear(year);
      setIsDrilldown(true);
      console.log("Drilldown triggered for year:", year); // Confirm drilldown
    } else {
      console.error("Invalid year selected:", e.dataPoint.label);
    }
  };

  const handleBackClick = () => {
    setIsDrilldown(false);
  };
  const backButtonClassName = isDrilldown ? "" : "invisible";

  return (
    <div>
      {isDrilldown && <Button label="Back" onClick={handleBackClick}></Button>}
      <CanvasJSChart
        options={isDrilldown ? drilldownChartOptions : baseChartOptions}
        containerProps={{ height: 200, width: "100%" }}
      />
    </div>
  );
};

export default RainTrend;
