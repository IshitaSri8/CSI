import React from "react";
import BusTrend from "./BusTrend";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { BarChart } from "../GraphVisuals";
import StackedBarChart from "./StackedBarChart";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import CustomTooltip from "./CustomTooltip";
import { Doughnut } from "Layout/GraphVisuals";

const BusDashboard = () => {
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
  const busLabels = ["Diesel", "Electric", "Hybrid"];
  const busSeries = [126, 82, 95];

  const passengerLabels = ["Cash", "Contactless"];
  const passengerSeries = [74657, 98340];

  return (
    <div className="flex gap-1 flex-column">
      <Panel>
        <div className="flex flex-row w-full gap-4">
          <Card>
            <CustomTooltip
              content={
                <Doughnut
                  title="Total Running buses"
                  labels={busLabels}
                  series={busSeries}
                  height={150}
                />
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-10rem">
                <p className="m-0 text-2xl text-green-500 font-bold">303</p>
                <p className="m-1 mt-3 text-xs font-semibold">
                  Total Running buses
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                  <p className="m-0 text-xs">Total buses on any day : 562</p>
                  <p className="m-0 text-xs">Average capacity of a bus : 60</p>
                  <p className="m-0 text-xs">Total population : 298706</p>
                </div>
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-10rem">
                <p className="m-0 text-2xl text-green-500 font-bold">0.11</p>
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
                  <p className="m-0 text-xs">Maintained Buses : 32</p>
                  <p className="m-0 text-xs">Total buses : 562</p>
                </div>
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-10rem">
                <p className="m-0 text-2xl text-green-500 font-bold">5.69 %</p>
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
              <div className="flex align-items-center justiy-content-center flex-column w-10rem">
                <p className="m-0 text-2xl text-green-500 font-bold">
                  1,72,997
                </p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Total passenger Count
                </p>
              </div>
            </CustomTooltip>
          </Card>
          <Card>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                  <p className="m-0 text-xs">Total signals with CCTVs : 990</p>
                  <p className="m-0 text-xs">Total signals: 1789 </p>
                </div>
              }
            >
              <div className="flex align-items-center justiy-content-center flex-column w-10rem">
                <p className="m-0 text-2xl text-green-500 font-bold">55.33 %</p>
                <p className=" mt-3 text-xs  font-semibold text-center">
                  Percentage availability of Traffic surveillance
                </p>
              </div>
            </CustomTooltip>
          </Card>
        </div>
      </Panel>
      <Panel>
        <BusTrend
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
export default BusDashboard;
