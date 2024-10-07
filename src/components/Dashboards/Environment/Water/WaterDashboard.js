import React from "react";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob"; // Import Knob from PrimeReact
import { DonutChart } from "../../../GraphVisuals";

const WaterDashboard = () => {
  return (
    <div className="w-full">
      <Panel>
        <div className="w-full flex align-items-center justify-content-between flex-row gap-5 mb-6">
          <Card title="Water Production (MLD)" className="flex w-full">
            <div className="flex align-items-center justify-content-between flex-row w-full m-1">
              <DonutChart
                labels={["Dams", "Natural Resources"]}
                series={[12, 36]}
                height={150}
                width={600}
              />
            </div>
          </Card>
          <Card title="Water Supply" className="flex w-full">
            <div className="flex align-items-center justify-content-between flex-row m-1 gap-6">
              <div className="flex align-items-center justify-content-between flex-column mt-2 ">
                <div className="flex align-items-center justify-content-between flex-column p-2 m-1">
                  <h1 className="text-xl m-0 p-0 text-theme">900 MLD</h1>
                  <p className="text-xs font-bold">
                    Proposed Consumption Level
                  </p>
                </div>
                <div className="flex align-items-center justify-content-between flex-row p-2 m-1 ">
                  <div>
                    <h1 className="text-xl m-0 p-0 text-theme">1123 MLD </h1>
                    <p className="text-xs font-bold">
                      Actual Consumption Level
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center justify-content-center p-2 m-1 flex-column">
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
          <Card title="Water Preservation" className="flex w-full">
            <div className="flex align-items-center justify-content-between flex-column m-1">
              <div className="flex align-items-center justify-content-between flex-column p-2">
                <h1 className="text-xl m-0 p-0 text-theme">3500</h1>
                <p className="text-xs font-bold">
                  Total Volume Harvested (<span>m&sup3;</span>)
                </p>
              </div>
              <div className="flex align-items-center justify-content-between flex-column p-2">
                <h1 className="text-xl m-0 p-0 text-theme">144 </h1>
                <p className="text-xs font-bold">No. of sites with RWHS</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full flex align-items-center justify-content-between flex-row mt-2 gap-2">
          <Card title="Water Treatment">
            <div className="flex align-items-center justify-content-between flex-row w-full m-1">
              <div className="flex align-items-center justify-content-between flex-column mt-2">
                <div className="flex align-items-center justify-content-between flex-column p-3 m-1">
                  <h1 className="text-xl m-0 p-0 text-theme">10</h1>
                  <p className="text-xs font-bold">Total STPs</p>
                </div>
                <div className="flex align-items-center justify-content-between flex-row p-3 m-1 ">
                  <div>
                    <h1 className="text-xl m-0 p-0 text-theme">567 </h1>
                    <p className="text-xs font-bold">STP Capacity (MLD)</p>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
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
          <Card title="Water Usage Management">
            <div className="flex align-items-center justify-content-between flex-row w-full m-1">
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
                <Knob
                  value={63.8}
                  readOnly
                  size={130}
                  strokeWidth={5}
                  valueColor="#166c7d"
                  rangeColor="#E9F3F5"
                />
                <p className="text-xs font-bold text-center m-0 p-0">
                  Houses with Connections but no water meter (%)
                </p>
              </div>
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
                <Knob
                  value={37.8}
                  readOnly
                  size={130}
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
        </div>
      </Panel>
    </div>
  );
};

export default WaterDashboard;
