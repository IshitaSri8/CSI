import React from "react";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob"; // Import Knob from PrimeReact
import { Doughnut, GaugeChart } from "Layout/GraphVisuals";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { Tooltip } from "primereact/tooltip";

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
              <div className="flex align-items-center">
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
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Water Connections
            </p>
            <GaugeChart
              // title="Water Connections"
              gaugeValue={79.58}
              maxValue={100}
              height={100}
            />
          </div>
      </div>
      
      <div className="w-full flex align-items-center justify-content-between gap-4">
        <div className="flex flex-column bg-white border-round p-4 w-full">
          <p>Water Treatment</p>
          <div className="flex align-items-center justify-content-between w-full">
            <div className="flex align-items-center justify-content-between flex-column gap-2">
              <div className="flex align-items-center justify-content-between flex-column">
                <h1 className="text-xl m-0 p-0 text-theme">10</h1>
                <p className="font-bold">Total STPs</p>
              </div>
              <div className="flex align-items-center justify-content-between flex-column ">
                <h1 className="text-xl m-0 p-0 text-theme">567 </h1>
                <p className="font-bold">STP Capacity (MLD)</p>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center flex-column">
              <Knob
                value={83.04}
                readOnly
                size={130}
                strokeWidth={5}
                valueColor="#166c7d"
                rangeColor="#E9F3F5"
              />
              <p className="text-xs font-bold text-center m-0 p-0">
                Treated Resued Water Vs Total Reused Water
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round p-4 w-full">
          <p>Water Supply</p>
          <div className="flex align-items-center justify-content-between m-0 gap-6">
            <div className="flex align-items-center justify-content-center flex-column">
              <Knob
                value={79.58}
                readOnly
                size={130}
                strokeWidth={5}
                valueColor="#166c7d"
                rangeColor="#E9F3F5"
              />
              <p className="text-xs font-bold text-center m-0 p-0">
                Households with Water Connections vs. Total Households
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round p-4 w-full">
          <p>Water Usage Management</p>
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center justify-content-center flex-column">
              <Knob
                value={63.8}
                readOnly
                size={120}
                strokeWidth={5}
                valueColor="#166c7d"
                rangeColor="#E9F3F5"
              />
              <p className="text-xs font-bold text-center m-0 p-0">
                Houses with Connections but no water meter (%)
              </p>
            </div>
            <div className="flex align-items-center justify-content-center flex-column">
              <Knob
                value={37.8}
                readOnly
                size={120}
                strokeWidth={5}
                valueColor="#166c7d"
                rangeColor="#E9F3F5"
              />
              <p className="text-xs font-bold text-center m-0 p-0">
                % of Total Bill Generated being paid
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round p-4 w-full">
          <p>Water Preservation</p>
          <div className="flex align-items-center justify-content-between flex-column p-3">
            <div className="flex align-items-center justify-content-between flex-column mb-4">
              <h1 className="text-xl m-0 p-0 text-theme">3500</h1>
              <p className="text-sm font-bold">
                Total Volume Harvested (<span>m&sup3;</span>)
              </p>
            </div>
            <div className="flex align-items-center justify-content-between flex-column">
              <h1 className="text-xl m-0 p-0 text-theme">144 </h1>
              <p className="text-sm font-bold">No. of sites with RWHS</p>
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
