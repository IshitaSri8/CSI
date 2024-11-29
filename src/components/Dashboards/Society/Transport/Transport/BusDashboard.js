import React from "react";
import BusTrend from "./BusTrend";
import { Card } from "primereact/card";
import { BarChart } from "Layout/GraphVisuals";
import StackedBarChart from "./StackedBarChart";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import { Doughnut } from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";

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
    <div className="flex gap-3 flex-column px-2">
      <div className="flex gap-3 w-full">
        <div className="flex w-full gap-4">
          <Card className="w-full">
            <i className="pi pi-info-circle text-theme w-full text-right buses text-sm"></i>
            <Tooltip target=".buses" position="right">
              <div className="w-12rem">
                <Doughnut
                  title="Total Running buses"
                  labels={busLabels}
                  series={busSeries}
                  height={150}
                  horizontal={"center"}
                  vertical={"bottom"}
                  colorArray={["#98C6CF", "#0F4B57", "#1f8297"]}
                />
              </div>
            </Tooltip>
            <div className="flex align-items-center justiy-content-center flex-column">
              <p className="m-0 text-2xl text-secondary2 font-semibold">303</p>
              <p className="font-medium text">Total Running buses</p>
            </div>
          </Card>
          <Card className="w-full">
            <i className="pi pi-info-circle text-theme w-full text-right availability text-sm"></i>
            <Tooltip target=".availability" position="right">
              <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                <p className="m-0 text-xs">Total buses on any day : 562</p>
                <p className="m-0 text-xs">Average capacity of a bus : 60</p>
                <p className="m-0 text-xs">Total population : 298706</p>
              </div>
            </Tooltip>
            <div className="flex align-items-center justiy-content-center flex-column">
              <p className="m-0 text-2xl text-secondary2 font-semibold">0.11</p>
              <p className="font-medium text">
                Average availability on a day (seats / person)
              </p>
            </div>
          </Card>
          <Card className="w-full">
            <i className="pi pi-info-circle text-theme w-full text-right maintained text-sm"></i>
            <Tooltip target=".maintained" position="right">
              <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                <p className="m-0 text-xs">Maintained Buses : 32</p>
                <p className="m-0 text-xs">Total buses : 562</p>
              </div>
            </Tooltip>
            <div className="flex align-items-center justiy-content-center flex-column">
              <p className="m-0 text-2xl text-secondary2 font-semibold">
                5.69 %
              </p>
              <p className="font-medium text">
                Percentage that goes under maintenance checks
              </p>
            </div>
          </Card>
          <Card className="w-full">
            <i className="pi pi-info-circle text-theme w-full text-right passenger text-sm"></i>
            <Tooltip target=".passenger" position="right">
              <div className="w-12rem">
                <Doughnut
                  title="Total passenger count"
                  labels={passengerLabels}
                  series={passengerSeries}
                  height={150}
                  colorArray={["#98C6CF", "#0F4B57"]}
                  horizontal={"center"}
                  vertical={"bottom"}
                />
              </div>
            </Tooltip>
            <div className="flex align-items-center justiy-content-center flex-column">
              <p className="m-0 text-2xl text-secondary2 font-semibold">
                1,72,997
              </p>
              <p className="font-medium text">Total passenger Count</p>
            </div>
          </Card>
          <Card className="w-full">
            <i className="pi pi-info-circle text-theme w-full text-right signals text-sm"></i>
            <Tooltip target=".signals" position="top">
              <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
                <p className="m-0 text-xs">Total signals with CCTVs : 990</p>
                <p className="m-0 text-xs">Total signals: 1789 </p>
              </div>
            </Tooltip>
            <div className="flex align-items-center justiy-content-center flex-column">
              <p className="m-0 text-2xl text-secondary2 font-semibold">
                55.33 %
              </p>
              <p className="font-medium text">
                Percentage availability of Traffic surveillance
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <Card className="w-full">
          <StackedBarChart />
        </Card>
        <Card className="w-full">
          <Doughnut
            title="Revenue Generated Gender-wise"
            labels={labels}
            series={series}
            height={200}
            colorArray={["#98C6CF", "#0F4B57", "#1f8297"]}
            horizontal={"center"}
            vertical={"bottom"}
          />
        </Card>
        <Card className="w-full">
          <BarChart
            title="Number of Deaths Over the Past Decade"
            categories={years}
            series={deaths}
            labelFontSize={10}
            height={200}
            dataPointWidth={10}
          />
        </Card>
      </div>
      <div className="flex w-full gap-3">
        <BusTrend
          totalBusesData={totalBusesData}
          electricBusesData={electricBusesData}
        />
      </div>
    </div>
  );
};
export default BusDashboard;
