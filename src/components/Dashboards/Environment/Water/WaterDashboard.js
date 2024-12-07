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
    setRecommendationsVisible((prev) => !prev);
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
            Water Sources
          </p>
          <div className="flex justify-content-between gap-8">
            <div
              className="flex flex-column w-full p-2"
              style={{
                borderLeft: "3px solid #1F8297", // Adjust thickness and color
                height: "50px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                12 <span className="text-lg">MLD</span>
              </p>
              <div className="flex align-items-center gap-2">
                <p className="text m-0 p-0 mt-1 text-sm font-medium">
                  NaturalResources
                </p>
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
                height: "50px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                36 <span className="text-lg">MLD</span>
              </p>
              <div className="flex align-items-center gap-2">
                <p className="text p-0 m-0 mt-1 font-medium text-sm">Dams</p>
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
          <ProgressBar
            value={79.58}
            style={{ height: "0.5rem" }} // Adjust the height
            className="w-full border-round mt-3" // Full width of its container
            color="#166c7d"
            displayValueTemplate={() => null} // Hide the displayed value
          />
        </div>

        {/* Water Supply */}
        <div className="flex gap-2 p-4 w-full border-round bg-white">
          <div className="flex flex-column w-full gap-4">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Water Supply
            </p>
            <div
              className="flex justify-content-between"
              style={{ flex: "30%" }}
            >
              <div className="flex flex-column w-full p-2">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  39.55 <span className="text-lg">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm font-medium">
                  Current Water Supply
                </p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  49.68 <span className="text-lg">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm font-medium">
                  Required Water Supply
                </p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2">
                {/* <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  Gap: <span className="text-tertiary3">10.13 MLD</span>
                </p> */}
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  107.47 <span className="text-lg">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm font-medium">Target</p>
                <p className="text-tertiary3 p-0 m-0 text-sm">By 2031</p>
              </div>
            </div>
          </div>
          <div
            className="flex sec-theme px-3 flex-column border-round-xl justify-content-center w-full"
            style={{ flex: "45%" }}
          >
            <p className="text-primary1 font-medium p-0 m-0 mb-4">
              Households with Water Connections
            </p>
            <ProgressBar
              value={79.58}
              style={{ height: "0.5rem" }} // Adjust the height
              className="w-full border-round" // Full width of its container
              color="#166c7d"
              displayValueTemplate={() => null} // Hide the displayed value
            />
            <p className="text-primary1 font-semibold p-0 m-0 text-right text-xl mt-1">
              79.58%
            </p>
            {/* <GaugeChart
            // title="Water Connections"
            gaugeValue={79.58}
            maxValue={100}
            height={100}
          /> */}
          </div>
        </div>
      </div>

      <div className="w-full flex gap-4">
        {/* Water Quality */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-3"
          style={{ flex: "40%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Quality
          </p>
          <div className="flex align-items-center justify-content-between">
            <div className="flex flex-column gap-2">
              <div className="flex flex-column align-items-center" style={{ marginLeft: 60, marginTop: -10 }}>
                <Knob
                  value={83.04}
                  valueTemplate={"{value}%"}
                  readOnly
                  size={150}
                  strokeWidth={5}
                  valueColor="#166c7d"
                  rangeColor="#E9F3F5"
                />
                <p
                  className="text-tertiary3 font-medium p-0"
                  style={{ marginTop: -10 }}
                >
                  Treated Reused Water
                </p>
              </div>
              <p className="text-secondary2 font-medium p-0 m-0 text-left text-sm">
                Total Reused Water:{" "}
                <span className="text-primary2 font-semibold text-lg">682.8 MLD</span>
              </p>
            </div>
            <div className="flex flex-column gap-2" style={{marginTop: -20}}>
              <div
                className="flex flex-column w-full p-2 pr-4 sec-theme"
                style={{
                  borderLeft: "3px solid #1F8297", // Adjust thickness and color
                  height: "60px", // Adjust height
                }}
              >
                <p className="text m-0 p-0 font-medium">Total STPs</p>
                <p className="text-2xl font-semibold m-0 text-secondary2 p-2 text-center">
                  1
                </p>
              </div>
              <div
                className="flex flex-column w-full p-2 pr-4 sec-theme"
                style={{
                  borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                  height: "130px", // Adjust height
                }}
              >
                <p className="text m-0 p-0 mb-2 font-medium">Capacity</p>
                <p className="text-2xl font-semibold m-0 text-secondary2 p-1 text-center">
                  12 <span>MLD</span>
                </p>
                <p className="text m-0 p-0 text-sm text-center font-medium">
                  Current
                </p>
                <Divider />
                <p className="text-2xl font-semibold m-0 text-primary2 p-1 text-center">
                  109.95 <span>MLD</span>
                </p>
                <p className="text m-0 p-0 text-sm text-center font-medium">
                  Required
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Water Usage Management */}
        <div
          className="flex flex-column bg-white border-round p-4 gap-3 w-full"
          style={{ flex: "40%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0 text-left">
            Water Usage Management
          </p>
          <div className="flex gap-4">
            {/* Houses with Connections but no Water Meter */}
            <div className="flex flex-column sec-theme border-round-xl p-4 gap-3 align-items-center w-full">
              <p className="text font-medium p-0 m-0">
                Houses with Unmetered Connections
              </p>
              <div className="flex w-8rem custom-circular-progress">
                <CircularProgressbar
                  value={69.8}
                  text="69.80%"
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "#0C9D61",
                    textColor: "#001F23",
                    trailColor: "#fff",
                    textSize: "1.5rem",
                    pathTransition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(2.25turn)",
                  })}
                />
              </div>
            </div>
            {/* Total Bill Generated being Paid */}
            <div className="flex flex-column sec-theme border-round-xl p-4 gap-3 align-items-center w-full">
              <p className="text font-medium p-0 m-0">Bill Payment Rate</p>
              <div className="flex w-8rem custom-circular-progress">
                <CircularProgressbar
                  value={37.8}
                  text="37.80%"
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "#FFAD0D",
                    textColor: "#001F23",
                    trailColor: "#fff",
                    textSize: "1.5rem",
                    pathTransition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(2.25turn)",
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Water Preservation */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full gap-4"
          style={{ flex: "20%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Water Preservation
          </p>
          <div className="flex flex-column align-items-center justify-content-center">
            <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                3500 <span className="text-2xl"> m&sup3;</span>
              </p>
              <p className="text p-0 m-0 mt-1">Total Volume Harvested</p>
            </div>
            <Divider />
            <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
              <p className="text-3xl font-semibold m-0 text-primary2 p-0">
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
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-down"
              : "pi pi-chevron-up";

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
