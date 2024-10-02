import React from "react";
import { Panel } from "primereact/panel";
import { DonutChart } from "../../GraphVisuals";
import "./Land.css";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card } from "primereact/card";
import LandIcon from "../../assets/waste/land.png";
import AreaIcon from "../../assets/waste/measurement.png";
import Above from "../../assets/waste/above.png";
import Below from "../../assets/waste/below.png";
import { width } from "@mui/system";
//import Tree from "react-d3-tree";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Land = () => {
  const donutChartLabels = [
    "Agriculture",
    "Open Land",
    "Fallow Land",
    "Settlement",
    "Vegetation",
  ];
  const donutChartSeries = [27.88, 26.24, 25.28, 12.49, 8.11];

  const AboveLabels = [
    "Transportation",
    "Industrial",
    "Publiv and Semi-Public",
    "Commercial",
  ];
  const AboveSeries = [2862.6, 1558.63, 1059.63, 118.53];

  const BelowLabels = [
    "Residential",
    "Agricultural",
    "Water Bodies",
    "Garden, Play Ground and Recreation",
    "Public Utility",
    "Forest",
    "Vacant Land",
  ];

  const BelowSeries = [12835.78, 4542.59, 906.23, 535.84, 293.0, 250.67, 0.0];

  const areaChartOptions = {
    animationEnabled: true,
    title: {
      text: "Land Area Distribution",
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    axisX: {
      gridThickness: 0,
      labelFontSize: 8,
    },
    axisY: {
      gridThickness: 0,
      labelFontSize: 8,
    },
    data: [
      {
        type: "area",
        lineColor: "#00A269",
        color: "#a2ffde",
        dataPoints: [
          { label: "Residential", y: 52.5 },
          { label: "Transportation", y: 14.1 },
          { label: "Industrial", y: 14.0 },
          { label: "Public and Semi-public", y: 7.4 },
          { label: "Commercial", y: 2.0 },
          { label: "Garden, Play Ground and Recreation", y: 1.13 },
        ],
      },
    ],
  };

  // const customNode = ({ nodeDatum }) => (
  //   <g>
  //     {/* Rectangle shape */}
  //     <rect
  //       width="100"
  //       height="15"
  //       x="-50"
  //       y="-10"
  //       fill="#98d1b2"
  //       stroke="#00A269"
  //       strokeWidth="0.5"
  //     />
  //     <text
  //       // fill="black"
  //       x="0"
  //       y="-35"
  //       textAnchor="middle"
  //       fontSize="10"
  //       // fontWeight="bold"
  //     >
  //       {nodeDatum.name}
  //     </text>
  //     <text fill="black" x="0" y="-20" textAnchor="middle" fontSize="10">
  //       {nodeDatum.value}
  //     </text>
  //   </g>
  // );

  // const treeData = [
  //   {
  //     name: "Total Area(hA)",
  //     value: "24963.80",
  //     children: [
  //       {
  //         name: "Below Proposed Limit",
  //         value: "19364.11",
  //         children: [
  //           Residential", value: "12835.78" },
  //           { name: "Agricultural", value: "4542.59" },
  //           { name: "Water Bodies", value: "906.23" },
  //           {
  //             name: "Garden, Play Ground and Recreation",
  //             value: "535.84",
  //             children: [
  //               {
  //                 name: "2.55",
  //                 value: "535.84",
  //               },
  //             ],
  //           },
  //           { name: "Public Utility", value: "293.00" },
  //           { name: "Forest", value: "250.67" },
  //           { name: "Vacant Land", value: "0.00" },
  //         ],
  //       },
  //       {
  //         name: "Above Proposed Limit",
  //         value: "5599.69",
  //       },
  //     ],
  //   },
  // ];

  const tornadoChartOptions = {
    animationEnabled: true,
    title: {
      text: "Developed Area vs Proposed area",
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    axisX: {
      // title: "Values",
      gridThickness: 0,
      labelFontSize: 8,
    },
    axisY: {
      reversed: true,
      gridThickness: 0,
      labelFontSize: 8,
    },
    data: [
      {
        type: "bar",
        name: "Positive Values",
        color: "#00A269",
        indexLabel: `{y}`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "inside",
        dataPoints: [
          { label: "Residential", y: 52.48 },
          { label: "Transportation", y: 14.05 },
          { label: "Industrial", y: 14.02 },
          { label: "Public and Semi-public", y: 7.39 },
          { label: "Commercial", y: 1.96 },
          { label: "Garden, Play Ground and Recreation", y: 1.13 },
        ],
      },
      {
        type: "bar",
        name: "Negative Values",
        color: "#A9F3E0",
        indexLabel: `{y}`,
        indexLabelFontSize: 8,
        indexLabelPlacement: "inside",
        dataPoints: [
          { label: "Residential", y: -60.98 },
          { label: "Transportation", y: -13.6 },
          { label: "Industrial", y: -7.41 },
          { label: "Public and Semi-public", y: -5.03 },
          { label: "Commercial", y: -0.56 },
          { label: "Garden, Play Ground and Recreation", y: -2.25 },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-column gap-2 align-items-center w-full">
      <div className="flex flex-column gap-3 w-full">
        <div className="flex gap-3">
          <Card className="flex-1 border-round bg-white">
            <div className="flex align-items-center gap-3">
              {/* First column: Image */}
              <div className="flex-shrink-0">
                <img
                  src={LandIcon}
                  alt="Total Area"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              {/* Second column: Total Area label and value */}
              <div className="flex flex-column align-items-center">
                <h3 className="m-0 text-xs">Total Area (hA)</h3>
                <span className="text-xs font-bold">23963.80</span>{" "}
              </div>
            </div>
          </Card>

          <Card className="flex-1 border-round bg-white">
            <div className="flex align-items-center gap-3">
              {/* First column: Image */}
              <div className="flex-shrink-0">
                <img
                  src={AreaIcon}
                  alt="Developed Area(%)"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>

              {/* Second column: Total Area label and value */}
              <div className="flex flex-column align-items-center">
                <h3 className="m-0 text-xs">Developed Area (%)</h3>
                <span className="text-xs font-bold">91.03</span>{" "}
              </div>
            </div>
          </Card>

          <Card className="flex-1 border-round bg-white">
            <div className="flex align-items-center gap-3">
              <div className="flex-shrink-0">
                <img
                  src={Below}
                  alt="Below"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>

              <div className="flex flex-column align-items-center">
                <h3 className="m-0 text-xs">Below Proposed Limit (hA)</h3>
                <span className="text-xs font-bold">19364.11 </span>{" "}
              </div>
            </div>
          </Card>

          <Card className="flex-1 border-round bg-white">
            <div className="flex align-items-center gap-3">
              <div className="flex-shrink-0">
                <img
                  src={Above}
                  alt="Above"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="flex flex-column align-items-center">
                <h3 className="m-0 text-xs">Above Proposed Limit (hA)</h3>
                <span className="text-xs font-bold">5599.69</span>{" "}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Panel className="w-full">
        <div className="flex flex-row gap-2 flex-wrap md:flex-nowrap">
          <DonutChart
            title="Green Area Cover Distribution"
            labels={donutChartLabels}
            series={donutChartSeries}
            height={230}
          />

          <DonutChart
            title="Target Achieved Above Proposed Limit"
            labels={AboveLabels}
            series={AboveSeries}
            height={240}
          />

          <DonutChart
            title="Target Achieved Below Proposed Limit"
            labels={BelowLabels}
            series={BelowSeries}
            height={240}
          />
        </div>
      </Panel>

      <Panel className="w-full">
        <div className="flex flex-row gap-2 flex-wrap md:flex-nowrap">
          <Card className="w-full">
            <CanvasJSChart
              options={areaChartOptions}
              containerProps={{ height: 200, width: "100%" }}
            />
          </Card>

          <Card className="w-full">
            <CanvasJSChart
              options={tornadoChartOptions}
              containerProps={{ height: 200, width: "100%" }}
            />
          </Card>
        </div>
      </Panel>
    </div>
  );
};

export default Land;
