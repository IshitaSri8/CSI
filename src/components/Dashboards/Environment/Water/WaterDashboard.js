import React from "react";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob"; // Import Knob from PrimeReact
import { Doughnut } from "Layout/GraphVisuals";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";

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
          <h1 className="m-0 p-0 text-2xl text">Water Quality</h1>
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
      <div className="w-full flex align-items-center justify-content-between gap-4">
        <Card title="Water Production (MLD)" className="w-full">
          {/* <div className="flex align-items-center justify-content-between w-full m-1"> */}
          <Doughnut
            labels={["Dams", "Natural Resources"]}
            series={[12, 36]}
            height={150}
          />
        </Card>
        <Card title="Water Usage Management" className="w-full">
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
        </Card>
        <Card title="Water Preservation" className="w-full">
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
        </Card>
      </div>
      <div className="w-full flex align-items-center justify-content-between gap-4">
        <Card title="Water Treatment" className="w-full">
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
        </Card>

        <Card title="Water Supply" className="w-full">
          <div className="flex align-items-center justify-content-between m-0 gap-6">
            <div className="flex flex-column ">
              <div className="flex align-items-center justify-content-between flex-column mb-4">
                <h1 className="text-xl m-0 p-0 text-theme">900 MLD</h1>
                <p className="font-bold text-center">
                  Proposed Consumption Level
                </p>
              </div>
              <div className="flex align-items-center justify-content-between flex-column">
                <h1 className="text-xl m-0 p-0 text-theme">1123 MLD </h1>
                <p className="font-bold text-center">
                  Actual Consumption Level
                </p>
              </div>
            </div>
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
        </Card>
      </div>
      <div className="flex justify-content-end">
      <Button
        label={recommendationsVisible ? "Close Recommendations" : "Get Recommendations"}
        icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
        onClick={handleToggleRecommendations}
        className="bg-theme text-white"
        raised
      />
      </div>

      {recommendationsVisible && (
        <WaterRecommendations />
      )}
    
    </div>
  );
};

export default WaterDashboard;
