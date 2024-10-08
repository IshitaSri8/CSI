import { Card } from "primereact/card";
import React from "react";
// import { Doughnut, GroupedBarChart } from "../../GraphVisuals";
// import road from "./TransportUtils/Images/road.png";
// import rail from "./TransportUtils/Images/train.png";
// import air from "./TransportUtils/Images/air.png";
// import water from "./TransportUtils/Images/ship.png";
import increase from "assets/increase.png";
import decrease from "assets/decrease.png";
import CanvasJSReact from "@canvasjs/react-charts";
import "primeicons/primeicons.css";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { color } from "framer-motion";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const Infrastructure = () => {
  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const railSeries = [9, 5, 7, 6, 8]; // Rail data for each year
  const roadSeries = [5, 7, 8, 6, 7]; // Road data for each year
  const airSeries = [6, 8, 6, 7, 9]; // Air data for each year
  const waterSeries = [7, 6, 8, 9, 7]; // Water data for each year
 
  const options = {
    animationEnabled: true,
    title: {
      text: "Infrastructure Condition Over Years",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    axisX: {
      title: "",
      interval: 1,
      labelFontSize: 12,
    },
    axisY: {
      title: "",
      interval: 1,
      gridThickness: 0,
      labelFontSize: 12,
    },
    data: [
      {
        type: "bar",
        color: "#26575D",
        name: "Roadways",
 
        showInLegend: true,
        indexLabel: "Roadways: {y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        indexLabelFontSize: 10,
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: categories.map((year, index) => ({
          label: year,
          y: roadSeries[index],
        })),
      },
      {
        type: "bar",
        name: "Railways",
        color: "#4D7479",
        indexLabel: "Railways: {y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        indexLabelFontSize: 10,
        showInLegend: true,
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: categories.map((year, index) => ({
          label: year,
          y: railSeries[index],
        })),
      },
      {
        type: "bar",
        name: "Airways",
        color: "#1F8297",
        showInLegend: true,
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        indexLabelFontSize: 10,
        toolTipContent: "{name}: {y}",
        indexLabel: "Airways: {y}", // Custom tooltip format
        dataPoints: categories.map((year, index) => ({
          label: year,
          y: airSeries[index],
        })),
      },
      {
        type: "bar",
        color: "#4C9BAC",
        name: "Waterways",
        showInLegend: true,
        indexLabelFontSize: 10,
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        indexLabel: "Waterways: {y}",
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: categories.map((year, index) => ({
          label: year,
          y: waterSeries[index],
        })),
      },
    ],
  };
 
  // const Doughnut = ({ title, labels, series, height }) => {
  //   const colors = [
  //     "#557C56",
  //     "#90D26D",
  //     "#6A9C89",
  //     "#B5C18E",
  //     "#41B3A2",
  //     "#BDE8CA",
  //     "#C4DAD2",
  //     "#9CDBA6",
  //     "#95D2B3",
  //     "#729762",
  //   ];
 
  //   const options = {
  //     animationEnabled: true,
  //     title: {
  //       text: title,
  //       fontSize: 10,
  //       fontFamily: "DM Sans",
  //       fontWeight: "800",
  //     },
  //     data: [
  //       {
  //         type: "doughnut",
  //         startAngle: 20,
  //         toolTipContent: "<b>{label}</b>: {y} (#percent%)",
  //         showInLegend: false,
  //         color: colors,
  //         indexLabel: "{label} (#percent%)",
  //         indexLabelFontSize: 8,
  //         indexLabelFontFamily: "DM Sans",
  //         indexLabelFontWeight: 700,
  //         dataPoints: series.map((value, index) => ({
  //           y: value,
  //           label: labels[index],
  //           color: colors[index % colors.length],
  //         })),
  //       },
  //     ],
  //     legend: {
  //       fontSize: 7,
  //       horizontalAlign: "center",
  //       verticalAlign: "bottom",
  //     },
  //   };
 
  //   return (
  //     <CanvasJSChart
  //       options={options}
  //       containerProps={{ height: height, width: "100%" }}
  //     />
  //   );
  // };
  // const roadMaintainLabels = ["Maintained Roads", "Poorly Maintained Roads"];
  // const roadMaintainSeries = [70, 30];
  // const railMaintainLabels = ["Maintained Rail", "Poorly Maintained Rails"];
  // const railMaintainSeries = [80, 20];
  // const airMaintainLabels = ["Maintained Airways", "Poorly Maintained Airways"];
  // const airMaintainSeries = [60, 40];
  // const waterMaintainLabels = [
  //   "Maintained Waterways",
  //   "Poorly Maintained Waterways",
  // ];
  // const waterMaintainSeries = [50, 50];
 
  return (
    <div className="flex align-items-center justify-content-between flex-column gap-3 w-full">
      <div className="flex align-items-center justify-content-between gap-3 w-full">
        <Card className="w-full">
        <div className="flex flex-column gap-3">
          <div className="flex align-items-start justify-content-between w-full">
            <div className="flex align-items-start justify-content-start flex-column gap-3 w-full">
              <h1 className=" m-0 p-0">Roadways Condition</h1>
              <h1
                className=" m-0 pl-3 pr-3 pt-1 pb-1  text-3xl text-theme border-circle"
                style={{ backgroundColor: "#E9F3F5" }}
              >
                8
              </h1>
            </div>
            {/* <img
              src={road}
              style={{ height: "4rem", width: "4rem" }}
              alt="air"
            /> */}
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <DirectionsCarIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
                // padding: "0.2rem",
              }}
            />
            {/* </div> */}
          </div>
          <div className="flex align-items-start justify-content-start w-full ">
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
          </div>
          <div className="flex align-items-start justify-content-between w-full ">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-xs p-0 m-0">
                20% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column w-full">
                  <p className="m-0 text-xs">
                    Maintained Roadways In Current Year: 70%
                  </p>
                  <p className="m-0 text-xs">
                    Maintained Roadways In Previous Year: 90%
                  </p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
          </div>
          </div>
        </Card>
        <Card className="w-full">
        <div className="flex flex-column gap-3">
          <div className="flex align-items-start justify-content-between w-full">
            <div className="flex align-items-start justify-content-start flex-column gap-3 w-full">
              <h1 className=" m-0 p-0">Railways Condition</h1>
              <h1
                className=" m-0 pl-3 pr-3 pt-1 pb-1  text-3xl text-theme border-circle"
                style={{ backgroundColor: "#E9F3F5" }}
              >
                7
              </h1>
            </div>
            {/* <img
              src={rail}
              style={{ height: "2rem", width: "2rem" }}
              alt="air"
            /> */}
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <TrainIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
                // padding: "0.2rem",
              }}
            />
            {/* </div> */}
          </div>
          <div className="flex align-items-start justify-content-startw-full ">
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
          </div>
 
          <div className="flex align-items-start justify-content-betweenw-full ">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={decrease}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-red-400 text-xs p-0 m-0">
                10% decrease in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-xs">
                    Maintained Railways In Current Year: 60%
                  </p>
                  <p className="m-0 text-xs">
                    Maintained Railways In Previous Year: 70%
                  </p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "red" }}
              />
            </CustomTooltip>
          </div>
          </div>
        </Card>
        <Card className="w-full">
        <div className="flex flex-column gap-3">
          <div className="flex align-items-start justify-content-between w-full">
            <div className="flex align-items-start justify-content-start flex-column gap-3 w-full">
              <h1 className="m-0 p-0">Airways Condition</h1>
              <h1
                className=" m-0 pl-3 pr-3 pt-1 pb-1  text-3xl text-theme border-circle"
                style={{ backgroundColor: "#E9F3F5" }}
              >
                9
              </h1>
            </div>
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <FlightIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
                // padding: "0.2rem",
              }}
            />
            {/* </div> */}
          </div>
          <div className="flex align-items-start justify-content-startw-full ">
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
          </div>
 
          <div className="flex align-items-start justify-content-betweenw-full ">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-xs p-0 m-0">
                10% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-xs">
                    Maintained Airways In Current Year: 70%
                  </p>
                  <p className="m-0 text-xs">
                    Maintained Airways In Previous Year: 60%
                  </p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
          </div>
          </div>
        </Card>
        <Card className="w-full">
        <div className="flex flex-column gap-3">
        <div className="flex align-items-start justify-content-between w-full">
            <div className="flex align-items-start justify-content-start flex-column gap-3 w-full">
              <h1 className=" m-0 p-0">Waterways Condition</h1>
              <h1
                className=" m-0 pl-3 pr-3 pt-1 pb-1  text-3xl text-theme border-circle"
                style={{ backgroundColor: "#E9F3F5" }}
              >
                6
              </h1>
            </div>
            {/* <div className="border-circle border-2 border-solid border-theme"> */}
            <DirectionsBoatIcon
              style={{
                height: "3rem",
                width: "3rem",
                color: "#1f8297",
                // padding: "0.2rem",
              }}
            />
            {/* // </div> */}
          </div>
          <div className="flex align-items-start justify-content-startw-full ">
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star-fill" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
            <i className="pi pi-star" style={{ color: "#1f8297" }} />
          </div>
          <div className="flex align-items-start justify-content-betweenw-full ">
            <div className="flex align-items-start justify-content-start flex-row">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              ></img>
              <p className="text-theme text-xs p-0 m-0">
                10% increase in last one year.
              </p>
            </div>
            <CustomTooltip
              content={
                <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                  <p className="m-0 text-xs">
                    Maintained Waterways In Current Year: 80%
                  </p>
                  <p className="m-0 text-xs">
                    Maintained Waterways In Previous Year: 70%
                  </p>
                </div>
              }
            >
              <InfoIcon
                style={{ height: "1.2rem", width: "1.2rem", color: "#1f8297" }}
              />
            </CustomTooltip>
          </div>
        </div>
        </Card>
      </div>
      {/* <div className="flex align-items-center justify-content-betweengap-1 w-full">
        <Card className="w-full">
          <Doughnut
            title="Percentage of Well Maintained Roads"
            labels={roadMaintainLabels}
            series={roadMaintainSeries}
            height={150}
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            title="Percentage of Well Maintained Railways"
            labels={railMaintainLabels}
            series={railMaintainSeries}
            height={150}
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            title="Percentage of Well Maintained Airways"
            labels={airMaintainLabels}
            series={airMaintainSeries}
            height={150}
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            title="Percentage of Well Maintained Waterways"
            labels={waterMaintainLabels}
            series={waterMaintainSeries}
            height={150}
          />
        </Card>
      </div> */}
      <div className="flex align-items-center justify-content-betweengap-1 w-full">
        <Card className="w-full">
          <CanvasJSChart options={options} />
        </Card>
      </div>
    </div>
  );
};
 
export default Infrastructure;