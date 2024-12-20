import React, { useState } from "react";
import { Doughnut, LineChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import bus from "assets/bus.svg";

import TransportRecommendations from "./TransportRecommendations";
import TransportReportPrint from "./TransportReportPrint";
import increase from "assets/increase.png";
import AccidentMap from "./AccidentMap";

const Transport = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  const vehicleLables = ["Electric", "Hybrid", "Petrol", "Diesel"];
  const vehicleData = [150, 270, 350, 500];

  const maintenance = 73;

  const evTrend = [40, 45, 60, 36];
  const labels = ["Q1", "Q2", "Q3", "Q4"];

  const jobTrendLabels = [
    { name: "Government", data: [10, 9, 8, 7] },
    { name: "Private", data: [7, 4, 9, 5] },
  ];
  const years = [2021, 2022, 2023, 2024];

  const accidentData = [
    {
      location: "Location A",
      lat: 26.774794,
      lon: 82.134539,
      severity: "severe",
      count: 5,
    },
    {
      location: "Location B",
      lat: 26.767421,
      lon: 82.09535,
      severity: "moderate",
      count: 3,
    },
    {
      location: "Location C",
      lat: 26.764028,
      lon: 82.133778,
      severity: "low",
      count: 1,
    },
  ];

  return (
    <div className="gap-3 p-4 flex flex-column">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Public Transport
          </h1>

          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="bg-primary1 text-white"
            raised
          />
          <Dialog
            visible={ReportVisible}
            style={{ width: "100rem" }}
            onHide={() => {
              if (!ReportVisible) return;
              setReportVisible(false);
            }}
          >
            <TransportReportPrint />
          </Dialog>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex gap-3 flex-column" style={{ flex: "33%" }}>
          {/* Total Buses in Operation*/}
          <div className="flex flex-column align-items-center bg-white border-round p-3 w-full gap-3">
            <div className="flex justify-content-between gap-6 align-items-center">
              <div className="flex flex-column gap-3 align-items-start">
                <p className="card-title p-0 m-0">
                  Buses in Operation
                </p>
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                  298
                </p>
              </div>
              <img src={bus} alt="bus"  />
            </div>

            {/* Types of Vehicles */}
            <div className="flex flex-column sec-theme border-round-xl align-items-start p-2 w-full">
            <p className="card-title p-0 m-0">Types of Vehicles</p>
              <Doughnut
                // title="Types of Vehicles"
                labels={vehicleLables}
                series={vehicleData}
                height={125}
                colorArray={["#FFDD82", "#F7A47A", "#98C6CF", "#1F8297"]}
              />
            </div>
          </div>
          <div
            className="flex justify-content-between align-items-center bg-white border-round p-3"
            // style={{ flex: "35%" }}
          >
            <div className="flex flex-column w-full p-2 align-items-center gap-1">
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                344
              </p>
              <p className="p-0 m-0 card-text">Public</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column w-full p-2 align-items-center gap-1">
              <p className="text-3xl font-semibold m-0 text-primary2 p-0">78</p>
              <p className="p-0 m-0 card-text">Semi Public</p>
            </div>
          </div>
          {/* EV Trend */}
          <div className="flex flex-column bg-white border-round p-3 w-full gap-2">
            <div className="flex justify-content-between">
              <p className="card-title p-0 m-0">EV Trend</p>
              <p className="text-sm text-tertiary3 font-medium p-0 m-0">2024</p>
            </div>
            <LineChart
              //   title="EV Trend"
              categories={labels}
              data={evTrend}
              fontColor={"#4C4C4C"}
              height={125}
            />
          </div>
        </div>
        <div className="flex gap-3 flex-column" style={{ flex: "22%" }}>
          {/* Average Passenger Count */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Average Passenger Count
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              487{" "}
              <span className="text-lg text-tertiary3 font-medium">/Day</span>
            </p>
            {/* <Chip
            label="October 2024"
            style={{
              width: "fit-content",
              backgroundColor: "#e9f3f5",
              color: "#001F23",
            }}
          /> */}
          </div>
          {/*  Disable Friendly Buses*/}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Disable Friendly Buses
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              56
            </p>
          </div>
          {/* Availability of Bus */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Average Availability of Bus
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              125{" "}
              <span className="text-lg text-tertiary3 font-medium">/Day</span>
            </p>
          </div>

          {/* Maintenance of Public Vehicle*/}
          {/* <div className="flex flex-column bg-white border-round align-items-center p-4 gap-3 w-full">
            <div className="flex justify-content-between align-items-center w-full">
              <p className="card-title p-0 m-0">
                Maintenance of Public Vehicle
              </p>
            </div>
            <div className="flex w-11rem custom-circular-progress">
              <CircularProgressbar
                value={maintenance}
                text={`${maintenance}%`}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: "#1f8297",
                  textColor: "#001F23",
                  trailColor: "#E7EAEA",
                  textSize: "1.2rem",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(2.25turn)",
                })}
              />
            </div>
            <div className="flex align-items-center justify-content-start">
              <img
                src={increase}
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  marginRight: "0.5rem",
                }}
                alt="increase"
              />
              <p className="text-tertiary3 text-sm p-0 m-0 font-medium">
                <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                year.
              </p>
            </div>
          </div> */}
        </div>
        <div className="flex flex-column" style={{ flex: "45%" }}>
          <AccidentMap accidentData={accidentData} />
        </div>
      </div>
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>
      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-up"
              : "pi pi-chevron-down";
            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round">
                <p className="text-primary1 font-semibold text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    // border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && <TransportRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Transport;
