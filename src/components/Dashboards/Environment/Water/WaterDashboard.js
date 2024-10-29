import React from "react";
import { Knob } from "primereact/knob";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { Tooltip } from "primereact/tooltip";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ProgressBar } from "primereact/progressbar";

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
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Water Management
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
      {/* Water Production */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-4"
          style={{ flex: "35%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Production
          </p>
          <div className="flex justify-content-between gap-8">
            <div
              className="flex flex-column w-full p-2"
              style={{
                borderLeft: "3px solid #1F8297", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                12 <span className="text-xl">MLD</span>
              </p>
              <div className="flex align-items-center gap-2">
                <p className="text m-0 p-0 mt-1">Natural Resources</p>
                <i className="pi pi-info-circle text-theme natural text-sm p-0 m-0 mt-1"></i>
                <Tooltip target=".natural" position="bottom">
                  <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
                    <h1 className="m-0 p-0 text-lg text-cyan-800">
                      Natural Resources
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
                borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                36 <span className="text-xl">MLD</span>
              </p>
              <div className="flex align-items-center gap-2">
                <p className="text p-0 m-0 mt-1">Dams</p>
                <i className="pi pi-info-circle text-theme dams text-sm p-0 m-0 mt-1"></i>
                <Tooltip target=".dams" position="bottom">
                  <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
                    <h1 className="m-0 p-0 text-lg text-cyan-800">Dams</h1>
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

        {/* Water Supply */}
        <div
          className="flex gap-2 p-4 w-full border-round bg-white"
          style={{ flex: "65%" }}
        >
          <div className="flex flex-column w-full gap-4">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Water Supply
            </p>
            <div className="flex justify-content-between">
              <div className="flex flex-column w-full p-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  39.55 <span className="text-xl">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">Current Water Supply</p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2">
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  49.68 <span className="text-xl">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">Required Water Supply</p>
              </div>
            </div>
          </div>
          <div className="flex sec-theme gap-4 p-4 flex-column border-round align-items-center justify-content-center w-full">
            <ProgressBar
              value={79.58}
              style={{ height: "1.25rem" }} // Adjust the height
              className="w-full" // Full width of its container
              color="#166c7d"
              //  displayValueTemplate={() => null} // Hide the displayed value
            />
            {/* <GaugeChart
            // title="Water Connections"
            gaugeValue={79.58}
            maxValue={100}
            height={100}
          /> */}
            <p
              className="text-primary1 font-medium p-0 m-0"
              style={{ marginTop: -50 }}
            >
              Households with Water Connections
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-4">
        {/* Water Quality */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-3"
          style={{ flex: "36%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Quality
          </p>
          <div className="flex align-items-center justify-content-between">
            <div className="flex flex-column gap-4">
              <div
                className="flex flex-column w-full p-2 sec-theme gap-1"
                style={{
                  borderLeft: "3px solid #1F8297", // Adjust thickness and color
                  height: "60px", // Adjust height
                }}
              >
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  1
                </p>
                <p className="text m-0 p-0 mt-1">STP</p>
              </div>
              <div
                className="flex flex-column w-full p-2 sec-theme gap-2"
                style={{
                  borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                  height: "60px", // Adjust height
                }}
              >
                <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                  12 <span className="text-xl">MLD</span>
                </p>
                <p className="text m-0 p-0 mt-1">Total STP Capacity</p>
              </div>
            </div>
            <div className="flex flex-column align-items-center">
              <Knob
                value={83.04}
                valueTemplate={"{value}%"}
                readOnly
                size={120}
                strokeWidth={5}
                valueColor="#166c7d"
                rangeColor="#E9F3F5"
              />
              <p
                className="text-tertiary3 font-medium p-0 text-sm"
                style={{ marginTop: -10 }}
              >
                Treated Reused Water
              </p>
            </div>
          </div>
          <p className="text-secondary2 font-medium p-0 m-0 text-right">
            Total Reused Water:{" "}
            <span className="text-theme font-semibold">682.8 MLD</span>
          </p>
        </div>

        {/* Water Usage Management */}
        <div
          className="flex flex-column bg-white border-round p-4 gap-3 w-full"
          style={{ flex: "40%" }}
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
                {/* Houses with Connections but no Water Meter */}
                Houses with Unmetered Connections
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
                Bill Payment Rate
                {/* Total Bill Generated being Paid */}
              </p>
            </div>
          </div>
        </div>

        {/* Water Preservation */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-4"
          style={{ flex: "25%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Preservation
          </p>
          <div className="flex flex-column">
            <div className="flex flex-column w-full p-2 justify-content-center">
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                3500 <span className="text-2xl"> m&sup3;</span>
              </p>
              <p className="text p-0 m-0 mt-1">Total Volume Harvested</p>
            </div>
            <Divider />
            <div className="flex flex-column w-full p-2 justify-content-center">
              <p className="text-4xl font-semibold m-0 text-primary2 p-0">
                144
              </p>
              <p className="text p-0 m-0 mt-1">No. of sites with RWHS</p>
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
