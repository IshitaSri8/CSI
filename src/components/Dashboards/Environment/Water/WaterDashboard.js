import React from "react";
import { Knob } from "primereact/knob";
import { Doughnut, GaugeChart } from "Layout/GraphVisuals";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { Tooltip } from "primereact/tooltip";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const WaterDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  return (
    <div className="w-full p-4 flex gap-3 flex-column">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
            Water Quality
          </h1>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-theme text-white"
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
              <WaterReportPrint show={false} />
            </Dialog>
          </div>
        </div>
      )}

      <div className="w-full flex gap-4">
        <div className="flex flex-column bg-white border-round p-4 w-full gap-4">
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Production
          </p>
          <div className="flex justify-content-between gap-8">
            <div
              className="flex flex-column w-full p-2"
              style={{
                borderLeft: "4px solid #1F8297", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <div className="flex align-items-end gap-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  12
                </p>
                <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  MLD
                </p>
              </div>
              <div className="flex align-items-center justify-content-between">
                <p className="text">Natural Resources</p>
                <i className="pi pi-info-circle text-theme natural text-sm"></i>
                <Tooltip target=".natural" position="left">
                  <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
                    <h1 className="m-0 p-0 text-lg text-cyan-800">
                      List of Natural Resources
                    </h1>
                    <ul>
                      <li>Natural Resource: 1</li>
                      <li>Natural Resource: 2</li>
                      <li>Natural Resource: 3</li>
                      <li>Natural Resource: 4</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div
              className="flex flex-column w-full p-2"
              style={{
                borderLeft: "4px solid #98C6CF", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <div className="flex align-items-end gap-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  36
                </p>
                <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  MLD
                </p>
              </div>
              <div className="flex align-items-center gap-2">
                <p className="text">Dams</p>
                <i className="pi pi-info-circle text-theme dams text-sm"></i>
                <Tooltip target=".dams" position="left">
                  <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
                    <h1 className="m-0 p-0 text-lg text-cyan-800">
                      List of Dams
                    </h1>
                    <ul>
                      <li>Dam 1</li>
                      <li>Dam 2</li>
                      <li>Dam 3</li>
                      <li>Dam 4</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-column gap-4 p-4 w-full border-round bg-white">
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Consumption
          </p>
          <div className="flex justify-content-between gap-8">
            <div className="flex flex-column w-full p-2">
              <div className="flex align-items-end gap-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  900
                </p>
                <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  MLD
                </p>
              </div>
              <p className="text">Proposed</p>
            </div>
            <div className="flex flex-column w-full p-2">
              <div className="flex align-items-end gap-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  1123
                </p>
                <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  MLD
                </p>
              </div>
              <p className="text">Actual</p>
            </div>
          </div>
        </div>
        <div className="flex sec-theme border-round w-full gap-4 p-4 flex-column">
          <GaugeChart
            // title="Water Connections"
            gaugeValue={79.58}
            maxValue={100}
            height={100}
          />
          <p className="text-primary1 font-medium text-lg p-0 m-0 text-center" style={{marginTop: -50}}>
            Percentage of Household with Water Connections
          </p>
        </div>
      </div>

      <div className="w-full flex gap-4">
        <div
          className="flex bg-white border-round p-4 w-full gap-6"
          style={{ flex: "35%" }}
        >
          <div className="flex flex-column gap-4">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Water Production
            </p>
            <div className="flex flex-column justify-content-between gap-4">
              <div
                className="flex flex-column w-full p-2 sec-theme gap-1"
                style={{
                  borderLeft: "4px solid #1F8297", // Adjust thickness and color
                  height: "60px", // Adjust height
                }}
              >
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  10
                </p>
                <p className="text m-0 p-0">STPs</p>
              </div>
              <div
                className="flex flex-column w-full p-2 sec-theme gap-2"
                style={{
                  borderLeft: "4px solid #98C6CF", // Adjust thickness and color
                  height: "60px", // Adjust height
                }}
              >
                <div className="flex align-items-end gap-2">
                  <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                    567
                  </p>
                  <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                    MLD
                  </p>
                </div>
                <p className="text m-0 p-0">Total STP Capacity</p>
              </div>
            </div>
          </div>
          <div className="flex flex-column mt-4 align-items-center">
            <Knob
              value={83.04}
              valueTemplate={'{value}%'}
              readOnly
              size={130}
              strokeWidth={5}
              valueColor="#166c7d"
              rangeColor="#E9F3F5"
            />
            <p className="text-secondary2 font-medium p-0 m-0">
              Total Reused Water: <span className="text-theme">682.8</span>
            </p>
          </div>
        </div>

        <div
          className="flex flex-column bg-white border-round p-4 gap-3 w-full"
          style={{ flex: "45%" }}
        >
            <p className="text-primary1 font-semibold text-lg p-0 m-0 text-left">
              Water Usage Management
            </p>
         <div className="flex gap-3">
         <div className="flex flex-column sec-theme border-round p-4 gap-2 align-items-center w-full">
            <div className="flex w-8rem custom-circular-progress">
              <CircularProgressbar
                value={69.8}
                text="69.80%"
                strokeWidth={6}
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
            <p className="text font-medium text-sm text-center p-0 m-0">
              Percentage of Houses with Connections but no Water Meter
            </p>
          </div>
          <div className="flex flex-column sec-theme border-round p-4 gap-2 align-items-center w-full">
            <div className="flex w-8rem custom-circular-progress">
              <CircularProgressbar
                value={37.8}
                text="37.80%"
                strokeWidth={6}
                styles={buildStyles({
                  pathColor: "#E62225",
                  textColor: "#001F23",
                  trailColor: "#E7EAEA",
                  textSize: "1.2rem",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(2.25turn)",
                })}
              />
            </div>
            <p className="text font-medium text-center text-sm p-0 m-0">
              Percentage of Total Bill Generated being Paid
            </p>
          </div>
         </div>
        </div>

        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-4"
          style={{ flex: "20%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Preservation
          </p>
          <div className="flex flex-column gap-4">
            <div
              className="flex flex-column w-full p-2 justify-content-center"
              style={{
                borderLeft: "4px solid #1F8297", // Adjust thickness and color
                height: "50px", // Adjust height
              }}
            >
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                3500 <span className="text-2xl"> m&sup3;</span>
              </p>
              <p className="text p-0 m-0">Total Volume Harvested</p>
            </div>
            <Divider />
            <div
              className="flex flex-column w-full p-2 justify-content-center"
              style={{
                borderLeft: "4px solid #98C6CF", // Adjust thickness and color
                height: "50px", // Adjust height
              }}
            >
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                144
              </p>
              <p className="text p-0 m-0">No. of sites with RWHS</p>
            </div>
          </div>
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
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-right"
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
          {recommendationsVisible && <WaterRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default WaterDashboard;
