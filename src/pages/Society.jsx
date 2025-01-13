import React from "react";
import society from "assets/Report/Society.svg";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { PieChartRow } from "Layout/GraphVisuals";
import increase from "assets/increase.png";

const Society = () => {
  const societyLables = [
    "Healthcare",
    "Education",
    "Employment Opportunity",
    "Cultural Preservation",
    "Community Enagagement & Holistic Well-Being",
    "Public Transport",
  ];
  const societyData = [12, 7, 15, 2, 15, 19];

  return (
    <div className="flex flex-column p-4 gap-4">
      <div className="flex gap-4">
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-around p-4"
          style={{ flex: "25%" }}
        >
          <div className="flex">
            <div className="flex flex-column gap-4">
              <p className="card-title p-0 m-0 text-xl">Society</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                80
              </p>
              <div className="flex align-items-center justify-content-start">
                <img
                  src={increase}
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                />
                <p className="text-tertiary3 p-0 m-0 font-medium">
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
                </p>
              </div>
            </div>
            <div className="align-items-start justify-content-end ml-5">
              <img src={society} alt="society" className="w-4rem" />
            </div>
          </div>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-around p-4"
          style={{ flex: "25%" }}
        >
          <div className="flex flex-column align-items-start w-full gap-3">
            <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
            <PieChartRow
              categories={societyLables}
              series={societyData}
              height={120}
              fontSize={8}
            />
          </div>
        </div>
        <div className="flex flex-column" style={{ flex: "50%" }}>
          <div className="flex flex-column border-round-2xl bg-white p-3">
            <p className="text-xl font-medium p-0 m-0">Summary</p>
            <p>
              The score 70 is combined output of all the indicators falling
              under SDG 11.
            </p>
            <Divider />
            <p>
              CSI promotes integrated and balanced urban development strategies.
            </p>
            <Divider />
            <p>
              The score 70 is combined output of all the indicators falling
              under SDG 11. CSI promotes integrated and balanced urban
              development strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Society;
