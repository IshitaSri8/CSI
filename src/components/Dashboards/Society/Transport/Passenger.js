import { Card } from "primereact/card";
import React from "react";
import increase from "assets/increase.png";
import "primeicons/primeicons.css";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import { StackedBarChart } from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";

const years = ["2020", "2021", "2022", "2023", "2024"];
const categories = ["Rail", "Road", "Air", "Water"];
const series = [
  [1, 1.5, 2, 1.75, 3],
  [2, 1.5, 3, 1.8, 2],
  [1.6, 2.8, 1.6, 2, 1.5],
  [1.9, 0.6, 1.8, 2.9, 2],
];

const Passenger = () => {
  return (
    <div className="flex align-items-center justify-content-between flex-column gap-4 w-full">
      <div className="flex align-items-center justify-content-between gap-4 w-full">
        <Card className="w-full">
          <div className="flex flex-column gap-4">
            <div className="flex align-items-start justify-content-between w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-left w-full">
                <h1 className=" m-0 p-0 text-sm">Roadways Passenger Load</h1>
                <h1 className=" m-0 text-xl text-theme border-circle">
                  3 Times Higher
                </h1>
              </div>
              <DirectionsCarIcon
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "#1f8297",
                }}
              />
            </div>

            <div className="flex align-items-start justify-content-between w-full ">
              <div className="flex align-items-start justify-content-start">
                {" "}
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
                  20% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right roadways text-sm"></i>
              <Tooltip target=".roadways" position="right">
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 50</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 1500</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex flex-column gap-4">
            <div className="flex align-items-start justify-content-between  text-center w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-center w-full">
                <h1 className=" m-0 p-0 text-sm">Train Passenger Load</h1>
                <h1 className=" m-0 text-xl text-theme border-circle">
                  2 Times Higher
                </h1>
              </div>
              <TrainIcon
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "#1f8297",
                }}
              />
            </div>

            <div className="flex align-items-start justify-content-between w-full ">
              <div className="flex align-items-start justify-content-start">
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
                  20% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right railway text-sm"></i>
              <Tooltip target=".railway" position="right">
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 1200</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex flex-column gap-4">
            <div className="flex align-items-start justify-content-between  text-center w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-center w-full">
                <h1 className=" m-0 p-0 text-sm">Plane Passenger Load</h1>
                <h1 className=" m-0  text-xl text-theme border-circle">
                  1.5 Times Higher
                </h1>
              </div>
              <FlightIcon
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "#1f8297",
                }}
              />
            </div>

            <div className="flex align-items-start justify-content-between w-full ">
              <div className="flex align-items-start justify-content-start">
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
                  20% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right airway text-sm"></i>
              <Tooltip target=".airway" position="right">
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 150</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <div className="flex flex-column gap-4">
            <div className="flex align-items-start justify-content-between  text-center w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-center w-full">
                <h1 className=" m-0 p-0 text-sm">Average Ship Capacity</h1>
                <h1 className=" m-0 text-xl text-theme border-circle">
                  2 Times Higher
                </h1>
              </div>
              <DirectionsBoatIcon
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "#1f8297",
                }}
              />
            </div>

            <div className="flex align-items-start justify-content-between w-full ">
              <div className="flex align-items-start justify-content-start">
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
                  20% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right waterway text-sm"></i>
              <Tooltip target=".waterway" position="bottom">
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 50</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex align-items-center justify-content-between gap-1 w-full">
        <Card className="w-full">
          <StackedBarChart
            title="Mode of Transport Usage Over the Years"
            categories={categories}
            series={series}
            labels={years}
            height={200}
          />
        </Card>
      </div>
    </div>
  );
};

export default Passenger;
