import { Card } from "primereact/card";
import React from "react";
import { Doughnut, ParetoChart } from "../../GraphVisuals";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import increase from "../../../assets/increase.png";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PrivateVehicle = () => {
  const categories = ["Roadways", "Railways", "Airways", "Waterways"];
  const privateSeries = [1200, 230, 570, 800];
  //const partnershipSeries = [70, 80, 60, 50];
  const chartCategories = ["2021", "2022", "2023", "2024"];
  const roadSeries = [5, 7, 8, 11]; // Road data for each year
  const railSeries = [3, 5, 7, 9]; // Rail data for each year
  const airSeries = [1, 3, 5, 8]; // Air data for each year
  const waterSeries = [7, 8, 9, 7]; // Water data for each year

  const options = {
    animationEnabled: true,
    title: {
      text: "Private-public partnership by percentage Over Years",
      fontFamily: "DM Sans",
      fontWeight: 800,
      fontSize: 12,
      padding: { bottom: 20 },
    },
    height: 300,
    width: 700,
    axisX: {
      title: "",
      interval: 1,
      labelFontSize: 10,
    },
    axisY: {
     // title: "(%)",
      interval: 1,
      gridThickness: 0,
      labelFontSize: 10,
    },
    data: [
      {
        type: "column",
        color: "#26575D",
        name: "Roadways",

        showInLegend: true,
        //indexLabel: "Roadways: {y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: "black",
        indexLabelFontSize: 8,
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: chartCategories.map((year, index) => ({
          label: year,
          y: roadSeries[index],
        })),
      },
      {
        type: "column",
        name: "Railways",
        color: "#4D7479",
       // indexLabel: "Railways: {y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: "black",
        indexLabelFontSize: 8,
        showInLegend: true,
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: chartCategories.map((year, index) => ({
          label: year,
          y: railSeries[index],
        })),
      },
      {
        type: "column",
        name: "Airways",
        color: "#1F8297",
        showInLegend: true,
        indexLabelPlacement: "outside",
        indexLabelFontColor: "black",
        indexLabelFontSize: 8,
        toolTipContent: "{name}: {y}",
        //indexLabel: "Airways: {y}", 
        dataPoints: chartCategories.map((year, index) => ({
          label: year,
          y: airSeries[index],
        })),
      },
      {
        type: "column",
        color: "#4C9BAC",
        name: "Waterways",
        showInLegend: true,
        indexLabelFontSize: 8,
        indexLabelPlacement: "outside",
        indexLabelFontColor: "black",
       // indexLabel: "Waterways: {y}",
        toolTipContent: "{name}: {y}", // Custom tooltip format
        dataPoints: chartCategories.map((year, index) => ({
          label: year,
          y: waterSeries[index],
        })),
      },
    ],
  };

  return (
    <>
      <div className="flex align-items-center justify-content-between flex-row gap-3">
        {/* Card 1: Number of Private Vehicles */}
        <div className="flex align-items-center justify-content-between flex-column gap-3">
          <Card className="w-20rem h-10rem p-0 align-items-center justify-content-between">
            <h1 className="m-0 p-0 text-xl">3000</h1>
            <h1 className="m-0 text-xs text-center">
              Number of private vehicles contributing to public transport
            </h1>
            <div className="flex align-items-center justify-content-center flex-row w-full">
              {/* <div className="flex align-items-start justify-content-start flex-row">
                <img
                  src={increase}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                />
                <p className="text-green-500 text-xs p-0 m-0">
                  8% increase in last one year.
                </p>
              </div> */}
              {/* Tooltip with Doughnut Chart */}
              <CustomTooltip
                content={
                  <Doughnut
                    title="Breakdown of private vehicles per transport mode"
                    labels={categories}
                    series={privateSeries}
                    height={150}
                  />
                }
              >
                <InfoIcon
                  style={{
                    height: "1.2rem",
                    width: "1.2rem",
                    color: "#1f8297",
                  }}
                />
              </CustomTooltip>
            </div>
          </Card>

          {/* Card 2: Transport Mode Usage by Percentage */}
          <Card className="w-20rem h-10rem align-items-center justify-content-between p-0">
            <div className="flex align-items-center justify-content-center flex-row w-full">
              <img
                src={increase}
                style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
                alt="increase"
              />
              <h1 className="m-0 text-xl">15%</h1>
            </div>

            {/* <div className="flex align-items-center justify-content-center flex-row"> */}
              <h1 className="m-0 text-xs text-center">
                Percentage increase in private vehicles contributing to public
                transport
              </h1>

              {/* Tooltip with Additional Info */}
              <CustomTooltip
                content={
                  <div className="p-2 flex align-items-center justify-content-center gap-1 flex-column h-5rem w-full">
                    <p className="m-0 text-xs">
                      Percentage contribution this year: 64%
                    </p>
                    <p className="m-0 text-xs">
                      Percentage contribution Last year: 49%
                    </p>
                  </div>
                }
              >
                <InfoIcon
                  style={{
                    height: "1.2rem",
                    width: "1.2rem",
                    color: "#1f8297",
                  }}
                />
              </CustomTooltip>
            
          </Card>
        </div>
        {/* Card 3: Private-public partnerships */}
        <Card className="w-full h-21rem p-0">
          {/* <ParetoChart
            title="Private-public partnerships over the last 5 years"
            categories={categories}
            data={partnershipSeries}
            height={200}
          /> */}
          <CanvasJSChart options={options} />
        </Card>
      </div>
    </>
  );
};

export default PrivateVehicle;
