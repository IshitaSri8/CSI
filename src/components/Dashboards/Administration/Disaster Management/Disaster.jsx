import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import CanvasJSReact from "@canvasjs/react-charts";
import React, { useState } from "react";
import { BarChart } from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DisasterReportPrint from "../DisasterReportPrint";

const Disaster = ({ show }) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [ReportVisible, setReportVisible] = useState(false);
  const tcategories = ["Domestic Tourists", "International Tourists"];
  const tseries = [
    [50000, 60000, 70000, 80000, 85000], // Domestic Tourists (2020-2024)
    [10000, 15000, 20000, 25000, 30000], // International Tourists (2020-2024)
  ];
  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const fseries = [
    [80, 90, 100, 110, 100], // Funds allocated for each year (in crores)
  ];
  const totalSites = [200, 210, 215, 220, 225]; // Example total cultural sites over years
  const maintainedSites = [20, 40, 50, 80, 180];
  const CombinationChart = ({
    title,
    categories,
    totalSites,
    maintainedSites,
    height,
  }) => {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return (
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "#333",
            horizontalAlign: "center",
          },
          axisX: {
            gridThickness: 0,
            labelFontSize: 10,
          },
          axisY: {
            gridThickness: 0,
            labelFontSize: 10,
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              type: "column",
              name: "Total Cultural Sites",
              showInLegend: true,
              color: "#4D7479",
              dataPoints: totalSites.map((value, i) => ({
                y: value,
                label: categories[i],
              })),
            },
            {
              type: "line",
              name: "Maintained Sites",
              showInLegend: true,
              lineThickness: 2,
              markerType: "circle",
              color: "#F7A47A",
              dataPoints: maintainedSites.map((value, i) => ({
                y: value,
                label: categories[i],
              })),
            },
          ],
        }}
        containerProps={{ height: height, width: "100%" }}
      />
    );
  };
  const GroupedBarChart = ({
    title,
    categories,
    series,
    height,
    xtitle,
    ytitle,
    color,
    labelFontSize = 8,
  }) => {
    return (
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 12,
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "#333",
            horizontalAlign: "center",
          },
          axisX: {
            title: xtitle,
            gridThickness: 0,
            labelFontSize: labelFontSize,
          },
          axisY: {
            title: ytitle,
            gridThickness: 0,
            labelFontSize: labelFontSize,
          },
          toolTip: {
            shared: true, // Enable shared tooltip
            content: function (e) {
              // Create custom tooltip content
              const year = e.entries[0].dataPoint.label;
              const domestic = e.entries[0].dataPoint.y;
              const international = e.entries[1].dataPoint.y;
              return `Year: ${year}<br/>Domestic Tourists: ${domestic}<br/>International Tourists: ${international}`;
            },
          },
          data: series.map((data, index) => ({
            type: "column",
            name: categories[index],
            showInLegend: true,
            color: color[index % color.length],
            dataPoints: data.map((value, i) => ({
              y: value,
              label: `${2020 + i}`,
              indexLabel: `{y}`,
              indexLabelFontSize: 10,
              indexLabelPlacement: "outside",
            })),
          })),
        }}
        containerProps={{ height: height, width: "100%" }}
      />
    );
  };
  return (
    <div className="flex align-items-center justify-content-center gap-2  flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-2xl text">
            Cultural Preservation Dashboard
          </h1>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            />
            <Dialog
              visible={ReportVisible}
              style={{ width: "100rem" }}
              onHide={() => {
                if (!ReportVisible) return;
                setReportVisible(false);
              }}
            >
              <DisasterReportPrint />
            </Dialog>
          </div>
        </div>
      )}
      {/* First Row */}
      <div className="flex align-items-center justify-content-center gap-2 flex-row w-full">
        <Card className="w-full p-3">
          <div className="flex">
            <i className="pi pi-info-circle text-cyan-800 text-right w-full text-sm cursor-pointer events"></i>
          </div>

          <div className="flex align-items-center justify-content-center flex-row gap-1">
            <div className="flex align-items-center justify-content-center gap-2 flex-column">
              <h1 className="m-0 p-1 text-2xl text-cyan-800 text-center">8</h1>
              <p className="text-base m-0 p-0 text-center">Disastrous Events</p>
            </div>
          </div>
        </Card>
        <Tooltip target=".events" position="bottom">
          <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
            <h1 className="m-0 p-0 text-lg text-cyan-800">
              List of Disastrous Events
            </h1>
            <ul>
              <li>Event: 1</li>
              <li>Event: 2</li>
              <li>Event: 3</li>
              <li>Event: 4</li>
              <li>Event: 5</li>
              <li>Event: 6</li>
              <li>Event: 7</li>
              <li>Event: 8</li>
            </ul>
          </div>
        </Tooltip>
        <Card className="w-full">
          <h1 className="m-0 p-0 text-cyan-800 text-lg text-center">
            Life Loss
          </h1>
          <div className="flex align-items-center justify-content-center gap-1 flex-row p-2">
            <div className="flex align-items-center justify-content-center gap-1 flex-column px-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">269</h1>
              <p className="text-sm m-0 p-1 text-center">Deaths</p>
            </div>
            <div className="flex align-items-center justify-content-center gap-1 flex-column px-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">
                1,267
              </h1>
              <p className="text-sm m-0 p-1 text-center">Injured</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex align-items-center justify-content-center gap-1 flex-column px-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">678</h1>
              <p className="text-sm m-0 p-1 text-center">Animal Loss</p>
            </div>
            <div className="flex align-items-center justify-content-center gap-1 flex-column px-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">159</h1>
              <p className="text-sm m-0 p-1 text-center">Vegetation Loss</p>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <h1 className="m-0 p-0 text-cyan-800 text-lg text-center">
            Economic Loss
          </h1>
          <div className="flex align-items-center justify-content-center gap-1 flex-row p-2">
            <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">
                120 Cr
              </h1>
              <p className="text-sm m-0 p-1 text-center">Capital Loss</p>
            </div>

            <Divider layout="vertical" />
            <div className="flex align-items-center justify-content-center gap-1 flex-column p-2">
              <h1 className="m-0 p-1 text-lg text-cyan-800 text-center">
                1200 Cr
              </h1>
              <p className="text-sm m-0 p-1 text-center">Infrastructure Loss</p>
            </div>
          </div>
        </Card>
        <Card className="w-full p-2">
          <div className="flex align-items-center justify-content-center gap-1 flex-column p-3">
            <h1 className="m-0 p-1 text-xl text-cyan-800 text-center">
              12,000
            </h1>
            <p className="text-base m-0 p-1 text-center">
              {" "}
              Responders Available
            </p>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="flex align-items-center justify-content-center gap-2 w-full">
        <Card className="w-full">
          <h1 className="m-0 p-0 text-cyan-800 text-xl">Measures Taken:</h1>
          <ul className="text-xl">
            <li>
              1. Evacuation of Affected Areas: Safe and timely relocation of
              people from high-risk zones.
            </li>{" "}
            <li>
              {" "}
              2. Search and Rescue Operations: Deployment of rescue teams to
              find and assist trapped or missing individuals.
            </li>{" "}
            <li>
              3. Medical Aid and Emergency Services: Setting up medical camps
              and providing first aid to injured victims.
            </li>
            {""}
            <li>
              4. Shelter and Relief Camps: Establishment of temporary shelters
              for displaced individuals with access to food, water, and basic
              amenities.
            </li>{" "}
            <li>
              5. Disaster Response Teams Deployment: Mobilization of National
              Disaster Response Force (NDRF) and other emergency units.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Disaster;
