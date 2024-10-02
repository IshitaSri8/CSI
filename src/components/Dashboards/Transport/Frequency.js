import { Card } from "primereact/card";
import React from "react";
import { Doughnut, BarChart } from "../../GraphVisuals";

import Air from "@mui/icons-material/Flight";
import Water from "@mui/icons-material/DirectionsBoat";
import Rail from "@mui/icons-material/Train";
import Road from "@mui/icons-material/DirectionsCar";

const Frequency = () => {
  const categories = ["Roadways", "Railways", "Airways", "Waterways"];
  const waitseries = [[70, 80, 60, 50]];
  const frequencyseries = [70, 80, 60, 50];

  const cardsData = [
    { label: "No. of Buses per day", value: 250, icon: Road },
    { label: "No. of Trains per day", value: 483, icon: Rail },
    { label: "No. of Planes per day", value: 12, icon: Air },
    { label: "No. of Ships per day", value: 3, icon: Water },
  ];

  return (
    <>
      <div className="flex align-items-center justify-content-between flex-row gap-2 mb-2">
        {cardsData.map((card, index) => (
          <Card className="h-auto w-full p-0" key={index}>
            <div className="flex w-full h-auto p-0 m-0">
              {/* Left Column: Content */}
              <div className="flex w-full m-0 p-0 align-items-start justify-content-start flex-column">
                <h1 className="m-0 text-xs">{card.label}</h1>
                <h1 className="text-xl text-green-500 ml-0 mb-0 ">
                  {card.value}
                </h1>
              </div>

              {/* Right Column: Icon */}
              <div className="col-4 flex align-items-start justify-content-end">
                <card.icon
                  style={{
                    height: "3rem",
                    width: "3rem",
                    color: "#00a269",
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex align-items-center justify-content-between gap-1 mt-2">
        <Card className="w-full">
          <BarChart
            categories={categories}
            series={waitseries}
            height={200}
            width={300}
            title="Average wait time for different transport modes"
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            labels={categories}
            series={frequencyseries}
            height={200}
            width={300}
            title="Average number of services per day"
          />
        </Card>
      </div>
    </>
  );
};

export default Frequency;
