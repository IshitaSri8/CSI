import { Card } from "primereact/card";
import React from "react";
import { DonutChart, GroupedColumnChart } from "Layout/GraphVisuals";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import increase from "assets/increase.png";
import { Tooltip } from "primereact/tooltip";

const PrivateVehicle = () => {
  const categories = ["Roadways", "Railways", "Airways", "Waterways"];
  const privateSeries = [1200, 230, 570, 800];
  //const partnershipSeries = [70, 80, 60, 50];
  const chartCategories = ["2021", "2022", "2023", "2024"];
  const chartData = [
    { name: "Roadways", data: [5, 7, 8, 11] },
    { name: "Railways", data: [3, 5, 7, 9] },
    { name: "Airways", data: [1, 3, 5, 8] },
    { name: "Waterways", data: [7, 8, 9, 7] },
  ];

  return (
    <div className="flex align-items-center justify-content-between gap-8 p-4">
      <div className="flex align-items-center justify-content-between flex-column gap-3">
        {/* Card 1: Number of Private Vehicles */}
        <Card className="w-full ">
          <div className="flex flex-column align-items-center justify-content-between gap-3 ">
            <h1 className="m-0 p-0 text-xl text-center">3000</h1>
            <h1 className="m-0 text-xs text-center">
              Number of private vehicles contributing to public transport
            </h1>
            <div className="flex align-items-center justify-content-center w-full">
              {/* Tooltip with DonutChart Chart */}
              <i className="pi pi-info-circle text-theme w-full text-right vehicle text-sm"></i>
              <Tooltip target=".vehicle" position="right">
                <div className="w-16rem">
                  <DonutChart
                    title="Breakdown of private vehicles per transport mode"
                    labels={categories}
                    series={privateSeries}
                    height={150}
                    fontColor={"#4c4c4c"}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* Card 2: Transport Mode Usage by Percentage */}
        <Card className="w-full">
          <div className="flex align-items-center justify-content-center gap-3 flex-column">
            <div className="flex align-items-center justify-content-center">
              <img
                src={increase}
                style={{
                  height: "1rem",
                  width: "1rem",
                  marginRight: "0.5rem",
                }}
                alt="increase"
              />
              <h1 className="m-0 text-xl">15%</h1>
            </div>
            <h1 className="m-0 text-xs text-center">
              Percentage increase in private vehicles contributing to public
              transport
            </h1>

            {/* Tooltip with Additional Info */}
            <i className="pi pi-info-circle text-theme w-full text-right contri text-sm"></i>
            <Tooltip target=".contri" position="right">
              <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                <p className="m-0 text-xs">
                  Percentage contribution this year: 64%
                </p>
                <p className="m-0 text-xs">
                  Percentage contribution Last year: 49%
                </p>
              </div>
            </Tooltip>
          </div>
        </Card>
      </div>
      {/* Card 3: Private-public partnerships */}
      <Card className="w-full">
        <GroupedColumnChart
          title="Private-public partnership by percentage Over Years"
          labels={chartCategories}
          dataSeries={chartData}
          dataPointWidth={25}
          height={260}
        />
      </Card>
    </div>
  );
};

export default PrivateVehicle;
