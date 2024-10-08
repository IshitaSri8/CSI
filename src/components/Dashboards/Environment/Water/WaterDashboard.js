import React from "react";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob"; // Import Knob from PrimeReact
import { DonutChart } from "../../../GraphVisuals";

const WaterDashboard = () => {
  return (
    <div className="w-full px-5 flex gap-4 flex-column">
      <div className="w-full flex align-items-center justify-content-between gap-4">
        <Card title="Water Production (MLD)" className="w-full">
          {/* <div className="flex align-items-center justify-content-between w-full m-1"> */}
          <DonutChart
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
    </div>
  );
};

export default WaterDashboard;
