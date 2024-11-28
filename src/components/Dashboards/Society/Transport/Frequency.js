import { Card } from "primereact/card";
import React from "react";
import { Doughnut, BarChart } from "Layout/GraphVisuals";
import Air from "@mui/icons-material/Flight";
import Water from "@mui/icons-material/DirectionsBoat";
import Rail from "@mui/icons-material/Train";
import Road from "@mui/icons-material/DirectionsCar";
// import InfoIcon from "@mui/icons-material/Info";
// import CustomTooltip from "./CustomTooltip";
import increase from "assets/increase.png";
import { Tooltip } from "primereact/tooltip";

const Frequency = () => {
  const categories = ["Roadways", "Railways", "Airways", "Waterways"];
  const waitseries = [70, 80, 60, 50];
  const frequencyseries = [70, 80, 60, 50];

  const cardsData = [
    { label: "No. of Buses per day", value: 250, icon: Road },
    { label: "No. of Trains per day", value: 483, icon: Rail },
    { label: "No. of Planes per day", value: 12, icon: Air },
    { label: "No. of Ships per day", value: 3, icon: Water },
  ];

  return (
    <div className="flex flex-column gap-4">
      <div className="flex align-items-center justify-content-between flex-row gap-4">
        {cardsData.map((card, index) => (
          <Card className="h-auto w-full p-0" key={index}>
            <div className="flex w-full h-auto p-0 m-0">
              {/* Left Column: Content */}
              <div className="flex w-full m-0 p-0 align-items-start justify-content-start flex-column">
                <p className="m-0 text-lg font-medium text p-0">{card.label}</p>
                <p className="text-xl text-primary1 font-semibold">
                  {card.value}
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
            <div className="flex align-items-start justify-content-between flex-row w-full ">
              <div className="flex align-items-start justify-content-start flex-row">
                <img
                  src={increase}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                ></img>
                <p className="text-theme text-sm p-0 m-0">
                  10% increase in last one year.
                </p>
              </div>
              <i className="pi pi-info-circle text-theme w-full text-right frequency text-sm"></i>
              <Tooltip target=".frequency" position="right">
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-sm">Frequency In Current Year: 70%</p>
                  <p className="m-0 text-sm">Frequency In Previous Year: 60%</p>
                </div>
              </Tooltip>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex align-items-center justify-content-between gap-4">
        <Card className="w-full">
          <BarChart
            categories={categories}
            series={waitseries}
            height={150}
            width={"100%"}
            title="Average wait time for different transport modes"
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            labels={categories}
            series={frequencyseries}
            height={150}
            title="Average number of services per day"
            horizontal={"center"}
            vertical={"bottom"}
            colorArray={[
              "#98C6CF", // Light Blue
              "#1F8297", // Dark Cyan
              "#166c7d", // Dark Teal
              "#0F4B57",
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default Frequency;
