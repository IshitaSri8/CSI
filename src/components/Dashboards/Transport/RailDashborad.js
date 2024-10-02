import React from "react";
import TransportTrend from "./TransportTrend";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { BarChart, DonutChart } from "../../GraphVisuals";
import StackedBarChart from "./TransportUtils/StackedBarChart";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import CustomTooltip from "./CustomTooltip";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

const RailDashboard = () => {
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
  const deathData = [
    { year: "2014", deaths: 1200 },
    { year: "2015", deaths: 1100 },
    { year: "2016", deaths: 1500 },
    { year: "2017", deaths: 1400 },
    { year: "2018", deaths: 1300 },
    { year: "2019", deaths: 1600 },
    { year: "2020", deaths: 1700 },
    { year: "2021", deaths: 1800 },
    { year: "2022", deaths: 1900 },
    { year: "2023", deaths: 2000 },
  ];
  const labels = ["Male", "Female", "Other"];
  const series = [60, 35, 5];
  const years = deathData.map((item) => item.year);
  const deaths = deathData.map((item) => item.deaths);
  const trainLabels = ["Passenger", "Goods"];
  const trainSeries = [12, 26];

  const passengerLabels = ["Cash", "Contactless"];
  const passengerSeries = [74657, 98340];

  return (
    <div className="flex gap-1 flex-column">
      <Panel>
        <div className="flex flex-row w-full gap-3">
          <Card>
            <CustomTooltip
              content={
                <Doughnut
                  title="Total Running Trains"
                  labels={trainLabels}
                  series={trainSeries}
                  height={150}
                />
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-11rem">
                <p className="m-0 text-2xl text-green-500 font-bold">38</p>
                <p className="m-1 mt-3 text-xs font-semibold">
                  Total Running Trains
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                  <p className="m-0 text-xs">Total Trains on any day : 13</p>
                  <p className="m-0 text-xs">
                    Average capacity of a Train : 1000
                  </p>
                  <p className="m-0 text-xs">Total population : 298706</p>
                </div>
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-11rem">
                <p className="m-0 text-2xl text-green-500 font-bold">0.0435</p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Average availability on a day (seats / person)
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                  <p className="m-0 text-xs">Maintained Trains : 18</p>
                  <p className="m-0 text-xs">Total buses : 38</p>
                </div>
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-11rem">
                <p className="m-0 text-2xl text-green-500 font-bold">47.36 %</p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Percentage that goes under maintenance checks
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
              content={
                <Doughnut
                  title="Total passenger count"
                  labels={passengerLabels}
                  series={passengerSeries}
                  height={150}
                />
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-11rem">
                <p className="m-0 text-2xl text-green-500 font-bold">
                  2,997 kms
                </p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Total Track Length
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
            //   content={
            //     <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
            //       <p className="m-0 text-xs">Total signals with CCTVs : 990</p>
            //       <p className="m-0 text-xs">Total signals: 1789 </p>
            //     </div>
            //   }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-11rem">
                <p className="m-0 text-2xl text-green-500 font-bold">
                  68 minutes
                </p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Average Passenger waiting time
                </p>
              </div>
            </CustomTooltip>
          </Card>
        </div>
      </Panel>
      <Panel>
        <TransportTrend
          totalBusesData={totalBusesData}
          electricBusesData={electricBusesData}
        />
      </Panel>
      <Panel>
        <div className="flex fle-row gap-1 ">
          <Card className="w-full h-17rem">
            <StackedBarChart />
          </Card>
          <Card className="w-full h-17rem">
            <Doughnut
              title="Revenue Generated Gender-wise"
              labels={labels}
              series={series}
              height={200}
            />
          </Card>
          <Card className="w-full h-17rem">
            <BarChart
              title="Number of Deaths Over the Past Decade"
              categories={years}
              series={[deaths]}
              height={200}
              xtitle=""
              ytitle=""
              labelFontSize={10}
            />
          </Card>
        </div>
      </Panel>
    </div>
  );
};
export default RailDashboard;
