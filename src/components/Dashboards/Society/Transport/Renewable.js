import React from "react";
import { Card } from "primereact/card";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import increase from "assets/increase.png";
import CanvasJSReact from "@canvasjs/react-charts";
import BusTrend from "./Transport/BusTrend";
import { Tooltip } from "primereact/tooltip";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Renewable = () => {
  const Doughnut = ({ title, labels, series, height }) => {
    const colors = [
      "#26575D",
      "#1F8297",
      "#4D7479",
      "#4C9BAC",
      "#98C6CF",
      "#F7A47A",
      "#47B881",
      "#FFDD82",
      "#F64C4C",
    ];

    const options = {
      animationEnabled: true,
      title: {
        text: title,
        fontSize: 10,
        fontFamily: "DM Sans",
        fontWeight: "800",
      },
      data: [
        {
          type: "doughnut",
          startAngle: 20,
          toolTipContent: "<b>{label}</b>: {y} (#percent%)",
          showInLegend: false,
          color: colors,
          indexLabel: "{label} (#percent%)",
          indexLabelFontSize: 8,
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
        fontSize: 7,
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
  const totalBusesData = [
    { year: 2014, count: 1500 },
    { year: 2015, count: 1550 },
    { year: 2016, count: 1400 },
    { year: 2017, count: 1650 },
    { year: 2018, count: 1800 },
    { year: 2019, count: 1750 },
    { year: 2020, count: 1800 },
    { year: 2021, count: 1050 },
    { year: 2022, count: 1900 },
    { year: 2023, count: 1950 },
  ];

  const electricBusesData = [
    { year: 2014, count: 100 },
    { year: 2015, count: 130 },
    { year: 2016, count: 140 },
    { year: 2017, count: 160 },
    { year: 2018, count: 100 },
    { year: 2019, count: 200 },
    { year: 2020, count: 220 },
    { year: 2021, count: 220 },
    { year: 2022, count: 160 },
    { year: 2023, count: 280 },
  ];
  const projectLabels = ["Completed", "Ongoing", "Planned"];
  const projectSeries = [4, 12, 4];
  return (
    <div className="flex align-items-center justify-content-between flex-column gap-4 w-full">
      <div className="flex align-items-center justify-content-between flex-row gap-4 w-full">
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
            <p className="text-2xl text-primary1 font-semibold m-0 p-0">38 %</p>
            <p className="text-lg font-medium text mt-3 p-0">
              Public Transport Using Renewable Energy
            </p>
            <div className="flex align-items-center justify-content-center flex-row w-full ">
              <div className="flex align-items-center justify-content-center flex-row">
                <img
                  src={increase}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                ></img>
                <p className="text-theme text-sm p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
            <p className="text-2xl text-primary1 font-semibold m-0 p-0">
              2579890 Litres
            </p>
            <p className="text-lg font-medium text mt-3 p-0">
              Total Fuel Saved Using Renewable Energy
            </p>
            <div className="flex align-items-center justify-content-center flex-row w-full ">
              <div className="flex align-items-center justify-content-center flex-row">
                <img
                  src={increase}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                ></img>
                <p className="text-theme text-sm p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
          <p className="text-2xl text-primary1 font-semibold m-0 p-0">22</p>
          <p className="text-lg font-medium text mt-3 p-0">
              No. of Renewable Energy Projects
            </p>
            <div className="flex align-items-start justify-content-between flex-row w-full ">
              <div className="flex align-items-start justify-content-start flex-row">
                <img
                  src={increase}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                ></img>
                <p className="text-theme text-sm p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right renewable text-sm"></i>
            <Tooltip target=".renewable" position="bottom">
              <div className="w-15rem">
                  <Doughnut
                    title=""
                    labels={projectLabels}
                    series={projectSeries}
                    height={100}
                    />
                    </div>
                    </Tooltip>
                    </div>
          </div>
        </Card>
      </div>
      <div className="flex align-items-center justify-content-between flex-row gap-1 w-full">
        <Card className="w-full">
          <BusTrend
            totalBusesData={totalBusesData}
            electricBusesData={electricBusesData}
            height={200}
          />
        </Card>
      </div>
    </div>
  );
};

export default Renewable;
