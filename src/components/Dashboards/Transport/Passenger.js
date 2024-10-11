import { Card } from "primereact/card";
import React from "react";

import increase from "../../../assets/increase.png";

import CanvasJSReact from "@canvasjs/react-charts";
import "primeicons/primeicons.css";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { color } from "framer-motion";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const categories = ["2020", "2021", "2022", "2023", "2024"];
const railSeries = [1, 1.5, 2, 1.75, 3]; // Rail data for each year
const roadSeries = [2, 1.5, 3, 1.8, 2]; // Road data for each year
const airSeries = [1.6, 2.8, 1.6, 2, 1.5]; // Air data for each year
const waterSeries = [1.9, 0.6, 1.8, 2.9, 2]; // Water data for each year
const options = {
  animationEnabled: true,
  title: {
    text: "Passenger Load Over Years",
    fontFamily: "DM Sans",
    fontWeight: 800,
    fontSize: 12,
    padding: { bottom: 20 },
  },
  axisX: {
    title: "",
    interval: 1,
    labelFontSize: 12,
  },
  axisY: {
    title: "",
    interval: 1,
    gridThickness: 0,
    labelFontSize: 12,
  },
  data: [
    {
      type: "bar",
      color: "#26575D",
      name: "Roadways",

      showInLegend: false,
      indexLabel: "Roadways: {y} Times Higher",
      indexLabelPlacement: "outside",
      indexLabelFontColor: "#1f8297",
      indexLabelFontSize: 10,
      toolTipContent: "{name}: {y} Times Higher", // Custom tooltip format
      dataPoints: categories.map((year, index) => ({
        label: year,
        y: roadSeries[index],
      })),
    },

    {
      type: "bar",
      name: "Railways",
      color: "#4D7479",
      indexLabel: "Railways: {y} Times Higher",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      indexLabelFontSize: 10,
      showInLegend: false,
      toolTipContent: "{name}: {y} Times Higher", // Custom tooltip format
      dataPoints: categories.map((year, index) => ({
        label: year,
        y: railSeries[index],
      })),
    },
    {
      type: "bar",
      name: "Airways",
      color: "#1F8297",
      showInLegend: false,
      indexLabelPlacement: "outside",
      indexLabelFontColor: "#1f8297",
      indexLabelFontSize: 10,
      toolTipContent: "{name}: {y}  Times Higher",
      indexLabel: "Airways: {y}  Times Higher", // Custom tooltip format
      dataPoints: categories.map((year, index) => ({
        label: year,
        y: airSeries[index],
      })),
    },
    {
      type: "bar",
      color: "#4C9BAC",
      name: "Waterways",
      showInLegend: false,
      indexLabelFontSize: 10,
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      indexLabel: "Waterways: {y} Times Higher",
      toolTipContent: "{name}: {y} Times Lower", // Custom tooltip format
      dataPoints: categories.map((year, index) => ({
        label: year,
        y: waterSeries[index],
      })),
    },
  ],
};

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
            {/* <img
              src={road}
              style={{ height: "4rem", width: "4rem" }}
              alt="air"
            /> */}
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <DirectionsCarIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
              }}
            />
            {/* </div> */}
          </div>

          <div className="flex align-items-start justify-content-between w-full ">
            <div className="flex align-items-start justify-content-start">
              {" "}
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-sm p-0 m-0">
                20% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 50</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 1500</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
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
            {/* <img
              src={road}
              style={{ height: "4rem", width: "4rem" }}
              alt="air"
            /> */}
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <TrainIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
              }}
            />
            {/* </div> */}
          </div>

          <div className="flex align-items-start justify-content-between w-full ">
            <div className="flex align-items-start justify-content-start">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-sm p-0 m-0">
                20% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 1200</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
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
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <FlightIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
              }}
            />
            {/* </div> */}
          </div>

          <div className="flex align-items-start justify-content-between w-full ">
            <div className="flex align-items-start justify-content-start">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-sm p-0 m-0">
                20% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 150</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
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
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <DirectionsBoatIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
              }}
            />
            {/* // </div> */}
          </div>

          <div className="flex align-items-start justify-content-between w-full ">
            <div className="flex align-items-start justify-content-start">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-sm p-0 m-0">
                20% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-base text-theme font-bold"> 50</p>
                  <p className="m-0 text-sm font-semibold">Average Capacity</p>
                  <p className="m-0 text-base text-theme font-bold"> 15000</p>
                  <p className="m-0 text-sm font-semibold">Passenger Count</p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
          </div>
          </div>
        </Card>
      </div>
      <div className="flex align-items-center justify-content-between gap-1 w-full">
        <Card className="w-full">
          <CanvasJSChart options={options} />
        </Card>
      </div>
    </div>
  );
};

export default Passenger;
