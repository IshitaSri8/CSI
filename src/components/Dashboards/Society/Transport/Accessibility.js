import { Card } from "primereact/card";
import { ProgressBar } from 'primereact/progressbar';
import React from "react";
// import Road from "../../assets/road.png";
// import Rail from "../../assets/rail.png";
// import Air from "../../assets/air.png";
// import Water from "../../assets/water.png";
import Air from "@mui/icons-material/Flight";
import Water from "@mui/icons-material/DirectionsBoat";
import Rail from "@mui/icons-material/Train";
import Road from "@mui/icons-material/DirectionsCar";
import increase from "assets/increase.png";
import decrease from "assets/decrease.png";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import { Doughnut } from "Layout/GraphVisuals";


const Accessibility = () => {
  const usageLabels = ["Roadways", "Railways", "Airways", "Waterways"];
  const usageSeries = [85, 73, 42, 35];


  const cardsData = [
    { label: "Roadways Accessibility", value: 85, icon: Road },
    { label: "Railways Accessibility", value: 73, icon: Rail },
    { label: "Airways Accessibility", value: 42, icon: Air },
    { label: "Waterways Accessibility", value: 35, icon: Water },
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
                <h1 className="m-0">{card.label}</h1>
                <h1
                  className="text-xl text-theme ml-0 mb-0"
                >
                  {card.value}%
                </h1>
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
                style={{
                  height: '0.4rem', // Adjust the height
                  backgroundColor: '#d4edda', // Background color of the progress bar
                  //borderRadius: '0.5rem', // Rounded corners
                }}
                className="w-full" // Make sure it takes full width of its container
              />
            </div>
            <div className="flex align-items-start justify-content-between w-full">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={decrease}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-red-400 text-xs p-0 m-0">
                10% decrease in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="flex align-items-center justify-content-center gap-1 flex-column w-full">
                  <p className="m-0 text-xs">
                    Accessibility In Current Year: 60%
                  </p>
                  <p className="m-0 text-xs">
                    Accessibilty In Previous Year: 70%
                  </p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "red" }}
              />
            </CustomTooltip>
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
          />
        </Card>

        <Card className="w-full">
          <h1 className="m-0 p-1 text-lg">Heat Map</h1>
        </Card>
      </div>
    </div>
  );
};

export default Accessibility;
