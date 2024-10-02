import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import React from "react";
// import Road from "../../assets/road.png";
// import Rail from "../../assets/rail.png";
// import Air from "../../assets/air.png";
// import Water from "../../assets/water.png";

import Air from "@mui/icons-material/Flight";
import Water from "@mui/icons-material/DirectionsBoat";
import Rail from "@mui/icons-material/Train";
import Road from "@mui/icons-material/DirectionsCar";

import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Accessibility = () => {
  const usageLabels = ["Roadways", "Railways", "Airways", "Waterways"];
  const usageSeries = [85, 73, 42, 35];

  const Doughnut = ({ title, labels, series, height }) => {
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

    const options = {
      animationEnabled: true,
      title: {
        text: title,
        fontSize: 12,
        fontFamily: "Arial",
        fontWeight: "bold",
        padding: { bottom: 20 },
      },
      data: [
        {
          type: "doughnut",
          startAngle: 20,
          toolTipContent: "<b>{label}</b>: {y} (#percent%)",
          showInLegend: false,
          color: colors,
          indexLabel: "{label} - #percent%",
          indexLabelFontSize: 10,
          indexLabelFontFamily: "DM Sans",
          indexLabelFontWeight: 700,
          dataPoints: series.map((value, index) => ({
            y: value,
            label: labels[index],
            color: colors[index % colors.length],
          })),
        },
      ],
      legend: {
        fontSize: 10,
        horizontalAlign: "center",
        verticalAlign: "bottom",
      },
    };

    return (
      <CanvasJSChart
        options={options}
        containerProps={{ height: height, width: "100%" }}
      />
    );
  };

  const cardsData = [
    { label: "Roadways Accessibility", value: 85, icon: Road },
    { label: "Railways Accessibility", value: 73, icon: Rail },
    { label: "Airways Accessibility", value: 42, icon: Air },
    { label: "Waterways Accessibility", value: 35, icon: Water },
  ];

  return (
    <>
      <div className="flex align-items-center justify-content-between flex-row gap-2">
        {cardsData.map((card, index) => (
          <Card className="h-auto w-full p-0" key={index}>
            <div className="flex w-full h-auto p-0 m-0">
              {/* Left Column: Content */}
              <div className="flex w-full m-0 p-0 align-items-start justify-content-start flex-column">
                <h1 className="m-0 text-xs">{card.label}</h1>
                <h1 className="text-xl text-green-500 ml-0 mb-0">
                  {card.value}%
                </h1>
              </div>

              {/* Right Column: Icon */}
              <div className="col-4 flex align-items-start justify-content-end">
                <card.icon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    color: "#00a269",
                  }}
                />
              </div>
            </div>
            <div className="flex align-items-center justify-content-center w-full mt-2">
              <ProgressBar
                value={card.value}
                showValue={false}
                style={{
                  height: "0.4rem", // Adjust the height
                  backgroundColor: "#d4edda", // Background color of the progress bar
                  //borderRadius: '0.5rem', // Rounded corners
                }}
                className="w-full" // Make sure it takes full width of its container
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex align-items-center justify-content-between flex-row gap-3 mt-3">
        {/* Doughnut Chart for overall transport usage */}
        <Card className="w-full p-0">
          <Doughnut
            title="Transport Mode Usage by Percentage"
            labels={usageLabels}
            series={usageSeries}
            height={150}
          />
        </Card>

        <Card className="w-full">
          <h1 className="m-0 p-1 text-lg">Heat Map</h1>
        </Card>
      </div>
    </>
  );
};

export default Accessibility;
