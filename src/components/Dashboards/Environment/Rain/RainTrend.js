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
      backgroundColor: "transparent",
      legend: {
        fontSize: 10,
        horizontalAlign: "left",
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontColor: "black",
      },
      title: {
        text: "Rainfall Trend Over Years",
        fontSize: 14,
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontColor: "black",
        horizontalAlign: "left",
        padding: { bottom: 14 },
      },
      axisX: {
        labelFontSize: 10,
        labelFontFamily: "Montserrat",
      },
      axisY: {
        gridThickness: 0.3,
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function () {
          return " ";
        },
      },
      data: [
        {
          type: "line",
          name: "Actual Rainfall",
          color: "#FFDD82",
          showInLegend: true,
          dataPoints: actualDataPoints,
          click: handleYearClick, // Handle clicks for drilldown
        },
        {
          type: "line",
          name: "Expected Rainfall",
          color: "#1F8297",
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
        backgroundColor: "transparent",
        legend: {
          fontSize: 10,
          horizontalAlign: "left",
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "#001F23",
        },
        title: {
          text: `Rainfall Trend Over Months for ${selectedYear}`,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 14 },
        },
        axisX: {
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        axisY: {
          gridThickness: 0.3,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        data: [
          {
            type: "line",
            name: "Actual Rainfall",
            color: "#FFDD82",
            showInLegend: true,
            dataPoints: actualDataPoints,
          },
          {
            type: "line",
            name: "Expected Rainfall",
            color: "#1F8297",
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
    <div className="w-full">
      <CanvasJSChart
        options={isDrilldown ? drilldownChartOptions : baseChartOptions}
        containerProps={{ height: 200, width: "100%" }}
      />
      {isDrilldown && (
        <Button
          label="Back"
          onClick={handleBackClick}
          raised
          className="bg-theme"
        ></Button>
      )}
    </div>
  );
};

export default RainTrend;
