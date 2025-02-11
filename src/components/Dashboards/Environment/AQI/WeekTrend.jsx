import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { commonChartOptions } from "Layout/chartOptions";
import colors from "colorConstants";
import { Button } from "primereact/button";

const WeekTrend = ({
  overallWeekendAverage,
  overallWeekdayAverage,
  weekendAverages,
  weekdayAverages,
}) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // Function to handle click events on main chart points (for drilldown)
  const handlePointClick = (e) => {
    const chartType = e.dataPoint.name;
    setSelectedChart(chartType);
  };

  //Options for Overall Averages
  const overallOptions = {
    animationEnabled: true,
    title: {
      text: "Weekend vs Weekday Trend",
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 200,
    backgroundColor: "transparent",
    dataPointWidth: 30,
    data: [
      {
        type: "column",
        name: "Overall",
        click: handlePointClick,
        dataPoints: [
          {
            label: "Weekend",
            y: overallWeekendAverage,
            name: "Weekend",
            color: colors[0],
          },
          {
            label: "Weekday",
            y: overallWeekdayAverage,
            name: "Weekday",
            color: colors[1],
          },
        ],
      },
    ],
  };

  const weekendOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      //   text: "Weekend AQI Averages",
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 150,
    backgroundColor: "transparent",
    dataPointWidth: 30,
    data: [
      {
        type: "column",
        name: "WeekendDetail",
        dataPoints: [
          { label: "Sunday", y: weekendAverages[0], color: colors[0] },
          { label: "Saturday", y: weekendAverages[1], color: colors[1] },
        ],
      },
    ],
  };

  //WeekDay Options
  const weekdayOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      //   text: "Weekday AQI Averages",
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 150,
    backgroundColor: "transparent",
    dataPointWidth: 30,
    data: [
      {
        type: "column",
        name: "WeekdayDetail",
        dataPoints: [
          { label: "Monday", y: weekdayAverages[0], color: colors[0] },
          { label: "Tuesday", y: weekdayAverages[1], color: colors[1] },
          { label: "Wednesday", y: weekdayAverages[2], color: colors[0] },
          { label: "Thursday", y: weekdayAverages[3], color: colors[1] },
          { label: "Friday", y: weekdayAverages[4], color: colors[0] },
        ],
      },
    ],
  };
  let chartOptions;
  if (selectedChart === "Weekend") {
    chartOptions = weekendOptions;
  } else if (selectedChart === "Weekday") {
    chartOptions = weekdayOptions;
  } else {
    chartOptions = overallOptions;
  }

  return (
    <>
      <div
        className="w-full flex flex-column align-items-start bg-white border-round p-4"
        style={{ flex: "25%" }}
      >
        {selectedChart && (
          <Button
            onClick={() => setSelectedChart(null)}
            label="Back"
            className="bg-primary1  text-white text-xs"
            raised
          />
        )}
        <CanvasJSChart
          options={chartOptions}
          containerProps={{ width: "100%" }}
        />
      </div>
      {/* <div
        className="w-full flex flex-column align-items-start bg-white border-round p-4"
        style={{ flex: "25%" }}
      >
        {selectedChart && (
          <Button
            onClick={() => setSelectedChart(null)}
            label="Back"
            className="bg-primary1 text-white text-xs"
            raised
          />
        )}
        <CanvasJSChart
          options={chartOptions}
          containerProps={{ width: "100%" }}
        />
      </div> */}
    </>
  );
};
export default WeekTrend;
