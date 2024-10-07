import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LandDashboard from "./LandDashboard";
import LandRecommendations from "./LandRecommendations";
import GenerateLandReport from "./GenerateLandReport";

const LandMain = () => {
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <LandDashboard />
        </TabPanel>
        <TabPanel header="Recommendations">
          <LandRecommendations />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateLandReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default LandMain;
