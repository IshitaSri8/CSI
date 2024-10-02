import React from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import increase from "./TransportUtils/Images/increase.png";
import decrease from "./TransportUtils/Images/decrease.png";
import { PieChart } from "../../GraphVisuals";
import CanvasJSReact from "@canvasjs/react-charts";
import TransportTrend from "./TransportTrend";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Renewable = () => {
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
    <div className="flex align-items-center justify-content-between flex-column gap-1 w-full">
      <div className="flex align-items-center justify-content-between flex-row gap-1 w-full">
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
            <h1 className="text-2xl text-green-500 text-bold m-0 p-0">38 %</h1>
            <h1 className="text-xs text-semibold mt-3 p-0">
              Public Transport Using Renewable Energy
            </h1>
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
                <p className="text-green-500 text-xs p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
              {/* <CustomTooltip content={<div></div>}>
                <InfoIcon
                  style={{ height: "1.2rem", width: "1.2rem", color: "green" }}
                />
              </CustomTooltip> */}
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
            <h1 className="text-2xl text-green-500 text-bold m-0 p-0">
              {" "}
              2579890 Litres
            </h1>
            <h1 className="text-xs text-semibold mt-3 p-0">
              Total Fuel Saved Using Renewable Energy
            </h1>
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
                <p className="text-green-500 text-xs p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
              {/* <CustomTooltip content={<div></div>}>
                <InfoIcon
                  style={{ height: "1.2rem", width: "1.2rem", color: "green" }}
                />
              </CustomTooltip> */}
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <div className="flex align-items-center justify-content-center flex-column">
            <h1 className="text-2xl text-green-500 text-bold m-0 p-0">22</h1>
            <h1 className="text-xs text-semibold mt-3 p-0">
              No. of Renewable Energy Projects
            </h1>
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
                <p className="text-green-500 text-xs p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
              <CustomTooltip
                content={
                  <Doughnut
                    title=""
                    labels={projectLabels}
                    series={projectSeries}
                    height={100}
                  />
                }
              >
                <InfoIcon
                  style={{ height: "1.2rem", width: "1.2rem", color: "green" }}
                />
              </CustomTooltip>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex align-items-center justify-content-between flex-row gap-1 w-full">
        {/* <Card className="w-full">
          <Doughnut
            title="Projects"
            labels={projectLabels}
            series={projectSeries}
            height={100}
          />
        </Card> */}
        <Panel className="w-full">
          <TransportTrend
            totalBusesData={totalBusesData}
            electricBusesData={electricBusesData}
            height={200}
          />
        </Panel>
      </div>
    </div>
  );
};

export default Renewable;
