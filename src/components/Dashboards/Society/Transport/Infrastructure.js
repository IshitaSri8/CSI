import { Card } from "primereact/card";
import React from "react";
import increase from "assets/increase.png";
import decrease from "assets/decrease.png";
import "primeicons/primeicons.css";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import InfoIcon from "@mui/icons-material/Info";
import CustomTooltip from "./CustomTooltip";
import { StackedBarChart } from "Layout/GraphVisuals";

const Infrastructure = () => {
  const years = ["2020", "2021", "2022", "2023", "2024"];
  const categories = ["Rail", "Road", "Air", "Water"];
  const series = [
    [9, 5, 7, 6, 8],
    [5, 7, 8, 6, 7],
    [6, 8, 6, 7, 9],
    [7, 6, 8, 9, 7],
  ];
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
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
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
                  style={{
                    height: "1.2rem",
                    width: "1.2rem",
                    color: "#1f8297",
                  }}
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
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
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
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
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
                  style={{
                    height: "1.2rem",
                    width: "1.2rem",
                    color: "#1f8297",
                  }}
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
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "0.5rem",
                  }}
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
                  style={{
                    height: "1.2rem",
                    width: "1.2rem",
                    color: "#1f8297",
                  }}
                />
              </CustomTooltip>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex align-items-center justify-content-betweengap-1 w-full">
        <Card className="w-full">
          {/* <CanvasJSChart options={options} /> */}
          <StackedBarChart
            title="Infrastructure Condition Over Years"
            categories={categories}
            series={series}
            labels={years}
            height={200}
          />
        </Card>
      </div>
    </div>
  );
};

export default Infrastructure;
