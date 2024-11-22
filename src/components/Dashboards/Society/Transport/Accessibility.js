import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import React from "react";
import Air from "@mui/icons-material/Flight";
import Water from "@mui/icons-material/DirectionsBoat";
import Rail from "@mui/icons-material/Train";
import Road from "@mui/icons-material/DirectionsCar";
import decrease from "assets/decrease.png";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import { Doughnut } from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";

const Accessibility = () => {
  const usageLabels = ["Roadways", "Railways", "Airways", "Waterways"];
  const usageSeries = [85, 73, 42, 35];

  const cardsData = [
    { label: "Roadways", value: 85, icon: Road },
    { label: "Railways", value: 73, icon: Rail },
    { label: "Airways", value: 42, icon: Air },
    { label: "Waterways", value: 35, icon: Water },
  ];

  return (
    <div className="flex flex-column  gap-4">
      <div className="flex align-items-center justify-content-between gap-4">
        {cardsData.map((card, index) => (
          <Card className="h-auto w-full p-0" key={index}>
            <div className="flex flex-column gap-3">
              <div className="flex w-full">
                {/* Left Column: Content */}
                <div className="flex w-full m-0 p-0 align-items-start justify-content-start flex-column">
                  <p className="m-0 p-o text-lg font-medium text">
                    {card.label}
                  </p>
                  <p className="text-xl text-primary1 ml-0 mb-0 font-semibold">
                    {card.value}%
                  </p>
                </div>

                {/* Right Column: Icon */}
                <div className="col-4 flex align-items-start justify-content-end">
                  <card.icon
                    style={{
                      height: "3rem",
                      width: "3rem",
                      color: "#1f8297",
                    }}
                  />
                </div>
              </div>
              <div className="flex align-items-center justify-content-center w-full">
                <ProgressBar
                  value={card.value}
                  showValue={false}
                  color="#1f8297"
                  style={{
                    height: "0.4rem", // Adjust the height
                  }}
                  className="w-full" // Make sure it takes full width of its container
                />
              </div>
              <div className="flex align-items-start justify-content-between w-full">
                <div className="flex align-items-start justify-content-start flex-row">
                  <img
                    src={decrease}
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginRight: "0.5rem",
                    }}
                    alt="increase"
                  ></img>
                  <p className="text-red-400 text-sm p-0 m-0">
                    10% decrease in last one year.
                  </p>
                </div>
                <i className="pi pi-info-circle text-theme w-full text-right access text-sm"></i>
                <Tooltip target=".access" position="right">
                  <div className="flex align-items-center justify-content-center gap-1 flex-column w-full">
                    <p className="m-0 text-sm">
                      Accessibility In Current Year: 60%
                    </p>
                    <p className="m-0 text-sm">
                      Accessibilty In Previous Year: 70%
                    </p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex align-items-center justify-content-between gap-4">
        {/* Doughnut Chart for overall transport usage */}
        <Card className="w-full p-0">
          <Doughnut
            title="Transport Mode Usage by Percentage"
            labels={usageLabels}
            series={usageSeries}
            height={150}
            horizontal={"center"}
            vertical={"bottom"}
            colorArray={["#98C6CF", "#0F4B57", "#1f8297", "#166c7d"]}
          />
        </Card>

        <Card className="w-full">
          <p className="m-0 p-1 text-lg">Heat Map</p>
        </Card>
      </div>
    </div>
  );
};

export default Accessibility;
