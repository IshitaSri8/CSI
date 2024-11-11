import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DisasterReportPrint from "./DisasterReportPrint";
import { Chip } from "primereact/chip";
import responders from "assets/Group.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import AqiMap from "assets/aqi/AqiMap";
import DisasterRecommendations from "../Disaster Recommendations";
import { Panel } from "primereact/panel";

const Disaster = ({ show }) => {
  const dummyData = [
    {
      disastrousEvent: "Earthquake",
      dateTime: "2023/10/01 14:00",
      injured: 50,
      deaths: 10,
      animalLoss: 5,
      vegetationLoss: "30%",
      severity: "High",
    },
    {
      disastrousEvent: "Flood",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Moderate",
    },
    {
      disastrousEvent: "Cyclone",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Moderate",
    },
    {
      disastrousEvent: "Famine",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Moderate",
    },
    {
      disastrousEvent: "Heat Wave",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "High",
    },
    {
      disastrousEvent: "Landslide",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Moderate",
    },
    {
      disastrousEvent: "Tsunami",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Low",
    },
    {
      disastrousEvent: "Cold Wave",
      dateTime: "2023/10/05 09:30",
      injured: 20,
      deaths: 3,
      animalLoss: 12,
      vegetationLoss: "50%",
      severity: "Low",
    },
  ];
  const [dataTableData, setDataTableData] = useState(dummyData);

  // Common header style template
  const HeaderStyle = {
    fontSize: "1.6rem",
    backgroundColor: "#166c7d",
    color: "white",
    padding: "5px", // Adjust padding as needed
    textAlign: "center",
    fontWeight: "500",
  };

  // Custom rendering for dateTime to display date and time in two lines
  const dateTimeTemplate = (rowData) => {
    const [date, time] = rowData.dateTime.split(" ");
    return (
      <div className="text-left">
        <span>{date}</span>
        <br />
        <span className="text-sm">{time}</span>
      </div>
    );
  };

  const severityTemplate = (rowData) => {
    const severity = rowData.severity;

    // Determine color based on severity
    const severityColors = {
      High: "danger text-white font-medium",
      Moderate: "moderate text-white font-medium",
      Low: "success text-white font-medium",
    };

    return (
      <Tag
        value={severity}
        className={`px-2 border-round-3xl ${severityColors[severity]}`}
      />
    );
  };

  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  return (
    <div className="flex flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Disaster Management
          </h1>
          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            //className="bg-white text-cyan-800 border-1 border-cyan-800"
            className="mb-4 bg-theme text-white"
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
            <DisasterReportPrint />
          </Dialog>
        </div>
      )}

      <div className="flex gap-3">
        {/* First Column */}
        <div className="flex flex-column gap-4" style={{ flex: "40%" }}>
          {/* Disaster Management Plan Availability */}
          <div className="flex justify-content-between bg-white border-round p-4 w-full">
            <div className="flex flex-column">
              <p className="p-0 m-0 text font-medium">
                Disaster Management Plan Availability
              </p>
              <p className="p-0 m-0 text-tertiary3 font-medium">
                Last Updated: <span className="font-semibold">Date</span>
              </p>
            </div>
            <Chip
              label="Yes"
              className="px-4"
              style={{
                width: "fit-content",
                backgroundColor: "#0C9D61",
                color: "#fff",
              }}
            />
          </div>
          {/* Trained Responders Available */}
          <div className="flex justify-content-between bg-white border-round p-2 w-full">
            <div className="flex flex-column gap-4">
              <p className="p-0 m-0 text font-medium text-lg text-left">
                Trained Responders Available
              </p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-0 text-center">
                12000
              </p>
              <Chip
                label="Year: 2020"
                className="p-0 px-1"
                style={{
                  fontSize: "0.75rem",
                  width: "fit-content",
                  backgroundColor: "#E7EAEA",
                  color: "#4c4c4c",
                }}
              />
            </div>
            <img src={responders} alt="Trained Responders Available" />
          </div>
          <div className="flex w-full gap-3">
            <div className="flex flex-column gap-3">
              <div className="flex flex-column bg-white border-round">
                <AqiMap />
                <p className="text p-0 m-0 mt-2">
                  Earthquake Prone Zone:{" "}
                  <span className="font-semibold">1</span>
                </p>
              </div>
              <div className="flex flex-column bg-white border-round">
                <AqiMap />
                <p className="text p-0 m-0 mt-2">
                  Flood Prone Zone: <span className="font-semibold">1</span>
                </p>
              </div>
            </div>
            <div className="flex flex-column w-full gap-1">
              <div className="flex justify-content-between">
                <p className="text p-0 m-0 font-semibold">Losses</p>{" "}
                <span className="text-tertiary3">2010 to 2020</span>
              </div>
              <div className="flex justify-content-between bg-white border-round p-3 w-full">
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                    1589
                  </p>
                  <p className="text p-0 m-0 mt-1">Casualties</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                    2178
                  </p>
                  <p className="text p-0 m-0 mt-1">People Injured</p>
                </div>
              </div>
              <div className="flex border-round w-full gap-2 my-3">
                <div
                  className="flex flex-column w-full pr-4 pl-2 py-3 bg-white"
                  style={{
                    borderLeft: "3px solid #1F8297", // Adjust thickness and color
                    height: "60px", // Adjust height
                  }}
                >
                  <p className="text-xl font-semibold m-0 text-primary2 p-0">
                    576
                  </p>
                  <div className="flex align-items-center">
                    <p className="text m-0 p-0 mt-1 text-sm font-medium">
                      Loss of Animal Life
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-column w-full pr-4 pl-2 py-3 bg-white"
                  style={{
                    borderLeft: "3px solid #1F8297", // Adjust thickness and color
                    height: "60px", // Adjust height
                  }}
                >
                  <p className="text-xl font-semibold m-0 text-primary2 p-0">
                    743
                  </p>
                  <div className="flex align-items-center">
                    <p className="text m-0 p-0 mt-1 text-sm font-medium">
                      Loss of Vegetation
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-column justify-content-between bg-white border-round p-2 w-full">
                <p className="text p-0 m-0 mt-1 font-semibold">Economic Loss</p>
                <div className="flex w-full align-items-center">
                  <div className="flex flex-column w-full p-3 align-items-center">
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      750 <span>Cr.</span>
                    </p>
                    <p className="text p-0 m-0 mt-1 text-sm">Capital Loss</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center">
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      1450 <span>Cr.</span>
                    </p>
                    <p className="text p-0 m-0 mt-1 text-sm">
                      Infrastructure Loss
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second Column */}
        <div
          className="flex flex-column justify-content-between border-round"
          style={{ flex: "60%" }}
        >
          <div className="flex justify-content-between align-items-center">
            <p className="p-0 m-0 text-xl font-semibold text">
              Disastrous Events:{" "}
              <span className="font-bold text-primary1 text-2xl">8</span>
            </p>
            <p className="p-0 m-0 font-medium text">Year : From xx to yy</p>
          </div>
          <DataTable
            value={dataTableData}
            //rowClassName={rowClassName}
            className="custom-padding"
            scrollable
            // scrollHeight="auto"
            style={{
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              // scrollbarWidth: "none",
              // padding: 4,
            }}
            emptyMessage="No Data Found."
          >
            <Column
              field="disastrousEvent"
              header="Disastrous Event"
              className="font-semibold text-primary1"
              //style={{ width: "20%" }}
              headerStyle={HeaderStyle}
            ></Column>
            <Column
              field="dateTime"
              header="Date & Time"
              body={dateTimeTemplate} // Use custom template for date and time
              className="text-lg"
              // style={{ width: "20%" }}
              headerStyle={HeaderStyle}
            />
            <Column
              field="injured"
              header="Injured"
              className="font-semibold text-primary1 text-center"
              // style={{ width: "10%" }}
              headerStyle={HeaderStyle}
            />

            <Column
              field="deaths"
              header="Deaths"
              className="font-semibold text-primary1 text-center"
              // style={{ width: "10%" }}
              headerStyle={HeaderStyle}
            ></Column>

            <Column
              field="animalLoss"
              header="Animal Loss"
              className="font-semibold text-primary1 text-center"
              // style={{ width: "10%" }}
              headerStyle={HeaderStyle}
            ></Column>

            <Column
              field="vegetationLoss"
              header="Vegetation Loss"
              className="font-semibold text-primary1 text-center"
              // style={{ width: "10%" }}
              headerStyle={HeaderStyle}
            ></Column>

            <Column
              field="severity"
              header="Severity"
              body={severityTemplate}
              // style={{ width: "20%" }}
              headerStyle={HeaderStyle}
            ></Column>
          </DataTable>
        </div>
      </div>

      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-down"
              : "pi pi-chevron-up";

            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round mt-4">
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
          {recommendationsVisible && <DisasterRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Disaster;
