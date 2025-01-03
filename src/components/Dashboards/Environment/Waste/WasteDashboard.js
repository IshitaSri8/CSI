import React from "react";
import {
  ColumnChart,
  StackedBarChart,
  PieChartColumn,
} from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import WasteReportPrint from "./WasteReportPrint";
import { useState } from "react";
import WasteRecommendations from "./WasteRecommendations";
import { Panel } from "primereact/panel";

const WasteDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible((prev) => !prev);
  };

  const solidWasteData = [190, 181, 180];
  const solidWasteLabels = ["SW-Generated", "SW-Collected", "SW-Processed"];

  const estimatedSWGData = [358.261, 119.42, 59.7, 59.7]; // Example data
  const estimatedSWGLabels = [
    "Residential",
    "Commercial",
    // "Street Sweepings",
    "Institutional",
    "Others",
  ];

  const wasteCompositionData = [55.3, 33.7, 178.5, 82.75];
  const wasteCompositionLabels = [
    "Green Waste",
    "Debris & Silt",
    "Biodegradable",
    "Recyclable",
  ];

  const sanitationLabels = [
    "Public Toilet",
    "Individual Toilet",
    "Open Defecation",
  ];
  const sanitationData = [7, 93, 0];

  const Zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"];
  const collection = [
    "Door-to-door Collection",
    "Community Bins",
    "Other Sources",
  ];
  const collectionData = [ [39, 30, 38, 29, 30], [31, 24, 29, 22, 21], [2, 1, 2, 2, 3]]
  // const collectionData = [
  //   { name: "Door-to-door Collection", data: [39, 30, 38, 29, 30] },
  //   { name: "Community Bins", data: [31, 24, 29, 22, 21] },
  //   { name: "Other Sources", data: [2, 1, 2, 2, 3] },
  // ];

  return (
    <div className="flex flex-column gap-3 p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Waste Management
          </h1>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-primary1 text-white"
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
              <WasteReportPrint show={false} />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex w-full gap-3">
        <div className="flex flex-column gap-2 w-full" style={{ flex: "18%" }}>
          {/* Waste Generated */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Waste Generated{" "}
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              355 <span className="text-xl">TPD</span>
            </p>
            {/* <Chip
            label="October 2024"
            style={{
              width: "fit-content",
              backgroundColor: "#e9f3f5",
              color: "#001F23",
            }}
          /> */}
          </div>
          {/* Waste Collected */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Waste Collected{" "}
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              303 <span className="text-xl">TPD</span>
            </p>
          </div>
        </div>
        {/* Solid Waste Management (in TPD) */}
        <div
          className="flex flex-column w-full bg-white border-round p-4"
          style={{ flex: "27%" }}
        >
          <p className="card-title p-0 m-0">Solid Waste Management (in TPD)</p>
          <ColumnChart
            categories={solidWasteLabels}
            series={solidWasteData}
            height={150}
            // title="Solid Waste Management (in TPD)"
            labelFontSize={6}
            // colors={colors.slice(0, 3)}
          />
        </div>
        {/* Estimated Solid Waste Generated */}
        <div
          className="flex flex-column w-full bg-white border-round p-4"
          style={{ flex: "37%" }}
        >
          {/* <CanvasJSChart
            options={estimatedSWGChart}
            containerProps={{ height: 100, width: "100%" }}
          /> */}
          <div className="flex justify-content-between">
            <p className="card-title p-0 m-0">
              Estimated Solid Waste Generated (in TPD)
            </p>
            <p className="text-sm text-tertiary3 font-medium p-0 m-0">
              by 2031
            </p>
          </div>
          <ColumnChart
            categories={estimatedSWGLabels}
            series={estimatedSWGData}
            height={150}
            // title="Estimated Solid Waste Generated (in TPD)"
            labelFontSize={8}
            // colors={colors.slice(0, 4)}
          />
        </div>
        {/* CT/PT */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full justify-content-around"
          style={{ flex: "18%" }}
        >
          <p className="card-title p-0 m-0">CT/PT</p>
          <div className="flex flex-column gap-3">
            <div
              className="flex flex-column w-full p-2 sec-theme gap-1"
              style={{
                borderLeft: "3px solid #1F8297", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                500
              </p>
              <p className="p-0 m-0 card-text">Community Toilet</p>
            </div>
            <div
              className="flex flex-column w-full p-2 sec-theme gap-1"
              style={{
                borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                700
              </p>
              <p className="p-0 m-0 card-text">Public Toilet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        {/* Waste Composition */}
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "25%" }}
        >
          <p className="card-title p-0 m-0">Waste Composition (in TPD)</p>
          <PieChartColumn
            categories={wasteCompositionLabels}
            series={wasteCompositionData}
            height={150}
            // title="Waste Composition (in TPD)"
            vertical="bottom"
            horizontal="center"
            fontSize={10}
          />
        </div>
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "70%" }}
        >
          <p className="card-title p-0 m-0">Waste Collection (in TPD)</p>
          <StackedBarChart
            // title="Waste Collection (in TPD)"
            labels={Zones}
            categories={collection}
            series={collectionData}
            // dataSeries={collectionData}
            dataPointWidth={8}
            height={200}
          />
        </div>

        {/* <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "24%" }}
        >
          <PieChart
            categories={sanitationLabels}
            series={sanitationData}
            height={220}
            title="Sanitation Facility"
            vertical="bottom"
            horizontal="center"
            fontSize={10}
          />
        </div> */}
      </div>

      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-up"
              : "pi pi-chevron-down";
            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round">
                <p className="text-primary1 font-semibold text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    // border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && <WasteRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default WasteDashboard;
