import React from "react";
import { Knob } from "primereact/knob";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ProgressBar } from "primereact/progressbar";
import { ModPieChart } from "Layout/GraphVisuals";

const WaterDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const waterSupplyData = [58, 40, 2];
  const waterSupplyLabels = ["Groundwater", "Individual Taps", "Bore Well"];

  const waterSupply = {
    currentSupply: 39.55, // MLD
    requiredSupply: 49.68, // MLD
    gap: 0, // Placeholder
    gapPercent: 0, // Placeholder
  };

  waterSupply.gap = waterSupply.requiredSupply - waterSupply.currentSupply;
  waterSupply.gapPercent = (
    (waterSupply.gap / waterSupply.requiredSupply) *
    100
  ).toFixed(2);

  const householdWaterSupplyPercent = 79.58;
  const waterUsage = { meteredConnections: 69.8, billPaymentRate: 37.8 };
  const waterTreatment = {
    reusedPercent: 83.04,
    totalSTPs: 1,
    capacity: { current: 12, required: 109.95 },
  };
  const waterSources = { handpumps: 1939, tanks: 14, rivers: 1 };
  const waterPreservation = { totalVolume: 3500, sitesWithRWH: 144 };

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
      <div className="flex flex-column align-items-center justify-content-between gap-3">
        <div className="w-full flex gap-3">
          {/* Water Supply */}
          <div
            className="flex flex-column gap-3 p-4 border-round bg-white"
            style={{ flex: "35%" }}
          >
            <p className="card-title p-0 m-0">
              Water Supply
            </p>
            <div className="flex my-2">
              <div className="flex flex-column w-full p-2 align-items-center">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  {waterSupply.currentSupply}{" "}
                  <span className="text-lg">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">
                  Current Water Supply
                </p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2 align-items-center">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  {waterSupply.requiredSupply}{" "}
                  <span className="text-lg">MLD</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">
                  Required Water Supply
                </p>
              </div>
            </div>
            <ProgressBar
              value={waterSupply.gapPercent}
              style={{ height: "0.75rem" }} // Adjust the height
              className="w-full" // Full width of its container
              color="#FFAD0D"
              displayValueTemplate={() => null} // Hide the displayed value
            />
            <p className="text-tertiary3 p-0 m-0 font-semibold">
              Deficit:{" "}
              <span className="text-primary1">{waterSupply.gapPercent}%</span>
            </p>
          </div>
          {/* Water Sources */}
          <div
            className="flex flex-column bg-white border-round p-4 gap-2 justify-content-start"
            style={{ flex: "30%" }}
          >
            <p className="card-title p-0 m-0">
              Water Sources
            </p>
            <div className="flex align-items-center justify-content-center flex-column gap-2">
              <ModPieChart
                categories={waterSupplyLabels}
                series={waterSupplyData}
                height={120}
                // title="Water Sources"
                vertical="center"
                horizontal="right"
                fontSize={11}
              />
            </div>
          </div>
          {/* Sources of Water Supply */}
          <div
            className="flex flex-column justify-content-start bg-white border-round p-4 gap-3 w-full"
            style={{ flex: "35%" }}
          >
            <div className="flex flex-column w-full gap-3">
              <p className="card-title p-0 m-0">
                Water Supply Sources
              </p>
              <div className="flex">
                <div className="flex w-full px-2 flex-column">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                    {waterSources.handpumps}
                  </p>
                  <p className="text text-sm m-0 p-0">Handpumps</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex w-full px-2 flex-column">
                  <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                    {waterSources.tanks}
                  </p>
                  <p className="text text-sm m-0 p-0">Tanks/Ponds</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex w-full px-2 flex-column">
                  <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                    {waterSources.rivers}
                  </p>
                  <p className="text text-sm m-0 p-0">River/Canal</p>
                </div>
              </div>
            </div>
            {/* Households with Water Supply */}
            <div className="flex sec-theme gap-2 p-4 flex-column border-round align-items-center justify-content-center w-full">
              <ProgressBar
                value={householdWaterSupplyPercent}
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
              <p className="text-sm font-medium p-0 m-0">
                Households with Water Supply
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3">
          {/* Water Usage Management */}
          <div
            className="flex flex-column bg-white border-round p-4 gap-3"
            style={{ flex: "40%" }}
          >
            <p className="card-title p-0 m-0 text-left">
              Water Usage Management
            </p>
            <div className="flex gap-3">
              <div className="flex flex-column sec-theme border-round p-4 gap-2 align-items-center w-full">
                <div className="flex w-8rem custom-circular-progress">
                  <CircularProgressbar
                    value={waterUsage.meteredConnections}
                    text={`${waterUsage.meteredConnections}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                      pathColor: "#166c7d",
                      textColor: "#001F23",
                      trailColor: "#E7EAEA",
                      textSize: "1.5rem",
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
                    value={waterUsage.billPaymentRate}
                    text={`${waterUsage.billPaymentRate}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                      pathColor: "#E62225",
                      textColor: "#001F23",
                      trailColor: "#E7EAEA",
                      textSize: "1.5rem",
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
          {/* Water Treatment */}
          <div
            className="flex flex-column bg-white border-round p-4 gap-3"
            style={{ flex: "35%" }}
          >
            <p className="card-title p-0 m-0">
              Water Treatment
            </p>
            <div className="flex align-items-start justify-content-around">
              <div className="flex flex-column align-items-center">
                <Knob
                  value={waterTreatment.reusedPercent}
                  valueTemplate={"{value}%"}
                  readOnly
                  size={150}
                  strokeWidth={6}
                  valueColor="#166c7d"
                  rangeColor="#E9F3F5"
                />
                <p
                  className="text font-medium p-0 text-sm"
                  style={{ marginTop: -10 }}
                >
                  Treated Reused Water
                </p>
              </div>
              <div className="flex flex-column gap-2">
                <div
                  className="flex flex-column w-full p-2 pr-4 sec-theme gap-2"
                  style={{
                    borderLeft: "3px solid #1F8297", // Adjust thickness and color
                    height: "50px", // Adjust height
                  }}
                >
                  <p className="text m-0 p-0 font-medium text-sm">Total STPs</p>
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                    {waterTreatment.totalSTPs}
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
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                    {waterTreatment.capacity.current} <span>MLD</span>
                  </p>
                  <p className="text m-0 p-0 text-xs text-center">Current</p>
                  <Divider />
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0 text-center">
                    {waterTreatment.capacity.required} <span>MLD</span>
                  </p>
                  <p className="text m-0 p-0 text-xs text-center">Required</p>
                </div>
              </div>
            </div>
          </div>
          {/* Water Preservation */}
          <div
            className="flex flex-column bg-white border-round p-4 gap-3"
            style={{ flex: "25%" }}
          >
            <p className="card-title p-0 m-0">
              Water Preservation
            </p>
            <div className="flex flex-column align-items-center justify-content-center">
              <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  {waterPreservation.totalVolume}{" "}
                  <span className="text-xl"> m&sup3;</span>
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">
                  Total Volume Harvested
                </p>
              </div>
              <Divider />
              <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  {waterPreservation.sitesWithRWH}
                </p>
                <p className="text p-0 m-0 mt-1 text-sm">
                  Sites with Rain Water Harvesting System
                </p>
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
          {recommendationsVisible && <WaterRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default WaterDashboard;
