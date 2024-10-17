import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedColumnChart = ({ title, dataSeries, labels }) => {
  const colors = ["#98C6CF", "#1F8297", "#166c7d", "#e9f3f5"];
  console.log(dataSeries);
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 14,
      padding: { bottom: 10 },
      fontColor: "black",
    },
    axisY: {
      //title: "Score",
      gridThickness: 0,
      labelFontSize: 10,
    },
    axisX: {
      interval: 1,
      labelFontSize: 10,
    },

    toolTip: {
      shared: true,
      cornerRadius: 4,
    },
    dataPointWidth: 40,
    data: dataSeries.map((data, index) => {
      console.log(data);
      return {
        type: "column",
        name: data.name,
        color: colors[index % colors.length],
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: "#00403c",
        indexLabelFontSize: 10,
        dataPoints: data.data?.map((val, index) => ({
          label: labels[index],
          y: val,
        })),
      };
    }),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: 200, width: "100%" }}
    />
  );
};

export default StackedColumnChart;
