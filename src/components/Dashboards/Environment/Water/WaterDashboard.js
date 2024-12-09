import React from "react";
import { Knob } from "primereact/knob";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CanvasJSReact from "@canvasjs/react-charts";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { Tooltip } from "primereact/tooltip";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ProgressBar } from "primereact/progressbar";
import {
  ModifiedPieChart,
  ModifiedPieChartPercentage,
  PieChart,
} from "Layout/GraphVisuals";
import {
  ChevronsRight,
  CircleChevronRight,
  Dot,
  Droplet,
  Droplets,
} from "lucide-react";

const WaterDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const waterSupplyData = [58, 40, 2];
  const waterSupplyLabels = ["Groundwater", "Individual Taps", "Bore Well"];
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
      <div className="flex align-items-center justify-content-between flex-row gap-4">
        {/* left */}
        <div
          className="flex align-items-center justify-content-center flex-column gap-2"
          style={{ flex: "70%" }}
        >
          <div className="w-full flex gap-4 ">
            {/* Water Supply */}
            <div className="flex gap-2 p-4 w-full border-round bg-white">
              <div className="flex flex-column w-full gap-4">
                <p className="text-primary1 font-semibold text-lg p-0 m-0">
                  Water Supply
                </p>
                <div className="flex justify-content-between align-items-center">
                  <div className="flex flex-column w-full p-2">
                    <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                      39.55 <span className="text-lg">MLD</span>
                    </p>
                    <p className="text p-0 m-0 mt-1 text-sm">
                      Current Water Supply
                    </p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2">
                    <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                      49.68 <span className="text-lg">MLD</span>
                    </p>
                    <p className="text p-0 m-0 mt-1 text-sm">
                      Required Water Supply
                    </p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2">
                    {/* <p className="text-lg font-semibold m-0 text-secondary2 p-0">
                  Gap: <span className="text-tertiary3">10.13 MLD</span>
                </p> */}
                    <div className="flex flex-row align-items-center justify-content-between">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        10.13 <span className="text-lg">MLD</span>
                      </p>
                      <p className=" p-0 m-0 mt-1 text-xl text-red-600 font-semibold">
                        -20.5 %
                      </p>
                    </div>
                    <p className="text p-0 m-0 mt-1 text-sm">
                      Water Supply Gap
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex sec-theme gap-2 p-4 flex-column border-round align-items-center justify-content-center w-full mt-4"
                style={{ flex: "40%" }}
              >
                <ProgressBar
                  value={79.58}
                  style={{ height: "1rem" }} // Adjust the height
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
                  className="text-sm font-medium p-0 m-0"
                  style={{ marginTop: 10 }}
                >
                  Households with Water Supply
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 mt-3">
            {/* Water Usage Management */}
            <div
              className="flex flex-column bg-white border-round p-4 gap-3 w-full"
              style={{ flex: "60%" }}
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
                    Houses with Metered Connections
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
            {/* Water Quality */}
            <div
              className="flex flex-column bg-white border-round p-4 w-full gap-3"
              style={{ flex: "40%" }}
            >
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                Water Treatment
              </p>
              <div className="flex align-items-start justify-content-between">
                <div className="flex flex-column align-items-center">
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
                    className="text-tertiary3 font-medium p-0 text-sm"
                    style={{ marginTop: -10 }}
                  >
                    Treated Reused Water
                  </p>
                </div>
                <div className="flex flex-column gap-2">
                  <div
                    className="flex flex-column w-full p-2 pr-4 sec-theme"
                    style={{
                      borderLeft: "3px solid #1F8297", // Adjust thickness and color
                      height: "50px", // Adjust height
                    }}
                  >
                    <p className="text m-0 p-0 font-medium text-sm">
                      Total STPs
                    </p>
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      1
                    </p>
                  </div>
                  <div
                    className="flex flex-column w-full p-2 pr-4 sec-theme"
                    style={{
                      borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                      // height: "120px", // Adjust height
                    }}
                  >
                    <p className="text m-0 p-0 mb-2 font-medium text-sm">
                      Capacity
                    </p>
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      12 <span>MLD</span>
                    </p>
                    <p className="text m-0 p-0 text-xs">Current</p>
                    <Divider />
                    <p className="text-xl font-semibold m-0 text-primary2 p-0">
                      109.95 <span>MLD</span>
                    </p>
                    <p className="text m-0 p-0 text-xs">Required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div
          className="flex align-items-center justify-content-center flex-column"
          style={{ flex: "20%" }}
        >
          <div className="w-full">
            {/* Water Sources */}
            <div
              className="flex flex-column bg-white border-round p-4 w-full gap-2 justify-content-start "
              style={{ flex: "35%" }}
            >
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                Water Sources
              </p>
              <div className="flex align-items-start justify-content-start flex-column gap-2">
                <ModifiedPieChartPercentage
                  categories={waterSupplyLabels}
                  series={waterSupplyData}
                  height={100}
                  title=""
                  vertical="center"
                  horizontal="right"
                  fontSize={8}
                />
                <div className="flex align-items-center justify-content-between gap-6">
                  <div className="flex align-items-center justify-content-center flex-column">
                    <p className="text text-sm m-0 p-0">1939</p>
                    <p className="text text-sm m-0 p-0">Handpumps</p>
                  </div>
                  <div className="flex align-items-center justify-content-center flex-column">
                    <p className="text text-sm m-0 p-0">14</p>
                    <p className="text text-sm m-0 p-0">Tanks/Ponds</p>
                  </div>
                  <div className="flex align-items-center justify-content-center flex-column">
                    <p className="text text-sm m-0 p-0">1</p>
                    <p className="text text-sm  m-0 p-0">River/Canal</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Water Preservation */}
            <div
              className="flex flex-column bg-white border-round p-4 w-full gap-4 mt-3"
              style={{ flex: "25%" }}
            >
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                Water Preservation
              </p>
              <div className="flex flex-column align-items-center justify-content-center">
                <div className="flex flex-column w-full p-2">
                  <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                    3500 <span className="text-lg"> m&sup3;</span>
                  </p>
                  <p className="text p-0 m-0 mt-1 text-xs">
                    Total Volume Harvested
                  </p>
                </div>
                <Divider />
                <div className="flex flex-column w-full p-2">
                  <p className="text-xl font-semibold m-0 text-primary2 p-0">
                    144
                  </p>
                  <p className="text p-0 m-0 mt-1 text-xs">
                    No. of sites with Rain Water Harvesting System
                  </p>
                </div>
              </div>
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
