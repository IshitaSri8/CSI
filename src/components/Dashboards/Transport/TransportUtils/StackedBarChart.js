import React from "react";
import CanvasJSReact from "@canvasjs/react-charts"; // Import CanvasJS for charts
//const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedBarChart = () => {
  const colors = [
    "#557C56",
    "#90D26D",
    "#6A9C89",
    "#B5C18E",
    "#41B3A2",
    "#BDE8CA",
    "#C4DAD2",
    "#9CDBA6",
    "#95D2B3",
    "#729762",
  ];
  const data = [
    { year: "2015", total: 100, disabledFriendly: 20 },
    { year: "2016", total: 120, disabledFriendly: 30 },
    { year: "2017", total: 140, disabledFriendly: 50 },
    { year: "2018", total: 160, disabledFriendly: 60 },
    { year: "2019", total: 180, disabledFriendly: 70 },
    { year: "2020", total: 200, disabledFriendly: 80 },
    { year: "2021", total: 220, disabledFriendly: 90 },
    { year: "2022", total: 240, disabledFriendly: 100 },
    { year: "2023", total: 260, disabledFriendly: 110 },
  ];

  // Configure the chart options
  const options = {
    animationEnabled: true,
    title: {
      text: "Percentage of Disabled-Friendly Buses Over the Past Decade",
      fontSize: 12,
      fontFamily: "DM Sans",
      fontWeight: "bold",
    },
    axisX: {
      title: "",
      interval: 1,
    },
    axisY: {
      title: "",
      interval: 50,
      suffix: "%",
      gridThickness: 0,
    },
    toolTip: {
      shared: true, // To show both series in the tooltip
      content: "{name}: {y} buses", // Show percentage in tooltip
    },
    color: colors,
    data: [
      {
        type: "stackedColumn",
        name: "Disabled-Friendly Buses",
        showInLegend: true,
        yValueFormatString: "#,###",
        color: "#557C56",
        dataPoints: data.map((entry) => ({
          label: entry.year,
          y: entry.disabledFriendly,
        })),
      },
      {
        type: "stackedColumn",
        name: "Other Buses",
        showInLegend: true,
        color: "#90D26D",
        yValueFormatString: "#,###",
        dataPoints: data.map((entry) => ({
          label: entry.year,
          y: entry.total - entry.disabledFriendly,
        })),
      },
    ],
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: 200, width: "100%" }}
    />
  );
};

export default StackedBarChart;
