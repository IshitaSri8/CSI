import React from "react";
import {
  ModifiedColumnChart,
  PieChart,
} from "Layout/GraphVisuals";
import CanvasJSReact from "@canvasjs/react-charts";
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

  const solidWasteData = [182, 181, 183];
  const solidWasteLabels = [
    "SW-Generated(TPD)",
    "SW-Collected(TPD)",
    "SW-Processed(TPD)",
  ];

  const estimatedSWGData = [358261, 119420, 59700, 59700]; // Example data
  const estimatedSWGLabels = [
    "Residential",
    "Commercial",
    "Street Sweepings",
    "Institutional",
  ];
  const colors = ["#166c7d", "#98C6CF", "#1F8297", "#5B98A4"];

  const wasteCompositionData = [55300, 33700, 178500, 82750];
  const wasteCompositionLabels = [
    "Green Waste- 55300(Kg/d)",
    "Debris & Silt- 33700(Kg/d)",
    "Biodegradable- 178500(Kg/d)",
    "Recyclable- 82750(Kg/d)",
  ];

  const sanitationLabels = [
    "Public Toilet",
    "Individual Toilet",
    "Open Defecation",
  ];
  const sanitationData = [7, 93, 0];

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const CustomBar = {
    animationEnabled: true,
    title: {
      text: "Waste Collection (in MT/day)",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },

    axisY: {
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },
    axisX: {
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },
    dataPointWidth: 8,
    data: [
      {
        type: "bar",
        name: "Other Sources",
        showInLegend: true,
        color: "#166c7d",
        indexLabel: `{y} MT`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
        indexLabelFontFamily: "Montserrat",
        indexLabelFontWeight: "bold",
        dataPoints: [
          { label: "Zone 1", y: 39 },
          { label: "Zone 2", y: 30 },
          { label: "Zone 3", y: 38 },
          { label: "Zone 4", y: 29 },
          { label: "Zone 5", y: 30 },
        ],
      },
      {
        type: "bar",
        name: "Community Bins",
        showInLegend: true,
        color: "#98C6CF",
        indexLabel: `{y} MT`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
        indexLabelFontFamily: "Montserrat",
        indexLabelFontWeight: "bold",
        dataPoints: [
          { label: "Zone 1", y: 31 },
          { label: "Zone 2", y: 24 },
          { label: "Zone 3", y: 29 },
          { label: "Zone 4", y: 22 },
          { label: "Zone 5", y: 21 },
        ],
      },
      {
        type: "bar",
        name: "Door-to-door Collection",
        showInLegend: true,
        color: "#1F8297",
        indexLabel: `{y} MT`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
        indexLabelFontFamily: "Montserrat",
        indexLabelFontWeight: "bold",
        dataPoints: [
          { label: "Zone 1", y: 2 },
          { label: "Zone 2", y: 1 },
          { label: "Zone 3", y: 2 },
          { label: "Zone 4", y: 2 },
          { label: "Zone 5", y: 3 },
        ],
      },
    ],
    legend: {
      fontSize: 10,
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
  };

  const total = estimatedSWGData.reduce((acc, value) => acc + value, 0);
  const estimatedSWGChart = {
    animationEnabled: true,
    title: {
      text: "Estimated Solid Waste Generation (SWG)",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    axisY: {
      labelFontSize: 0,
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      maximum: total,
    },
    axisX: {
      labelFontSize: 0,
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
    },
    dataPointWidth: 40,
    data: estimatedSWGLabels.map((label, index) => ({
      type: "stackedBar",
      name: label,
      showInLegend: true,
      color: colors[index], // Use the color from the colors array
      indexLabelFontSize: 12,
      indexLabelFontFamily: "Montserrat",
      indexLabel: `${((estimatedSWGData[index] / total) * 100).toFixed(2)}%`,
      //indexLabelFontWeight: "bold",
      indexLabelFontColor: "white",
      dataPoints: [{ label, y: estimatedSWGData[index] }], // Use dynamic values
      legendText: "{label}: {y} MT",
    })),
    legend: {
      fontSize: 10,
      horizontalAlign: "center",
      verticalAlign: "bottom",
    },
  };

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
              <WasteReportPrint show={false} />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex w-full gap-4">
        <div className="flex flex-column gap-2 w-full" style={{ flex: "18%" }}>
          {/* Waste Generated */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Waste Generated{" "}
              <span className="text-sm text-tertiary3 font-medium">/Day</span>
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              355 <span className="text-xl">MTD</span>
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
            <p className="text-primary1 font-semibold text-lg p-0 m-0">
              Waste Collected{" "}
              <span className="text-sm text-tertiary3 font-medium">/Day</span>
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              322 <span className="text-xl">MTD</span>
            </p>
          </div>
        </div>
        {/* Estimated Solid Waste Generated */}
        <div
          className="flex w-full bg-white border-round p-4"
          style={{ flex: "32%" }}
        >
          {/* <CanvasJSChart
            options={estimatedSWGChart}
            containerProps={{ height: 100, width: "100%" }}
          /> */}
          <ModifiedColumnChart
            categories={estimatedSWGLabels}
            series={estimatedSWGData}
            height={150}
            title="Estimated Solid Waste Generated"
            labelFontSize={8}
            // colors={colors.slice(0, 4)}
          />
        </div>
        {/* Waste Composition */}
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "32%" }}
        >
          <PieChart
            categories={wasteCompositionLabels}
            series={wasteCompositionData}
            height={165}
            title="Waste Composition"
            vertical="center"
            horizontal="right"
            fontSize={10}
          />
        </div>
        {/* CT/PT */}
        <div
          className="flex flex-column bg-white border-round p-4 gap-2 w-full justify-content-around"
          style={{ flex: "18%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">CT/PT</p>
          <div className="flex flex-column gap-2">
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
              <p className="text m-0 p-0 text-sm">Community Toilet</p>
            </div>
            <div
              className="flex flex-column w-full p-2 sec-theme gap-2"
              style={{
                borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                700
              </p>
              <p className="text m-0 p-0 text-sm">Public Toilet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "51%" }}
        >
          <CanvasJSChart
            options={CustomBar}
            containerProps={{ height: 250, width: "100%" }}
          />
        </div>
        <div
          className="flex w-full bg-white border-round p-4"
          style={{ flex: "25%" }}
        >
          <ModifiedColumnChart
            categories={solidWasteLabels}
            series={solidWasteData}
            height={220}
            title="Solid Waste Management"
            labelFontSize={6}
            // colors={colors.slice(0, 3)}
          />
        </div>
        <div
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
        </div>
      </div>

      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon =  recommendationsVisible
              ? "pi pi-chevron-down"
              : "pi pi-chevron-up";

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
