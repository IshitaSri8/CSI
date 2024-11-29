import React, { useState } from "react";
import { Panel } from "primereact/panel";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import Infrastructure from "./Infrastructure";
import Frequency from "./Frequency";
import Accessibility from "./Accessibility";
import Renewable from "./Renewable";
import Passenger from "./Passenger";
import PrivateVehicle from "./PrivateVehicle";
import Cleanliness from "./Cleanliness";
import Fare from "./Fare";

const TransportDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  return (
    <div className="flex flex-column gap-3">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Public Transport
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
              onHide={() => setReportVisible(false)}
            >
              {/* Placeholder for the report component */}
            </Dialog>
          </div>
        </div>
      )}
      <TabView>
        <TabPanel header="Infrastructure">
          <Panel header="Infrastructure Quality">
            <Infrastructure />
          </Panel>
        </TabPanel>
        <TabPanel header="Accessibility">
          <Panel header="Accessibility-Mode of Transport">
            <Accessibility />
          </Panel>
        </TabPanel>
        <TabPanel header="Frequency">
          <Panel header="Frequency of Service">
            <Frequency />
          </Panel>
        </TabPanel>
        <TabPanel header="Renewable Energy">
          <Panel header="Transport Renewable Energy Enabled">
            <Renewable />
          </Panel>
        </TabPanel>
        <TabPanel header="Private Vehicles">
          <Panel header="Private Vehicles in Public Transport">
            <PrivateVehicle />
          </Panel>
        </TabPanel>
        <TabPanel header="Passenger Load">
          <Panel header="Capacity and Passenger Load">
            <Passenger />
          </Panel>
        </TabPanel>
        <TabPanel header="Fare">
          <Panel header="Cost and Fare Structure">
            <Fare />
          </Panel>
        </TabPanel>
        <TabPanel header="Cleanliness">
          <Panel toggleable header="Cleanliness and Maintenance">
            <Cleanliness />
          </Panel>
        </TabPanel>
      </TabView>

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

      {/* {recommendationsVisible && <WaterRecommendations />} */}
    </div>
  );
};

export default TransportDashboard;
