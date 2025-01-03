import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DisasterReportPrint from "./DisasterReportPrint";
import { Chip } from "primereact/chip";
import responders from "assets/Group.png";

const Disaster = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
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
       <div className="flex gap-2 w-full">
        <Card className="w-full">
          <i className="pi pi-info-circle text-cyan-800 text-right w-full text-sm cursor-pointer events"></i>
          <h1 className="text-2xl text-cyan-800 text-center m-1 p-0">8</h1>
          <p className="p-0 m-2 text-center">Disastrous Events</p>
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
          <div className="flex justify-content-between gap-2">
            <div className="flex gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">269</h1>
              <p className="text-sm m-0 p-0">Deaths</p>
            </div>
            <div className="flex gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">1,267</h1>
              <p className="text-sm m-0 p-0">Injured</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">678</h1>
              <p className="text-sm m-0 p-0">Animal Loss</p>
            </div>
            <div className="flex gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">159</h1>
              <p className="text-sm m-0 p-0">Vegetation Loss</p>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <h1 className="m-0 p-0 text-cyan-800 text-lg text-center">
            Economic Loss
          </h1>
          <div className="flex align-items-center justify-content-center gap-1">
            <div className="flex align-items-center justify-content-center gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">120 Cr</h1>
              <p className="text-sm m-0 p-0">Capital Loss</p>
            </div>

            <Divider layout="vertical" />
            <div className="flex align-items-center justify-content-center gap-1 flex-column">
              <h1 className="text-lg text-cyan-800">1200 Cr</h1>
              <p className="text-sm m-0 p-0">Infrastructure Loss</p>
            </div>
          </div>
        </Card>
        <Card className="w-full">
          <h1 className="text-xl text-cyan-800 text-center">12,000</h1>
          <p className="text-center">Responders Available</p>
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

      {/* {recommendationsVisible && (
        <DisasterRecommdations />
      )} */}
    </div>
  );
};

export default Disaster;
