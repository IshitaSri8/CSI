import React from "react";
import { useState } from "react";
import LandRecommendations from "./LandRecommendations";
import { Button } from "primereact/button";
import LandReportPrint from "./LandReportPrint";
import { Dialog } from "primereact/dialog";
import { Divide, LandPlot } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import increase from "assets/increase.png";
import { ProgressBar } from "primereact/progressbar";
import { ModifiedBarChart, PieChart } from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

const Land = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const deviationData = [
    { title: "Residential", value: 47, target: 46.91 },
    { title: "Industrial", value: 5, target: 7.33 },
    { title: "Commercial", value: 4, target: 3.36 },
    { title: "Public and Semi-public", value: 15, target: 9.57 },
    { title: "Transportation", value: 19, target: 18.2 },
    { title: "Parks & Opens Spaces", value: 5, target: 13.38 },
  ];

  const getColorBasedOnDeviation = (value, target) => {
    if (value > target) return "#0C9D61"; // Green if the actual value is above the target
    if (value < target) return "#E62225"; // Red if the actual value is below the target
    return "blue"; // Blue if the actual value meets the target
  };

  const distributionSeries = [
    "Miscellaneous",
    "Recreational",
    "Transportation",
    "Parks and Open Spaces",
    "Public and Semi-public",
    "Industrial",
    "Commercial",
    "Residential",
  ];

  const distributionData = 
   [ [137.19, 75.9, 580.98, 163.31, 470.3, 143.09, 124.46, 1466]];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
            Land use
          </h1>
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
              <LandReportPrint show={false} />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex flex-column gap-3">
          <div className="flex gap-3 w-full">
            <div className="flex flex-column bg-white border-round p-4">
              <div className="flex justify-content-between align-items-center">
                <p className="text-primary1 font-medium text-lg">Total Area</p>
                <LandPlot size={15} />
              </div>
              <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-13rem h-13rem p-4">
                <p className="text-4xl font-semibold m-0 text-secondary2">
                  239.638
                </p>
                <p
                  className="text-lg font-medium m-0 text-secondary2"
                  style={{ marginTop: "0" }}
                >
                  sq km
                </p>
              </div>
              <Tag
                className="p-0"
                style={{ backgroundColor: "linear-gradient(to left, #1F8297, #166C7D, #003940)", color: "#fff" }}
                value="Small City"
              />
            </div>

            <div className="flex flex-column bg-white border-round p-4 gap-2">
              <div className="flex justify-content-between align-items-center">
                <p className="text-primary1 font-medium text-lg">
                  Developed Area
                </p>
                <LandPlot size={15} />
              </div>
              <div className="flex w-14rem h-12rem">
                <CircularProgressbar
                  value={91.03}
                  text="91.03%"
                  styles={buildStyles({
                    pathColor: "#1f8297",
                    textColor: "#001F23",
                    trailColor: "#E7EAEA",
                    textSize: "18px",
                    pathTransition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(2.25turn)",
                  })}
                />
              </div>
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
                <p className="text-tertiary3 text-sm p-0 m-0 font-medium">
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-column bg-white border-round p-4 w-full gap-4">
            <p className="p-0 m-0 text-primary1 font-medium text-lg">
              Developed Area VS Proposed Area
            </p>
            <div className="flex gap-4">
              {/* First Column */}
              <div className="flex flex-column w-full">
                {deviationData.slice(0, 3).map((item, index) => (
                  <div
                    className="flex flex-column align-items-start justify-content-start mb-4"
                    key={index}
                  >
                    <p className="text-sm p-0 m-0 mb-1 text-secondary2">
                      {item.title}
                    </p>
                    <ProgressBar
                       value={item.value}
                      style={{ height: "1.5rem" }} // Adjust the height
                      className="w-full" // Full width of its container
                      color={getColorBasedOnDeviation(item.value, item.target)} // Color based on value vs target
                    />
                    {/* Display Actual and Target Values */}
                    <div className="flex justify-content-between w-full mt-1">
                      <span className="text-xs text-tertiary3">{`Developed: ${item.value} %`}</span>
                      <span className="text-xs text-tertiary3">{`Target: ${item.target} %`}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Column */}
              <div className="flex flex-column w-full">
                {deviationData.slice(3).map((item, index) => (
                  <div
                    className="flex flex-column align-items-start justify-content-start mb-4"
                    key={index}
                  >
                    <p className="text-sm p-0 m-0 mb-1 text-secondary2">
                      {item.title}
                    </p>
                    <ProgressBar
                      value={item.value}
                      style={{ height: "1.5rem" }} // Adjust the height
                      className="w-full" // Full width of its container
                      color={getColorBasedOnDeviation(item.value, item.target)} // Color based on value vs target
                    />
                    {/* Display Actual and Target Values */}
                    <div className="flex justify-content-between w-full mt-1">
                      <span className="text-xs text-tertiary3">{`Developed: ${item.value} %`}</span>
                      <span className="text-xs text-tertiary3">{`Target: ${item.target} %`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-column w-full border-round gap-3">
          <div className="bg-white border-round p-4">
            <ModifiedBarChart
              title="Land Distribution"
              categories={distributionSeries}
              series={distributionData}
              height={300}
             // labelFontSize={10}
            />
          </div>
          <div className="flex bg-white border-round p-4 gap-2  justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-4xl font-semibold m-0 text-secondary2">
                2,48,638
              </p>
              <p className="text-primary1 font-medium text-lg">
                Total Population
              </p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-4xl font-semibold m-0 text-secondary2">
                1,798
              </p>
              <p className="text-primary1 font-medium text-lg">
                Population Per Hectare
              </p>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <div className="flex flex-column">
          <div className="flex justify-content-end mb-2">
            <Button
              label={
                recommendationsVisible
                  ? "Close Recommendations"
                  : "View Recommendations"
              }
              icon={
                recommendationsVisible ? "pi pi-times" : "pi pi-check-square"
              }
              onClick={handleToggleRecommendations}
              className="bg-theme text-white"
              raised
            />
          </div>
          {recommendationsVisible && <LandRecommendations />}
        </div>
      )}
    </div>
  );
};

export default Land;
