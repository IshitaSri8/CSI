import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob"; // Import Knob from PrimeReact
import { BarChart, DonutChart, GroupedBarChart } from "../../../GraphVisuals";

const WaterDashboard = () => {
  const [barchartdata, setBarchartdata] = useState([]);
  useEffect(() => {
    // Mock data fetching or processing
    setBarchartdata([[900], [1123]]);
  }, []);

  return (
    <div className="w-full p-8">
      <Panel>
        <div className="w-full flex align-items-center justify-content-between flex-row gap-1 mb-6">
          <Card title="Water Production (MLD)">
            <div className=" flex align-items-center justify-content-between flex-row w-full h-9rem m-1">
              <DonutChart
                labels={["Dams", "Natural Resources"]}
                series={[12, 36]}
                height={150}
              />
            </div>
          </Card>
          <Card title="Water Supply">
            <div className="flex align-items-center justify-content-between flex-row h-9rem w-full m-1">
              <div className="flex align-items-center justify-content-between flex-column mt-2 ">
                <div className="flex align-items-center justify-content-between flex-column p-2 m-1">
                  <h1 className="text-xl m-0 p-0 text-green-600">900 MLD</h1>
                  <p className="text-xs font-bold">
                    Proposed Consumption Level
                  </p>
                </div>
                <div className="flex align-items-center justify-content-between flex-row p-2 m-1 ">
                  <div>
                    <h1 className="text-xl m-0 p-0 text-green-600">
                      1123 MLD{" "}
                    </h1>
                    <p className="text-xs font-bold">
                      Actual Consumption Level
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center justify-content-center p-2 m-1 flex-column">
                <Knob value={79.58} readOnly size={130} strokeWidth={5} />
                <p className="text-xs font-bold text-center m-0 p-0">
                  Households with Water Connections vs. Total Households
                </p>
              </div>
            </div>
          </Card>
          <Card title="Water Preservation">
            <div className="flex align-items-center justify-content-between flex-column h-9rem m-1">
              <div className="flex align-items-center justify-content-between flex-column p-2">
                <h1 className="text-xl m-0 p-0 text-green-600">3500</h1>
                <p className="text-xs font-bold">
                  Total Volume Harvested (<span>m&sup3;</span>)
                </p>
              </div>
              <div className="flex align-items-center justify-content-between flex-row p-2">
                <div>
                  <h1 className="text-xl m-0 p-0 text-green-600">144 </h1>
                  <p className="text-xs font-bold">No. of sites with RWHS</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full flex align-items-center justify-content-between flex-row mt-2 gap-2">
          <Card title="Water Treatment">
            <div className="flex align-items-center justify-content-between flex-row h-9rem w-full m-1">
              <div className="flex align-items-center justify-content-between flex-column mt-2">
                <div className="flex align-items-center justify-content-between flex-column p-3 m-1">
                  <h1 className="text-xl m-0 p-0 text-green-600">10</h1>
                  <p className="text-xs font-bold">Total STPs</p>
                </div>
                <div className="flex align-items-center justify-content-between flex-row p-3 m-1 ">
                  <div>
                    <h1 className="text-xl m-0 p-0 text-green-600">567 </h1>
                    <p className="text-xs font-bold">STP Capacity (MLD)</p>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
                <Knob value={83.04} readOnly size={130} strokeWidth={5} />
                <p className="text-xs font-bold text-center m-0 p-0">
                  Treated Resued Water Vs Total Reused Water
                </p>
              </div>
            </div>
          </Card>
          <Card title="Water Usage Management">
            <div className="flex align-items-center justify-content-between flex-row h-9rem w-full m-1">
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
                <Knob value={63.8} readOnly size={130} strokeWidth={5} />
                <p className="text-xs font-bold text-center m-0 p-0">
                  Houses with Connections but no water meter (%)
                </p>
              </div>
              <div className="flex align-items-center justify-content-center p-3 m-1 flex-column">
                <Knob value={37.8} readOnly size={130} strokeWidth={5} />
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
