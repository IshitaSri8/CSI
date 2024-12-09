import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import BusDashboard from "./BusDashboard";
import RailDashboard from "./RailDashboard";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import TransportDashboard from "../TransportDashboard";

const PlaneComponent = () => (
  <Card title="Plane Component">This is the Plane component.</Card>
);

const Transport = ({ show }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  return (
    <div className="flex flex-column">
      {show && (
        <div className="flex align-items-center justify-content-end w-full">
          {/* <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">Education</h1> */}

          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="bg-primary1 text-white mr-4"
            style={{ marginBottom: -60 }}
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
            {/* <EducationReportPrint /> */}
          </Dialog>
        </div>
      )}
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Transport">
          <TransportDashboard />
        </TabPanel>
        <TabPanel header="Bus">
          <BusDashboard />
        </TabPanel>
        <TabPanel header="Rail">
          <RailDashboard />
        </TabPanel>
        <TabPanel header="Plane">
          <PlaneComponent />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Transport;
