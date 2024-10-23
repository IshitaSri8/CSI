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
import { Panel } from "primereact/panel";

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

  const distributionData = [
    137.19, 75.9, 580.98, 163.31, 470.3, 143.09, 124.46, 1466,
  ];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
            Land Usage
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

      <div className="flex w-full gap-3">
        <div className="flex flex-column gap-3" style={{flex: "40%"}}>
          <div className="flex gap-3 w-full">
            {/* Total Area */}
            <div className="flex flex-column bg-white border-round p-4 gap-3 w-full">
              <div className="flex justify-content-between align-items-center">
                <p className="text-primary1 font-medium text-lg p-0 m-0">Total Area</p>
                <LandPlot size={15} />
              </div>
              <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-12rem h-12rem">
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
                className="gradient-tag gap-1"
                value="Small City"
                icon="pi pi-info-circle"
              />
            </div>
            {/* Developed Area */}
            <div className="flex flex-column bg-white border-round p-4 gap-3 w-full">
              <div className="flex justify-content-between align-items-center">
                <p className="text-primary1 font-medium text-lg p-0 m-0">
                  Developed Area
                </p>
                <LandPlot size={15} />
              </div>
              <div className="flex w-15rem h-12rem custom-circular-progress">
                <CircularProgressbar
                  value={91.03}
                  text="91.03%"
                  styles={buildStyles({
                    pathColor: "#1f8297",
                    textColor: "#001F23",
                    trailColor: "#E7EAEA",
                    textSize: "1.5rem",
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
          {/* Developed Area VS Proposed Area */}
          <div className="flex flex-column bg-white border-round p-5 gap-3">
            <p className="p-0 m-0 text-primary1 font-medium text-lg">
              Developed Area VS Proposed Area
            </p>
            <div className="flex gap-4">
              {/* First Column */}
              <div className="flex flex-column w-full gap-3">
                {deviationData.slice(0, 3).map((item, index) => (
                  <div
                    className="flex flex-column align-items-start justify-content-start mb-4"
                    key={index}
                  >
                    <p className="text-sm p-0 m-0 mb-1 text-secondary2">
                      {item.title}
                    </p>
                    <div className="relative w-full">
                      <ProgressBar
                        value={item.value}
                        style={{ height: "0.5rem" }} // Adjust the height
                        className="w-full" // Full width of its container
                        color={getColorBasedOnDeviation(
                          item.value,
                          item.target
                        )} // Color based on value vs target
                        displayValueTemplate={() => null} // Hide the displayed value
                      />
                      <div
                        className="absolute top-0"
                        style={{
                          left: `${item.target}%`, // Position based on target percentage
                          transform: "translateX(-50%)", // Center the marker
                          width: "0.1rem", // Marker width
                          height: "0.5rem", // Marker height
                          backgroundColor: "black",
                        }}
                      />
                    </div>
                    {/* Display Actual and Target Values */}
                    <div className="flex justify-content-between w-full mt-1">
                      <span className="text-xs text-tertiary3">{`Developed: ${item.value} %`}</span>
                      <span className="text-xs text-tertiary3">{`Target: ${item.target} %`}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Column */}
              <div className="flex flex-column w-full gap-3">
                {deviationData.slice(3).map((item, index) => (
                  <div
                    className="flex flex-column align-items-start justify-content-start mb-4"
                    key={index}
                  >
                    <p className="text-sm p-0 m-0 mb-1 text-secondary2">
                      {item.title}
                    </p>
                    <div className="relative w-full">
                      <ProgressBar
                        value={item.value}
                        style={{ height: "0.5rem" }}
                        className="w-full"
                        color={getColorBasedOnDeviation(
                          item.value,
                          item.target
                        )} // Color based on value vs target
                        displayValueTemplate={() => ""} // Hide default text
                      />

                      {/* Marker for the current value */}
                      {/* <div
                        className="absolute top-0"
                        style={{
                          left: `${item.value}%`, // Position based on value percentage
                          transform: "translateX(-50%)", // Center the marker
                          width: "2px", // Marker width
                          height: "1.2rem", // Marker height
                          backgroundColor: "green",
                        }}
                      /> */}

                      {/* Marker for the target */}
                      <div
                        className="absolute top-0"
                        style={{
                          left: `${item.target}%`, // Position based on target percentage
                          transform: "translateX(-50%)", // Center the marker
                          width: "0.1rem", // Marker width
                          height: "0.5rem", // Marker height
                          backgroundColor: "black",
                        }}
                      />
                    </div>

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
        <div className="flex flex-column gap-3" style={{flex: "60%"}}>
          {/* Total Population */}
          <div className="flex w-full gap-3 bg-white border-round p-4 align-items-center justify-content-around">
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
          {/* Land Distribution */}
          <div className="flex w-full bg-white border-round p-4">
            <PieChart
              title="Land Distribution"
              categories={distributionSeries}
              series={distributionData}
              height={350}
              // labelFontSize={10}
            />
          </div>
        </div>
      </div>

      {show && (
        <Panel
          //  header="View Recommendations"
          toggleable
          onToggle={handleToggleRecommendations} // Optional: if you want to perform an action on toggleheaderTemplate={(options) => {
          headerTemplate={(options) => {
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-circle-right" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-circle-down"; // Arrow pointing down when expanded

            return (
              <div className="flex justify-content-between align-items-center px-2 bg-theme">
                <p className="text-primary1 font-medium text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && <LandRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Land;
