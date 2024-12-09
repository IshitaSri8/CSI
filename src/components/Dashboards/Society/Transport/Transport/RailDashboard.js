import React from "react";
import RailTrend from "./RailTrend";
import { Panel } from "primereact/panel";
import { BarChart, Doughnut } from "Layout/GraphVisuals";
import StackedBarChart from "./StackedBarChart";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import { Tooltip } from "primereact/tooltip";

const RailDashboard = () => {
  const totalTrainsData = [
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

  const electricTrainsData = [
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
  const trainlabels = ["Passenger", "Goods"];
  const trainSeries = [217, 195];

  const passengerLabels = ["Cash", "Contactless"];
  const passengerSeries = [74657, 98340];

  return (
    <div className="flex gap-3 flex-column px-2">
      <div className="flex w-full gap-4">
        <div className="flex flex-column justify-content-center align-items-center bg-white border-round p-3 w-full">
          <p className="text p-0 m-0 mb-1 font-medium">Total Running trains</p>
          <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
            412
          </p>
          <i className="pi pi-info-circle text-theme w-full text-right train text-sm"></i>
          <Tooltip target=".train" position="right">
            <div className="w-10rem">
              <Doughnut
                title="Total Running trains"
                labels={trainlabels}
                series={trainSeries}
                height={150}
                colorArray={["#98C6CF", "#0F4B57"]}
                horizontal={"center"}
                vertical={"bottom"}
                fontSize={8}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-column justify-content-center align-items-center bg-white border-round p-3 w-full">
          <p className="text p-0 m-0 mb-1 font-medium">
            Average availability on a day (seats / person)
          </p>
          <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
            0.11
          </p>
          <i className="pi pi-info-circle text-theme w-full text-right availability text-sm"></i>
          <Tooltip target=".availability" position="right">
            <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
              <p className="m-0 text-xs">Total trains on any day : 562</p>
              <p className="m-0 text-xs">Average capacity of a train: 60</p>
              <p className="m-0 text-xs">Total population : 298706</p>
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-column justify-content-center align-items-center bg-white border-round p-3 w-full">
          <p className="text p-0 m-0 mb-1 font-medium">
            Percentage that goes under maintenance checks
          </p>
          <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
            5.69%
          </p>
          <i className="pi pi-info-circle text-theme w-full text-right maintained text-sm"></i>
          <Tooltip target=".maintained" position="right">
            <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column">
              <p className="m-0 text-xs">Maintained trains : 32</p>
              <p className="m-0 text-xs">Total trains : 562</p>
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-column justify-content-center align-items-center bg-white border-round p-3 w-full">
          <p className="text p-0 m-0 mb-1 font-medium">
            Percentage availability of Traffic surveillance
          </p>
          <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
            55.33 %
          </p>
          <i className="pi pi-info-circle text-theme w-full text-right signals text-sm"></i>
          <Tooltip target=".signals" position="right">
            <div className="flex align-items-center justify-content-center gap-1 flex-column">
              <p className="m-0 text-xs">Total signals with CCTVs : 990</p>
              <p className="m-0 text-xs">Total signals: 1789 </p>
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-column justify-content-center align-items-center bg-white border-round p-3 w-full">
          <p className="text p-0 m-0 mb-1 font-medium">Total passenger Count</p>
          <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
            1,72,997
          </p>
          <i className="pi pi-info-circle text-theme w-full text-right passenger text-sm"></i>
          <Tooltip target=".passenger" position="left">
            <div className="p-2 flex align-items-center justify-content-center w-15rem">
              <Doughnut
                title="Total passenger count"
                labels={passengerLabels}
                series={passengerSeries}
                height={150}
                colorArray={["#98C6CF", "#0F4B57"]}
                horizontal={"center"}
                vertical={"bottom"}
                fontSize={8}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-full border-round">
          <StackedBarChart />
        </div>
        <div className="flex w-full border-round bg-white">
          <Doughnut
            title="Revenue Generated Gender-wise"
            labels={labels}
            series={series}
            height={180}
            horizontal={"center"}
            vertical={"bottom"}
            colorArray={["#98C6CF", "#0F4B57", "#1f8297"]}
            fontSize={10}
          />
        </div>
        <div className="flex w-full border-round">
          <BarChart
            title="Number of Deaths Over the Past Decade"
            categories={years}
            series={deaths}
            labelFontSize={10}
            height={200}
            dataPointWidth={10}
          />
        </div>
      </div>

      <Panel>
        <RailTrend
          totalTrainsData={totalTrainsData}
          electricTrainsData={electricTrainsData}
        />
      </Panel>
    </div>
  );
};
export default RailDashboard;
