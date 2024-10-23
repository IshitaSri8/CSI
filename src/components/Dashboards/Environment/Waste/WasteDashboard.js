import React from "react";
import { BarChart, GroupedColumnChart } from "Layout/GraphVisuals";
import "./Waste.css";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import CanvasJSReact from "@canvasjs/react-charts";

import CommunityToiletIcon from "assets/waste/community_toilet.png";
import PublicToiletIcon from "assets/waste/public-toilet.png";
import WasteGeneratedIcon from "assets/waste/waste_generated.png";
import WasteCollectedIcon from "assets/waste/waste_collected.png";
import AvgWasteIcon from "assets/waste/avg_waste.png";
import PopulationDensityIcon from "assets/waste/population_density.png";
import PopulationIcon from "assets/waste/population.png";
import ConstructedIcon from "assets/waste/building.png";
import UnderConstructedIcon from "assets/waste/under-construction.png";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import WasteReportPrint from "./WasteReportPrint";
import { useState } from "react";
import WasteRecommendations from "./WasteRecommendations";

const WasteDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const solidWasteData = [
    { label: "SW-Collection(TPD)", y: 181 },
    { label: "SW-Generated(TPD)", y: 181 },
    { label: "SW-Processed(TPD)", y: 181 },
  ];
  const estimatedSWG = [
    { label: "Residential", y: 358261 },
    { label: "Commercial", y: 119420 },
    { label: "Street Sweepings", y: 59700 },
    { label: "Institutional", y: 59700 },
  ];

  const pieChartData = [55, 34, 179, 83];
  const pieChartLabels = [
    "Green Waste(Kg/d) 55k",
    "Debris & Silt(Kg/d) 34k",
    "Biodegradable(Kg/d) 179k",
    "Recyclable(Kg/d) 83k",
  ];

  const total = pieChartData.reduce((acc, value) => acc + value, 0);

  const barChartData = [estimatedSWG.map((item) => item.y)];
  const barChartCategories = estimatedSWG.map((item) => item.label);

  const barChart1Data = [solidWasteData.map((item) => item.y)];
  const barChart1Categories = solidWasteData.map((item) => item.label);

  const cardData = [
    { title: "Community Toilet", value: 550, icon: CommunityToiletIcon },
    { title: "Public Toilet", value: 700, icon: PublicToiletIcon },
    { title: "Waste Generated", value: "355 MTD", icon: WasteGeneratedIcon },
    { title: "Waste Collected", value: "322 MTD", icon: WasteCollectedIcon },
    { title: "Avg Waste Generated", value: 2.25, icon: AvgWasteIcon },
  ];
  const colors = [
    "#FFDD82",
    "#47B881",
    "#F7A47A",
    "#98C6CF",
    "#1F8297",
    "#F64C4C",
    "#0F4B57",
    "#166c7d",
    "#5B98A4",
    "#8AB5BE",
    "#B9D2D8",
    "#E9F3F5",
    "#26575D",
    "#4D7479",
    "#4C9BAC",
  ];

  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const pieOptions = {
    animationEnabled: true,
    title: {
      text: "Waste Composition",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: "black",
      horizontalAlign: "left",
    },

    data: [
      {
        type: "pie",
        startAngle: 20,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: false,
        color: colors,
        indexLabel: "{label}- #percent%",
        indexLabelFontSize: 8,
        dataPoints: pieChartData.map((value, index) => ({
          y: value,
          label: pieChartLabels[index],
          color: colors[index % colors.length],
          percent: ((value / total) * 12).toFixed(2),
        })),
      },
    ],
    legend: {
      fontSize: 10,
      horizontalAlign: "center",
      verticalAlign: "bottom",
    },
  };

  const CustomBar = {
    animationEnabled: true,
    title: {
      text: "Waste Collection (in MT/day)",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },

    axisY: {
      gridThickness: 0,
      labelFontSize: 8,
    },
    axisX: {
      gridThickness: 0,
      labelFontSize: 8,
    },
    data: [
      {
        type: "bar",
        name: "Other Sources",
        showInLegend: true,
        color: colors[0],
        indexLabel: `{y}`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
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
        color: colors[1],
        indexLabel: `{y}`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
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
        color: colors[2],
        indexLabel: `{y}`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
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
      fontSize: 8,
      horizontalAlign: "center",
      verticalAlign: "bottom",
    },
  };

  return (
    <div className="flex flex-column gap-3 p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
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

      <div className="flex gap-3 w-full justify-content-center">
        {cardData.slice(0, 7).map((card, index) => (
          <div
            className="flex flex-column bg-white border-round p-4"
            key={card.value}
          >
            <p className="p-0 m-0 text-primary1 font-semibold">{card.title}</p>
            <p className="p-0 m-0 text-tertiary3 font-medium text-sm">{card.value}</p>
          </div>
        ))}
        <div className="flex justify-content-between align-items-center w-full bg-white border-round p-4">
          <p className="text-primary1 font-semibold p-0 m-0">
            Common Toilets & Public Toilets
          </p>
          <div className="flex align-items-center justify-content-center flex-column gap-2">
            <div className="flex align-items-center justify-content-center gap-2">
              <img
                src={ConstructedIcon}
                style={{ height: "1.5rem", width: "1.5rem" }}
                alt="constructed"
              ></img>
              <h1 className="p-0 m-0">Constructed</h1>
            </div>
            <div className="flex align-items-center justify-content-center gap-4">
              <div className="flex align-items-center justify-content-center flex-column">
                <h1 className="p-0 m-0">28400</h1>
                <h1 className="text-sm p-0 m-0 text-green-500">Functional</h1>
              </div>
              <div className="flex align-items-center justify-content-center flex-column">
                <h1 className=" p-0 m-0">331</h1>
                <h1 className="text-sm p-0 m-0 text-green-500">
                  Non-Functional
                </h1>
              </div>
            </div>
          </div>
          <Divider layout="vertical" />
          <div className="flex align-items-center justify-content-center flex-column gap-2">
            <div className="flex align-items-center justify-content-center gap-2">
              <img
                src={UnderConstructedIcon}
                style={{ height: "2rem", width: "2rem" }}
                alt="constructed"
              ></img>
              <h1 className=" p-0 m-0">Under Construction</h1>
            </div>
            <div className="flex align-items-center justify-content-center gap-2">
              <div className="flex align-items-center justify-content-center flex-column">
                <h1 className="p-0 m-0">223</h1>
                <h1 className="text-sm p-0 m-0 text-green-300">
                  Under Construction
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <div className="flex flex-column gap-3 w-full bg-white border-round p-4">
          <BarChart
            categories={barChart1Categories}
            series={barChart1Data}
            height={200}
            title="Solid Waste Management"
            colors={colors.slice(0, 3)}
          />
        </div>

        <div className="flex flex-column gap-3 w-full bg-white border-round p-4">
          <GroupedColumnChart
            categories={barChartCategories}
            series={barChartData}
            height={200}
            title="Estimated Solid Waste Generated"
            colors={colors.slice(0, 4)}
          />
        </div>
        <div className="flex flex-column gap-3 w-full bg-white border-round p-4">
          <CanvasJSChart
            options={CustomBar}
            containerProps={{ height: 200, width: "100%" }}
          />
        </div>
        <div className="flex flex-column gap-3 w-full bg-white border-round p-4">
          <CanvasJSChart
            options={pieOptions}
            containerProps={{ height: 200, width: "100%" }}
          />
        </div>
      </div>
      <div className="flex justify-content-end">
        <Button
          label={
            recommendationsVisible
              ? "Close Recommendations"
              : "View Recommendations"
          }
          icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
          onClick={handleToggleRecommendations}
          className="bg-theme text-white"
          raised
        />
      </div>

      {recommendationsVisible && <WasteRecommendations />}
    </div>
  );
};

export default WasteDashboard;
